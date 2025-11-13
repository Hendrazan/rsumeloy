# 🚀 DEPLOYMENT GUIDE - 1GB RAM SERVER

## ⚠️ Masalah
Server Jagoan Hosting memiliki RAM terbatas (1GB), tidak cukup untuk build Next.js di server.

## ✅ Solusi
Build di komputer lokal (Windows), upload hasil build ke server.

---

## 📋 LANGKAH-LANGKAH

### **STEP 1: Build di Windows**

1. Buka Command Prompt di folder project:
   ```cmd
   cd d:\AI DEV\FINALHOSTING\rsumeloy
   ```

2. Jalankan build script:
   ```cmd
   build-and-prepare.bat
   ```

3. Script akan:
   - Clean previous build
   - Build Next.js (2-5 menit)
   - Compress `.next/` menjadi `next-build.zip`
   - Membuat file `upload-instructions.txt`

4. Hasil:
   - ✅ File `next-build.zip` siap upload (~100-200 MB)

---

### **STEP 2: Upload ke Server**

#### **Opsi A: Via cPanel File Manager** (Termudah)

1. Login ke cPanel Jagoan Hosting
2. Buka **File Manager**
3. Navigate ke `/home/rsumelo4/public_html/rsumeloy/`
4. Klik **Upload**
5. Upload file `next-build.zip`
6. Klik kanan `next-build.zip` → **Extract**
7. Delete `next-build.zip` setelah extract

#### **Opsi B: Via FTP (FileZilla/WinSCP)**

1. Connect ke FTP:
   - Host: `ftp.rsumeloy.co.id`
   - User: `rsumelo4`
   - Password: `[your password]`
   - Port: 21

2. Navigate ke `/public_html/rsumeloy/`

3. Upload `next-build.zip`

4. SSH ke server dan extract:
   ```bash
   cd ~/public_html/rsumeloy
   unzip -o next-build.zip
   rm next-build.zip
   ```

---

### **STEP 3: Deploy di Server (SSH)**

1. Upload file `deploy-lowram.sh` ke server (via cPanel atau FTP)

2. SSH ke server:
   ```bash
   ssh rsumelo4@noble
   ```

3. Navigate ke folder:
   ```bash
   cd ~/public_html/rsumeloy
   ```

4. Activate Node.js 20 (jika belum):
   ```bash
   source /home/rsumelo4/nodevenv/public_html/rsumeloy/20/bin/activate
   ```

5. Jalankan deploy script:
   ```bash
   chmod +x deploy-lowram.sh
   ./deploy-lowram.sh
   ```

6. Script akan otomatis:
   - ✅ Check dependencies
   - ✅ Install PM2
   - ✅ Setup memory optimization (max 768MB)
   - ✅ Start aplikasi dengan PM2
   - ✅ Setup auto-restart

---

### **STEP 4: Verifikasi**

1. Cek status aplikasi:
   ```bash
   pm2 list
   ```

2. Lihat logs:
   ```bash
   pm2 logs rsumeloy
   ```

3. Monitor resource usage:
   ```bash
   pm2 monit
   ```

4. Test aplikasi:
   ```bash
   curl http://localhost:3000
   ```

---

## 🔧 MEMORY OPTIMIZATION

Script `deploy-lowram.sh` menggunakan optimasi:

```javascript
{
  max_memory_restart: '768M',      // Restart jika > 768MB
  node_args: '--max-old-space-size=768',  // Limit heap memory
  instances: 1,                     // Single process
  exec_mode: 'fork'                 // Fork mode (bukan cluster)
}
```

---

## 📊 MONITORING

### Cek Memory Usage:
```bash
pm2 monit
```

### Cek Logs Real-time:
```bash
pm2 logs rsumeloy --lines 100
```

### Restart Jika Error:
```bash
pm2 restart rsumeloy
```

### Stop Aplikasi:
```bash
pm2 stop rsumeloy
```

### Delete Process:
```bash
pm2 delete rsumeloy
```

---

## ⚙️ TROUBLESHOOTING

### Problem: "Cannot find module"
**Solution:**
```bash
cd ~/public_html/rsumeloy
npm install --production
pm2 restart rsumeloy
```

### Problem: "Port 3000 already in use"
**Solution:**
```bash
pm2 delete rsumeloy
lsof -i :3000
kill -9 [PID]
pm2 start ecosystem.config.js
```

### Problem: "Out of memory"
**Solution:**
```bash
# Reduce memory limit
pm2 delete rsumeloy
# Edit ecosystem.config.js, ubah max_memory_restart: '512M'
pm2 start ecosystem.config.js
```

### Problem: Application keeps restarting
**Solution:**
```bash
# Check error logs
pm2 logs rsumeloy --err --lines 50

# Common fixes:
# 1. Check .env file exists
# 2. Verify all environment variables
# 3. Check file permissions
```

---

## 🔄 UPDATE PROCEDURE

Ketika ada update code:

1. **Di Windows:**
   ```cmd
   # Pull latest code from Git
   git pull
   
   # Build ulang
   build-and-prepare.bat
   ```

2. **Upload `next-build.zip` ke server** (replace yang lama)

3. **Di Server:**
   ```bash
   cd ~/public_html/rsumeloy
   unzip -o next-build.zip
   rm next-build.zip
   pm2 restart rsumeloy
   ```

---

## 📝 QUICK REFERENCE

| Action | Command |
|--------|---------|
| Start | `pm2 start ecosystem.config.js` |
| Stop | `pm2 stop rsumeloy` |
| Restart | `pm2 restart rsumeloy` |
| Logs | `pm2 logs rsumeloy` |
| Monitor | `pm2 monit` |
| Status | `pm2 list` |
| Save config | `pm2 save` |

---

## ✅ CHECKLIST

- [ ] Build completed di Windows (`build-and-prepare.bat`)
- [ ] File `next-build.zip` uploaded ke server
- [ ] Extract `next-build.zip` di `/public_html/rsumeloy/`
- [ ] Node.js 20 activated
- [ ] `deploy-lowram.sh` uploaded dan executable
- [ ] Deploy script running successfully
- [ ] PM2 showing status "online"
- [ ] Application accessible at `http://localhost:3000`
- [ ] Reverse proxy configured (Nginx/Apache)
- [ ] SSL certificate installed
- [ ] Website live at `https://rsumeloy.co.id`

---

## 🎯 EXPECTED RESULT

```bash
pm2 list
┌─────┬───────────┬─────────┬─────────┬─────────┬──────────┐
│ id  │ name      │ mode    │ status  │ ↺       │ memory   │
├─────┼───────────┼─────────┼─────────┼─────────┼──────────┤
│ 0   │ rsumeloy  │ fork    │ online  │ 0       │ 350 MB   │
└─────┴───────────┴─────────┴─────────┴─────────┴──────────┘
```

Memory usage harus < 768 MB untuk stabil di 1GB RAM server.

---

## 💡 TIPS

1. **Monitor memory** regular dengan `pm2 monit`
2. **Setup PM2 startup** agar auto-start saat reboot
3. **Backup `.env`** sebelum update
4. **Test di staging** sebelum production
5. **Setup error monitoring** (Sentry, LogRocket, dll)

---

## 📞 SUPPORT

Jika ada masalah, cek:
1. PM2 logs: `pm2 logs rsumeloy --lines 100`
2. System logs: `tail -f ~/public_html/rsumeloy/logs/error.log`
3. cPanel Error Logs
4. Apache/Nginx error logs

---

**Ready to deploy!** 🚀
