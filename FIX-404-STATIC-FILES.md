# PERBAIKAN ERROR 404 STATIC FILES

## Masalah
Website sudah online tapi tampilan berantakan karena:
- CSS tidak dimuat (MIME type error)
- JavaScript files 404
- Static assets tidak bisa diakses

## Penyebab
`.htaccess` tidak dikonfigurasi untuk serve static files Next.js dengan benar. File `_next/static` dan `public` tidak ter-route ke lokasi yang benar.

## Solusi

### 1. Upload File Baru

Setelah build selesai, upload file baru:
- `rsumeloy-cloudlinux-deploy.zip` (file baru yang sudah diperbaiki)

### 2. Di Server (via cPanel File Manager atau SSH)

```bash
# Backup dulu
cd /home/rsumelo4/public_html
mv rsumeloy rsumeloy-backup-$(date +%Y%m%d)

# Extract file baru
cd /home/rsumelo4/public_html
unzip rsumeloy-cloudlinux-deploy.zip -d rsumeloy

# Pastikan .htaccess ada di root rsumeloy
ls -la /home/rsumelo4/public_html/rsumeloy/.htaccess
```

### 3. Pastikan Struktur Folder Benar

Struktur yang HARUS ada:

```
/home/rsumelo4/public_html/rsumeloy/
├── .htaccess              ← FILE INI PENTING!
├── server.js
├── package.json
├── .env
├── .next/
│   ├── static/            ← Static files Next.js
│   │   ├── css/
│   │   ├── chunks/
│   │   └── ...
│   └── ...
├── public/                ← Public assets (images, fonts, dll)
│   ├── images/
│   ├── manifest.json
│   └── ...
└── node_modules/          ← Symlink (dibuat otomatis)
```

### 4. Verifikasi .htaccess

File `.htaccess` HARUS ada di `/home/rsumelo4/public_html/rsumeloy/.htaccess`

Isi file:

```apache
PassengerEnabled on
PassengerAppRoot /home/rsumelo4/public_html/rsumeloy

<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Serve static files directly
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    # Route _next/static to .next/static
    RewriteRule ^_next/static/(.*)$ .next/static/$1 [L]
    
    # Serve public files directly
    RewriteRule ^(.+\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|css|js|json|xml|txt))$ public/$1 [L]
</IfModule>

<IfModule mod_mime.c>
    AddType application/javascript .js .mjs
    AddType text/css .css
    AddType image/svg+xml .svg
    AddType image/webp .webp
    AddType font/woff .woff
    AddType font/woff2 .woff2
</IfModule>
```

### 5. Restart Aplikasi di cPanel

1. Go to **NodeJS Selector**
2. Klik **Restart** pada aplikasi rsumeloy
3. Tunggu beberapa detik

### 6. Test Website

Buka: https://rsumeloy.co.id

**Check di Browser Console (F12):**
- Tidak ada error 404 untuk CSS/JS
- Tidak ada MIME type error
- Halaman tampil dengan benar

### 7. Troubleshooting

**Jika masih error 404:**

```bash
# Check apakah .next/static ada
ls -la /home/rsumelo4/public_html/rsumeloy/.next/static/

# Check apakah public ada
ls -la /home/rsumelo4/public_html/rsumeloy/public/

# Check permissions
chmod 755 /home/rsumelo4/public_html/rsumeloy/.htaccess
chmod -R 755 /home/rsumelo4/public_html/rsumeloy/.next/static/
chmod -R 755 /home/rsumelo4/public_html/rsumeloy/public/
```

**Jika masih MIME type error:**

Tambahkan di `.htaccess`:

```apache
<FilesMatch "\.(js|mjs)$">
    ForceType application/javascript
</FilesMatch>

<FilesMatch "\.css$">
    ForceType text/css
</FilesMatch>
```

**Test manual static file:**

```bash
# Test apakah CSS bisa diakses
curl -I https://rsumeloy.co.id/_next/static/css/a40133130a4a9c16.css

# Harus return:
# HTTP/1.1 200 OK
# Content-Type: text/css
```

### 8. Alternative: Passenger Standalone Mode

Jika .htaccess tidak bekerja, coba mode Passenger pure:

**Ubah di cPanel NodeJS Selector:**
- Application URL: `/` (bukan `rsumeloy.co.id`)
- Startup file: `server.js`

**Kemudian HAPUS .htaccess** dan biarkan Passenger handle semua routing.

## Checklist

- [ ] Build ulang dengan build-cloudlinux.bat
- [ ] Upload rsumeloy-cloudlinux-deploy.zip
- [ ] Extract ke /home/rsumelo4/public_html/rsumeloy/
- [ ] Verify .htaccess ada di folder rsumeloy
- [ ] Verify .next/static/ dan public/ ada
- [ ] Restart app di cPanel NodeJS Selector
- [ ] Test website, no 404 errors
- [ ] Check CSS dan JS dimuat dengan benar
