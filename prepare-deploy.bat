@echo off
echo ================================================
echo   Deploy RSU Meloy ke Jagoan Hosting
echo ================================================
echo.

echo [1/5] Membuat backup...
if exist "rsumeloy-deploy" (
    rmdir /s /q rsumeloy-deploy
)
mkdir rsumeloy-deploy

echo [2/5] Menyalin file yang diperlukan...
echo Copying app folder...
xcopy /E /I /Y app rsumeloy-deploy\app > nul

echo Copying components folder...
xcopy /E /I /Y components rsumeloy-deploy\components > nul

echo Copying lib folder...
xcopy /E /I /Y lib rsumeloy-deploy\lib > nul

echo Copying public folder...
xcopy /E /I /Y public rsumeloy-deploy\public > nul

echo Copying types folder...
xcopy /E /I /Y types rsumeloy-deploy\types > nul

echo Copying data folder...
xcopy /E /I /Y data rsumeloy-deploy\data > nul

echo Copying supabase folder...
xcopy /E /I /Y supabase rsumeloy-deploy\supabase > nul

echo Copying config files...
copy /Y middleware.ts rsumeloy-deploy\ > nul
copy /Y next.config.mjs rsumeloy-deploy\ > nul
copy /Y package.json rsumeloy-deploy\ > nul
copy /Y package-lock.json rsumeloy-deploy\ > nul
copy /Y tsconfig.json rsumeloy-deploy\ > nul
copy /Y tailwind.config.ts rsumeloy-deploy\ > nul
copy /Y postcss.config.js rsumeloy-deploy\ > nul
copy /Y next-env.d.ts rsumeloy-deploy\ > nul
copy /Y types.ts rsumeloy-deploy\ > nul

echo.
echo [3/5] Membuat file .env untuk production...
(
echo NEXT_PUBLIC_SUPABASE_URL=https://jaybcyjkhjdndcinobcx.supabase.co
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheWJjeWpraGpkbmRjaW5vYmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTQwODcsImV4cCI6MjA3MDU5MDA4N30.vHf57s0ZbzQSYvurwQxP6rmyzTdJJ87yyAdar3gUH7M
echo NEXT_PUBLIC_SITE_URL=https://rsumeloy.co.id
echo NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
echo GEMINI_API_KEY=AIzaSyCtzR5ZX-r8YHwNgTjIhfYzFpEhtGmTLRc
echo NODE_ENV=production
echo NEXT_PUBLIC_ENABLE_ANALYTICS=false
echo NEXT_PUBLIC_ENABLE_AI_FEATURES=true
) > rsumeloy-deploy\.env

echo.
echo [4/5] Membuat file instruksi deploy...
(
echo # INSTRUKSI DEPLOY KE JAGOAN HOSTING
echo.
echo ## 1. Upload Files
echo Upload semua file dalam folder ini ke hosting via FTP/File Manager
echo Lokasi: public_html atau directory yang ditentukan hosting
echo.
echo ## 2. SSH ke Server dan jalankan:
echo.
echo cd /path/to/your/website
echo npm install --production
echo npm run build
echo.
echo ## 3. Install PM2 ^(Process Manager^):
echo.
echo npm install -g pm2
echo pm2 start npm --name "rsumeloy" -- start
echo pm2 save
echo pm2 startup
echo.
echo ## 4. Verifikasi:
echo.
echo pm2 status
echo pm2 logs rsumeloy
echo.
echo Website seharusnya berjalan di http://localhost:3000
echo Gunakan Nginx/Apache untuk reverse proxy ke port 80/443
echo.
echo ## 5. Troubleshooting:
echo.
echo - Jika error: pm2 restart rsumeloy
echo - Lihat logs: pm2 logs rsumeloy
echo - Stop: pm2 stop rsumeloy
echo - Delete: pm2 delete rsumeloy
) > rsumeloy-deploy\DEPLOY_INSTRUCTIONS.txt

echo.
echo [5/5] Membuat file .htaccess untuk Apache...
(
echo ^<IfModule mod_rewrite.c^>
echo   RewriteEngine On
echo   RewriteRule ^^$ http://127.0.0.1:3000/ [P,L]
echo   RewriteCond %%{REQUEST_FILENAME} !-f
echo   RewriteCond %%{REQUEST_FILENAME} !-d
echo   RewriteRule ^^(.*)$ http://127.0.0.1:3000/$1 [P,L]
echo ^</IfModule^>
) > rsumeloy-deploy\.htaccess

echo.
echo ================================================
echo   SELESAI! Files siap untuk diupload
echo ================================================
echo.
echo Lokasi: rsumeloy-deploy\
echo.
echo LANGKAH SELANJUTNYA:
echo 1. Buka folder 'rsumeloy-deploy'
echo 2. Compress menjadi ZIP ^(opsional, untuk mempercepat upload^)
echo 3. Upload via FTP atau File Manager Jagoan Hosting
echo 4. Jalankan perintah di DEPLOY_INSTRUCTIONS.txt via SSH
echo.
echo CATATAN PENTING:
echo - Pastikan Node.js v18+ terinstall di hosting
echo - Pastikan port 3000 tidak diblokir
echo - Setup reverse proxy di Nginx/Apache
echo.
pause
