# 🔧 PANDUAN DEPLOYMENT UNTUK CLOUDLINUX NODE.JS SELECTOR

## ⚠️ PENTING - CloudLinux Requirements

JagoanHosting menggunakan **CloudLinux dengan Node.js Selector**, yang memiliki persyaratan khusus:

### ❌ LARANGAN:
- **JANGAN upload folder `node_modules/`** fisik
- CloudLinux membuat `node_modules` sebagai **symlink** ke virtual environment
- Jika ada folder `node_modules/` fisik, akan error!

### ✅ SOLUSI:
- Upload **HANYA file aplikasi** (tanpa node_modules)
- CloudLinux akan otomatis:
  1. Membuat virtual environment
  2. Menjalankan `npm install`
  3. Membuat symlink `node_modules`

---

## 📦 FOLDER PRODUCTION YANG SUDAH DISIAPKAN

**Lokasi:** `d:\AI DEV\BACKUP\rsumeloy\production\`  
**Ukuran:** **8.99 MB** (sangat kecil!)

### ✅ Struktur Folder (Tanpa node_modules):

```
production/
├── .next/              ~3-5 MB
│   ├── server/         (compiled Next.js code)
│   └── static/         (static assets)
├── public/             ~2-3 MB
│   ├── manifest.json
│   └── ... (images, etc)
├── app/                ~1-2 MB
├── data/               ~100 KB
├── server.js           4.6 KB ⭐
├── package.json        ~1 KB ⭐ (untuk npm install)
├── .env.local.template ~1 KB ⭐
└── README-UPLOAD.txt   ~2 KB

TOTAL: 8.99 MB (bukan 26 MB!)
```

**CATATAN:** `node_modules/` TIDAK ADA dan TIDAK DIUPLOAD!

---

## 🚀 LANGKAH-LANGKAH UPLOAD

### STEP 1: Persiapan Environment (5 menit)

```bash
1. Buka: d:\AI DEV\BACKUP\rsumeloy\production
2. RENAME: .env.local.template → .env.local
3. EDIT & ISI:
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
   GEMINI_API_KEY=AIzaSy... (opsional)
   SESSION_SECRET=xxxxx (generate random)
   NODE_ENV=production
4. SAVE
```

---

### STEP 2: Upload via WinSCP (5-10 menit)

**Download WinSCP:** https://winscp.net

**Koneksi FTP:**
```
Protocol:   FTP
Host:       ftp.rsumeloy.co.id (dari JagoanHosting)
Port:       21
Username:   your_ftp_username
Password:   your_ftp_password
```

**Upload:**
1. Login WinSCP
2. Panel KANAN: Navigate ke `/public_html/`
3. Panel KIRI: Navigate ke `d:\AI DEV\BACKUP\rsumeloy\production`
4. Select ALL files di panel kiri (`Ctrl+A`)
5. Drag & Drop ke panel kanan
6. Tunggu upload selesai (5-10 menit untuk 8.99 MB)

**Verifikasi upload:**
```
/public_html/
├── .next/          ✓
├── public/         ✓
├── app/            ✓
├── data/           ✓
├── server.js       ✓
├── package.json    ✓ (PENTING!)
└── .env.local      ✓ (PENTING!)
```

❌ **PASTIKAN TIDAK ADA `node_modules/`!**

---

### STEP 3: Setup Node.js Selector di cPanel (10 menit)

**Login ke cPanel JagoanHosting**

**Cari Menu: "Setup Node.js App" atau "Node.js Selector"**

**Create Application:**

```
┌─────────────────────────────────────────┐
│ Node.js version:   18.x (atau 20.x)    │
│ Application mode:  Production           │
│ Application root:  public_html          │
│ Application URL:   https://rsumeloy.co.id │
│ Startup file:      server.js            │
│ Environment vars:  (skip, ada di .env.local) │
└─────────────────────────────────────────┘
```

**Klik: Create**

**Proses Otomatis CloudLinux:**
```
[1] Membaca package.json
[2] Membuat virtual environment
[3] Menjalankan: npm install --production
[4] Download semua dependencies dari npm
[5] Membuat symlink: node_modules → virtual_env
[6] Setup environment
```

**Tunggu proses selesai (5-10 menit)**

**Klik: Start / Restart**

---

### STEP 4: Verifikasi (2 menit)

**Cek di cPanel:**
```
Status: Running ✓
Node.js: 18.x ✓
Symlink: node_modules → /home/username/nodevenv/... ✓
```

**Cek di File Manager:**
```
/public_html/node_modules → symlink (bukan folder!) ✓
```

**Test Website:**
```
https://rsumeloy.co.id → Website tampil ✓
```

---

## 📊 PERBANDINGAN UKURAN

### ❌ Cara Lama (Upload node_modules):
```
Total Upload: 26-30 MB
├── node_modules/    10-15 MB (SALAH!)
├── .next/           15-20 MB
└── public/          2-3 MB

❌ Error: CloudLinux tolak node_modules folder!
⏱️ Upload: 10-15 menit
```

### ✅ Cara Baru (Tanpa node_modules):
```
Total Upload: 8.99 MB
├── .next/           3-5 MB
├── public/          2-3 MB
├── app/             1-2 MB
├── data/            100 KB
└── server.js, package.json, .env.local

