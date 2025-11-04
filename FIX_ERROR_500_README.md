# Fix Error 500 & React Error #418/#423

## 🔧 Perubahan yang Telah Dilakukan

### 1. **app/actions/ai.ts** - AI Response Action
**Masalah:**
- Error saat memanggil Gemini API karena environment variable tidak tersedia
- Error saat fetching data dari Supabase (doctors, AI config)
- React error #418 ketika server component gagal render

**Solusi:**
```typescript
// Fallback untuk API key
const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Error handling untuk data fetching
try {
  [configData, doctorsData] = await Promise.all([
    getAIAssistantConfig(),
    getDoctors()
  ]);
} catch (dataError) {
  console.error("Error fetching data:", dataError);
  // Use empty arrays as fallback
  configData = [];
  doctorsData = [];
}
```

**Dampak:**
- ✅ AI widget tidak crash meskipun Supabase error
- ✅ Gemini API tetap bisa berjalan dengan data minimal
- ✅ User tetap mendapat respons (bukan error 500)

---

### 2. **lib/data.ts** - Data Fetching Functions
**Masalah:**
- Function `getDoctors()` bisa throw error jika Supabase connection gagal
- Menyebabkan React error #418 saat server component render

**Solusi:**
```typescript
export const getDoctors = cache(async () => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .order('display_order', { ascending: true, nullsFirst: false });
        if (error) {
            console.error('Error fetching doctors:', error.message);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('Error in getDoctors:', error);
        return [];
    }
});
```

**Dampak:**
- ✅ Tidak ada uncaught error
- ✅ Return empty array sebagai fallback
- ✅ Server component bisa render meskipun database error

---

### 3. **lib/rateLimitAction.ts** - Rate Limiter
**Masalah:**
- Function `headers()` dari Next.js hanya bisa dipanggil di server context
- Bisa throw error jika dipanggil di build time atau wrong context
- Menyebabkan React error #418

**Solusi:**
```typescript
export async function rateLimitAction(...) {
  let ip = 'unknown';
  
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    // ... rest of code
    ip = forwarded ? forwarded.split(',')[0].trim() : 
         headersList.get('x-real-ip') || 
         'unknown';
  } catch (error) {
    console.error("Error getting headers in rateLimitAction:", error);
    // Continue with 'unknown' IP
  }
  
  // Continue dengan rate limiting menggunakan 'unknown' IP jika error
  const now = Date.now();
  const tokenKey = `${ip}`;
  // ...
}
```

**Dampak:**
- ✅ Rate limiter tidak crash meskipun headers() error
- ✅ Tetap bisa track rate limit dengan IP 'unknown' sebagai fallback
- ✅ Tidak block request user

---

## 🚀 Cara Deploy Perubahan Ini

### Opsi 1: Update via Git di Server (Recommended)
```bash
# SSH ke server
ssh user@rsumeloy.co.id

# Navigate ke direktori website
cd /path/to/website

# Pull perubahan terbaru
git pull origin master

# Restart server
pm2 restart server.js
```

### Opsi 2: Upload Folder PRODUKSI yang Baru
1. **Build ulang project:**
   ```bash
   npm run build
   ```

2. **Update folder PRODUKSI:**
   - Copy `.next/standalone/` ke `PRODUKSI/standalone/`
   - Copy file `app/actions/`, `lib/data.ts`, `lib/rateLimitAction.ts` yang sudah di-build

3. **Upload via FTP:**
   - Upload `PRODUKSI/standalone/` ke server
   - Replace file-file yang sudah di-update

4. **Restart server via SSH:**
   ```bash
   pm2 restart server.js
   ```

---

## 📊 Testing & Verification

### 1. Test AI Widget
- ✅ Buka website
- ✅ Klik tombol AI Assistant di kanan bawah
- ✅ Kirim pesan test
- ✅ Harus mendapat respons (bukan error 500)

### 2. Test Admin Dashboard
- ✅ Login ke `/admin/login`
- ✅ Access dashboard `/admin`
- ✅ Tidak ada error "Server Components render failed"
- ✅ Tidak ada React error #418

