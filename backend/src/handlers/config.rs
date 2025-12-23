use actix_web::{HttpResponse, Responder};
use serde_json::json;

pub async fn get_config() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "name": "AI Business Platform",
        "version": "1.0.0",
        "features": ["auth", "sales", "predictions", "analytics", "dashboard"],
        "ai_enabled": true,
        "environment": "development",
        "api_version": "v1"
    }))
}
