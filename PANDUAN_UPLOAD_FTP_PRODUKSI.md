# 🚀 PANDUAN UPLOAD FTP UNTUK PRODUKSI

**Pertanyaan:** Apakah seluruh isi folder harus di-upload via FTP?  
**Jawaban:** ❌ **TIDAK!** Hanya file tertentu yang perlu diupload.

---

## ⚠️ PENTING: Next.js Standalone Mode

Project ini menggunakan **`output: 'standalone'`** di `next.config.mjs`.

Artinya setelah `npm run build`, Next.js akan membuat folder `.next/standalone/` yang berisi **HANYA file-file yang dibutuhkan untuk production**.

---

## 📦 CARA YANG BENAR: Upload via FTP

### STEP 1: Build Project di Local

```bash
# Di komputer lokal Anda
cd "d:\AI DEV\BACKUP\rsumeloy"

# Jalankan build
npm run build
```

**Output build akan membuat:**
- `.next/standalone/` ← **INI yang akan diupload**
- `.next/static/` ← **INI juga dibutuhkan**
- `public/` ← **INI juga dibutuhkan**

---

### STEP 2: Struktur File Yang HARUS Diupload

```
📁 public_html/
├── 📁 .next/
│   └── 📁 static/          ← Upload seluruh isi folder ini
│       ├── chunks/
│       ├── css/
│       ├── media/
│       └── ...
│
├── 📁 public/              ← Upload seluruh isi folder ini
│   ├── manifest.json
│   ├── robots.txt (jika ada)
│   └── images/
│
├── 📁 node_modules/        ← Upload dari .next/standalone/node_modules
│   └── (hanya dependencies yang dibutuhkan)
│
├── 📄 server.js            ← Upload file ini
├── 📄 package.json         ← Upload file ini
└── 📄 .env.local           ← Buat manual di server (JANGAN upload .env lokal!)
```

---

## ✅ FILE & FOLDER YANG **HARUS** DIUPLOAD

### 1. **Folder `.next/standalone/`** (Copy isi folder ini ke root)

**Lokasi di komputer lokal:**
```
d:\AI DEV\BACKUP\rsumeloy\.next\standalone\
```

**Upload semua isi folder ini ke root hosting (`public_html/`)**

Folder ini berisi:
- `node_modules/` (hanya yang dibutuhkan)
- `server.js` (sudah termasuk di sini)
- `package.json` (sudah termasuk di sini)
- File-file Next.js internal lainnya

### 2. **Folder `.next/static/`**

**Lokasi di komputer lokal:**
```
d:\AI DEV\BACKUP\rsumeloy\.next\static\
```

**Upload ke:**
```
public_html/.next/static/
```

Folder ini berisi:
- CSS compiled
- JavaScript chunks
- Images dari build
- Fonts

### 3. **Folder `public/`**

**Lokasi di komputer lokal:**
```
d:\AI DEV\BACKUP\rsumeloy\public\
```

**Upload ke:**
```
public_html/public/
```

Folder ini berisi:
- `manifest.json`
- Static assets (icons, images)
- Robots.txt (jika ada)

### 4. **File `server.js`** (sudah ada di `.next/standalone/`)

File ini adalah custom server untuk production.

### 5. **File `.env.local`** (BUAT MANUAL DI SERVER)

**JANGAN UPLOAD** `.env` dari komputer lokal Anda!

**Buat file baru** di server dengan isi:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc123

# Google Gemini AI
GEMINI_API_KEY=AIza...
NEXT_PUBLIC_GEMINI_API_KEY=AIza...

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-kuat-anda

# Session
SESSION_SECRET=random-32-karakter-string

# Site URL (PENTING untuk SEO!)
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id

# Analytics (Optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

---

## ❌ FILE & FOLDER YANG **TIDAK PERLU** DIUPLOAD

### 🚫 JANGAN Upload File/Folder Ini:

```
❌ node_modules/           (BESAR! Sudah ada versi minimal di .next/standalone)
❌ .git/                   (Folder Git - tidak dibutuhkan di production)
❌ .github/                (GitHub workflows - tidak dibutuhkan)
❌ .next/cache/            (Build cache - tidak dibutuhkan)
❌ .env                    (Environment variables lokal - BAHAYA!)
❌ .env.example            (Hanya template)
❌ .eslintignore           (Development only)
❌ .eslintrc.cjs           (Development only)
❌ tsconfig.json           (Development only - TypeScript config)
❌ tsconfig.tsbuildinfo    (Build cache)
❌ package-lock.json       (Opsional - bisa upload jika mau npm ci)
❌ README.md               (Dokumentasi)
❌ *.md files              (Semua dokumentasi - tidak dibutuhkan di production)
❌ tools/                  (Development scripts)
❌ supabase/               (Supabase migrations - tidak dibutuhkan di production)
❌ deploy.sh               (Deployment script)
❌ initial-setup.sh        (Setup script)
```

