use sqlx::{PgPool, postgres::PgPoolOptions};
use std::time::Duration;

pub struct PostgresDatabase {
    pool: PgPool,
}

impl PostgresDatabase {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let pool = PgPoolOptions::new()
            .max_connections(10)
            .acquire_timeout(Duration::from_secs(30))
            .connect(database_url)
            .await?;
        
        Ok(Self { pool })
    }
    
    pub fn get_pool(&self) -> &PgPool {
        &self.pool
    }
    
    pub async fn test_connection(&self) -> Result<(), sqlx::Error> {
        sqlx::query("SELECT 1").execute(&self.pool).await?;
        Ok(())
    }
}
