# 📋 CHECKLIST FILE UPLOAD - FTP DEPLOYMENT

## ✅ Files yang HARUS diupload ke `/public_html/rsumeloy/`

### **1. Build Files (PENTING!)**
```
✅ next-build.zip (38 MB)
   → Extract di server setelah upload
   → Akan menghasilkan folder .next/
```

### **2. Core Configuration Files**
```
✅ package.json
✅ package-lock.json
✅ next.config.mjs
✅ tsconfig.json
✅ tailwind.config.ts
✅ postcss.config.js
✅ middleware.ts
✅ next-env.d.ts
✅ .env (WAJIB! Berisi API keys)
```

### **3. Application Files**
```
✅ server.js (WAJIB untuk Node.js App di cPanel)
✅ types.ts
✅ metadata.json
```

### **4. Folders (Upload semuanya)**
```
✅ app/
   → Semua routes dan pages
   
✅ components/
   → Semua UI components
   
✅ lib/
   → Utilities, API clients, database
   
✅ public/
   → Images, favicon, manifest
   
✅ types/
   → TypeScript type definitions
   
✅ data/
   → hospitalInfo.json dan data lainnya
   
✅ supabase/
   → Database migrations
   
✅ services/
   → External service integrations
   
✅ contexts/
   → React contexts
   
✅ hooks/
   → Custom React hooks
```

---

## ❌ Files yang TIDAK PERLU diupload

```
❌ node_modules/ (terlalu besar, akan di-generate di server)
❌ .next/ (sudah ada di next-build.zip)
❌ .git/ (version control, tidak perlu)
❌ .github/ (GitHub workflows)
❌ .vscode/ (editor config)
❌ rsumeloy-deploy/ (folder lokal)
❌ *.bat (Windows scripts)
❌ *.sh (Linux scripts, tidak bisa jalan tanpa SSH)
❌ *.md (dokumentasi, opsional)
❌ .gitignore
❌ .eslintrc.cjs
❌ .eslintignore
❌ tsconfig.tsbuildinfo
```

---

## 📦 CARA UPLOAD EFISIEN

### **Metode 1: Upload Folder Terpisah (Recommended)**

Upload folder satu per satu untuk monitoring progress:

1. **Upload ZIP build dulu:**
   - `next-build.zip` (38 MB) ← Paling penting!

2. **Upload config files:**
   - Semua file `*.json`, `*.mjs`, `*.ts` di root

3. **Upload folders:**
   - `app/` ← Routes dan pages
   - `components/` ← UI components
   - `lib/` ← Utilities
   - `public/` ← Static assets
   - `types/` ← TypeScript
   - `data/` ← Hospital data
   - `supabase/` ← Database
   - `services/` ← Services
   - `contexts/` ← Contexts
   - `hooks/` ← Hooks

### **Metode 2: Compress Semua (Lebih Cepat)**

```cmd
# Di Windows Command Prompt
cd d:\AI DEV\FINALHOSTING\rsumeloy\rsumeloy-deploy

# Compress all files
powershell -command "Compress-Archive -Path * -DestinationPath rsumeloy-full.zip -Force"
```

Upload `rsumeloy-full.zip` (1 file saja, ~50-100 MB) ke server, lalu extract di cPanel.

---

## 🎯 UPLOAD PRIORITY

Upload berdasarkan prioritas:

### **Priority 1 - CRITICAL (Harus Ada!):**
```
1. next-build.zip
2. package.json
3. package-lock.json
4. server.js
5. .env
6. next.config.mjs
```

### **Priority 2 - IMPORTANT (Core App):**
```
7. app/ folder
8. lib/ folder
9. data/ folder
10. middleware.ts
```

### **Priority 3 - NORMAL (UI & Assets):**
```
11. components/ folder
12. public/ folder
13. types/ folder
14. services/ folder
```

### **Priority 4 - OPTIONAL:**
```
15. contexts/ folder
16. hooks/ folder
17. supabase/ folder
18. tsconfig.json
19. tailwind.config.ts
20. postcss.config.js
```

---

## 📊 ESTIMASI UKURAN

| Item | Size | Upload Time (10 Mbps) |
|------|------|-----------------------|
| next-build.zip | 38 MB | ~30 seconds |
| Config files | 2 MB | ~2 seconds |
| app/ folder | 10-20 MB | ~15 seconds |
| components/ folder | 5-10 MB | ~8 seconds |
| lib/ folder | 2-5 MB | ~4 seconds |
| public/ folder | 5-10 MB | ~8 seconds |
| Other folders | 5-10 MB | ~8 seconds |
| **TOTAL** | **~70-100 MB** | **~2-5 minutes** |

---

## ✅ VERIFICATION CHECKLIST

Setelah upload, cek di cPanel File Manager:

```
/public_html/rsumeloy/
├── .env ✅
├── .next/ ✅ (hasil extract next-build.zip)
├── app/ ✅
├── components/ ✅
├── contexts/ ✅
├── data/ ✅
│   └── hospitalInfo.json ✅
├── hooks/ ✅
├── lib/ ✅
├── middleware.ts ✅
├── next.config.mjs ✅
├── next-env.d.ts ✅
├── package.json ✅
├── package-lock.json ✅
├── postcss.config.js ✅
├── public/ ✅
├── server.js ✅
├── services/ ✅
├── supabase/ ✅
├── tailwind.config.ts ✅
├── tsconfig.json ✅
├── types/ ✅
└── types.ts ✅
```

---

## 🚨 COMMON MISTAKES

### ❌ Kesalahan yang Sering Terjadi:

1. **Lupa upload `.env` file**
   - Akibat: API keys tidak terbaca
   - Fix: Upload `.env` dari rsumeloy-deploy/

2. **Tidak extract `next-build.zip`**
   - Akibat: Folder `.next/` tidak ada
   - Fix: Klik kanan ZIP → Extract di File Manager

3. **Upload `node_modules/`**
   - Akibat: Upload sangat lambat (500MB-1GB)
   - Fix: Skip folder ini, akan di-generate dengan NPM Install

4. **Lupa upload `server.js`**
   - Akibat: cPanel Node.js App tidak bisa start
   - Fix: Upload dari rsumeloy-deploy/

5. **Upload ke folder salah**
   - Akibat: File tidak terbaca
   - Fix: Pastikan di `/public_html/rsumeloy/`

---

## 💡 TIPS UPLOAD VIA FTP

### **FileZilla Settings untuk Upload Cepat:**

1. Edit → Settings → Transfers
2. Set **"Maximum simultaneous transfers"** = 2
3. Enable **"Use multiple connections"** (jika didukung)
4. Set timeout ke 60 detik

### **Skip Hidden Files:**

Jangan upload files yang dimulai dengan `.` kecuali:
- `.env` ← WAJIB!
- `.next/` ← Dari extract ZIP

Skip:
- `.git/`
- `.github/`
- `.vscode/`
- `.gitignore`
- `.eslintrc.cjs`

---

## 📞 NEXT STEPS

Setelah semua files uploaded:

1. ✅ Extract `next-build.zip` di File Manager
2. ✅ Verifikasi folder `.next/` ada
3. ✅ Setup Node.js App di cPanel
4. ✅ Run NPM Install
5. ✅ Set Environment Variables
6. ✅ Start Application
7. ✅ Configure `.htaccess`
8. ✅ Install SSL
9. ✅ Test website

**Ikuti panduan lengkap di: DEPLOY-FTP-ONLY.md** 🚀
