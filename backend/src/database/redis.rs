use redis::{Client, AsyncCommands};
use std::time::Duration;

pub struct RedisPool {
    client: Client,
}

impl RedisPool {
    pub fn new(redis_url: &str) -> Result<Self, redis::RedisError> {
        let client = Client::open(redis_url)?;
        Ok(Self { client })
    }
    
    pub async fn get_connection(&self) -> Result<redis::aio::Connection, redis::RedisError> {
        self.client.get_async_connection().await
    }
    
    pub async fn set(&self, key: &str, value: &str, ttl: Option<Duration>) -> Result<(), redis::RedisError> {
        let mut conn = self.get_connection().await?;
        if let Some(ttl) = ttl {
            redis::cmd("SETEX")
                .arg(key)
                .arg(ttl.as_secs())
                .arg(value)
                .query_async(&mut conn)
                .await
        } else {
            conn.set(key, value).await
        }
    }
    
    pub async fn get(&self, key: &str) -> Result<Option<String>, redis::RedisError> {
        let mut conn = self.get_connection().await?;
        conn.get(key).await
    }
    
    pub async fn delete(&self, key: &str) -> Result<(), redis::RedisError> {
        let mut conn = self.get_connection().await?;
        conn.del(key).await
    }
    
    pub async fn exists(&self, key: &str) -> Result<bool, redis::RedisError> {
        let mut conn = self.get_connection().await?;
        let exists: bool = conn.exists(key).await?;
        Ok(exists)
    }
}
