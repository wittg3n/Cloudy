use tauri::{AppHandle, Manager};
use std::process::Command;
use std::collections::HashMap;
use regex::Regex;
use tauri_plugin_log::{Builder as LogBuilder, Target, TargetKind};

// Import logging macros
use log::{info, error, warn, debug};

// Loggable function to get current DNS
#[tauri::command]
fn get_current_dns() -> Result<(String, String), String> {
    info!("Starting get_current_dns command...");
    let output = Command::new("cmd")
        .args(["/C", "ipconfig /all"])
        .output()
        .map_err(|e| {
          error!("Failed to run ipconfig command: {}", e);
            format!("Failed to run ipconfig: {}", e)
        })?;

    if !output.status.success() {
        error!("ipconfig command failed with stderr: {}", String::from_utf8_lossy(&output.stderr));
        return Err(format!(
            "ipconfig command failed: {}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    let output_str = String::from_utf8_lossy(&output.stdout);
    let mut active_adapter = None;
    let mut dns_servers = Vec::new();
    let mut current_adapter = None;
    let mut gateway_found = false;

    let adapter_pattern = Regex::new(r"^(Ethernet|Wireless LAN) adapter (.+):").unwrap();
    let gateway_pattern = Regex::new(r"Default Gateway.*: (\d+\.\d+\.\d+\.\d+)").unwrap();
    let dns_pattern = Regex::new(r"DNS Servers.*: (\d+\.\d+\.\d+\.\d+)").unwrap();

    for line in output_str.lines() {
        let line = line.trim();

        if let Some(captures) = adapter_pattern.captures(line) {
            current_adapter = Some(captures[2].to_string());
            debug!("Found network adapter: {}", &captures[2]);
            continue;
        }

        if line.contains("Media State") && line.contains("Media disconnected") {
            current_adapter = None;
            debug!("Found disconnected adapter, resetting current_adapter.");
            continue;
        }

        if let Some(captures) = gateway_pattern.captures(line) {
            if let Some(adapter) = &current_adapter {
                if captures[1] != *"0.0.0.0" {
                    active_adapter = Some(adapter.clone());
                    debug!("Gateway found for adapter: {}", adapter);
                }
            }
        }

        if let Some(adapter) = &active_adapter {
            if let Some(captures) = dns_pattern.captures(line) {
                dns_servers.push(captures[1].to_string());
                debug!("DNS server found: {}", &captures[1]);
            } else if dns_servers.len() > 0 && Regex::new(r"^\d+\.\d+\.\d+\.\d+$")
                .unwrap()
                .is_match(line)
            {
                dns_servers.push(line.to_string());
                debug!("Additional DNS server found: {}", line);
            }
        }
    }

    if let Some(adapter) = active_adapter {
        let dns_str = dns_servers.join("-");
        info!("Successfully retrieved DNS: {}", dns_str);
        Ok((adapter, dns_str))
    } else {
        warn!("No active adapter found.");
        Err("No active adapter found.".to_string())
    }
}

#[tauri::command]
fn change_dns(dns_name: String, interface_name: String) -> Result<String, String> {
    info!("Attempting to change DNS for interface: {}", interface_name);

    let dns_map = HashMap::from([
        ("Radar", vec!["10.202.10.10", "10.202.10.11"]),
        ("Electro", vec!["78.157.42.100", "78.157.42.101"]),
        ("Shecan", vec!["178.22.122.100", "185.51.200.2"]),
        ("Yandex", vec!["77.88.8.8", "77.88.8.1"]),
        ("Google", vec!["8.8.8.8", "8.8.4.4"]),
        ("Cloudflare", vec!["1.1.1.1", "1.0.0.1"]),
        ("OpenDNS", vec!["208.67.222.222", "208.67.220.220"]),
        ("Quad9", vec!["9.9.9.9", "149.112.112.112"]),
        ("CleanBrowsing", vec!["185.228.168.168", "185.228.169.168"]),
        ("AdGuard", vec!["94.140.14.14", "94.140.15.15"]),
        ("DNSWatch", vec!["84.200.69.80", "84.200.70.40"]),
        ("Comodo", vec!["8.26.56.26", "8.20.247.20"]),
        ("Verisign", vec!["64.6.64.6", "64.6.65.6"]),
    ]);
    let dns_servers = dns_map.get(dns_name.as_str());
    if dns_servers.is_none() {
        error!("Invalid DNS name provided: {}", dns_name);
        return Err(format!("Invalid DNS name: {}", dns_name));
    }

    let dns_servers = dns_servers.unwrap();
    let primary_dns = dns_servers[0];
    let secondary_dns = dns_servers[1];

    let primary_output = Command::new("netsh")
        .arg("interface")
        .arg("ip")
        .arg("set")
        .arg("dns")
        .arg(format!("name=\"{}\"", interface_name))
        .arg("static")
        .arg(primary_dns)
        .arg("primary")
        .output()
        .expect("Failed to execute netsh command");

    if !primary_output.status.success() {
        error!("Failed to set primary DNS: {}", String::from_utf8_lossy(&primary_output.stderr));
        return Err(format!(
            "Failed to set primary DNS: {}",
            String::from_utf8_lossy(&primary_output.stderr)
        ));
    }

    let secondary_output = Command::new("netsh")
        .arg("interface")
        .arg("ip")
        .arg("add")
        .arg("dns")
        .arg(format!("name=\"{}\"", interface_name))
        .arg(secondary_dns)
        .arg("index=2")
        .output()
        .expect("Failed to execute netsh command");

    if !secondary_output.status.success() {
        error!("Failed to set secondary DNS: {}", String::from_utf8_lossy(&secondary_output.stderr));
        return Err(format!(
            "Failed to set secondary DNS: {}",
            String::from_utf8_lossy(&secondary_output.stderr)
        ));
    }

    let flush_output = Command::new("ipconfig")
        .arg("/flushdns")
        .output()
        .expect("Failed to execute ipconfig command");

    if !flush_output.status.success() {
        error!("Failed to flush DNS: {}", String::from_utf8_lossy(&flush_output.stderr));
        return Err(format!(
            "Failed to flush DNS: {}",
            String::from_utf8_lossy(&flush_output.stderr)
        ));
    }

    info!("DNS changed successfully to: {} (primary), {} (secondary)", primary_dns, secondary_dns);
    Ok("DNS changed successfully".to_string())
}

// Loggable function to close the window
#[tauri::command]
fn close_window(app_handle: AppHandle) {
    info!("Closing the main window...");
    if let Some(window) = app_handle.get_webview_window("main") {
        if let Err(err) = window.close() {
            error!("Failed to close window: {}", err);
        } else {
            info!("Window closed successfully.");
        }
    }
}

// Loggable function to minimize the window
#[tauri::command]
fn minimize_window(app_handle: AppHandle) {
    info!("Minimizing the main window...");
    if let Some(window) = app_handle.get_webview_window("main") {
        if let Err(err) = window.minimize() {
            error!("Failed to minimize window: {}", err);
        } else {
            info!("Window minimized successfully.");
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
fn main() {
    // Initialize the Tauri app with logging
    info!("Starting Tauri application...");

    tauri::Builder::default()
        .plugin(LogBuilder::new().target(Target::new(TargetKind::Stdout)).build())  // Register log plugin
        .invoke_handler(tauri::generate_handler![close_window, minimize_window, change_dns, get_current_dns])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");

    info!("Tauri application exited.");
}
