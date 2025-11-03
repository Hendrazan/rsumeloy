# 🚀 Deploy ke Jagoan Hosting - Step by Step

## ✅ **PRASYARAT**
- Jagoan Hosting sudah support Node.js
- Anda punya akses SSH ke server
- Domain rsumeloy.co.id sudah terpasang

---

## 📝 **LANGKAH 1: PERSIAPAN FILE**

### A. Buat file `.env.production` di local
```bash
# File: .env.production

# Next.js Config
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id
NODE_ENV=production

# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Cloudinary (Images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj

# Google Gemini AI (Chatbot)
GEMINI_API_KEY=your_gemini_api_key

# Google Verification (Optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Port (sesuaikan dengan Jagoan Hosting)
PORT=3000
```

### B. Build production di local (test dulu)
```bash
# Di terminal local
cd "d:\AI DEV\BACKUP\rsumeloy"

# Install dependencies
npm install

# Build
npm run build

# Test run
npm start
```

Buka http://localhost:3000 - pastikan jalan sempurna!

---

## 📦 **LANGKAH 2: UPLOAD KE SERVER**

### Option A: Via Git (RECOMMENDED)
```bash
# 1. Login ke server via SSH
ssh username@your-server.jagoanhosting.com

# 2. Clone repository
cd ~/domains/rsumeloy.co.id
git clone https://github.com/Hendrazan/rsumeloy.git

# 3. Masuk ke folder
cd rsumeloy

# 4. Install dependencies
npm install --production

# 5. Build production
npm run build
```

### Option B: Via FTP/cPanel File Manager (NOT RECOMMENDED)
```
1. Zip semua file project (kecuali node_modules)
2. Upload via cPanel File Manager ke folder domain
3. Extract di server
4. Install dependencies via SSH: npm install --production
5. Build: npm run build
```

---

## 🔧 **LANGKAH 3: SETUP ENVIRONMENT VARIABLES**

### Via SSH:
```bash
# Buat file .env.local di server
cd ~/domains/rsumeloy.co.id/rsumeloy
nano .env.local

# Paste semua environment variables
# (Copy dari .env.production Anda)

# Save: Ctrl+O, Enter, Ctrl+X
```

---

## 🚀 **LANGKAH 4: JALANKAN APLIKASI**

### A. Setup PM2 (Process Manager)
```bash
# Install PM2 global (jika belum ada)
npm install -g pm2

# Start aplikasi
pm2 start server.js --name rsumeloy

# Save PM2 process list
pm2 save

# Setup auto-restart on server reboot
pm2 startup
# (Follow instruksi yang muncul)

# Check status
pm2 status
pm2 logs rsumeloy
```

### B. Setup Nginx/Apache Reverse Proxy

#### Jika menggunakan Nginx:
```bash
# Edit config Nginx
sudo nano /etc/nginx/sites-available/rsumeloy.co.id

# Paste config:
server {
    listen 80;
    listen [::]:80;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/rsumeloy.co.id /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Jika menggunakan Apache:
```bash
# Enable required modules
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite

# Edit .htaccess atau vhost config
<VirtualHost *:80>
    ServerName rsumeloy.co.id
    ServerAlias www.rsumeloy.co.id

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>

# Restart Apache
sudo systemctl restart apache2
```

---

## 🔒 **LANGKAH 5: SETUP SSL (HTTPS)**

```bash
# Install Certbot (Let's Encrypt)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id

# Auto-renew test
sudo certbot renew --dry-run
```

---

## 🔄 **LANGKAH 6: SETUP AUTO-DEPLOY (OPTIONAL)**

### A. Buat webhook endpoint
```bash
# Install webhook tool
npm install -g webhook

# Buat script deploy
nano ~/deploy-rsumeloy.sh
```

```bash
#!/bin/bash
# File: deploy-rsumeloy.sh

cd ~/domains/rsumeloy.co.id/rsumeloy

# Pull latest changes
git pull origin master

# Install dependencies
npm install --production

# Build
npm run build

# Restart PM2
pm2 restart rsumeloy

echo "Deploy completed at $(date)"
```

```bash
# Make executable
chmod +x ~/deploy-rsumeloy.sh

