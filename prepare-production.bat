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

REM Copy standalone files ke root production
echo [2/6] Menyalin file standalone...
xcopy /E /I /Y ".next\standalone\*" "production\" > nul
echo ✓ File standalone disalin
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

REM Buat file .env.local template untuk produksi
echo [5/6] Membuat template .env.local...
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
echo [6/6] Membuat README instruksi...
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
echo ## Struktur Upload dengan WinSCP:
echo.
echo Upload SEMUA isi folder 'production' ke ROOT public_html:
echo.
echo public_html/
echo   ├── .next/
echo   │   ├── server/           ^(dari standalone^)
echo   │   └── static/           ^(dari .next/static^)
echo   ├── public/               ^(folder public^)
echo   ├── node_modules/         ^(dari standalone - minimal^)
echo   ├── package.json          ^(dari standalone^)
echo   ├── server.js             ^(dari standalone^)
echo   └── .env.local            ^(WAJIB isi dulu!^)
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
echo ## Setelah Upload:
echo.
echo 1. Pastikan file .env.local sudah ada dan terisi
echo 2. Set permission server.js: 755
echo 3. Jalankan: node server.js
echo 4. Atau setup PM2: pm2 start server.js --name rsumeloy
echo.
echo ## Ukuran Upload:
echo - Total: ~60-90 MB
echo - node_modules: ~40-60 MB ^(minimal, bukan 400-800 MB^)
echo - .next: ~15-25 MB
echo - public: ~5-10 MB
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
