mod config;
mod handlers;
mod models;
mod database;

use actix_web::{web, App, HttpServer, HttpResponse};
use actix_cors::Cors;
use actix_web::middleware::Logger;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Inicializar logger
    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    
    println!("🚀 Starting AI Business Platform API on http://{}:{}", host, port);
    println!("🎯 AI Endpoints:");
    println!("   • POST /api/v1/ai/predict/sales     - Previsão de vendas com IA");
    println!("   • POST /api/v1/ai/optimize/inventory - Otimização de estoque com IA");
    println!("   • POST /api/v1/ai/detect/fraud      - Detecção de fraudes com IA");
    println!("   • GET  /api/v1/ai/insights          - Insights gerais da IA");
    println!("📡 API Endpoints:");
    println!("   • GET  /api/v1/health");
    println!("   • POST /api/v1/auth/login");
    println!("   • GET  /api/v1/config");
    println!("   • GET  /api/v1/dashboard");
    println!("   • GET  /api/v1/sales");
    println!("   • GET  /api/v1/customers");

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Cors::default()
                .allow_any_origin()
                .allow_any_method()
                .allow_any_header()
                .max_age(3600))
            // Health check
            .route("/api/v1/health", web::get().to(handlers::health::health_check))
            // Config
            .route("/api/v1/config", web::get().to(handlers::config::get_config))
            // Auth
            .route("/api/v1/auth/login", web::post().to(handlers::auth::login))
            .route("/api/v1/auth/register", web::post().to(handlers::auth::register))
            // Dashboard
            .route("/api/v1/dashboard", web::get().to(handlers::dashboard::get_dashboard))
            // Sales
            .route("/api/v1/sales", web::get().to(handlers::sales::get_sales))
            .route("/api/v1/sales", web::post().to(handlers::sales::create_sale))
            // Customers
            .route("/api/v1/customers", web::get().to(handlers::customers::get_customers))
            // AI Endpoints
            .route("/api/v1/ai/predict/sales", web::post().to(handlers::ai::predict_sales))
            .route("/api/v1/ai/optimize/inventory", web::post().to(handlers::ai::optimize_inventory))
            .route("/api/v1/ai/detect/fraud", web::post().to(handlers::ai::detect_fraud))
            .route("/api/v1/ai/insights", web::get().to(handlers::ai::get_insights))
            // Root
            .route("/", web::get().to(|| async { 
                HttpResponse::Ok().body("AI Business Platform API v1.0.0 - Powered by Rust & Machine Learning") 
            }))
            // 404 handler
            .default_service(web::route().to(handlers::not_found))
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}
