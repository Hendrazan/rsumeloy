#!/bin/bash

# RSU Meloy Production Server Starter
# Script untuk menjalankan website RSU Meloy di production

echo "🚀 Starting RSU Meloy Production Server..."

# Set environment
export NODE_ENV=production

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please copy .env.production.template to .env.local and fill in the credentials"
    echo "Command: cp .env.production.template .env.local"
    exit 1
fi

# Check if standalone directory exists
if [ ! -d "standalone" ]; then
    echo "❌ Error: standalone directory not found!"
    echo "Please make sure you have uploaded all files correctly"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed!"
    echo "Please install Node.js version 18 or higher"
    exit 1
fi

# Show Node version
NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ Error: server.js not found!"
    exit 1
fi

# Load environment variables
set -a
source .env.local
set +a

echo "✅ Environment variables loaded"
echo "📍 Server will run on port 3000"
echo "🌐 Access: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

# Start server
node server.js
