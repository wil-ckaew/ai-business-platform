use actix_web::{HttpResponse, Responder};
use serde_json::json;
use chrono::Utc;

pub async fn health() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "status": "ok",
        "version": "1.0.0",
        "service": "AI Business Platform API",
        "timestamp": Utc::now().to_rfc3339()
    }))
}

pub async fn get_config() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "app_name": "AI Business Platform",
        "version": "1.0.0",
        "environment": "development",
        "features": {
            "ai_predictions": true,
            "user_management": true,
            "real_time_analytics": true,
            "inventory_optimization": true,
            "fraud_detection": true
        },
        "api_endpoints": [
            "/api/v1/health",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/dashboard",
            "/api/v1/sales",
            "/api/v1/customers",
            "/api/v1/users",
            "/api/v1/ai/predict/sales",
            "/api/v1/ai/optimize/inventory",
            "/api/v1/ai/detect/fraud",
            "/api/v1/ai/insights"
        ]
    }))
}

pub async fn get_dashboard() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "stats": {
            "totalRevenue": 125430.50,
            "totalSales": 2345,
            "activeCustomers": 1567,
            "conversionRate": 3.2,
            "monthlyGrowth": 12.5,
            "inventoryValue": 78900.75,
            "pendingOrders": 45,
            "customerSatisfaction": 4.5
        },
        "recentSales": [
            { "id": 1, "customer": "João Silva", "amount": 1250.00, "date": "2024-01-15", "status": "completed" },
            { "id": 2, "customer": "Maria Santos", "amount": 890.50, "date": "2024-01-15", "status": "pending" },
            { "id": 3, "customer": "Pedro Costa", "amount": 2345.75, "date": "2024-01-14", "status": "completed" },
            { "id": 4, "customer": "Ana Oliveira", "amount": 567.25, "date": "2024-01-14", "status": "completed" },
            { "id": 5, "customer": "Carlos Mendes", "amount": 1234.00, "date": "2024-01-13", "status": "shipped" }
        ],
        "topProducts": [
            { "id": 1, "name": "Produto A", "sales": 245, "revenue": 24500.00 },
            { "id": 2, "name": "Produto B", "sales": 189, "revenue": 18900.00 },
            { "id": 3, "name": "Produto C", "sales": 156, "revenue": 15600.00 },
            { "id": 4, "name": "Produto D", "sales": 134, "revenue": 13400.00 },
            { "id": 5, "name": "Produto E", "sales": 98, "revenue": 9800.00 }
        ],
        "aiInsights": {
            "predictedGrowth": "15%",
            "riskLevel": "Low",
            "opportunityAreas": ["Produto A", "Região Sul"],
            "recommendations": [
                "Aumentar estoque do Produto A em 20%",
                "Expandir campanha de marketing para região Sul"
            ]
        }
    }))
}

pub async fn get_sales() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "sales": [
            { "id": 1, "product": "Produto A", "quantity": 10, "amount": 1000.00, "date": "2024-01-15", "customer": "João Silva", "status": "completed" },
            { "id": 2, "product": "Produto B", "quantity": 5, "amount": 500.00, "date": "2024-01-15", "customer": "Maria Santos", "status": "pending" },
            { "id": 3, "product": "Produto C", "quantity": 8, "amount": 800.00, "date": "2024-01-14", "customer": "Pedro Costa", "status": "completed" },
            { "id": 4, "product": "Produto D", "quantity": 12, "amount": 1200.00, "date": "2024-01-14", "customer": "Ana Oliveira", "status": "completed" },
            { "id": 5, "product": "Produto E", "quantity": 3, "amount": 300.00, "date": "2024-01-13", "customer": "Carlos Mendes", "status": "shipped" }
        ],
        "summary": {
            "totalAmount": 3800.00,
            "averageSale": 760.00,
            "itemsSold": 38
        }
    }))
}

pub async fn get_customers() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "customers": [
            { "id": 1, "name": "João Silva", "email": "joao@empresa.com", "phone": "(11) 99999-9999", "totalPurchases": 1250.00, "lastPurchase": "2024-01-15", "status": "active" },
            { "id": 2, "name": "Maria Santos", "email": "maria@empresa.com", "phone": "(11) 98888-8888", "totalPurchases": 890.50, "lastPurchase": "2024-01-15", "status": "active" },
            { "id": 3, "name": "Pedro Costa", "email": "pedro@empresa.com", "phone": "(11) 97777-7777", "totalPurchases": 2345.75, "lastPurchase": "2024-01-14", "status": "active" },
            { "id": 4, "name": "Ana Oliveira", "email": "ana@empresa.com", "phone": "(11) 96666-6666", "totalPurchases": 567.25, "lastPurchase": "2024-01-14", "status": "active" },
            { "id": 5, "name": "Carlos Mendes", "email": "carlos@empresa.com", "phone": "(11) 95555-5555", "totalPurchases": 1234.00, "lastPurchase": "2024-01-13", "status": "active" }
        ],
        "summary": {
            "totalCustomers": 5,
            "activeCustomers": 5,
            "avgPurchaseValue": 1257.50
        }
    }))
}