# Test
./deploy-rsumeloy.sh
```

### B. Setup GitHub Webhook
1. Buka GitHub repository settings
2. Webhooks → Add webhook
3. Payload URL: http://your-server-ip:9000/hooks/deploy
4. Content type: application/json
5. Secret: (generate random string)
6. Events: Just the push event

---

## ✅ **LANGKAH 7: VERIFIKASI**

### Test website:
```bash
# Check PM2 status
pm2 status
pm2 logs rsumeloy

# Check process
ps aux | grep node

# Check port
netstat -tulpn | grep 3000

# Test curl
curl http://localhost:3000
curl https://www.rsumeloy.co.id
```

### Buka browser:
- https://www.rsumeloy.co.id
- Test semua halaman
- Check console untuk errors
- Test mobile responsiveness

---

## 🔧 **TROUBLESHOOTING**

### Error: Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Restart PM2
pm2 restart rsumeloy
```

### Error: Permission denied
```bash
# Fix permissions
sudo chown -R $USER:$USER ~/domains/rsumeloy.co.id/rsumeloy
chmod -R 755 ~/domains/rsumeloy.co.id/rsumeloy
```

### Error: Module not found
```bash
# Reinstall dependencies
cd ~/domains/rsumeloy.co.id/rsumeloy
rm -rf node_modules package-lock.json
npm install --production
npm run build
pm2 restart rsumeloy
```

### Error: 502 Bad Gateway
```bash
# Check if app is running
pm2 status

# Check logs
pm2 logs rsumeloy --lines 100

# Restart app
pm2 restart rsumeloy

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 **MONITORING**

### Setup monitoring:
```bash
# PM2 monitoring
pm2 monit

# View logs real-time
pm2 logs rsumeloy --lines 50

# View error logs only
pm2 logs rsumeloy --err

# Flush logs
pm2 flush
```

---

## 🔄 **UPDATE WEBSITE (FUTURE)**

```bash
# Method 1: Manual
ssh username@server
cd ~/domains/rsumeloy.co.id/rsumeloy
git pull origin master
npm install --production
npm run build
pm2 restart rsumeloy

# Method 2: Auto (if webhook setup)
# Just push to GitHub, webhook will auto-deploy
git push origin master
```

---

## 📋 **CHECKLIST DEPLOYMENT**

- [ ] Repository cloned ke server
- [ ] Dependencies installed (`npm install --production`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Production build successful (`npm run build`)
- [ ] PM2 process running (`pm2 start server.js`)
- [ ] PM2 auto-startup configured (`pm2 startup`)
- [ ] Nginx/Apache reverse proxy configured
- [ ] SSL certificate installed (HTTPS)
- [ ] Domain pointing ke server (DNS)
- [ ] Website accessible di https://www.rsumeloy.co.id
- [ ] All pages working (test navigation)
- [ ] Database connected (Supabase)
- [ ] Images loading (Cloudinary)
- [ ] AI chatbot working (Gemini)
- [ ] Google Maps showing (CSP fixed)
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Monitoring setup (PM2)
- [ ] Auto-deploy configured (optional)

---

## ⚠️ **IMPORTANT NOTES**

1. **Environment Variables**: JANGAN commit `.env.local` ke GitHub!
2. **Node Version**: Pastikan server pakai Node.js 18+ (check: `node -v`)
3. **Memory**: Minimal 1GB RAM untuk Next.js
4. **Port**: Pastikan port 3000 tidak dipakai aplikasi lain
5. **Firewall**: Buka port 80, 443 untuk HTTP/HTTPS
6. **Backup**: Backup website lama sebelum deploy
7. **DNS**: Update DNS jika server IP berubah
8. **SSL Renewal**: Certbot auto-renew, tapi check setiap 3 bulan

---

## 🆘 **NEED HELP?**

Jika ada error saat deploy:
1. Check PM2 logs: `pm2 logs rsumeloy --lines 100`
2. Check Nginx error: `sudo tail -f /var/log/nginx/error.log`
3. Check server resources: `htop` atau `free -m`
4. Restart everything:
   ```bash
   pm2 restart rsumeloy
   sudo systemctl restart nginx
   ```

---

## 🎯 **EXPECTED RESULT**

Setelah semua langkah selesai:
- ✅ https://www.rsumeloy.co.id → Website Next.js baru
- ✅ Auto-restart jika server reboot
- ✅ SSL/HTTPS enabled
- ✅ Fast loading (CDN + optimization)
- ✅ SEO optimal (150+ keywords)
- ✅ All features working

---

**Good luck with deployment! 🚀**

