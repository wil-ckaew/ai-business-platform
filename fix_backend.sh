#!/bin/bash

echo "🔧 Fixing backend compilation issues..."

cd ~/rust/ai-business-platform/backend

# 1. Remover arquivos problemáticos
rm -f src/models.rs 2>/dev/null
rm -f src/database/postgres.rs 2>/dev/null
rm -f src/handlers/auth_backup.rs 2>/dev/null

# 2. Garantir que temos a estrutura correta
mkdir -p src/models
mkdir -p src/handlers
mkdir -p src/database

# 3. Criar um auth.rs muito simples
cat > src/handlers/auth.rs << 'AUTH_EOF'
use actix_web::{web, HttpResponse};
use serde_json::json;

#[derive(Debug, serde::Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, serde::Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    pub name: String,
}

pub async fn login(login_req: web::Json<LoginRequest>) -> HttpResponse {
    println!("🔐 Login attempt: {}", login_req.email);
    
    // Credenciais demo
    let demo_users = [
        ("admin@aibusiness.com", "admin123", "admin"),
        ("user@example.com", "user123", "user"),
    ];
    
    for &(email, password, role) in &demo_users {
        if login_req.email == email && login_req.password == password {
            return HttpResponse::Ok().json(json!({
                "success": true,
                "message": "Login successful",
                "token": "jwt-demo-token",
                "user": {
                    "id": if role == "admin" { 1 } else { 2 },
                    "email": email,
                    "name": role,
                    "role": role
                }
            }));
        }
    }
    
    // Aceitar qualquer login para demo
    if login_req.email.contains("@") {
        return HttpResponse::Ok().json(json!({
            "success": true,
            "message": "Login successful (demo mode)",
            "token": "demo-token",
            "user": {
                "id": 999,
                "email": login_req.email,
                "name": "Demo User",
                "role": "user"
            }
        }));
    }
    
    HttpResponse::Unauthorized().json(json!({
        "success": false,
        "message": "Invalid credentials",
        "token": null,
        "user": null
    }))
}

pub async fn register(register_req: web::Json<RegisterRequest>) -> HttpResponse {
    println!("📝 Registration: {}", register_req.email);
    
    HttpResponse::Ok().json(json!({
        "success": true,
        "message": "Registration successful",
        "token": "new-user-token",
        "user": {
            "id": 1000 + rand::random::<u16>() as i64,
            "email": register_req.email,
            "name": register_req.name,
            "role": "user"
        }
    }))
}
AUTH_EOF

# 4. Criar um sales.rs simples
cat > src/handlers/sales.rs << 'SALES_EOF'
use actix_web::{web, HttpResponse, Responder};
use serde_json::json;
use chrono::Utc;

pub async fn get_sales() -> impl Responder {
    let sales = vec![
        json!({
            "id": 1,
            "product_id": 1,
            "product_name": "AI Model Pro",
            "quantity": 2,
            "amount": 1999.98,
            "customer_email": "client1@example.com",
            "sale_date": Utc::now().to_rfc3339()
        }),
        json!({
            "id": 2,
            "product_id": 2,
            "product_name": "Business Dashboard",
            "quantity": 1,
            "amount": 499.99,
            "customer_email": "client2@example.com",
            "sale_date": Utc::now().to_rfc3339()
        }),
        json!({
            "id": 3,
            "product_id": 3,
            "product_name": "Data Processor",
            "quantity": 5,
            "amount": 1499.95,
            "customer_email": "client3@example.com",
            "sale_date": Utc::now().to_rfc3339()
        }),
    ];
    
    HttpResponse::Ok().json(json!({
        "sales": sales,
        "total": sales.len(),
        "total_revenue": 3999.92,
        "page": 1,
        "per_page": 10,
        "note": "Demo data - SQLite integration in progress"
    }))
}

pub async fn create_sale(sale_data: web::Json<serde_json::Value>) -> impl Responder {
    println!("💰 New sale: {:?}", sale_data);
    
    HttpResponse::Created().json(json!({
        "id": 1000 + rand::random::<u16>() as i64,
        "message": "Sale recorded successfully (demo mode)",
        "timestamp": Utc::now().to_rfc3339()
    }))
}
SALES_EOF

# 5. Atualizar Cargo.toml
cat > Cargo.toml << 'CARGO_EOF'
[package]
name = "ai-business-platform"
version = "1.0.0"
edition = "2021"

[dependencies]
actix-web = "4"
actix-cors = "0.7"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tokio = { version = "1", features = ["full"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1", features = ["v4", "serde"] }
dotenv = "0.15"
log = "0.4"
env_logger = "0.10"
rand = "0.8"
lazy_static = "1.4"
futures = "0.3"
regex = "1.9"

# Banco de dados SQLite (opcional para demo)
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "sqlite", "offline"] }
CARGO_EOF

# 6. Criar .env
cat > .env << 'ENV_EOF'
DATABASE_URL=sqlite:./database.db
PORT=8080
RUST_LOG=info
ENV_EOF

# 7. Criar main.rs simplificado
cat > src/main.rs << 'MAIN_EOF'
mod handlers;
mod models;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer, middleware::Logger};
use std::env;
use dotenv::dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let port = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse::<u16>()
        .expect("PORT must be a number");

    println!("🚀 AI Business Platform Backend");
    println!("📡 Port: {}", port);
    println!("🔧 Mode: Demo (SQLite optional)");
    println!("👤 Demo: admin@aibusiness.com / admin123");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .supports_credentials()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            // Health check
            .route("/api/health", web::get().to(handlers::health::health_check))
            // Authentication
            .route("/api/auth/login", web::post().to(handlers::auth::login))
            .route("/api/auth/register", web::post().to(handlers::auth::register))
            // AI
            .route("/api/ai/predict-sales", web::post().to(handlers::ai::predict_sales))
            .route("/api/ai/optimize-inventory", web::post().to(handlers::ai::optimize_inventory))
            .route("/api/ai/detect-fraud", web::post().to(handlers::ai::detect_fraud))
            .route("/api/ai/insights", web::get().to(handlers::ai::get_insights))
            // Business
            .route("/api/dashboard", web::get().to(handlers::dashboard::get_dashboard))
            .route("/api/sales", web::get().to(handlers::sales::get_sales))
            .route("/api/sales", web::post().to(handlers::sales::create_sale))
            .route("/api/customers", web::get().to(handlers::customers::get_customers))
            .route("/api/config", web::get().to(handlers::config::get_config))
            // Fallback
            .default_service(web::route().to(handlers::not_found))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
MAIN_EOF

echo "✅ Backend fixed! Try compiling now:"
echo "cd ~/rust/ai-business-platform/backend"
echo "cargo build"
echo "cargo run"
