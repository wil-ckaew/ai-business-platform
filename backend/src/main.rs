mod handlers;
mod models;
mod database;
mod config;

use actix_web::{web, App, HttpServer};
use handlers::auth::AppState as AuthState;
use handlers::users::UserState;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("🚀 Starting AI Business Platform API on http://0.0.0.0:8080");
    
    let auth_state = web::Data::new(AuthState::new());
    let user_state = web::Data::new(UserState::new());

    HttpServer::new(move || {
        App::new()
            .app_data(auth_state.clone())
            .app_data(user_state.clone())
            // Rotas de autenticação
            .route("/api/v1/auth/login", web::post().to(handlers::auth::login))
            .route("/api/v1/auth/register", web::post().to(handlers::auth::register))
            // Rotas de usuários
            .route("/api/v1/users", web::get().to(handlers::users::get_users))
            .route("/api/v1/users/{id}", web::get().to(handlers::users::get_user))
            .route("/api/v1/users", web::post().to(handlers::users::create_user))
            .route("/api/v1/users/{id}", web::put().to(handlers::users::update_user))
            .route("/api/v1/users/{id}", web::delete().to(handlers::users::delete_user))
            // Rotas de IA
            .route("/api/v1/ai/predict/sales", web::post().to(handlers::ai::predict_sales))
            .route("/api/v1/ai/optimize/inventory", web::post().to(handlers::ai::optimize_inventory))
            .route("/api/v1/ai/detect/fraud", web::post().to(handlers::ai::detect_fraud))
            .route("/api/v1/ai/insights", web::get().to(handlers::ai::get_insights))
            // Rotas da API
            .route("/api/v1/health", web::get().to(handlers::api::health))
            .route("/api/v1/config", web::get().to(handlers::api::get_config))
            .route("/api/v1/dashboard", web::get().to(handlers::api::get_dashboard))
            .route("/api/v1/sales", web::get().to(handlers::api::get_sales))
            .route("/api/v1/customers", web::get().to(handlers::api::get_customers))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
