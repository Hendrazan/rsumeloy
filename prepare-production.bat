@echo off
REM ========================================
REM Script Persiapan Produksi untuk Upload FTP
REM Website: RSU Meloy Sangatta
REM Hosting: JagoanHosting
REM ========================================

echo.
echo ========================================
echo PERSIAPAN FOLDER PRODUKSI
echo ========================================
echo.

REM Warna dan format
color 0A

REM Cek apakah build sudah dilakukan
if not exist ".next\standalone" (
    echo [ERROR] Folder .next\standalone tidak ditemukan!
    echo Jalankan dulu: npm run build
    echo.
    pause
    exit /b 1
)

REM Buat folder production jika belum ada
echo [1/6] Membuat folder production...
if exist "production" (
    echo Menghapus folder production lama...
    rmdir /s /q production
)
mkdir production
echo ✓ Folder production dibuat
echo.

REM Copy standalone files KECUALI node_modules
echo [2/6] Menyalin file standalone (tanpa node_modules)...
for /d %%D in (".next\standalone\*") do (
    if /i not "%%~nxD"=="node_modules" (
        xcopy /E /I /Y "%%D" "production\%%~nxD" > nul
    )
)
for %%F in (".next\standalone\*") do (
    if not "%%~xF"=="" (
        copy /Y "%%F" "production\" > nul
    )
)
echo ✓ File standalone disalin (node_modules di-skip)
echo.

REM Copy .next/static ke production/.next/static
echo [3/6] Menyalin .next\static...
xcopy /E /I /Y ".next\static" "production\.next\static" > nul
echo ✓ Folder .next\static disalin
echo.

REM Copy public folder
echo [4/6] Menyalin folder public...
xcopy /E /I /Y "public" "production\public" > nul
echo ✓ Folder public disalin
echo.

REM Buat file package.json untuk CloudLinux Node.js Selector
echo [5/6] Membuat package.json untuk CloudLinux...
(
echo {
echo   "name": "rsumeloy-production",
echo   "version": "1.0.0",
echo   "private": true,
echo   "scripts": {
echo     "start": "node server.js"
echo   },
echo   "dependencies": {
echo     "next": "14.2.33",
echo     "react": "^18.0.0",
echo     "react-dom": "^18.0.0"
echo   },
echo   "engines": {
echo     "node": ">=18.0.0"
echo   }
echo }
) > "production\package.json"
echo ✓ package.json dibuat untuk CloudLinux
echo.

REM Buat file .env.local template untuk produksi
echo [6/7] Membuat template .env.local...
(
echo # ========================================
echo # ENVIRONMENT VARIABLES - PRODUCTION
echo # RSU Meloy Sangatta
echo # ========================================
echo.
echo # Supabase Configuration
echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
echo.
echo # Cloudinary Configuration
echo NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
echo.
echo # Google Gemini AI
echo GEMINI_API_KEY=your_gemini_api_key_here
echo.
echo # Session Secret ^(generate with: openssl rand -base64 32^)
echo SESSION_SECRET=your_random_session_secret_here
echo.
echo # Node Environment
echo NODE_ENV=production
) > "production\.env.local.template"
echo ✓ Template .env.local dibuat
echo.

REM Buat file README untuk instruksi upload
echo [7/7] Membuat README instruksi...
(
echo # ========================================
echo # INSTRUKSI UPLOAD KE JAGOANHOSTING
echo # ========================================
echo.
echo ## PENTING - Langkah Sebelum Upload:
echo.
echo 1. RENAME FILE:
echo    - Ubah .env.local.template menjadi .env.local
echo    - Isi semua nilai environment variables dengan data produksi
echo.
echo 2. PASTIKAN ENVIRONMENT VARIABLES SUDAH BENAR:
echo    - NEXT_PUBLIC_SUPABASE_URL
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
echo    - GEMINI_API_KEY
echo    - SESSION_SECRET
echo.
echo ## PENTING - CloudLinux Node.js Selector:
echo.
echo JagoanHosting menggunakan CloudLinux dengan Node.js Selector.
echo node_modules TIDAK diupload! Akan dibuat otomatis sebagai symlink.
echo.
echo ## Struktur Upload dengan WinSCP:
echo.
echo Upload SEMUA isi folder 'production' ke ROOT public_html:
echo.
echo public_html/
echo   ├── .next/
echo   │   ├── server/           ^(dari standalone^)
echo   │   └── static/           ^(dari .next/static^)
echo   ├── public/               ^(folder public^)
echo   ├── package.json          ^(WAJIB - untuk install dependencies^)
echo   ├── server.js             ^(dari standalone^)
echo   └── .env.local            ^(WAJIB isi dulu!^)
echo.
echo CATATAN: node_modules TIDAK diupload ^(akan dibuat otomatis^)
echo.
echo ## Cara Upload dengan WinSCP FTP:
echo.
echo 1. Buka WinSCP
echo 2. Protokol: FTP
echo 3. Host: ftp.yourdomain.com ^(dari JagoanHosting^)
echo 4. Username: username FTP Anda
echo 5. Password: password FTP Anda
echo 6. Port: 21
echo.
echo 7. Koneksi dan masuk ke folder public_html
echo 8. Upload SEMUA isi folder 'production' ke public_html
echo.
echo ## Setelah Upload - Setup di cPanel:
echo.
echo 1. Login ke cPanel JagoanHosting
echo 2. Cari menu: Setup Node.js App
echo 3. Create Application:
echo    - Node.js version: 18.x atau 20.x
echo    - Application mode: Production
echo    - Application root: public_html
echo    - Application startup file: server.js
echo 4. Klik Create
echo 5. Sistem akan otomatis:
echo    - Membuat symlink node_modules
echo    - Menjalankan npm install
echo    - Setup virtual environment
echo 6. Klik Start/Restart
echo.
echo ## Ukuran Upload:
echo - Total: ~5-10 MB ^(SANGAT KECIL!^)
echo - node_modules: TIDAK DIUPLOAD ^(dibuat otomatis di server^)
echo - .next: ~3-5 MB
echo - public: ~2-3 MB
echo.
echo ## Kontak Support:
echo - JagoanHosting: support@jagoanhosting.com
echo - Dokumentasi lengkap: Lihat PANDUAN_UPLOAD_FTP_PRODUKSI.md
echo.
echo ========================================
) > "production\README-UPLOAD.txt"
echo ✓ README instruksi dibuat
echo.

REM Tampilkan ringkasan
echo ========================================
echo SELESAI! Folder production siap upload
echo ========================================
echo.
echo Lokasi: %cd%\production
echo.
echo Struktur folder:
dir /B production
echo.
echo LANGKAH SELANJUTNYA:
echo 1. Buka folder: production
echo 2. Edit .env.local.template menjadi .env.local
echo 3. Isi semua environment variables
echo 4. Upload dengan WinSCP ke public_html
echo 5. Baca README-UPLOAD.txt untuk detail lengkap
echo.
echo Total ukuran folder:
powershell -command "'{0:N2} MB' -f ((Get-ChildItem -Recurse production | Measure-Object -Property Length -Sum).Sum / 1MB)"
echo.
pause
