use actix_web::{web, HttpResponse, Responder};
use serde_json::json;
use crate::models::{Sale, SaleCreate, SaleStatus};
use chrono::Utc;
use uuid::Uuid;

pub async fn get_sales() -> impl Responder {
    let sales = vec![
        Sale {
            id: Uuid::new_v4(),
            customer_id: Uuid::new_v4(),
            product_id: Uuid::new_v4(),
            amount: 4999.99,
            quantity: 1,
            status: SaleStatus::Completed,
            payment_method: "credit_card".to_string(),
            created_at: Utc::now(),
        },
        Sale {
            id: Uuid::new_v4(),
            customer_id: Uuid::new_v4(),
            product_id: Uuid::new_v4(),
            amount: 899.99,
            quantity: 1,
            status: SaleStatus::Pending,
            payment_method: "paypal".to_string(),
            created_at: Utc::now(),
        },
        Sale {
            id: Uuid::new_v4(),
            customer_id: Uuid::new_v4(),
            product_id: Uuid::new_v4(),
            amount: 249.99,
            quantity: 1,
            status: SaleStatus::Completed,
            payment_method: "bank_transfer".to_string(),
            created_at: Utc::now(),
        },
    ];
    
    HttpResponse::Ok().json(json!({
        "sales": sales,
        "total": sales.len(),
        "total_revenue": sales.iter().map(|s| s.amount).sum::<f64>(),
        "page": 1,
        "per_page": 10
    }))
}

pub async fn create_sale(sale_req: web::Json<SaleCreate>) -> impl Responder {
    let sale = Sale {
        id: Uuid::new_v4(),
        customer_id: sale_req.customer_id,
        product_id: sale_req.product_id,
        amount: sale_req.amount,
        quantity: sale_req.quantity,
        status: SaleStatus::Pending,
        payment_method: sale_req.payment_method.clone(),
        created_at: Utc::now(),
    };
    
    HttpResponse::Created().json(json!({
        "message": "Sale created successfully",
        "sale": sale,
        "transaction_id": Uuid::new_v4().to_string()
    }))
}
