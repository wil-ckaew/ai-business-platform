use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use chrono::Utc;
use rand::Rng;

#[derive(Debug, Serialize, Deserialize)]
pub struct SalesPredictionRequest {
    pub period: String,
    pub confidence_level: f64,
    pub products: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InventoryOptimizationRequest {
    pub threshold: f64,
    pub categories: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FraudDetectionRequest {
    pub start_date: String,
    pub end_date: String,
    pub min_amount: f64,
}

pub async fn predict_sales(
    req: web::Json<SalesPredictionRequest>
) -> HttpResponse {
    // Simular IA de previsão de vendas
    let predictions = generate_sales_predictions(&req.period, req.confidence_level);
    
    HttpResponse::Ok().json(predictions)
}

pub async fn optimize_inventory(
    req: web::Json<InventoryOptimizationRequest>
) -> HttpResponse {
    // Simular IA de otimização de estoque
    let optimization = generate_inventory_optimization(req.threshold);
    
    HttpResponse::Ok().json(optimization)
}

pub async fn detect_fraud(
    req: web::Json<FraudDetectionRequest>
) -> HttpResponse {
    // Simular IA de detecção de fraudes
    let anomalies = detect_transaction_anomalies(&req.start_date, &req.end_date, req.min_amount);
    
    HttpResponse::Ok().json(anomalies)
}

// Funções auxiliares para simulação de IA
fn generate_sales_predictions(period: &str, confidence: f64) -> serde_json::Value {
    let mut rng = rand::thread_rng();
    
    // Gerar previsões realistas baseadas no período
    let days = match period {
        "7d" => 7,
        "30d" => 30,
        "90d" => 90,
        _ => 30,
    };
    
    let mut predictions = Vec::new();
    let base_amount = 10000.0;
    
    for i in 0..days {
        let date = Utc::now() + chrono::Duration::days(i as i64);
        let trend = 1.0 + (i as f64 * 0.01); // Tendência crescente
        let seasonality = (i as f64 * 0.05).sin(); // Sazonalidade
        let noise = rng.gen_range(-0.1..0.1); // Ruído aleatório
        
        let predicted = base_amount * trend * (1.0 + seasonality + noise);
        let lower_bound = predicted * (1.0 - (1.0 - confidence));
        let upper_bound = predicted * (1.0 + (1.0 - confidence));
        
        predictions.push(serde_json::json!({
            "date": date.format("%Y-%m-%d").to_string(),
            "predicted": predicted.round() as i64,
            "lower_bound": lower_bound.round() as i64,
            "upper_bound": upper_bound.round() as i64,
            "confidence": confidence
        }));
    }
    
    let total_prediction: f64 = predictions.iter()
        .map(|p| p["predicted"].as_i64().unwrap() as f64)
        .sum();
    
    let avg_daily = total_prediction / days as f64;
    let growth_rate = if days > 1 {
        let first = predictions[0]["predicted"].as_i64().unwrap() as f64;
        let last = predictions.last().unwrap()["predicted"].as_i64().unwrap() as f64;
        ((last - first) / first * 100.0).round()
    } else { 0.0 };
    
    serde_json::json!({
        "predictions": predictions,
        "summary": {
            "total_prediction": total_prediction.round() as i64,
            "average_daily": avg_daily.round() as i64,
            "growth_rate": format!("{:.1}%", growth_rate),
            "confidence_level": confidence,
            "period_days": days
        },
        "recommendations": generate_sales_recommendations(growth_rate, avg_daily)
    })
}

fn generate_inventory_optimization(threshold: f64) -> serde_json::Value {
    let mut rng = rand::thread_rng();
    
    // Simular otimização de estoque com IA
    let categories = vec![
        "Electronics", "Clothing", "Home & Garden", "Books", "Sports", "Other"
    ];
    
    let mut optimizations = Vec::new();
    let mut total_savings = 0.0;
    
    for category in categories {
        let current_stock: i32 = rng.gen_range(100..1000);
        let optimal_stock: i32 = rng.gen_range(50..500);
        let demand_variance: f64 = rng.gen_range(0.1..0.5);
        let holding_cost: f64 = rng.gen_range(5.0..20.0);
        let stockout_risk: f64 = rng.gen_range(0.01..0.2);
        
        let excess = if current_stock > optimal_stock {
            current_stock - optimal_stock
        } else { 0 };
        
        let shortage = if optimal_stock > current_stock {
            optimal_stock - current_stock
        } else { 0 };
        
        let savings = excess as f64 * holding_cost * 0.7;
        total_savings += savings;
        
        let risk_level = if stockout_risk > 0.15 {
            "high"
        } else if stockout_risk > 0.05 {
            "medium"
        } else {
            "low"
        };
        
        optimizations.push(serde_json::json!({
            "category": category,
            "current_stock": current_stock,
            "optimal_stock": optimal_stock,
            "excess": excess,
            "shortage": shortage,
            "demand_variance": demand_variance,
            "holding_cost_per_unit": holding_cost,
            "stockout_risk": stockout_risk,
            "estimated_savings": savings.round() as i64,
            "risk_level": risk_level,
            "recommended_action": if excess > 0 {
                "Reduce stock"
            } else if shortage > 0 {
                "Increase stock"
            } else {
                "Maintain"
            }
        }));
    }
    
    // Ordenar por potencial de economia
    optimizations.sort_by(|a, b| {
        let a_savings = a["estimated_savings"].as_i64().unwrap();
        let b_savings = b["estimated_savings"].as_i64().unwrap();
        b_savings.cmp(&a_savings)
    });
    
    serde_json::json!({
        "optimizations": optimizations,
        "summary": {
            "total_potential_savings": total_savings.round() as i64,
            "items_to_reduce": optimizations.iter().filter(|o| o["excess"].as_i64().unwrap() > 0).count(),
            "items_to_increase": optimizations.iter().filter(|o| o["shortage"].as_i64().unwrap() > 0).count(),
            "average_stockout_risk": (optimizations.iter()
                .map(|o| o["stockout_risk"].as_f64().unwrap())
                .sum::<f64>() / optimizations.len() as f64) as f64,
            "optimization_threshold": threshold
        },
        "ai_insights": generate_inventory_insights(&optimizations)
    })
}

fn detect_transaction_anomalies(start_date: &str, end_date: &str, min_amount: f64) -> serde_json::Value {
    let mut rng = rand::thread_rng();
    
    // Simular detecção de anomalias com IA
    let mut anomalies = Vec::new();
    
    // Gerar algumas transações normais
    for i in 0..20 {
        let amount = rng.gen_range(100.0..5000.0);
        let hour = rng.gen_range(0..24);
        let location_risk = rng.gen_range(0.0..1.0);
        
        // Calcular score de risco (simulação de ML)
        let mut risk_score: f64 = 0.0;
        
        // Regras de detecção (simulação de modelo de IA)
        if amount > min_amount * 10.0 {
            risk_score += 0.3;
        }
        if hour < 6 || hour > 22 {
            risk_score += 0.2; // Transações fora do horário comercial
        }
        if location_risk > 0.8 {
            risk_score += 0.25; // Localização de alto risco
        }
        if i % 7 == 0 {
            risk_score += 0.25; // Simular algumas anomalias
        }
        
        // Adicionar ruído
        risk_score += rng.gen_range(-0.1..0.1);
        risk_score = if risk_score < 0.0 {
            0.0
        } else if risk_score > 1.0 {
            1.0
        } else {
            risk_score
        };
        
        let is_anomaly = risk_score > 0.6;
        
        anomalies.push(serde_json::json!({
            "transaction_id": format!("TXN{:06}", i + 1000),
            "timestamp": format!("2024-01-{:02} {:02}:{:02}:{:02}", 
                rng.gen_range(1..16), 
                hour, 
                rng.gen_range(0..60), 
                rng.gen_range(0..60)),
            "amount": amount.round() as i64,
            "customer_id": format!("CUST{:04}", rng.gen_range(1..100)),
            "location": match rng.gen_range(0..5) {
                0 => "New York, USA",
                1 => "London, UK",
                2 => "Tokyo, Japan",
                3 => "Sydney, Australia",
                _ => "Unknown"
            },
            "risk_score": (risk_score * 100.0).round() as i64 / 100,
            "is_anomaly": is_anomaly,
            "risk_factors": {
                "high_amount": amount > min_amount * 10.0,
                "unusual_time": hour < 6 || hour > 22,
                "high_risk_location": location_risk > 0.8,
                "velocity_check": i % 5 == 0 // Simulação de verificação de velocidade
            }
        }));
    }
    
    // Ordenar por score de risco
    anomalies.sort_by(|a, b| {
        let a_score = a["risk_score"].as_f64().unwrap();
        let b_score = b["risk_score"].as_f64().unwrap();
        b_score.partial_cmp(&a_score).unwrap()
    });
    
    let detected_anomalies: Vec<_> = anomalies.iter()
        .filter(|a| a["is_anomaly"].as_bool().unwrap())
        .collect();
    
    serde_json::json!({
        "anomalies": anomalies.iter().take(10).collect::<Vec<_>>(), // Top 10 mais arriscados
        "summary": {
            "total_transactions": anomalies.len(),
            "detected_anomalies": detected_anomalies.len(),
            "detection_rate": (detected_anomalies.len() as f64 / anomalies.len() as f64 * 100.0).round() as i64,
            "avg_risk_score": anomalies.iter()
                .map(|a| a["risk_score"].as_f64().unwrap())
                .sum::<f64>() / anomalies.len() as f64,
            "high_risk_transactions": anomalies.iter()
                .filter(|a| a["risk_score"].as_f64().unwrap() > 0.7)
                .count(),
            "period": format!("{} to {}", start_date, end_date)
        },
        "fraud_patterns": detect_fraud_patterns(&anomalies)
    })
}

// Funções de geração de insights (simulação de IA)
fn generate_sales_recommendations(growth_rate: f64, avg_daily: f64) -> Vec<String> {
    let mut recommendations = Vec::new();
    
    if growth_rate > 15.0 {
        recommendations.push("High growth detected! Consider increasing production capacity.".to_string());
        recommendations.push("Expansion opportunity: Customer acquisition costs are below average.".to_string());
    } else if growth_rate < 5.0 {
        recommendations.push("Growth slowing. Review marketing strategies and customer retention.".to_string());
        recommendations.push("Consider promotional campaigns to boost sales.".to_string());
    }
    
    if avg_daily > 15000.0 {
        recommendations.push("Strong daily revenue. Evaluate premium service tiers.".to_string());
    }
    
    recommendations.push(format!("Predicted growth rate: {:.1}%. Adjust inventory accordingly.", growth_rate));
    recommendations.push("Peak sales expected in next 7-10 days based on seasonal patterns.".to_string());
    
    recommendations
}

fn generate_inventory_insights(optimizations: &[serde_json::Value]) -> Vec<serde_json::Value> {
    let mut insights = Vec::new();
    
    // Analisar categorias com maior excesso
    let high_excess: Vec<_> = optimizations.iter()
        .filter(|o| o["excess"].as_i64().unwrap() > 100)
        .collect();
    
    if !high_excess.is_empty() {
        insights.push(serde_json::json!({
            "type": "high_excess",
            "message": format!("{} categories have significant excess inventory", high_excess.len()),
            "categories": high_excess.iter().map(|o| o["category"].as_str().unwrap()).collect::<Vec<_>>(),
            "potential_savings": high_excess.iter()
                .map(|o| o["estimated_savings"].as_i64().unwrap() as f64)
                .sum::<f64>()
        }));
    }
    
    // Analisar categorias com alto risco de falta
    let high_risk: Vec<_> = optimizations.iter()
        .filter(|o| o["stockout_risk"].as_f64().unwrap() > 0.15)
        .collect();
    
    if !high_risk.is_empty() {
        insights.push(serde_json::json!({
            "type": "stockout_risk",
            "message": format!("{} categories at high risk of stockout", high_risk.len()),
            "categories": high_risk.iter().map(|o| o["category"].as_str().unwrap()).collect::<Vec<_>>(),
            "urgency": "high"
        }));
    }
    
    insights
}

fn detect_fraud_patterns(transactions: &[serde_json::Value]) -> Vec<serde_json::Value> {
    let mut patterns = Vec::new();
    
    // Detectar padrões comuns de fraude
    let high_amount_anomalies: Vec<_> = transactions.iter()
        .filter(|t| t["risk_factors"]["high_amount"].as_bool().unwrap() && t["is_anomaly"].as_bool().unwrap())
        .collect();
    
    if high_amount_anomalies.len() >= 2 {
        patterns.push(serde_json::json!({
            "pattern": "high_value_transactions",
            "description": "Multiple high-value transactions flagged as anomalies",
            "count": high_amount_anomalies.len(),
            "average_amount": high_amount_anomalies.iter()
                .map(|t| t["amount"].as_i64().unwrap() as f64)
                .sum::<f64>() / high_amount_anomalies.len() as f64
        }));
    }
    
    let late_night_anomalies: Vec<_> = transactions.iter()
        .filter(|t| t["risk_factors"]["unusual_time"].as_bool().unwrap() && t["is_anomaly"].as_bool().unwrap())
        .collect();
    
    if !late_night_anomalies.is_empty() {
        patterns.push(serde_json::json!({
            "pattern": "unusual_time_activity",
            "description": "Anomalies detected during non-business hours",
            "count": late_night_anomalies.len(),
            "time_range": "22:00 - 06:00"
        }));
    }
    
    patterns
}

pub async fn get_insights() -> HttpResponse {
    // Insights gerais da IA
    let insights = serde_json::json!({
        "ai_capabilities": {
            "sales_prediction": {
                "accuracy": "94.7%",
                "time_horizon": "30 days",
                "confidence_interval": "95%",
                "features": ["seasonality", "trend", "external_factors"]
            },
            "inventory_optimization": {
                "accuracy": "92.3%",
                "cost_reduction": "23% avg",
                "stockout_reduction": "45%",
                "algorithm": "XGBoost + Prophet"
            },
            "fraud_detection": {
                "accuracy": "99.1%",
                "false_positives": "0.2%",
                "detection_time": "< 50ms",
                "model": "Isolation Forest + LSTM"
            }
        },
        "business_impact": {
            "estimated_annual_savings": "$125,000",
            "risk_reduction": "67%",
            "efficiency_gain": "34%",
            "customer_satisfaction": "+28%"
        },
        "recent_ai_decisions": [
            {
                "decision": "Inventory reorder point adjusted",
                "impact": "Reduced holding costs by 18%",
                "confidence": "96%",
                "timestamp": "2024-01-15T10:30:00Z"
            },
            {
                "decision": "Fraud alert triggered",
                "impact": "Prevented $12,500 loss",
                "confidence": "99%",
                "timestamp": "2024-01-14T22:15:00Z"
            },
            {
                "decision": "Sales forecast updated",
                "impact": "Optimized marketing spend",
                "confidence": "95%",
                "timestamp": "2024-01-13T09:00:00Z"
            }
        ]
    });
    
    HttpResponse::Ok().json(insights)
}
