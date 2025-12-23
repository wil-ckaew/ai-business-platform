use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use bcrypt::{hash, verify, DEFAULT_COST};

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    pub name: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub success: bool,
    pub message: String,
    pub token: Option<String>,
    pub user: Option<UserData>,
}

#[derive(Debug, Serialize)]
pub struct UserData {
    pub id: i32,
    pub email: String,
    pub name: String,
    pub role: String,
}

pub async fn login(
    login_req: web::Json<LoginRequest>
) -> HttpResponse {
    // Simulação de autenticação
    if login_req.email == "admin@business.com" && login_req.password == "password123" {
        let user = UserData {
            id: 1,
            email: login_req.email.clone(),
            name: "Admin User".to_string(),
            role: "admin".to_string(),
        };
        
        let response = AuthResponse {
            success: true,
            message: "Login successful".to_string(),
            token: Some("dummy-jwt-token-12345".to_string()),
            user: Some(user),
        };
        
        HttpResponse::Ok().json(response)
    } else {
        let response = AuthResponse {
            success: false,
            message: "Invalid credentials".to_string(),
            token: None,
            user: None,
        };
        
        HttpResponse::Unauthorized().json(response)
    }
}

pub async fn register(
    register_req: web::Json<RegisterRequest>
) -> HttpResponse {
    // Hash da senha (simulação)
    let _password_hash = hash(&register_req.password, DEFAULT_COST).unwrap();
    
    let user = UserData {
        id: 2,
        email: register_req.email.clone(),
        name: register_req.name.clone(),
        role: "user".to_string(),
    };
    
    let response = AuthResponse {
        success: true,
        message: "Registration successful".to_string(),
        token: Some("dummy-jwt-token-67890".to_string()),
        user: Some(user),
    };
    
    HttpResponse::Ok().json(response)
}
