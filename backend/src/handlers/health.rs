use actix_web::{HttpResponse, Responder};
use serde_json::json;
use chrono::Utc;

pub async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "status": "healthy",
        "version": "1.0.0",
        "service": "AI Business Platform API",
        "timestamp": Utc::now().to_rfc3339(),
        "uptime": "0 days 0 hours 0 minutes"
    }))
}
