# TROUBLESHOOT 500 ERROR - Static Files

## Masalah Saat Ini
- **Error 500** untuk semua file `_next/static/*.js` dan `*.css`
- Server mengembalikan HTML (`text/html`) bukan JavaScript/CSS
- Ini berarti aplikasi Node.js crash/error saat serve static files

## LANGKAH DEBUGGING (VIA SSH)

### 1. Check Error Logs

```bash
# Check stderr log (error log)
tail -50 /home/rsumelo4/public_html/rsumeloy/stderr.log

# Check stdout log
tail -50 /home/rsumelo4/public_html/rsumeloy/stdout.log

# Check Passenger log
tail -50 /home/rsumelo4/logs/passenger.log
```

### 2. Check Struktur Folder

```bash
cd /home/rsumelo4/public_html/rsumeloy

# Harus ada folder .next/static
ls -la .next/

# Check isi .next/static
ls -la .next/static/

# Check permissions
ls -la | grep .next
ls -la .next/static/
```

### 3. Test Manual Start

```bash
cd /home/rsumelo4/public_html/rsumeloy

# Kill existing process
pkill -9 node

# Test manual start
NODE_ENV=production PORT=3001 node server.js
```

**Expected output:**
```
> Ready on http://localhost:3001
```

**Jika error, catat error message nya!**

### 4. Test Static File Direct

```bash
# Check if file exists
ls -la /home/rsumelo4/public_html/rsumeloy/.next/static/css/

# Try to cat the CSS file
cat /home/rsumelo4/public_html/rsumeloy/.next/static/css/a40133130a4a9c16.css | head -20
```

### 5. Check Node Modules

```bash
cd /home/rsumelo4/public_html/rsumeloy

# Check if node_modules is symlink
ls -la | grep node_modules

# Should show: node_modules -> (some path)

# If not symlink, install:
npm install
```

---

## KEMUNGKINAN PENYEBAB & SOLUSI

### Penyebab 1: `.next/static` Folder Tidak Ada

**Check:**
```bash
ls -la /home/rsumelo4/public_html/rsumeloy/.next/static/
```

**Solusi:** Extract ulang deployment package dan pastikan folder `.next/static/` ter-copy

### Penyebab 2: Permissions Salah

**Check:**
```bash
ls -la /home/rsumelo4/public_html/rsumeloy/.next/
```

**Solusi:**
```bash
chmod -R 755 /home/rsumelo4/public_html/rsumeloy/.next/
chmod -R 755 /home/rsumelo4/public_html/rsumeloy/public/
```

### Penyebab 3: Node Modules Tidak Terinstall

**Check:**
```bash
ls -la /home/rsumelo4/public_html/rsumeloy/node_modules/next/
```

**Solusi:**
```bash
cd /home/rsumelo4/public_html/rsumeloy
npm install --production
```

### Penyebab 4: server.js Tidak Benar Handle Static Files

**Check server.js:**
```bash
cat /home/rsumelo4/public_html/rsumeloy/server.js
```

**Harus contain standalone server dari Next.js build, BUKAN custom server!**

### Penyebab 5: .htaccess Interfering

**Test tanpa .htaccess:**
```bash
cd /home/rsumelo4/public_html/rsumeloy
mv .htaccess .htaccess.backup

# Restart app di cPanel
# Test website
```

### Penyebab 6: Passenger Configuration Issue

**Check cPanel NodeJS Selector:**
- Application URL: **/** (bukan rsumeloy.co.id)
- Application Root: **public_html/rsumeloy**
- Application Startup File: **server.js**
- Node.js version: **20.x**

---

## QUICK FIX: Gunakan Passenger Standalone Mode

Jika .htaccess menyebabkan masalah, gunakan Passenger pure mode:

### 1. Hapus .htaccess di rsumeloy folder
```bash
rm /home/rsumelo4/public_html/rsumeloy/.htaccess
```

### 2. Update cPanel NodeJS Selector
- Application URL: **/**
- Pastikan "Passenger Enabled"

### 3. Restart App

### 4. Test
Website harus bisa diakses tanpa 500 error

---

## TEST CHECKLIST

Setelah fix, test ini di browser console:

```javascript
// Test CSS load
fetch('https://rsumeloy.co.id/_next/static/css/a40133130a4a9c16.css')
  .then(r => console.log('CSS:', r.status, r.headers.get('content-type')))

// Expected: CSS: 200 text/css

// Test JS load  
fetch('https://rsumeloy.co.id/_next/static/chunks/webpack-f56856d465cf9e46.js')
  .then(r => console.log('JS:', r.status, r.headers.get('content-type')))

// Expected: JS: 200 application/javascript
```

---

## ACTIONS REQUIRED

**Mohon lakukan dan kirim hasil:**

1. ✅ Check stderr.log → Kirim error message
2. ✅ Check apakah .next/static/ folder ada
3. ✅ Check apakah node_modules symlink ada
4. ✅ Try remove .htaccess dan restart
5. ✅ Kirim screenshot error atau output terminal

**Ini penting untuk diagnose masalah yang tepat!**
