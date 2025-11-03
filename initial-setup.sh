# Initial Setup Script untuk Jagoan Hosting
# Run SEKALI saja saat pertama kali setup
# Usage: bash initial-setup.sh

#!/bin/bash
set -e

echo "🚀 RSU Meloy - Initial Setup Script"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
DOMAIN_PATH="$HOME/domains/rsumeloy.co.id"
REPO_URL="https://github.com/Hendrazan/rsumeloy.git"
APP_NAME="rsumeloy"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "   Domain Path: $DOMAIN_PATH"
echo "   Repository: $REPO_URL"
echo "   App Name: $APP_NAME"
echo ""

# Check if directory exists
if [ -d "$DOMAIN_PATH/$APP_NAME" ]; then
    echo -e "${YELLOW}⚠️  Warning: Directory $DOMAIN_PATH/$APP_NAME already exists!${NC}"
    echo "   If you want to start fresh, delete it first:"
    echo "   rm -rf $DOMAIN_PATH/$APP_NAME"
    echo ""
    read -p "   Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Step 1: Navigate to domain directory
echo -e "${BLUE}📂 Step 1: Navigate to domain directory...${NC}"
cd $DOMAIN_PATH || {
    echo -e "${RED}❌ Error: Cannot access $DOMAIN_PATH${NC}"
    echo "   Please create domain directory first in Jagoan Hosting cPanel"
    exit 1
}
echo -e "${GREEN}✅ Current directory: $(pwd)${NC}"
echo ""

# Step 2: Clone repository
echo -e "${BLUE}🔽 Step 2: Cloning repository from GitHub...${NC}"
if [ -d "$APP_NAME" ]; then
    echo -e "${YELLOW}   Directory exists, updating instead...${NC}"
    cd $APP_NAME
    git pull origin master
else
    git clone $REPO_URL || {
        echo -e "${RED}❌ Error: Failed to clone repository${NC}"
        exit 1
    }
    cd $APP_NAME
fi
echo -e "${GREEN}✅ Repository cloned/updated successfully${NC}"
echo ""

# Step 3: Check Node.js version
echo -e "${BLUE}🔍 Step 3: Checking Node.js version...${NC}"
NODE_VERSION=$(node -v)
echo "   Node.js version: $NODE_VERSION"
if [[ "$NODE_VERSION" < "v18" ]]; then
    echo -e "${RED}❌ Error: Node.js version must be 18 or higher${NC}"
    echo "   Current version: $NODE_VERSION"
    echo "   Please upgrade Node.js first"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version is compatible${NC}"
echo ""

# Step 4: Install dependencies
echo -e "${BLUE}📦 Step 4: Installing dependencies...${NC}"
npm install --production || {
    echo -e "${RED}❌ Error: Failed to install dependencies${NC}"
    exit 1
}
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 5: Setup environment variables
echo -e "${BLUE}🔧 Step 5: Setup environment variables...${NC}"
if [ -f ".env.local" ]; then
    echo -e "${YELLOW}   .env.local already exists${NC}"
else
    echo "   Creating .env.local file..."
    cat > .env.local << 'EOF'
# Environment Variables - PRODUCTION
# IMPORTANT: Fill in all values before building!

# Next.js Config
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id
NODE_ENV=production

# Supabase (Get from: https://app.supabase.com/project/YOUR_PROJECT/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj

# Google Gemini AI (Get from: https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# Google Site Verification (Optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# Server Port
PORT=3000
EOF
    echo -e "${GREEN}✅ .env.local file created${NC}"
    echo -e "${RED}⚠️  IMPORTANT: Edit .env.local and fill in all values!${NC}"
    echo "   nano .env.local"
fi
echo ""

# Step 6: Build production
echo -e "${BLUE}🔨 Step 6: Building production...${NC}"
echo -e "${YELLOW}   This may take a few minutes...${NC}"
npm run build || {
    echo -e "${RED}❌ Error: Build failed${NC}"
    echo "   Common causes:"
    echo "   1. Missing environment variables in .env.local"
    echo "   2. Syntax errors in code"
    echo "   3. Insufficient memory"
    exit 1
}
echo -e "${GREEN}✅ Build completed successfully${NC}"
echo ""

# Step 7: Check if PM2 is installed
echo -e "${BLUE}🔍 Step 7: Checking PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}   PM2 not found, installing...${NC}"
    npm install -g pm2 || {
        echo -e "${RED}❌ Error: Failed to install PM2${NC}"
        echo "   Try: sudo npm install -g pm2"
        exit 1
    }
    echo -e "${GREEN}✅ PM2 installed${NC}"
else
    echo "   PM2 version: $(pm2 -v)"
    echo -e "${GREEN}✅ PM2 is installed${NC}"
fi
echo ""

# Step 8: Start application with PM2
echo -e "${BLUE}🚀 Step 8: Starting application with PM2...${NC}"
pm2 delete $APP_NAME 2>/dev/null || true  # Delete if exists
pm2 start server.js --name $APP_NAME || {
    echo -e "${RED}❌ Error: Failed to start application${NC}"
    exit 1
}
echo -e "${GREEN}✅ Application started${NC}"
echo ""

# Step 9: Save PM2 process list
echo -e "${BLUE}💾 Step 9: Saving PM2 process list...${NC}"
pm2 save
echo -e "${GREEN}✅ PM2 process list saved${NC}"
echo ""

# Step 10: Setup PM2 startup script
echo -e "${BLUE}🔄 Step 10: Setup PM2 auto-startup...${NC}"
echo "   Running pm2 startup command..."
pm2 startup || {
    echo -e "${YELLOW}⚠️  PM2 startup command generated${NC}"
    echo "   Copy and run the command shown above with sudo"
}
echo ""

# Step 11: Check status
echo -e "${BLUE}📊 Step 11: Checking application status...${NC}"
pm2 status
echo ""
pm2 logs $APP_NAME --lines 10 --nostream
echo ""

# Completion
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅  INITIAL SETUP COMPLETED!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo ""
echo "1. ${YELLOW}Configure Nginx/Apache Reverse Proxy${NC}"
echo "   Point domain to: http://localhost:3000"
echo ""
echo "2. ${YELLOW}Setup SSL Certificate${NC}"
echo "   sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id"
echo ""
echo "3. ${YELLOW}Test Website${NC}"
echo "   curl http://localhost:3000"
echo "   curl https://www.rsumeloy.co.id"
echo ""
echo "4. ${YELLOW}Monitor Application${NC}"
echo "   pm2 logs $APP_NAME"
echo "   pm2 monit"
echo ""
echo "5. ${YELLOW}Future Deployments${NC}"
echo "   bash deploy.sh"
echo ""
echo -e "${GREEN}🎉 Your website should now be running!${NC}"
echo ""
