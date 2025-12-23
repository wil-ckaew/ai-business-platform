use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

// Auth models
#[derive(Debug, Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub username: String,
    pub password: String,
    pub full_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenResponse {
    pub token: String,
    pub user: UserResponse,
    pub expires_in: i64,
}

// User models
#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub username: String,
    pub full_name: String,
    pub role: UserRole,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
    pub id: Uuid,
    pub email: String,
    pub username: String,
    pub full_name: String,
    pub role: UserRole,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum UserRole {
    Admin,
    Manager,
    Analyst,
    User,
}

// Sales models
#[derive(Debug, Serialize, Deserialize)]
pub struct Sale {
    pub id: Uuid,
    pub customer_id: Uuid,
    pub product_id: Uuid,
    pub amount: f64,
    pub quantity: i32,
    pub status: SaleStatus,
    pub payment_method: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum SaleStatus {
    Pending,
    Completed,
    Failed,
    Refunded,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SaleCreate {
    pub customer_id: Uuid,
    pub product_id: Uuid,
    pub amount: f64,
    pub quantity: i32,
    pub payment_method: String,
}

// Customer models
#[derive(Debug, Serialize, Deserialize)]
pub struct Customer {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub phone: String,
    pub company: String,
    pub lifetime_value: f64,
    pub status: String,
    pub created_at: DateTime<Utc>,
}

// AI models
#[derive(Debug, Serialize, Deserialize)]
pub struct PredictionRequest {
    pub data: Vec<f64>,
    pub periods: Option<usize>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PredictionResponse {
    pub predictions: Vec<f64>,
    pub confidence: f64,
    pub insights: Vec<String>,
}
