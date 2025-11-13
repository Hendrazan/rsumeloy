#!/bin/bash

# ==========================================
#   DEPLOY SCRIPT FOR 1GB RAM SERVER
# ==========================================

echo "=========================================="
echo "  RSU MELOY - Production Deployment"
echo "  Optimized for 1GB RAM Server"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="rsumeloy"
APP_DIR="$HOME/public_html/rsumeloy"
NODE_OPTIONS="--max-old-space-size=768"

echo -e "${YELLOW}[INFO]${NC} Checking directory..."
cd "$APP_DIR" || {
    echo -e "${RED}[ERROR]${NC} Cannot access $APP_DIR"
    exit 1
}
echo -e "${GREEN}✓${NC} Current directory: $(pwd)"
echo ""

# Step 1: Check if .next exists
echo -e "${YELLOW}[1/6]${NC} Checking build files..."
if [ ! -d ".next" ]; then
    echo -e "${RED}[ERROR]${NC} .next folder not found!"
    echo "Please upload next-build.zip and extract it first:"
    echo "  unzip -o next-build.zip"
    exit 1
fi
echo -e "${GREEN}✓${NC} Build files found"
echo ""

# Step 2: Check Node.js version
echo -e "${YELLOW}[2/6]${NC} Checking Node.js version..."
NODE_VERSION=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}[ERROR]${NC} Node.js 18+ required!"
    echo "Current: $(node -v 2>/dev/null || echo 'Not installed')"
    echo ""
    echo "To activate Node.js 20:"
    echo "  source $HOME/nodevenv/public_html/rsumeloy/20/bin/activate"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js version: $(node -v)"
echo ""

# Step 3: Check dependencies
echo -e "${YELLOW}[3/6]${NC} Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[INFO]${NC} Installing dependencies..."
    npm install --production
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERROR]${NC} npm install failed!"
        exit 1
    fi
fi
echo -e "${GREEN}✓${NC} Dependencies ready"
echo ""

# Step 4: Install PM2 if not exists
echo -e "${YELLOW}[4/6]${NC} Checking PM2..."
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}[INFO]${NC} Installing PM2..."
    npm install -g pm2
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERROR]${NC} PM2 installation failed!"
        exit 1
    fi
fi
echo -e "${GREEN}✓${NC} PM2 installed: $(pm2 -v)"
echo ""

# Step 5: Stop existing process
echo -e "${YELLOW}[5/6]${NC} Stopping existing application..."
pm2 delete "$APP_NAME" 2>/dev/null || echo "No existing process"
echo -e "${GREEN}✓${NC} Old process stopped"
echo ""

# Step 6: Start application
echo -e "${YELLOW}[6/6]${NC} Starting application..."
echo -e "${YELLOW}[INFO]${NC} Using NODE_OPTIONS=$NODE_OPTIONS"

# Create PM2 ecosystem file for better memory control
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$APP_DIR',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '768M',
    node_args: '--max-old-space-size=768',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '$APP_DIR/logs/error.log',
    out_file: '$APP_DIR/logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    autorestart: true,
    watch: false
  }]
}
EOF

# Create logs directory
mkdir -p logs

# Start with ecosystem file
pm2 start ecosystem.config.js

if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR]${NC} Failed to start application!"
    exit 1
fi

# Save PM2 process list
pm2 save

# Setup startup script
echo -e "${YELLOW}[INFO]${NC} Setting up auto-restart on reboot..."
pm2 startup 2>/dev/null || echo "Startup script may require sudo"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ DEPLOYMENT COMPLETED!${NC}"
echo "=========================================="
echo ""
echo "Application Status:"
pm2 list
echo ""
echo "View Logs:"
echo "  pm2 logs $APP_NAME"
echo ""
echo "Monitor:"
echo "  pm2 monit"
echo ""
echo "Restart:"
echo "  pm2 restart $APP_NAME"
echo ""
echo "Stop:"
echo "  pm2 stop $APP_NAME"
echo ""
echo "Application should be running on:"
echo "  http://localhost:3000"
echo ""
echo "=========================================="
