# 🚀 RINGKASAN DEPLOYMENT - RSU MELOY

## 📋 Apa yang Ada di Folder PRODUKSI Ini?

Folder ini berisi **website RSU Meloy yang sudah di-build** dan siap diupload ke hosting Jagoan Hosting.

### Isi Folder:
- ✅ **standalone/** - Build Next.js yang sudah dioptimalkan (~50-100MB)
- ✅ **public/** - File statis (favicon, manifest)
- ✅ **server.js** - File server untuk menjalankan website
- ✅ **package.json** - Daftar dependencies yang dibutuhkan
- ✅ **start-server.sh** - Script untuk start server (Linux/Mac)
- ✅ **start-server.bat** - Script untuk start server (Windows)
- ✅ **README_DEPLOY.md** - Panduan lengkap deployment
- ✅ **CHECKLIST_DEPLOY.md** - Checklist step-by-step
- ✅ **.env.production.template** - Template environment variables

---

## 🎯 Langkah Deployment (Singkat)

### 1️⃣ Upload via FTP (5-30 menit)
- Buka **FileZilla** atau FTP Client lain
- Koneksi ke `ftp.rsumeloy.co.id`, port `21`
- Upload **semua isi folder PRODUKSI ini** ke `/public_html/`

### 2️⃣ Setup via SSH/PuTTY (10-15 menit)
```bash
# Login SSH
ssh username@rsumeloy.co.id

# Masuk folder
cd public_html

# Install dependencies
npm install --production

# Setup environment
cp .env.production.template .env.local
nano .env.local  # Edit kredensial Supabase, Cloudinary, Gemini

# Start server
pm2 start server.js --name "rsumeloy"
pm2 startup
pm2 save
```

### 3️⃣ Setup Reverse Proxy & SSL
- Minta Jagoan Hosting setup Nginx/Apache reverse proxy dari port 80/443 ke 3000
- Aktifkan SSL via cPanel (Let's Encrypt)

### 4️⃣ Test Website
- Buka https://www.rsumeloy.co.id
- Pastikan semua berfungsi normal

---

## ⚠️ PENTING!

### Yang HARUS Diedit:
**File `.env.local` di server** harus diisi dengan kredensial berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ.....
SUPABASE_SERVICE_ROLE_KEY=eyJ.....
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
GEMINI_API_KEY=AIza.....
NEXT_PUBLIC_BASE_URL=https://www.rsumeloy.co.id
```

### Yang HARUS Terinstall di Server:
- ✅ Node.js versi 18 atau lebih tinggi
- ✅ npm atau yarn
- ✅ PM2 (untuk production)

---

## 📚 Panduan Lengkap

Baca file berikut untuk panduan detail:

1. **CHECKLIST_DEPLOY.md** - Checklist step-by-step dengan checkbox
2. **README_DEPLOY.md** - Panduan lengkap dengan troubleshooting

---

## 🆘 Troubleshooting Cepat

| Masalah | Solusi |
|---------|--------|
| Website tidak bisa diakses | `pm2 restart rsumeloy` |
| npm: command not found | Minta hosting install Node.js 18+ |
| Gambar tidak muncul | Cek `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` di `.env.local` |
| Database error | Cek Supabase URL dan keys di `.env.local` |
| Port 3000 sudah digunakan | `lsof -i :3000` lalu `kill -9 <PID>` |

---

## 📞 Butuh Bantuan?

- **Jagoan Hosting Support:** https://www.jagoanhosting.com/support
- **Baca README_DEPLOY.md** untuk troubleshooting lengkap

---

## ✅ Estimasi Waktu Total

| Tahap | Waktu |
|-------|-------|
| Upload FTP | 5-30 menit |
| Install Dependencies | 5-10 menit |
| Setup Environment | 5 menit |
| Start Server | 2 menit |
| Reverse Proxy & SSL | 10-20 menit (oleh hosting) |
| **Total** | **~30-60 menit** |

---

**Selamat Deploy! Jika ada kendala, hubungi support Jagoan Hosting. 🎉**
