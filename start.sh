#!/bin/bash

echo "🚀 Starting AI Business Platform..."

# Kill processes using our ports
echo "🔧 Clearing ports 3000, 3001, 8080..."
sudo fuser -k 3000/tcp 2>/dev/null || true
sudo fuser -k 3001/tcp 2>/dev/null || true
sudo fuser -k 8080/tcp 2>/dev/null || true

# Check if user wants Docker or local
read -p "Run with Docker? (y/n): " use_docker

if [[ $use_docker == "y" || $use_docker == "Y" ]]; then
    echo "🐳 Starting with Docker..."
    docker-compose down
    docker-compose up --build -d
    
    echo "⏳ Waiting for services..."
    sleep 5
    
    echo "✅ Docker services started!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend: http://localhost:8080/api/v1/health"
else
    echo "💻 Starting locally..."
    
    # Start backend in background
    echo "Starting backend..."
    cd backend
    cargo run &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend
    sleep 3
    
    # Start frontend
    echo "Starting frontend..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    echo "✅ Local services started!"
    echo "🌐 Frontend: http://localhost:3000 (or 3001)"
    echo "🔧 Backend: http://localhost:8080/api/v1/health"
    
    # Trap to kill processes on exit
    trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Services stopped'" EXIT
    
    # Keep script running
    wait
fi