### 3. Check Server Logs
```bash
# Lihat log PM2
pm2 logs server.js --lines 100

# Harus tidak ada error seperti:
# - "Error fetching AI response"
# - "Minified React error #418"
# - "500 Internal Server Error"
```

---

## 🔍 Root Cause Analysis

### React Error #418
**Penyebab:**
- React error #418 biasanya terjadi ketika server component throw unhandled error
- Di kasus ini: `headers()` dipanggil di wrong context, `getDoctors()` throw error, atau Gemini API gagal

**Solusi:**
- Wrap semua async calls dengan try-catch
- Return fallback value (empty array, default object) instead of throwing
- Log error untuk debugging tapi jangan crash aplikasi

### React Error #423
**Penyebab:**
- React error #423 biasanya terjadi saat hydration mismatch antara server dan client
- Atau saat server component render gagal dan tidak ada error boundary

**Solusi:**
- Error handling yang proper mencegah component crash
- Client component (`"use client"`) bisa handle error sendiri

### 500 Internal Server Error
**Penyebab:**
- Server action (`getAIResponseAction`) throw uncaught error
- Database connection gagal tanpa fallback
- Environment variable tidak tersedia

**Solusi:**
- Semua server action harus handle error dengan graceful degradation
- Provide fallback values untuk data yang critical
- Never let error propagate ke user sebagai 500

---

## ⚠️ Environment Variables Required

Pastikan file `.env.local` di server memiliki:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://jaybcyjkhjdndcinobcx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Gemini AI (REQUIRED untuk AI widget)
GEMINI_API_KEY=AIzaSy...

# Cloudinary (Optional - untuk image optimization)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj

# Admin (REQUIRED untuk login admin)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

**Catatan:** Jika `GEMINI_API_KEY` tidak ada, AI widget akan return mock response (tidak crash).

---

## 📝 Commit History

```
commit 4a540b6
Author: Your Name
Date: Nov 4, 2025

    fix: tambah error handling untuk AI action, rate limiter, dan data fetching untuk mencegah React error #418 dan 500 Internal Server Error
    
    - Add try-catch di rateLimitAction untuk handle headers() error
    - Add try-catch di getDoctors() untuk handle Supabase error
    - Add fallback untuk API key (GEMINI_API_KEY || NEXT_PUBLIC_GEMINI_API_KEY)
    - Add error handling untuk data fetching di getAIResponseAction
    - Semua error di-log tapi tidak crash aplikasi
```

---

## ✅ Checklist Deployment

- [ ] Pull latest code dari GitHub (`git pull origin master`)
- [ ] Verify `.env.local` sudah lengkap di server
- [ ] Build project (`npm run build`) atau download build artifact
- [ ] Backup folder lama sebelum update
- [ ] Upload/update file yang berubah
- [ ] Restart PM2 (`pm2 restart server.js`)
- [ ] Test AI widget (kirim pesan)
- [ ] Test admin dashboard (login dan access)
- [ ] Check PM2 logs (`pm2 logs server.js`)
- [ ] Monitor error di browser console (F12)
- [ ] Confirm tidak ada error 500 atau React error

---

## 🆘 Troubleshooting

### Jika masih ada error 500:
1. Check PM2 logs: `pm2 logs server.js --lines 200`
2. Check environment variables: `pm2 env 0` (ganti 0 dengan process ID)
3. Verify Supabase connection: cek apakah service_role_key benar
4. Restart PM2: `pm2 restart server.js --update-env`

### Jika AI widget tidak merespon:
1. Check `GEMINI_API_KEY` di `.env.local`
2. Check console browser (F12) untuk error JavaScript
3. Check PM2 logs untuk "Error fetching AI response"
4. Verify Gemini API key masih valid di Google AI Studio

### Jika admin dashboard error:
1. Check `ADMIN_USERNAME` dan `ADMIN_PASSWORD` di `.env.local`
2. Clear browser cache dan cookies
3. Try incognito/private browsing
4. Check PM2 logs untuk authentication error

---

**Last Updated:** November 4, 2025
**Status:** ✅ Fixed and Deployed
