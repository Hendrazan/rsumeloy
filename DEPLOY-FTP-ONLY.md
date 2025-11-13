# 🚀 DEPLOYMENT TANPA SSH - FTP ONLY

## ✅ Solusi untuk Jagoan Hosting Tanpa Akses SSH

Karena tidak ada akses SSH, kita akan menggunakan **Node.js App** feature di cPanel untuk menjalankan aplikasi.

---

## 📋 PERSIAPAN

### Files yang Dibutuhkan:
- ✅ `next-build.zip` (38 MB) - Sudah dibuat
- ✅ Semua file di folder `rsumeloy-deploy/` 
- ✅ File `.env` dengan environment variables

---

## 🎯 LANGKAH-LANGKAH DEPLOYMENT

### **STEP 1: Login ke cPanel**

1. Buka cPanel Jagoan Hosting
2. URL biasanya: `https://rsumeloy.co.id:2083` atau dari email hosting

---

### **STEP 2: Setup Node.js App di cPanel**

1. Cari menu **"Setup Node.js App"** atau **"Node.js Selector"**
2. Klik **"Create Application"**
3. Isi form:
   - **Node.js version**: `20.x` (pilih versi terbaru)
   - **Application mode**: `Production`
   - **Application root**: `public_html/rsumeloy`
   - **Application URL**: `rsumeloy.co.id` atau subdomain
   - **Application startup file**: `server.js`
   - **Environment variables**: (akan diisi nanti)

4. Klik **"Create"**

---

### **STEP 3: Upload Files via FTP**

#### **Opsi A: Via FileZilla/WinSCP**

1. **Download FileZilla**: https://filezilla-project.org/

2. **Connect ke FTP:**
   - Host: `ftp.rsumeloy.co.id` atau IP server
   - Username: `rsumelo4`
   - Password: `[dari email hosting]`
   - Port: `21`

3. **Navigate** ke `/public_html/rsumeloy/`

4. **Upload files** (drag & drop):
   ```
   ✅ next-build.zip
   ✅ package.json
   ✅ package-lock.json
   ✅ next.config.mjs
   ✅ tsconfig.json
   ✅ middleware.ts
   ✅ server.js
   ✅ .env
   ✅ app/ (folder)
   ✅ components/ (folder)
   ✅ lib/ (folder)
   ✅ public/ (folder)
   ✅ types/ (folder)
   ✅ data/ (folder)
   ✅ supabase/ (folder)
   ```

5. **Tunggu upload selesai** (10-30 menit tergantung koneksi)

#### **Opsi B: Via cPanel File Manager**

1. Buka **File Manager** di cPanel
2. Navigate ke `/public_html/rsumeloy/`
3. Klik **Upload**
4. Select semua file dari `d:\AI DEV\FINALHOSTING\rsumeloy\rsumeloy-deploy\`
5. Upload `next-build.zip` juga
6. Setelah selesai, klik kanan `next-build.zip` → **Extract**
7. Delete `next-build.zip` setelah extract

---

### **STEP 4: Extract Build Files (di cPanel)**

1. Buka **File Manager**
2. Navigate ke `/public_html/rsumeloy/`
3. Klik kanan `next-build.zip`
4. Pilih **Extract**
5. Folder `.next/` akan muncul
6. Delete `next-build.zip` untuk hemat space

---

### **STEP 5: Install Dependencies (di cPanel Node.js App)**

1. Kembali ke **Setup Node.js App**
2. Klik aplikasi yang sudah dibuat
3. Scroll ke bawah, cari **"Run NPM Install"**
4. Klik **"Run NPM Install"**
5. Tunggu proses selesai (3-5 menit)

---

### **STEP 6: Setup Environment Variables**

1. Di halaman **Node.js App**, cari section **"Environment Variables"**
2. Tambahkan satu per satu:

   ```
   NODE_ENV = production
   NEXT_PUBLIC_SITE_URL = https://rsumeloy.co.id
   NEXT_PUBLIC_SUPABASE_URL = https://jaybcyjkhjdndcinobcx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [your_anon_key]
   SUPABASE_SERVICE_ROLE_KEY = [your_service_role_key]
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = ddyqhlilj
   GEMINI_API_KEY = AIzaSyCtzR5ZX-r8YHwNgTjIhfYzFpEhtGmTLRc
   NEXT_PUBLIC_ENABLE_AI_ASSISTANT = true
   PORT = 3000
   ```

3. Klik **"Add"** untuk setiap variable

---

### **STEP 7: Start Application**

1. Di halaman **Node.js App**
2. Klik tombol **"Stop App"** (jika sudah running)
3. Klik tombol **"Start App"** atau **"Restart"**
4. Status akan berubah menjadi **"Running"**

---

### **STEP 8: Setup Domain/Reverse Proxy**

#### **Jika menggunakan Main Domain (rsumeloy.co.id):**

1. Di cPanel, buka **File Manager**
2. Navigate ke `/public_html/`
3. Edit atau buat file `.htaccess`
4. Tambahkan code ini di **paling atas**:

```apache
# Reverse Proxy untuk Next.js di port 3000
RewriteEngine On

