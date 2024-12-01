fn main() {
    tauri_build::build();

    // Add the custom manifest to the build
    println!("cargo:rerun-if-changed=src-tauri/windows.manifest");
}
