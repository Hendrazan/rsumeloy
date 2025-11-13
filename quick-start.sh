#!/bin/bash

# Quick Upload & Deploy Script
# Run this after extracting next-build.zip on server

echo "=========================================="
echo "  QUICK START - RSU Meloy"
echo "=========================================="

# Navigate to app directory
cd ~/public_html/rsumeloy

# Activate Node.js 20
echo "Activating Node.js 20..."
source /home/rsumelo4/nodevenv/public_html/rsumeloy/20/bin/activate

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --production
fi

# Install PM2 if not exists
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Stop existing process
pm2 delete rsumeloy 2>/dev/null || true

# Create PM2 config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'rsumeloy',
    script: 'npm',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '768M',
    node_args: '--max-old-space-size=768',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    autorestart: true,
    watch: false
  }]
}
EOF

# Start application
echo "Starting application..."
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "✓ Application started!"
echo ""
pm2 list
echo ""
echo "View logs: pm2 logs rsumeloy"
echo "Monitor: pm2 monit"
