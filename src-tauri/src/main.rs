// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{AppHandle, Manager}; // Add this import

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
        .invoke_handler(tauri::generate_handler![close_window, minimize_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
