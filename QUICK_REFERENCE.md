# 📋 QUICK REFERENCE CARD - UPLOAD RSUMELOY.CO.ID

**Cetak halaman ini sebagai panduan cepat saat upload!**

---

## ⚠️ PENTING - CloudLinux Node.js Selector

**❌ JANGAN upload folder `node_modules/`!**
**✅ CloudLinux membuat symlink otomatis!**

Dokumentasi lengkap: **PANDUAN_CLOUDLINUX_NODEJS.md**

---

## ✅ CHECKLIST CEPAT

### 1. PERSIAPAN (5 MENIT)
```
□ Buka folder: d:\AI DEV\BACKUP\rsumeloy\production
□ RENAME: .env.local.template → .env.local
□ EDIT & ISI environment variables
□ SAVE file
□ VERIFIKASI: Tidak ada folder node_modules/
```

### 2. WINSCP SETUP (5 MENIT)
```
□ Download WinSCP: https://winscp.net
□ Install & Buka WinSCP
□ Data FTP dari JagoanHosting siap
```

### 3. UPLOAD (5-10 MENIT)
```
□ WinSCP → New Session
□ Protocol: FTP, Port: 21
□ Host, Username, Password dari JagoanHosting
□ Login → Navigate /public_html/
□ Upload SEMUA dari production/ (8.99 MB)
□ Tunggu progress 100%
□ VERIFIKASI: node_modules/ TIDAK terupload
```

### 4. SETUP NODE.JS SELECTOR (10 MENIT)
```
□ Login cPanel JagoanHosting
□ Menu: Setup Node.js App (WAJIB!)
□ Node.js: 18.x, Root: public_html, Startup: server.js
□ Create → Tunggu npm install (5-10 menit)
□ VERIFIKASI: node_modules jadi symlink
□ Start & Running
```

### 5. TEST (5 MENIT)
```
□ Buka: https://rsumeloy.co.id
□ Test homepage, jadwal dokter, layanan
□ Test admin login
□ Verifikasi gambar muncul
```

---

## 📝 ENVIRONMENT VARIABLES (.env.local)

```env
# Dari Supabase Dashboard
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# Dari Cloudinary Dashboard
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud

# Dari Google AI Studio (opsional)
GEMINI_API_KEY=AIzaSy...

# Generate random 32 char
SESSION_SECRET=xxxxxxxxxxxxxxxx

# Environment
NODE_ENV=production
```

**Generate SESSION_SECRET:**
```powershell
powershell -command "[Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))"
```

---

## 🔧 WINSCP CONNECTION

```
Protocol:   FTP
Encryption: No encryption (atau TLS/SSL)
Host:       ftp.rsumeloy.co.id (atau dari JagoanHosting)
Port:       21
Username:   __________________ (dari JagoanHosting)
Password:   __________________ (dari JagoanHosting)
```

**Save session:** "RSU Meloy Production"

---

## 📦 FILE YANG DIUPLOAD (8.99 MB)

```
production/
├── .next/          (3-5 MB) ✓
├── public/         (2-3 MB) ✓
├── app/            (1-2 MB) ✓
├── data/           (100 KB) ✓
├── server.js       (5 KB) ✓
├── package.json    (2 KB) ✓ PENTING!
└── .env.local      (1 KB) ✓ WAJIB!

❌ node_modules/  JANGAN DIUPLOAD!
✅ Dibuat otomatis oleh CloudLinux Node.js Selector!
```

---

## 🚨 TROUBLESHOOTING CEPAT

**Error: "node_modules must be a symlink":**
```bash
# Di cPanel File Manager
1. DELETE folder node_modules (jika ada)
2. Node.js Selector → Restart
3. Sistem buat symlink otomatis
```

**Website tidak bisa diakses:**
```bash
# Di Node.js Selector
Status: Restart Application
```

**Cannot find module:**
```bash
# Di Node.js Selector
Run NPM Install → Restart
```

**Gambar tidak muncul:**
- Cek CLOUDINARY_CLOUD_NAME di .env.local
- Cek folder public/ terupload
- Cek folder .next/static/ terupload

**Admin login gagal:**
- Cek SUPABASE_URL & SUPABASE_ANON_KEY
- Cek SESSION_SECRET sudah diisi

---

## 📞 KONTAK DARURAT

**JagoanHosting Support:**
- Live Chat: https://jagoanhosting.com/support
- Email: support@jagoanhosting.com
- WhatsApp: (cek website)

**Dokumentasi Lengkap:**
- PANDUAN_UPLOAD_WINSCP.md
- CHECKLIST_UPLOAD.md
- RINGKASAN_FOLDER_PRODUKSI.md

---

## ⏱️ ESTIMASI WAKTU TOTAL: 25-30 MENIT

```
Persiapan .env.local:    5 menit
Download WinSCP:         5 menit
Upload file:             5-10 menit (8.99 MB)
Setup Node.js Selector:  10 menit (npm install otomatis)
Testing:                 5 menit
---------------------------------
TOTAL:                   25-30 menit (10 menit lebih cepat!)
```

---

## ✨ SETELAH UPLOAD SUKSES

**Immediate:**
- [ ] Submit sitemap: https://search.google.com/search-console
- [ ] Test semua halaman
- [ ] Monitor error logs: `pm2 logs rsumeloy`

**24 Jam Pertama:**
- [ ] Monitor uptime
- [ ] Cek performance
- [ ] Test dari berbagai device

**Long Term:**
- [ ] Backup database weekly
- [ ] Update content regularly
- [ ] Follow SEO recommendations (ANALISIS_SEO_SCORE.md)

---

**📌 SIMPAN/CETAK HALAMAN INI UNTUK REFERENSI CEPAT!**

---

> Last Updated: 5 November 2025  
> Version: 1.0  
> Status: Production Ready ✅
