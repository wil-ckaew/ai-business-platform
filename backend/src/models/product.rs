use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Product {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
    pub price: f64,
    pub category: Option<String>,
    pub stock: i32,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductCreate {
    pub name: String,
    pub description: Option<String>,
    pub price: f64,
    pub category: Option<String>,
    pub stock: i32,
}
