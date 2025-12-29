use actix_web::{web, HttpResponse};
use serde_json::json;

#[derive(Debug, serde::Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, serde::Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    pub name: String,
}

pub async fn login(login_req: web::Json<LoginRequest>) -> HttpResponse {
    println!("Login attempt for email: {}", login_req.email);
    
    // Demo credentials
    let demo_users = vec![
        ("admin@aibusiness.com", "admin123", "admin", "Admin"),
        ("user@example.com", "user123", "user", "User"),
    ];
    
    for (email, password, role, name) in demo_users {
        if login_req.email == email && login_req.password == password {
            return HttpResponse::Ok().json(json!({
                "success": true,
                "message": "Login successful",
                "token": format!("{}-token-12345", role),
                "user": {
                    "id": if role == "admin" { 1 } else { 2 },
                    "email": email,
                    "name": name,
                    "role": role
                }
            }));
        }
    }
    
    // Para novos usuários, aceitar qualquer coisa (para demo)
    if login_req.email.ends_with("@example.com") || login_req.email.contains("@") {
        return HttpResponse::Ok().json(json!({
            "success": true,
            "message": "Login successful (demo mode)",
            "token": "demo-token-67890",
            "user": {
                "id": 1000,
                "email": login_req.email,
                "name": "Demo User",
                "role": "user"
            }
        }));
    }
    
    HttpResponse::Unauthorized().json(json!({
        "success": false,
        "message": "Invalid credentials. Try: admin@aibusiness.com / admin123",
        "token": null,
        "user": null
    }))
}

pub async fn register(register_req: web::Json<RegisterRequest>) -> HttpResponse {
    println!("Registration attempt for email: {}", register_req.email);
    
    HttpResponse::Ok().json(json!({
        "success": true,
        "message": "Registration successful (demo mode)",
        "token": "demo-token-99999",
        "user": {
            "id": 9999,
            "email": register_req.email,
            "name": register_req.name,
            "role": "user"
        }
    }))
}