✓ node_modules dibuat otomatis oleh CloudLinux!
⏱️ Upload: 5-10 menit
```

**Penghematan: 70% ukuran upload!**

---

## 🔍 TROUBLESHOOTING

### ❌ Error: "node_modules must be a symlink"

**Penyebab:** Ada folder `node_modules/` fisik di upload

**Solusi:**
```bash
# Via cPanel File Manager
1. Login cPanel
2. File Manager → public_html
3. DELETE folder node_modules (jika ada)
4. Setup Node.js App → Restart
5. Sistem akan buat symlink node_modules otomatis
```

---

### ❌ Error: "Cannot find module 'next'"

**Penyebab:** npm install belum jalan atau gagal

**Solusi:**
```bash
# Di cPanel Node.js Selector
1. Klik: "Run NPM Install"
2. Tunggu proses selesai
3. Restart aplikasi

# Atau via Terminal
cd ~/public_html
source ~/nodevenv/public_html/18/bin/activate
npm install --production
```

---

### ❌ Error: "Application not running"

**Cek:**
1. File `package.json` ada dan valid ✓
2. File `server.js` ada ✓
3. File `.env.local` ada dan terisi ✓
4. Node.js version >= 18.x ✓

**Restart:**
```
Node.js Selector → Restart Application
```

---

### ❌ Gambar tidak muncul

**Solusi:**
- Pastikan folder `public/` terupload
- Pastikan folder `.next/static/` terupload
- Cek `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` di `.env.local`

---

## 📋 CHECKLIST DEPLOYMENT

### ☑️ Pre-Upload
- [ ] Build selesai (`npm run build`)
- [ ] Script `prepare-production.bat` dijalankan
- [ ] Folder `production/` ada (8.99 MB)
- [ ] File `.env.local` dibuat dan diisi
- [ ] **VERIFIKASI:** Tidak ada folder `node_modules/` di production

### ☑️ Upload
- [ ] WinSCP terinstall
- [ ] Koneksi FTP berhasil
- [ ] Upload semua file dari `production/` → `/public_html/`
- [ ] **VERIFIKASI:** Tidak ada folder `node_modules/` terupload

### ☑️ Setup CloudLinux
- [ ] Login cPanel
- [ ] Menu: Setup Node.js App
- [ ] Create Application dengan setting yang benar
- [ ] npm install otomatis berjalan
- [ ] Symlink `node_modules` dibuat
- [ ] Application status: Running

### ☑️ Testing
- [ ] Website bisa diakses: https://rsumeloy.co.id
- [ ] Semua halaman berfungsi
- [ ] Gambar muncul
- [ ] Admin bisa login
- [ ] No errors di browser console

---

## 🎯 POIN PENTING

### ✅ DO's (Lakukan):
1. ✓ Upload file aplikasi (tanpa node_modules)
2. ✓ Gunakan CloudLinux Node.js Selector
3. ✓ Biarkan sistem membuat symlink node_modules
4. ✓ Pastikan package.json ada dan valid
5. ✓ Isi .env.local dengan benar

### ❌ DON'Ts (Jangan):
1. ✗ JANGAN upload folder node_modules fisik
2. ✗ JANGAN jalankan npm install manual via FTP
3. ✗ JANGAN ubah symlink node_modules
4. ✗ JANGAN lupa isi .env.local

---

## ⏱️ ESTIMASI WAKTU

```
Edit .env.local:        5 menit
Upload via WinSCP:      5-10 menit (8.99 MB)
Setup Node.js App:      10 menit (npm install otomatis)
Testing:                5 menit
---------------------------------
TOTAL:                  25-30 menit
```

**Lebih cepat 10 menit dari cara lama!**

---

## 📞 SUPPORT

**JagoanHosting CloudLinux:**
- Dokumentasi: https://docs.cloudlinux.com/nodejs_selector/
- Support: https://jagoanhosting.com/support
- Live Chat: Available 24/7

**Error Spesifik CloudLinux:**
- Error node_modules: Hapus folder, restart app
- Error npm install: Cek package.json, run manual
- Error symlink: Gunakan Node.js Selector, bukan manual

---

## ✨ KESIMPULAN

✅ **Folder production sudah COMPATIBLE dengan CloudLinux!**
✅ **Ukuran hanya 8.99 MB (70% lebih kecil)**
✅ **node_modules dibuat otomatis oleh sistem**
✅ **Upload lebih cepat (5-10 menit)**
✅ **Deployment lebih mudah (setup otomatis)**

**Proses:**
1. Edit `.env.local` (5 menit)
2. Upload dengan WinSCP (5-10 menit)
3. Setup Node.js Selector (10 menit)
4. Test website (5 menit)
5. ✨ **LIVE!**

---

> **Dibuat:** 5 November 2025  
> **Hosting:** JagoanHosting (CloudLinux)  
> **Node.js Selector:** Required  
> **Ukuran Upload:** 8.99 MB  
> **Status:** CloudLinux Compatible ✅
