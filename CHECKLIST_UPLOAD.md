# ✅ CHECKLIST UPLOAD WEBSITE KE JAGOANHOSTING

## 📅 Tanggal: _______________
## ⏰ Jam Mulai: _______________

---

## 📋 CHECKLIST PERSIAPAN

### ☑️ Step 1: Environment Variables (5 menit)
- [ ] Buka folder: `d:\AI DEV\BACKUP\rsumeloy\production`
- [ ] RENAME file: `.env.local.template` → `.env.local`
- [ ] EDIT file `.env.local` dan isi:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` = ___________________________
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = ___________________________
  - [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = ___________________________
  - [ ] `GEMINI_API_KEY` = ___________________________ (opsional)
  - [ ] `SESSION_SECRET` = ___________________________ (generate random)
  - [ ] `NODE_ENV` = production
- [ ] SAVE file

### ☑️ Step 2: Install WinSCP (5 menit)
- [ ] Download dari: https://winscp.net/eng/download.php
- [ ] Install WinSCP
- [ ] Buka WinSCP

### ☑️ Step 3: Data FTP JagoanHosting (2 menit)
- [ ] Login ke JagoanHosting Client Area
- [ ] Menu: FTP Accounts (atau cek email welcome)
- [ ] Catat data FTP:
  - [ ] Host: _________________________________
  - [ ] Username: _____________________________
  - [ ] Password: _____________________________
  - [ ] Port: 21

---

## 📤 CHECKLIST UPLOAD (10-15 menit)

### ☑️ Step 4: Koneksi FTP
- [ ] Buka WinSCP
- [ ] Klik: New Session
- [ ] Isi form:
  - [ ] File protocol: **FTP**
  - [ ] Encryption: **No encryption** (atau TLS/SSL)
  - [ ] Host name: ________________ (dari step 3)
  - [ ] Port: **21**
  - [ ] Username: ________________ (dari step 3)
  - [ ] Password: ________________ (dari step 3)
- [ ] Klik: **Login**
- [ ] Jika muncul warning certificate: Klik **Yes** atau **Continue**

### ☑️ Step 5: Navigate Folder
- [ ] Panel KANAN (Server): Navigate ke `/public_html/`
- [ ] Panel KIRI (Lokal): Navigate ke `d:\AI DEV\BACKUP\rsumeloy\production`
- [ ] Pastikan kedua panel sudah benar

### ☑️ Step 6: Upload File
- [ ] Di panel KIRI: Tekan `Ctrl + A` (select all)
- [ ] Pastikan semua file/folder terpilih:
  - [ ] `.next/`
  - [ ] `public/`
  - [ ] `node_modules/`
  - [ ] `app/`
  - [ ] `data/`
  - [ ] `server.js`
  - [ ] `package.json`
  - [ ] `.env.local` ⭐ (WAJIB!)
- [ ] Drag & Drop ke panel KANAN
  - Atau: Klik kanan → **Upload**
- [ ] Transfer options:
  - [ ] Transfer mode: **Binary**
  - [ ] Overwrite: **Yes to All**
  - [ ] Preserve timestamp: **Yes**
- [ ] Klik: **OK**
- [ ] Tunggu upload selesai (progress 100%)

**⏱️ Upload selesai jam: _______________**

---

## ✅ CHECKLIST VERIFIKASI (2 menit)

### ☑️ Step 7: Cek File Terupload
Di panel KANAN (Server `/public_html/`), pastikan ada:

- [ ] Folder `.next/` ✓
  - [ ] Sub-folder `.next/server/` ✓
  - [ ] Sub-folder `.next/static/` ✓
- [ ] Folder `public/` ✓
  - [ ] File `public/manifest.json` ✓
- [ ] Folder `node_modules/` ✓ (ukuran ~10-15 MB)
- [ ] Folder `app/` ✓
- [ ] Folder `data/` ✓
- [ ] File `server.js` ✓ (4-5 KB)
- [ ] File `package.json` ✓ (1-2 KB)
- [ ] File `.env.local` ✓ ⭐ **PENTING!**

**Semua file ada?** 
- [ ] ✅ YES - Lanjut ke Step 8
- [ ] ❌ NO - Re-upload file yang missing

---

## 🚀 CHECKLIST SETUP SERVER (10 menit)

### ☑️ Step 8: Login cPanel
- [ ] Buka browser
- [ ] Login ke cPanel JagoanHosting
- [ ] URL cPanel: ___________________________________

### ☑️ Step 9: Setup Node.js Application
- [ ] Di cPanel, cari menu: **Setup Node.js App** (atau **Node.js Selector**)
- [ ] Klik: **Create Application**
- [ ] Isi form:
  - [ ] Node.js version: **18.x** (atau 20.x)
  - [ ] Application mode: **Production**
  - [ ] Application root: `public_html`
  - [ ] Application URL: `https://rsumeloy.co.id`
  - [ ] Application startup file: `server.js`
  - [ ] Environment variables: (skip, sudah ada di .env.local)
