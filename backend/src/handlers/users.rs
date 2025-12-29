use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub id: u64,
    pub name: String,
    pub email: String,
    pub role: String,
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    pub name: String,
    pub email: String,
    pub password: String,
    pub role: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateUserRequest {
    pub name: Option<String>,
    pub email: Option<String>,
    pub role: Option<String>,
}

pub struct UserState {
    pub users: Mutex<Vec<User>>,
    pub next_id: Mutex<u64>,
}

impl UserState {
    pub fn new() -> Self {
        let users = vec![
            User {
                id: 1,
                name: "Admin".to_string(),
                email: "admin@aibusiness.com".to_string(),
                role: "admin".to_string(),
                created_at: "2024-01-01".to_string(),
            },
            User {
                id: 2,
                name: "Usuário Demo".to_string(),
                email: "user@example.com".to_string(),
                role: "user".to_string(),
                created_at: "2024-01-02".to_string(),
            },
            User {
                id: 3,
                name: "João Silva".to_string(),
                email: "joao@empresa.com".to_string(),
                role: "user".to_string(),
                created_at: "2024-01-03".to_string(),
            },
            User {
                id: 4,
                name: "Maria Santos".to_string(),
                email: "maria@empresa.com".to_string(),
                role: "user".to_string(),
                created_at: "2024-01-04".to_string(),
            },
        ];

        UserState {
            users: Mutex::new(users),
            next_id: Mutex::new(5),
        }
    }
}

pub async fn get_users(state: web::Data<UserState>) -> impl Responder {
    let users = state.users.lock().unwrap();
    HttpResponse::Ok().json(users.clone())
}

pub async fn get_user(
    path: web::Path<u64>,
    state: web::Data<UserState>,
) -> impl Responder {
    let users = state.users.lock().unwrap();
    let user_id = path.into_inner();
    
    if let Some(user) = users.iter().find(|u| u.id == user_id) {
        HttpResponse::Ok().json(user.clone())
    } else {
        HttpResponse::NotFound().json("User not found")
    }
}

pub async fn create_user(
    user_data: web::Json<CreateUserRequest>,
    state: web::Data<UserState>,
) -> impl Responder {
    let mut users = state.users.lock().unwrap();
    let mut next_id = state.next_id.lock().unwrap();

    // Verificar se email já existe
    if users.iter().any(|u| u.email == user_data.email) {
        return HttpResponse::Conflict().json("Email already exists");
    }

    let new_user = User {
        id: *next_id,
        name: user_data.name.clone(),
        email: user_data.email.clone(),
        role: user_data.role.clone(),
        created_at: chrono::Utc::now().format("%Y-%m-%d").to_string(),
    };

    users.push(new_user.clone());
    *next_id += 1;

    HttpResponse::Ok().json(new_user)
}

pub async fn update_user(
    path: web::Path<u64>,
    user_data: web::Json<UpdateUserRequest>,
    state: web::Data<UserState>,
) -> impl Responder {
    let mut users = state.users.lock().unwrap();
    let user_id = path.into_inner();

    if let Some(user) = users.iter_mut().find(|u| u.id == user_id) {
        if let Some(name) = &user_data.name {
            user.name = name.clone();
        }
        if let Some(email) = &user_data.email {
            user.email = email.clone();
        }
        if let Some(role) = &user_data.role {
            user.role = role.clone();
        }
        HttpResponse::Ok().json(user.clone())
    } else {
        HttpResponse::NotFound().json("User not found")
    }
}

pub async fn delete_user(
    path: web::Path<u64>,
    state: web::Data<UserState>,
) -> impl Responder {
    let mut users = state.users.lock().unwrap();
    let user_id = path.into_inner();
    
    let initial_len = users.len();
    users.retain(|u| u.id != user_id);
    
    if users.len() < initial_len {
        HttpResponse::Ok().json("User deleted successfully")
    } else {
        HttpResponse::NotFound().json("User not found")
    }
}
