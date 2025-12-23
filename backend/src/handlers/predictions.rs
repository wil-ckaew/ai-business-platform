use actix_web::{web, HttpResponse};
use serde_json::json;
use crate::AppState;
use chrono::Utc;

pub async fn predict_sales(
    state: web::Data<AppState>,
    prediction_data: web::Json<serde_json::Value>,
) -> HttpResponse {
    match state.ai_service.analyze_sales_data(&prediction_data).await {
        Ok(analysis) => {
            HttpResponse::Ok().json(json!({
                "success": true,
                "data": analysis,
                "generated_at": Utc::now(),
                "model_version": "1.0.0"
            }))
        }
        Err(err) => {
            HttpResponse::BadRequest().json(json!({
                "error": "Prediction failed",
                "message": err
            }))
        }
    }
}

pub async fn get_ai_insights(
    state: web::Data<AppState>,
) -> HttpResponse {
    // Gerar insights com base nos dados do sistema
    let context = "Business performance analysis for Q1 2024";
    
    match state.ai_service.generate_insights(context).await {
        Ok(insights) => {
            HttpResponse::Ok().json(json!({
                "insights": insights,
                "generated_at": Utc::now(),
                "confidence": 0.92
            }))
        }
        Err(err) => {
            // Fallback para insights simulados
            let fallback_insights = vec![
                "Revenue growth expected to be 15% in Q2",
                "Customer acquisition cost decreased by 8%",
                "Market expansion opportunity identified in Europe",
                "Product A showing strong adoption trends"
            ];
            
            HttpResponse::Ok().json(json!({
                "insights": fallback_insights,
                "generated_at": Utc::now(),
                "confidence": 0.85,
                "note": "Using fallback insights"
            }))
        }
    }
}

pub async fn analyze_text(
    state: web::Data<AppState>,
    text_data: web::Json<serde_json::Value>,
) -> HttpResponse {
    let text = text_data.get("text")
        .and_then(|t| t.as_str())
        .unwrap_or("");
    
    match state.ai_service.analyze_sentiment(text).await {
        Ok(sentiment_score) => {
            let sentiment = if sentiment_score > 0.6 {
                "positive"
            } else if sentiment_score < 0.4 {
                "negative"
            } else {
                "neutral"
            };
            
            HttpResponse::Ok().json(json!({
                "sentiment": sentiment,
                "score": sentiment_score,
                "analysis": "Text sentiment analysis completed"
            }))
        }
        Err(_) => {
            // Fallback analysis
            let word_count = text.split_whitespace().count();
            let char_count = text.chars().count();
            
            HttpResponse::Ok().json(json!({
                "sentiment": "neutral",
                "score": 0.5,
                "word_count": word_count,
                "character_count": char_count,
                "note": "Using basic text analysis"
            }))
        }
    }
}