- [ ] Klik: **Create**
- [ ] Tunggu proses selesai
- [ ] Klik: **Start** atau **Restart**

### ☑️ Step 10: Alternatif - Via Terminal (Jika Node.js App tidak tersedia)
- [ ] Di cPanel, cari menu: **Terminal** atau **SSH Access**
- [ ] Jalankan command:
```bash
cd public_html
node --version      # Cek versi (harus 18.x atau 20.x)
node server.js      # Jalankan aplikasi
```

**Atau dengan PM2:**
```bash
npm install -g pm2
cd public_html
pm2 start server.js --name rsumeloy
pm2 save
pm2 startup
pm2 status          # Cek status running
```

**⏱️ Setup server selesai jam: _______________**

---

## 🧪 CHECKLIST TESTING (10 menit)

### ☑️ Step 11: Test Website Live
- [ ] Buka browser (Chrome/Firefox)
- [ ] URL: `https://rsumeloy.co.id`
- [ ] Website bisa diakses? ✅ / ❌

### ☑️ Step 12: Test Halaman Penting
- [ ] Homepage (`/`) ✅ / ❌
- [ ] Tentang RSU Meloy (`/tentang/profile`) ✅ / ❌
- [ ] Layanan (`/layanan`) ✅ / ❌
- [ ] Fasilitas (`/fasilitas`) ✅ / ❌
- [ ] Jadwal Dokter (`/jadwal-dokter`) ✅ / ❌
- [ ] Kontak (`/kontak`) ✅ / ❌
- [ ] Admin Login (`/admin/login`) ✅ / ❌

### ☑️ Step 13: Test Fitur
- [ ] Gambar muncul (Cloudinary CDN) ✅ / ❌
- [ ] Navigation menu berfungsi ✅ / ❌
- [ ] Search berfungsi (jika ada) ✅ / ❌
- [ ] AI Assistant muncul (chat icon) ✅ / ❌
- [ ] WhatsApp widget muncul ✅ / ❌
- [ ] Footer link berfungsi ✅ / ❌

### ☑️ Step 14: Test Admin Panel
- [ ] Buka: `https://rsumeloy.co.id/admin/login`
- [ ] Halaman login muncul ✅ / ❌
- [ ] Input email & password
- [ ] Klik: Login
- [ ] Berhasil login? ✅ / ❌
- [ ] Dashboard admin muncul? ✅ / ❌
- [ ] Bisa manage data? (doctors, services, dll) ✅ / ❌

### ☑️ Step 15: Test AI Assistant (Jika GEMINI_API_KEY diisi)
- [ ] Klik icon chat AI Assistant
- [ ] Chat popup muncul ✅ / ❌
- [ ] Ketik pertanyaan: "Apa layanan yang tersedia di RSU Meloy?"
- [ ] AI Assistant merespon? ✅ / ❌
- [ ] Response relevan? ✅ / ❌

**⏱️ Testing selesai jam: _______________**

---

## 🔍 CHECKLIST TROUBLESHOOTING (Jika ada error)

### ❌ Error: Website tidak bisa diakses
- [ ] Cek apakah `node server.js` sudah running
- [ ] Cek di cPanel Terminal: `pm2 status`
- [ ] Restart aplikasi: `pm2 restart rsumeloy`
- [ ] Cek log error: `pm2 logs rsumeloy`

