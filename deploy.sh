#!/bin/bash
# Deploy Script untuk RSU Meloy ke Jagoan Hosting
# Run: bash deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment to Jagoan Hosting..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN_PATH="~/domains/rsumeloy.co.id"
APP_PATH="$DOMAIN_PATH/rsumeloy"
PM2_APP_NAME="rsumeloy"

echo "📋 Deployment Configuration:"
echo "   Domain Path: $DOMAIN_PATH"
echo "   App Path: $APP_PATH"
echo "   PM2 App Name: $PM2_APP_NAME"
echo ""

# Step 1: Navigate to app directory
echo "📂 Step 1: Navigating to app directory..."
cd $APP_PATH || {
    echo -e "${RED}❌ Error: Cannot access $APP_PATH${NC}"
    echo "   Make sure the repository is cloned first!"
    exit 1
}
echo -e "${GREEN}✅ Current directory: $(pwd)${NC}"
echo ""

# Step 2: Pull latest changes
echo "🔄 Step 2: Pulling latest changes from GitHub..."
git pull origin master || {
    echo -e "${RED}❌ Error: Failed to pull from GitHub${NC}"
    exit 1
}
echo -e "${GREEN}✅ Latest code pulled successfully${NC}"
echo ""

# Step 3: Install dependencies
echo "📦 Step 3: Installing dependencies..."
npm install --production || {
    echo -e "${RED}❌ Error: Failed to install dependencies${NC}"
    exit 1
}
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 4: Build production
echo "🔨 Step 4: Building production..."
npm run build || {
    echo -e "${RED}❌ Error: Build failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Build completed successfully${NC}"
echo ""

# Step 5: Restart PM2
echo "🔄 Step 5: Restarting PM2 process..."
pm2 restart $PM2_APP_NAME || {
    echo -e "${YELLOW}⚠️  PM2 app not found, starting new process...${NC}"
    pm2 start server.js --name $PM2_APP_NAME || {
        echo -e "${RED}❌ Error: Failed to start PM2 process${NC}"
        exit 1
    }
}
echo -e "${GREEN}✅ PM2 process restarted${NC}"
echo ""

# Step 6: Save PM2 process list
echo "💾 Step 6: Saving PM2 process list..."
pm2 save
echo -e "${GREEN}✅ PM2 process list saved${NC}"
echo ""

# Step 7: Show status
echo "📊 Step 7: Checking status..."
pm2 status
echo ""

# Step 8: Show recent logs
echo "📝 Step 8: Recent logs (last 20 lines)..."
pm2 logs $PM2_APP_NAME --lines 20 --nostream
echo ""

# Completion
echo -e "${GREEN}✅ ========================================${NC}"
echo -e "${GREEN}✅  DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}✅ ========================================${NC}"
echo ""
echo "🌐 Website should now be live at:"
echo "   https://www.rsumeloy.co.id"
echo ""
echo "📊 Monitor with:"
echo "   pm2 logs $PM2_APP_NAME"
echo "   pm2 monit"
echo ""
echo "🔄 To deploy again, run:"
echo "   bash deploy.sh"
echo ""
