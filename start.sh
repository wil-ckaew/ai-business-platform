#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting AI Business Platform...${NC}"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Check if ports are available
if check_port 8080; then
    echo -e "${YELLOW}⚠️  Port 8080 (backend) is already in use${NC}"
fi

if check_port 3000; then
    echo -e "${YELLOW}⚠️  Port 3000 (frontend) is already in use${NC}"
fi

# Start backend
echo -e "\n${GREEN}📦 Starting Rust Backend...${NC}"
cd backend
cargo build --release
if [ $? -eq 0 ]; then
    # Run backend in background
    cargo run --release &
    BACKEND_PID=$!
    echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Failed to build backend${NC}"
    exit 1
fi

# Wait a bit for backend to start
echo -e "\n${BLUE}⏳ Waiting for backend to initialize...${NC}"
sleep 3

# Start frontend
echo -e "\n${GREEN}🎨 Starting Next.js Frontend...${NC}"
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    # Run frontend in background
    npm run dev &
    FRONTEND_PID=$!
    echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Platform successfully started!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${BLUE}🌐 Frontend:${NC} http://localhost:3000"
echo -e "${BLUE}⚙️  Backend API:${NC} http://localhost:8080"
echo -e "${BLUE}📊 Database:${NC} ./backend/database.db"
echo -e "\n${YELLOW}👤 Demo Credentials:${NC}"
echo -e "Admin: admin@aibusiness.com / admin123"
echo -e "User: user@example.com / user123"
echo -e "\n${YELLOW}🛑 To stop all services:${NC} kill $BACKEND_PID $FRONTEND_PID"
echo -e "${GREEN}========================================${NC}"

# Wait for Ctrl+C
trap "echo -e '\n${RED}🛑 Stopping services...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# Keep script running
wait