### ❌ Error: "Cannot find module"
- [ ] SSH ke server
- [ ] Jalankan: `cd public_html && npm install --production`

### ❌ Error: ".env.local not found"
- [ ] Pastikan file `.env.local` ada di `/public_html/`
- [ ] Buka WinSCP, cek panel kanan (server)
- [ ] Jika tidak ada, re-upload dari lokal

### ❌ Error: Gambar tidak muncul
- [ ] Cek folder `public/` terupload
- [ ] Cek folder `.next/static/` terupload
- [ ] Cek `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` di `.env.local`
- [ ] Buka browser DevTools (F12) → Network → Cek error image

### ❌ Error: Admin login tidak bisa
- [ ] Cek `NEXT_PUBLIC_SUPABASE_URL` di `.env.local`
- [ ] Cek `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local`
- [ ] Cek `SESSION_SECRET` sudah diisi
- [ ] Test koneksi Supabase dari server

### ❌ Error: AI Assistant tidak bekerja
- [ ] Pastikan `GEMINI_API_KEY` sudah diisi di `.env.local`
- [ ] Jika tidak diisi, AI akan memberikan mock response (ini normal)
- [ ] Dapatkan API key dari: https://makersuite.google.com/app/apikey

---

## ✅ CHECKLIST POST-DEPLOYMENT (Opsional)

### ☑️ SEO & Analytics
- [ ] Submit sitemap ke Google Search Console
  - URL: `https://rsumeloy.co.id/sitemap.xml`
- [ ] Submit sitemap ke Bing Webmaster Tools
- [ ] Verifikasi Google Analytics (jika dipasang)
- [ ] Test robots.txt: `https://rsumeloy.co.id/robots.txt`

### ☑️ Monitoring
- [ ] Setup UptimeRobot (https://uptimerobot.com)
  - Monitor URL: `https://rsumeloy.co.id`
  - Interval: 5 menit
  - Alert: Email/WhatsApp
- [ ] Setup Cloudflare (opsional)
  - DNS + CDN + DDoS protection

### ☑️ Backup
- [ ] Backup database Supabase (otomatis)
- [ ] Backup file website via FTP (weekly)
- [ ] Download folder `public_html` dengan WinSCP

### ☑️ Documentation
- [ ] Update `README.md` di GitHub
- [ ] Commit deployment date
- [ ] Tag version: `v1.0.0-production`

---

## 📝 CATATAN DEPLOYMENT

**Deployment By:** ___________________________  
**Tanggal:** ___________________________  
**Jam Mulai:** ___________________________  
**Jam Selesai:** ___________________________  
**Total Waktu:** ___________________________ menit

**Ukuran Upload:**
- Total file: _______________ MB
- node_modules: _______________ MB
- .next: _______________ MB
- public: _______________ MB

**Environment:**
- Node.js version: _______________
- Next.js version: 14.2.33
- Hosting: JagoanHosting
- Server OS: _______________

**Issues/Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Status Final:**
- [ ] ✅ SUCCESS - Website live dan berfungsi 100%
- [ ] ⚠️ PARTIAL - Website live tapi ada minor issues
- [ ] ❌ FAILED - Deployment gagal

---

## 📞 KONTAK SUPPORT

**JagoanHosting:**
- 🌐 Website: https://jagoanhosting.com
- 💬 Live Chat: https://jagoanhosting.com/support
- 📧 Email: support@jagoanhosting.com
- 📱 WhatsApp: (cek di website)

**Developer:**
- 📧 Email: ___________________________
- 📱 Phone: ___________________________

---

## ✨ SELAMAT!

Jika semua checklist ✅, deployment berhasil! 🎉

**Next Steps:**
1. Monitor website 24 jam pertama
2. Test secara berkala
3. Backup rutin
4. Update content
5. Implementasi SEO improvements (ANALISIS_SEO_SCORE.md)

---

> **Checklist Version:** 1.0  
> **Last Updated:** 5 November 2025  
> **Website:** RSU Meloy Sangatta - rsumeloy.co.id
