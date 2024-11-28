// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{AppHandle, Manager}; // Add this import
use std::process::{Command}; // Stdio is necessary for running as admin
use std::collections::HashMap;
#[tauri::command]
fn change_dns(dnsName: String, interfaceName: String) -> Result<String, String> {
    let dns_map = HashMap::from([
        ("Radar", vec!["10.202.10.10", "10.202.10.11"]),
        ("Electro", vec!["78.157.42.100", "78.157.42.101"]),
        ("Google", vec!["8.8.8.8", "8.8.4.4"]),
        ("Shecan", vec!["178.22.122.100", "185.51.200.2"]),
        ("Yandex", vec!["77.88.8.8", "77.88.8.1"]),
        ("cloudflare", vec!["1.1.1.1", "1.0.0.1"]),
    ]);

    let dns_servers = dns_map.get(dnsName.as_str());
    if dns_servers.is_none() {
        return Err(format!("Invalid DNS name: {}", dnsName));
    }

    let dns_servers = dns_servers.unwrap();
    let primary_dns = dns_servers[0];
    let secondary_dns = dns_servers[1];

    // Set primary DNS
    let primary_output = Command::new("netsh")
        .arg("interface")
        .arg("ip")
        .arg("set")
        .arg("dns")
        .arg(format!("name=\"{}\"", interfaceName))
        .arg("static")
        .arg(primary_dns)
        .arg("primary")
        .output()
        .expect("Failed to execute netsh command");

    if !primary_output.status.success() {
        return Err(format!(
            "Failed to set primary DNS: {}",
            String::from_utf8_lossy(&primary_output.stderr)
        ));
    }

    // Set secondary DNS
    let secondary_output = Command::new("netsh")
        .arg("interface")
        .arg("ip")
        .arg("add")
        .arg("dns")
        .arg(format!("name=\"{}\"", interfaceName))
        .arg(secondary_dns)
        .arg("index=2")
        .output()
        .expect("Failed to execute netsh command");

    if !secondary_output.status.success() {
        return Err(format!(
            "Failed to set secondary DNS: {}",
            String::from_utf8_lossy(&secondary_output.stderr)
        ));
    }

    // Flush DNS cache
    let flush_output = Command::new("ipconfig")
        .arg("/flushdns")
        .output()
        .expect("Failed to execute ipconfig command");

    if !flush_output.status.success() {
        return Err(format!(
            "Failed to flush DNS: {}",
            String::from_utf8_lossy(&flush_output.stderr)
        ));
    }

    Ok("DNS changed successfully".to_string())
}


#[tauri::command]
fn close_window(app_handle: AppHandle) {
    if let Some(window) = app_handle.get_webview_window("main") {
        window.close().unwrap_or_else(|err| {
            eprintln!("Failed to close window: {}", err);
        });
    }
}

#[tauri::command]
fn minimize_window(app_handle: AppHandle) {
    if let Some(window) = app_handle.get_webview_window("main") {
        window.minimize().unwrap_or_else(|err| {
            eprintln!("Failed to minimize window: {}", err);
        });
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![close_window, minimize_window, change_dns])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
