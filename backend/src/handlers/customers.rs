use actix_web::{HttpResponse, Responder};
use serde_json::json;
use crate::models::Customer;
use chrono::Utc;
use uuid::Uuid;

pub async fn get_customers() -> impl Responder {
    let customers = vec![
        Customer {
            id: Uuid::new_v4(),
            name: "TechCorp Inc.".to_string(),
            email: "contact@techcorp.com".to_string(),
            phone: "+1-555-123-4567".to_string(),
            company: "TechCorp".to_string(),
            lifetime_value: 125000.00,
            status: "active".to_string(),
            created_at: Utc::now(),
        },
        Customer {
            id: Uuid::new_v4(),
            name: "Startup XYZ".to_string(),
            email: "info@startupxyz.com".to_string(),
            phone: "+1-555-234-5678".to_string(),
            company: "Startup XYZ".to_string(),
            lifetime_value: 89000.00,
            status: "active".to_string(),
            created_at: Utc::now(),
        },
        Customer {
            id: Uuid::new_v4(),
            name: "Global Solutions".to_string(),
            email: "sales@globalsolutions.com".to_string(),
            phone: "+44-20-1234-5678".to_string(),
            company: "Global Solutions".to_string(),
            lifetime_value: 210000.00,
            status: "active".to_string(),
            created_at: Utc::now(),
        },
    ];
    
    HttpResponse::Ok().json(json!({
        "customers": customers,
        "total": customers.len(),
        "average_lifetime_value": customers.iter().map(|c| c.lifetime_value).sum::<f64>() / customers.len() as f64,
        "active_customers": customers.iter().filter(|c| c.status == "active").count()
    }))
}