# Exclude static files
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{REQUEST_URI} !^/cpanel/
RewriteCond %{REQUEST_URI} !^/cgi-bin/

# Proxy ke Node.js app di port 3000
RewriteCond %{HTTP:Upgrade} =websocket [NC]
RewriteRule /(.*) ws://localhost:3000/$1 [P,L]
RewriteCond %{HTTP:Upgrade} !=websocket [NC]
RewriteRule /(.*) http://localhost:3000/$1 [P,L]
</apache>
```

5. **Save**

#### **Jika menggunakan Subdomain:**

1. Buat subdomain di cPanel (misal: `app.rsumeloy.co.id`)
2. Set document root ke `/public_html/rsumeloy/`
3. Ikuti langkah `.htaccess` di atas

---

### **STEP 9: Install SSL Certificate**

1. Di cPanel, buka **SSL/TLS Status**
2. Centang domain `rsumeloy.co.id`
3. Klik **"Run AutoSSL"**
4. Tunggu proses selesai (2-5 menit)
5. SSL certificate akan otomatis terinstall

---

### **STEP 10: Test Website**

1. Buka browser
2. Akses `https://rsumeloy.co.id`
3. Website harus berjalan normal

**Test fitur:**
- ✅ Homepage loading
- ✅ AI Assistant (robot button)
- ✅ WhatsApp button
- ✅ APAM button
- ✅ Jadwal Dokter
- ✅ All pages

---

## 🔍 TROUBLESHOOTING

### **Problem: Application Not Starting**

**Solution:**
1. Cek di **Node.js App** → Error log
2. Pastikan `server.js` ada di root folder
3. Pastikan environment variables sudah benar
4. Restart aplikasi

---

### **Problem: 502 Bad Gateway**

**Solution:**
1. Aplikasi belum running atau port salah
2. Cek di **Node.js App** apakah status "Running"
3. Cek port di environment variables (harus 3000)
4. Restart Node.js app

---

### **Problem: Module Not Found**

**Solution:**
1. Dependencies belum terinstall
2. Jalankan **"Run NPM Install"** lagi di cPanel
3. Pastikan `package.json` dan `package-lock.json` sudah diupload

---

### **Problem: Environment Variables Not Working**

**Solution:**
1. Pastikan semua ENV vars sudah ditambahkan di cPanel Node.js App
2. Restart aplikasi setelah menambah ENV vars
3. Cek file `.env` juga ada di folder (backup)

---

### **Problem: Build Files Missing (.next folder)**

**Solution:**
1. Upload `next-build.zip` via FTP/cPanel
2. Extract di File Manager
3. Pastikan folder `.next/` ada di `/public_html/rsumeloy/.next/`

---

## 📊 MONITORING

### **Cek Status Aplikasi:**

1. Login cPanel
2. Buka **Setup Node.js App**
3. Lihat status aplikasi (Running/Stopped)

### **Cek Error Logs:**

1. Di halaman Node.js App
2. Klik **"View Log"** atau **"Error Log"**
3. Akan menampilkan error jika ada

### **Cek Resource Usage:**

1. cPanel Dashboard
2. Lihat **CPU Usage** dan **Memory Usage**
3. Pastikan tidak melebihi limit hosting

---

## 🔄 UPDATE PROCEDURE (Tanpa SSH)

Ketika ada update code:

### **1. Build di Windows:**
```cmd
cd d:\AI DEV\FINALHOSTING\rsumeloy
npm run build
powershell -command "Compress-Archive -Path '.next' -DestinationPath 'next-build-new.zip' -Force"
```

### **2. Upload via FTP:**
- Upload `next-build-new.zip` ke server
- Hapus folder `.next/` lama via File Manager
- Extract `next-build-new.zip`

### **3. Restart App:**
- Di cPanel Node.js App
- Klik **"Restart"**

---

## ✅ CHECKLIST DEPLOYMENT

- [ ] cPanel login berhasil
- [ ] Node.js App dibuat (version 20.x, production mode)
- [ ] Semua files uploaded via FTP/File Manager
- [ ] `next-build.zip` extracted
- [ ] Folder `.next/` ada
- [ ] NPM Install completed
- [ ] Environment Variables ditambahkan (9 variables)
- [ ] Application started (status: Running)
- [ ] `.htaccess` configured untuk reverse proxy
- [ ] SSL Certificate installed (AutoSSL)
- [ ] Website accessible via https://rsumeloy.co.id
- [ ] All features tested (AI, WhatsApp, APAM, etc)

---

## 💡 TIPS

1. **Compress files** sebelum upload untuk lebih cepat
2. **Upload saat malam** untuk koneksi lebih stabil
3. **Backup** file `.env` di komputer lokal
4. **Screenshot** setiap step untuk dokumentasi
5. **Test** di staging/subdomain dulu sebelum production

---

## 📞 SUPPORT

Jika ada masalah:
1. **Cek Error Log** di cPanel Node.js App
2. **Hubungi Support Jagoan Hosting** untuk bantuan cPanel
3. **Check documentation** di DEPLOY-1GB-RAM.md

---

**Ready to deploy via FTP!** 🚀
