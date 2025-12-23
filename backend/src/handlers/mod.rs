pub mod auth;
pub mod sales;
pub mod customers;
pub mod ai;
pub mod dashboard;
pub mod health;
pub mod config;

use actix_web::{HttpResponse, Responder};
use serde_json::json;

pub async fn not_found() -> impl Responder {
    HttpResponse::NotFound().json(json!({
        "error": "Not Found",
        "message": "The requested resource was not found",
        "code": 404
    }))
}
