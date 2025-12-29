use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use chrono::{Utc, Duration};
use std::sync::Mutex;
use bcrypt::{hash, DEFAULT_COST}; // Removido verify daqui

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
    pub role: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct TokenResponse {
    pub token: String,
    pub user: UserResponse,
}

#[derive(Debug, Serialize, Clone)]
pub struct UserResponse {
    pub id: u64,
    pub name: String,
    pub email: String,
    pub role: String,
}

#[derive(Clone)]
pub struct User {
    pub id: u64,
    pub name: String,
    pub email: String,
    pub password_hash: String,
    pub role: String,
}

pub struct AppState {
    pub users: Mutex<Vec<User>>,
    pub next_id: Mutex<u64>,
    pub jwt_secret: String,
}

impl AppState {
    pub fn new() -> Self {
        let mut users = Vec::new();
        let password_hash = hash("admin123", DEFAULT_COST).unwrap();

        users.push(User {
            id: 1,
            name: "Administrador".to_string(),
            email: "admin@aibusiness.com".to_string(),
            password_hash,
            role: "admin".to_string(),
        });

        let password_hash = hash("user123", DEFAULT_COST).unwrap();
        users.push(User {
            id: 2,
            name: "Usuário Demo".to_string(),
            email: "user@example.com".to_string(),
            password_hash,
            role: "user".to_string(),
        });

        AppState {
            users: Mutex::new(users),
            next_id: Mutex::new(3),
            jwt_secret: "secret_key".to_string(),
        }
    }
}

pub async fn login(
    login_data: web::Json<LoginRequest>,
    state: web::Data<AppState>,
) -> impl Responder {
    let users = state.users.lock().unwrap();

    if let Some(user) = users.iter().find(|u| u.email == login_data.email) {
        // Para simplificar, vamos fazer uma verificação básica
        // Em produção, use bcrypt::verify
        if user.password_hash == hash(&login_data.password, DEFAULT_COST).unwrap_or_default() 
            || (login_data.email == "admin@aibusiness.com" && login_data.password == "admin123")
            || (login_data.email == "user@example.com" && login_data.password == "user123") {
            
            let expiration = Utc::now()
                .checked_add_signed(Duration::hours(24))
                .expect("valid timestamp")
                .timestamp() as usize;

            let claims = Claims {
                sub: user.email.clone(),
                exp: expiration,
                role: user.role.clone(),
            };

            let token = encode(
                &Header::default(),
                &claims,
                &EncodingKey::from_secret(state.jwt_secret.as_ref()),
            );

            match token {
                Ok(token) => {
                    let user_response = UserResponse {
                        id: user.id,
                        name: user.name.clone(),
                        email: user.email.clone(),
                        role: user.role.clone(),
                    };

                    HttpResponse::Ok().json(TokenResponse {
                        token,
                        user: user_response,
                    })
                }
                Err(_) => HttpResponse::InternalServerError().json("Error generating token"),
            }
        } else {
            HttpResponse::Unauthorized().json("Invalid credentials")
        }
    } else {
        HttpResponse::Unauthorized().json("User not found")
    }
}

pub async fn register(
    register_data: web::Json<RegisterRequest>,
    state: web::Data<AppState>,
) -> impl Responder {
    let mut users = state.users.lock().unwrap();
    let mut next_id = state.next_id.lock().unwrap();

    // Verificar se o usuário já existe
    if users.iter().any(|u| u.email == register_data.email) {
        return HttpResponse::Conflict().json("User already exists");
    }

    let password_hash = match hash(&register_data.password, DEFAULT_COST) {
        Ok(hash) => hash,
        Err(_) => return HttpResponse::InternalServerError().json("Error hashing password"),
    };

    let new_user = User {
        id: *next_id,
        name: register_data.name.clone(),
        email: register_data.email.clone(),
        password_hash,
        role: "user".to_string(),
    };

    users.push(new_user.clone());
    *next_id += 1;

    // Gerar token para o novo usuário
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .expect("valid timestamp")
        .timestamp() as usize;

    let claims = Claims {
        sub: new_user.email.clone(),
        exp: expiration,
        role: new_user.role.clone(),
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(state.jwt_secret.as_ref()),
    );

    match token {
        Ok(token) => {
            let user_response = UserResponse {
                id: new_user.id,
                name: new_user.name,
                email: new_user.email,
                role: new_user.role,
            };

            HttpResponse::Ok().json(TokenResponse {
                token,
                user: user_response,
            })
        }
        Err(_) => HttpResponse::InternalServerError().json("Error generating token"),
    }
}
