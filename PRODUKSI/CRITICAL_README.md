# ⚠️ PENTING - BACA SEBELUM UPLOAD!

## 🔴 **MASALAH KRITIS YANG SUDAH DIPERBAIKI:**

### File `.env` dengan kredensial SUDAH DIHAPUS

File `standalone/.env` yang berisi kredensial Supabase ANON KEY **sudah dihapus** untuk keamanan.

**⚠️ JANGAN upload file `.env` apapun ke hosting!**

---

## ✅ **FOLDER PRODUKSI SIAP UPLOAD** (Setelah Perbaikan)

### Yang Akan Diupload:
```
PRODUKSI/
├── standalone/          ← Build Next.js (tanpa .env)
├── public/              ← File statis
├── server.js            ← Server wrapper
├── package.json         ← Dependencies
├── .env.production.template  ← Template (bukan kredensial asli)
├── start-server.sh
├── start-server.bat
└── [dokumentasi].md
```

### Yang TIDAK Diupload (Opsional):
- `standalone/node_modules/` - Akan di-install via `npm install` di server
- File dokumentasi `.md` - Hanya untuk referensi

---

## 🚀 **LANGKAH DEPLOY YANG BENAR:**

### 1️⃣ Upload via FTP
Upload **SEMUA file di folder PRODUKSI** ke `/public_html/` hosting

**Kecuali:**
- Jangan upload `standalone/node_modules/` (akan di-install via npm)
- Jangan upload file `.env` apapun

### 2️⃣ Login SSH/PuTTY

```bash
cd public_html
```

### 3️⃣ Install Dependencies

```bash
npm install --production
```

**PENTING:** Ini akan install dependencies yang dibutuhkan (termasuk di `standalone/node_modules/`)

### 4️⃣ Buat File .env.local

```bash
cp .env.production.template .env.local
nano .env.local
```

**ISI DENGAN KREDENSIAL ASLI ANDA:**

```env
NODE_ENV=production
PORT=3000

# Supabase (dari dashboard Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ.....
SUPABASE_SERVICE_ROLE_KEY=eyJ.....

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdef123

# Google Gemini AI
GEMINI_API_KEY=AIza.....

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-kuat-anda

# Session
SESSION_SECRET=random-string-32-karakter

# Base URL
NEXT_PUBLIC_BASE_URL=https://www.rsumeloy.co.id
```

**Simpan:** `Ctrl+O` → `Enter` → `Ctrl+X`

### 5️⃣ Start Server

```bash
# Dengan PM2 (recommended)
npm install -g pm2
pm2 start server.js --name "rsumeloy"
pm2 startup
pm2 save

# Atau manual (untuk testing)
node server.js
```

### 6️⃣ Setup Reverse Proxy

Hubungi support Jagoan Hosting untuk setup Nginx/Apache reverse proxy dari port 80/443 ke 3000.

### 7️⃣ Setup SSL

Aktifkan SSL via cPanel atau Let's Encrypt.

### 8️⃣ Test Website

Buka: https://www.rsumeloy.co.id

---

## 🔒 **KEAMANAN:**

✅ **YANG BENAR:**
- Kredensial disimpan di `.env.local` DI SERVER
- File `.env.local` TIDAK pernah di-commit ke Git
- File `.env.local` TIDAK pernah diupload via FTP

❌ **YANG SALAH:**
- Upload file `.env` dengan kredensial asli
- Commit file `.env` ke GitHub
- Share file `.env` dengan orang lain

---

## 📊 **ESTIMASI WAKTU:**

| Tahap | Waktu |
|-------|-------|
| Upload FTP (tanpa node_modules) | 5-15 menit |
| npm install | 5-10 menit |
| Setup .env.local | 3-5 menit |
| Start server | 1-2 menit |
| Reverse proxy + SSL | 10-20 menit (oleh support) |
| **TOTAL** | **25-50 menit** |

---

## 🆘 **TROUBLESHOOTING:**

### ❌ "Cannot find module './standalone/server.js'"
```bash
# Pastikan folder standalone terupload lengkap
ls -la standalone/
```

### ❌ "npm: command not found"
```bash
# Hubungi support untuk install Node.js 18+
```

### ❌ Error saat npm install
```bash
# Hapus node_modules dan coba lagi
rm -rf standalone/node_modules
rm -rf node_modules
npm install --production
```

### ❌ Website 503
```bash
# Cek server running
pm2 status
pm2 logs rsumeloy

# Restart jika perlu
pm2 restart rsumeloy
```

---

## 📞 **BANTUAN:**

**Support Jagoan Hosting:**
- Website: https://www.jagoanhosting.com/support
- Email: support@jagoanhosting.com

**Dokumentasi Lengkap:**
- `SETUP_JAGOAN_HOSTING_NODEJS.md` - Panduan lengkap step-by-step
- `README_DEPLOY.md` - Panduan deploy via FTP
- `CHECKLIST_DEPLOY.md` - Checklist deployment

---

**Folder PRODUKSI sekarang AMAN dan SIAP untuk upload! 🎉**
