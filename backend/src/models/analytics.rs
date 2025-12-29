use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct AnalyticsEvent {
    pub id: i64,
    pub event_type: String,
    pub user_id: Option<i64>,
    pub metadata: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AnalyticsEventCreate {
    pub event_type: String,
    pub metadata: Option<String>,
}
