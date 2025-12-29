#!/bin/bash

echo "🔄 Reiniciando AI Business Platform..."

# 1. Parar tudo
echo "🛑 Parando todos os processos..."
sudo fuser -k 8080/tcp 2>/dev/null || true
sudo fuser -k 3000/tcp 2>/dev/null || true
docker-compose down 2>/dev/null || true

# 2. Limpar cache do Next.js
echo "🧹 Limpando cache do Next.js..."
cd frontend
sudo rm -rf .next 2>/dev/null || true
sudo rm -rf node_modules/.cache 2>/dev/null || true
sudo chown -R $USER:$USER . 2>/dev/null || true
cd ..

# 3. Iniciar banco de dados e Redis
echo "🐳 Iniciando PostgreSQL e Redis..."
docker-compose up -d postgres redis

# Aguardar banco iniciar
echo "⏳ Aguardando banco de dados..."
sleep 5

# 4. Iniciar backend
echo "🦀 Iniciando Backend Rust..."
cd backend
cargo run &
BACKEND_PID=$!
cd ..

# Aguardar backend iniciar
echo "⏳ Aguardando backend..."
sleep 3

# 5. Iniciar frontend
echo "⚛️  Iniciando Frontend Next.js..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Mostrar status
echo ""
echo "✅ Plataforma iniciada!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:8080/api/v1/health"
echo ""
echo "📝 Logs do Backend:"
echo "   tail -f backend/target/debug/ai-business-platform"
echo ""
echo "📝 Logs do Frontend:"
echo "   tail -f frontend/.next/build.log 2>/dev/null || echo 'Espere o build terminar'"
echo ""
echo "🛑 Para parar tudo: kill $BACKEND_PID $FRONTEND_PID && docker-compose down"

# Manter script rodando
wait
