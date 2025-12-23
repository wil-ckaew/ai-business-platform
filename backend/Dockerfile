FROM rust:latest   

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos
COPY Cargo.toml Cargo.lock ./
COPY src ./src

# Build
RUN cargo build --release

# Expor porta
EXPOSE 8080

# Comando de execução
CMD ["./target/release/ai-business-platform"]