**Total Size:**
- ❌ Full project: **~500 MB - 1 GB** (dengan node_modules lengkap)
- ✅ Standalone build: **~50-100 MB** (jauh lebih kecil!)

---

## 🎯 OPSI UPLOAD: 2 Cara

### **OPSI A: Upload Manual via FTP** (Anda sedang pertimbangkan ini)

#### Tools FTP yang Recommended:
- **FileZilla** (Gratis, paling populer)
- **WinSCP** (Gratis, untuk Windows)
- **Cyberduck** (Gratis, Mac/Windows)

#### Langkah Upload:

1. **Build project di lokal:**
   ```bash
   npm run build
   ```

2. **Buka FTP Client (FileZilla)**
   - Host: `ftp.rsumeloy.co.id` atau IP server
   - Username: username FTP Anda
   - Password: password FTP Anda
   - Port: `21` (FTP) atau `22` (SFTP)

3. **Upload folder/file satu per satu:**
   
   **A. Upload isi `.next/standalone/` ke root:**
   ```
   Lokal: d:\AI DEV\BACKUP\rsumeloy\.next\standalone\*
   Server: /public_html/
   ```
   
   **B. Upload `.next/static/`:**
   ```
   Lokal: d:\AI DEV\BACKUP\rsumeloy\.next\static\
   Server: /public_html/.next/static/
   ```
   
   **C. Upload `public/`:**
   ```
   Lokal: d:\AI DEV\BACKUP\rsumeloy\public\
   Server: /public_html/public/
   ```

4. **Buat file `.env.local` di server** via cPanel File Manager atau FTP

5. **Set permissions** (via FTP atau cPanel):
   ```
   chmod 755 server.js
   chmod 644 .env.local
   ```

**Estimasi waktu upload:**
- Koneksi cepat (10 Mbps): **10-20 menit**
- Koneksi sedang (5 Mbps): **20-40 menit**
- Koneksi lambat (1 Mbps): **1-2 jam**

**Kekurangan:**
- ⏰ Lama (banyak file kecil)
- 🐌 Bisa putus-putus koneksi
- 🔄 Harus manual update setiap kali ada perubahan

---

### **OPSI B: Deploy via SSH + Git** (RECOMMENDED! 🌟)

Ini cara yang **LEBIH CEPAT** dan **LEBIH AMAN**:

#### Langkah Deploy:

1. **Login SSH via PuTTY** (lihat `DEPLOY_DENGAN_PUTTY.md`)

