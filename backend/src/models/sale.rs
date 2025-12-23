use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Sale {
    pub id: Uuid,
    pub customer_id: Uuid,
    pub product_id: Uuid,
    pub amount: f64,
    pub quantity: i32,
    pub status: SaleStatus,
    pub payment_method: String,
    pub transaction_id: Option<String>,
    pub notes: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "sale_status", rename_all = "snake_case")]
pub enum SaleStatus {
    Pending,
    Completed,
    Failed,
    Refunded,
    Cancelled,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SaleCreate {
    pub customer_id: Uuid,
    pub product_id: Uuid,
    pub amount: f64,
    pub quantity: i32,
    pub payment_method: String,
    pub notes: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SaleUpdate {
    pub status: Option<SaleStatus>,
    pub amount: Option<f64>,
    pub notes: Option<String>,
}
