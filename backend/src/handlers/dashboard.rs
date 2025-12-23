use actix_web::{HttpResponse, Responder};
use serde_json::json;
use chrono::Utc;

pub async fn get_dashboard() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "metrics": {
            "total_revenue": 45231.89,
            "total_sales": 2345,
            "active_users": 578,
            "growth_rate": 12.5,
            "conversion_rate": 34.2,
            "customer_satisfaction": 94.2
        },
        "charts": {
            "revenue_trend": [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            "sales_trend": [120, 145, 132, 167, 189, 156, 178],
            "user_growth": [450, 478, 502, 523, 551, 578, 610]
        },
        "recent_activity": [
            {
                "type": "sale",
                "description": "New sale from TechCorp Inc.",
                "amount": 4999.99,
                "timestamp": Utc::now().to_rfc3339()
            },
            {
                "type": "user",
                "description": "New user registration",
                "user": "john.doe@example.com",
                "timestamp": Utc::now().to_rfc3339()
            }
        ],
        "ai_insights": [
            "Revenue expected to grow 15% in Q2",
            "Customer acquisition cost decreased by 8%",
            "High demand detected for Enterprise Plan"
        ]
    }))
}