2. **Clone repository:**
   ```bash
   cd public_html
   git clone https://github.com/Hendrazan/rsumeloy.git
   cd rsumeloy
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build project:**
   ```bash
   npm run build
   ```

5. **Copy file ke lokasi yang benar:**
   ```bash
   # Copy standalone ke root
   cp -r .next/standalone/* ../
   
   # Copy static assets
   cp -r .next/static ../.next/
   cp -r public ../
   
   # Copy server.js (jika belum ada)
   cp server.js ../
   ```

6. **Buat `.env.local`:**
   ```bash
   cd ..
   nano .env.local
   # Paste environment variables
   # Ctrl+X, Y, Enter untuk save
   ```

7. **Start aplikasi:**
   ```bash
   pm2 start server.js --name rsumeloy
   pm2 save
   ```

**Keuntungan SSH + Git:**
- ⚡ Lebih cepat (hanya download kode, build di server)
- 🔄 Update mudah: `git pull && npm run build && pm2 restart rsumeloy`
- 🛡️ Lebih aman (tidak perlu upload .env)
- 📦 Hemat bandwidth (hanya kode source yang di-download)

---

## 📊 PERBANDINGAN METODE

| Aspek | FTP Upload | SSH + Git |
|-------|------------|-----------|
| **Kecepatan** | 🐌 Lambat (20-60 min) | ⚡ Cepat (5-10 min) |
| **Kemudahan** | 😊 Mudah (GUI) | 🤔 Butuh belajar terminal |
| **Update** | 😫 Manual re-upload | 😎 `git pull && npm run build` |
| **Bandwidth** | 📈 Tinggi (~100 MB) | 📉 Rendah (~10 MB source) |
| **Error Prone** | 🚨 Tinggi (file terlewat) | ✅ Rendah (automated) |
| **Recommended** | ❌ Untuk testing | ✅ **UNTUK PRODUCTION** |

---

## 🎯 REKOMENDASI SAYA

### Untuk **First Time Deploy:**

**Gunakan SSH + Git** (OPSI B)

**Alasan:**
1. ✅ Lebih cepat (build di server, tidak perlu upload file besar)
2. ✅ Lebih aman (tidak perlu upload `.env` via FTP)
3. ✅ Lebih mudah update di masa depan
4. ✅ Less error-prone (automated process)
5. ✅ Dokumentasi lengkap sudah ada (`DEPLOY_DENGAN_PUTTY.md`)

### Kalau **Tetap Ingin FTP:**

**Upload hanya folder ini:**

```
✅ .next/standalone/* (copy isi ke root)
✅ .next/static/ → upload ke .next/static/
✅ public/ → upload ke public/
✅ Buat .env.local manual di server
```

**JANGAN upload:**
```
❌ node_modules/ (full)
❌ .git/
❌ .github/
❌ *.md files
❌ tools/
❌ supabase/
❌ .env (local)
```

---

## 📝 CHECKLIST UPLOAD FTP (Jika Tetap Pilih FTP)

### Pre-Upload:
- [ ] Run `npm run build` di lokal
- [ ] Cek folder `.next/standalone/` sudah ada
- [ ] Cek folder `.next/static/` sudah ada
- [ ] Siapkan file `.env.local` untuk server (jangan upload .env lokal!)

### Upload via FTP:
- [ ] Upload seluruh isi `.next/standalone/` ke `/public_html/`
- [ ] Upload folder `.next/static/` ke `/public_html/.next/static/`
- [ ] Upload folder `public/` ke `/public_html/public/`
- [ ] Buat file `.env.local` di `/public_html/` dengan environment variables production

### Post-Upload:
- [ ] Set permissions: `chmod 755 server.js`
- [ ] Set permissions: `chmod 644 .env.local`
- [ ] Test website: `https://www.rsumeloy.co.id`
- [ ] Check logs jika ada error
- [ ] Verify sitemap.xml: `https://www.rsumeloy.co.id/sitemap.xml`
- [ ] Test admin login: `https://www.rsumeloy.co.id/admin/login`

### Monitoring Post-Deploy:
- [ ] Check Google Search Console (24-48 jam kemudian)
- [ ] Monitor error logs di cPanel atau PM2
- [ ] Test Core Web Vitals
- [ ] Verify all pages load correctly

---

## 🔧 TROUBLESHOOTING

### Error: "Cannot find module"
**Cause:** File `.next/standalone/node_modules/` tidak lengkap atau tidak terupload
**Fix:** Re-upload folder `node_modules/` dari `.next/standalone/`

### Error: "404 Not Found" untuk static assets
**Cause:** Folder `.next/static/` atau `public/` tidak terupload dengan benar
**Fix:** Re-upload folder-folder tersebut ke lokasi yang benar

### Error: "Environment variable not found"
**Cause:** File `.env.local` tidak ada atau isinya salah
**Fix:** Cek file `.env.local` di server, pastikan semua variable ada

### Website tidak mau start
**Cause:** Permissions salah atau Node.js tidak terinstall
**Fix:** 
```bash
chmod 755 server.js
pm2 start server.js --name rsumeloy
```

### Images tidak load
**Cause:** Cloudinary environment variables salah
**Fix:** Cek `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` di `.env.local`

---

## 📞 BUTUH BANTUAN?

Jika masih bingung atau ada error:

1. **Cek dokumentasi lain:**
   - `DEPLOY_DENGAN_PUTTY.md` - Panduan lengkap deploy via SSH
   - `SETUP_JAGOAN_HOSTING_NODEJS.md` - Setup Node.js di Jagoan Hosting
   - `DEPLOYMENT_SEO_CHECKLIST.md` - Checklist SEO-safe deployment

2. **Cek logs:**
   - PM2: `pm2 logs rsumeloy`
   - cPanel: Error log di File Manager atau Logs section

3. **Common issues sudah didokumentasikan di:**
   - `FIX_ERROR_500_README.md`
   - `ADMIN_DASHBOARD_FIX.md`

---

## 🎬 KESIMPULAN

**Jawaban Singkat:**
❌ **TIDAK**, jangan upload seluruh isi folder!

**Upload hanya:**
1. ✅ Isi folder `.next/standalone/` (copy ke root)
2. ✅ Folder `.next/static/`
3. ✅ Folder `public/`
4. ✅ Buat `.env.local` manual di server

**Total file:** ~50-100 MB (bukan 500 MB - 1 GB!)

**Metode Recommended:** 🌟 **SSH + Git** (lihat `DEPLOY_DENGAN_PUTTY.md`)

**Metode Alternatif:** FTP upload (ikuti panduan di atas)

---

**Good luck dengan deployment! 🚀**
