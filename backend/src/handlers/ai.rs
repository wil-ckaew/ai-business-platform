use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Deserialize)]
pub struct PredictionRequest {
    pub data: Vec<f64>,
}

#[derive(Debug, Deserialize)]
pub struct OptimizationRequest {
    pub inventory_levels: Vec<f64>,
    pub demand_forecast: Vec<f64>,
}

#[derive(Debug, Deserialize)]
pub struct FraudDetectionRequest {
    pub transaction_amount: f64,
    pub user_history: Vec<f64>,
    pub location: String,
}

#[derive(Debug, Serialize)]
pub struct PredictionResponse {
    pub prediction: f64,
    pub confidence: f64,
}

#[derive(Debug, Serialize)]
pub struct OptimizationResponse {
    pub suggested_order: Vec<f64>,
    pub estimated_cost: f64,
}

#[derive(Debug, Serialize)]
pub struct FraudDetectionResponse {
    pub is_fraud: bool,
    pub risk_score: f64,
}

pub async fn predict_sales(data: web::Json<PredictionRequest>) -> impl Responder {
    // Simulação de previsão de IA
    let sum: f64 = data.data.iter().sum();
    let prediction = if !data.data.is_empty() {
        sum / data.data.len() as f64 * 1.1 // Aumento de 10% como exemplo
    } else {
        0.0
    };

    HttpResponse::Ok().json(PredictionResponse {
        prediction,
        confidence: 0.85,
    })
}

pub async fn optimize_inventory(data: web::Json<OptimizationRequest>) -> impl Responder {
    // Simulação de otimização de estoque
    let suggested_order: Vec<f64> = data.inventory_levels
        .iter()
        .zip(data.demand_forecast.iter())
        .map(|(inv, demand)| {
            let needed = demand - inv;
            if needed > 0.0 { needed } else { 0.0 }
        })
        .collect();

    let estimated_cost = suggested_order.iter().sum::<f64>() * 10.0;

    HttpResponse::Ok().json(OptimizationResponse {
        suggested_order,
        estimated_cost,
    })
}

pub async fn detect_fraud(data: web::Json<FraudDetectionRequest>) -> impl Responder {
    // Simulação de detecção de fraude
    let avg_history: f64 = if !data.user_history.is_empty() {
        data.user_history.iter().sum::<f64>() / data.user_history.len() as f64
    } else {
        0.0
    };

    let risk_score = if data.transaction_amount > 10000.0 {
        0.9
    } else if data.location != "BR" {
        0.7
    } else if data.transaction_amount > avg_history * 3.0 {
        0.8
    } else {
        0.1
    };

    let is_fraud = risk_score > 0.5;

    HttpResponse::Ok().json(FraudDetectionResponse {
        is_fraud,
        risk_score,
    })
}

pub async fn get_insights() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "insights": [
            {
                "title": "Aumento nas vendas do Produto A",
                "description": "As vendas do Produto A aumentaram 15% no último mês.",
                "impact": "high",
                "category": "sales"
            },
            {
                "title": "Oportunidade de expansão de mercado",
                "description": "Análise de dados sugere que há demanda não atendida na região Sul.",
                "impact": "medium",
                "category": "market"
            },
            {
                "title": "Risco de estoque baixo para Produto C",
                "description": "O estoque do Produto C está abaixo do nível seguro.",
                "impact": "high",
                "category": "inventory"
            }
        ]
    }))
}
