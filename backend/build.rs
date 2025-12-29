fn main() {
    // Tell Cargo to rerun this script if migrations change
    println!("cargo:rerun-if-changed=migrations");
    
    // Tell Cargo to rerun if any source file changes
    println!("cargo:rerun-if-changed=src/");
    
    // Generate sqlx-data.json for offline mode
    // This helps with compilation when database is not available
    let out_dir = std::env::var("OUT_DIR").unwrap();
    let dest_path = std::path::Path::new(&out_dir).join("sqlx-data.json");
    
    // Create a simple sqlx-data.json file
    let sqlx_data = r#"{
        "database": "SQLite",
        "version": "3",
        "queries": {}
    }"#;
    
    std::fs::write(&dest_path, sqlx_data).unwrap();
}
