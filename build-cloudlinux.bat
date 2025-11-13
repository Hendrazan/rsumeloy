@echo off
echo ==========================================
echo   BUILD FOR CLOUDLINUX HOSTING
echo   Mode: Standalone (No node_modules)
echo ==========================================
echo.

echo [1/6] Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist rsumeloy-cloudlinux rmdir /s /q rsumeloy-cloudlinux
echo Done!

echo.
echo [2/6] Building Next.js in standalone mode...
echo This will take 2-5 minutes...
call npm run build
if errorlevel 1 (
    echo.
    echo ========================================== 
    echo   BUILD FAILED!
    echo ==========================================
    pause
    exit /b 1
)
echo Done!

echo.
echo [3/6] Creating deployment package...
mkdir rsumeloy-cloudlinux
echo Done!

echo.
echo [4/6] Copying standalone files (WITHOUT node_modules)...
echo Copying server.js...
copy .next\standalone\server.js rsumeloy-cloudlinux\
echo Copying package.json...
copy package-production.json rsumeloy-cloudlinux\package.json
echo Copying .next folder...
xcopy /E /I /Q .next\standalone\.next rsumeloy-cloudlinux\.next
echo Copying static files...
xcopy /E /I /Q .next\static rsumeloy-cloudlinux\.next\static
echo Copying public folder...
xcopy /E /I /Q public rsumeloy-cloudlinux\public
echo Copying .htaccess...
copy .htaccess-passenger rsumeloy-cloudlinux\.htaccess
echo Copying app folder (if exists)...
if exist .next\standalone\app xcopy /E /I /Q .next\standalone\app rsumeloy-cloudlinux\app
echo Copying data folder (if exists)...
if exist .next\standalone\data xcopy /E /I /Q .next\standalone\data rsumeloy-cloudlinux\data
echo.
echo ⚠️  SKIPPING node_modules (CloudLinux will create symlink)
echo Done!

echo.
echo [5/6] Creating production .env...
echo # Production Environment Variables > rsumeloy-cloudlinux\.env
echo NEXT_PUBLIC_SUPABASE_URL=https://jaybcyjkhjdndcinobcx.supabase.co >> rsumeloy-cloudlinux\.env
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=%NEXT_PUBLIC_SUPABASE_ANON_KEY% >> rsumeloy-cloudlinux\.env
echo SUPABASE_SERVICE_ROLE_KEY=%SUPABASE_SERVICE_ROLE_KEY% >> rsumeloy-cloudlinux\.env
echo NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj >> rsumeloy-cloudlinux\.env
echo GEMINI_API_KEY=AIzaSyCtzR5ZX-r8YHwNgTjIhfYzFpEhtGmTLRc >> rsumeloy-cloudlinux\.env
echo NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true >> rsumeloy-cloudlinux\.env
echo NEXT_PUBLIC_SITE_URL=https://rsumeloy.co.id >> rsumeloy-cloudlinux\.env
echo NODE_ENV=production >> rsumeloy-cloudlinux\.env
echo PORT=3001 >> rsumeloy-cloudlinux\.env
echo Done!

echo.
echo [6/6] Compressing deployment package...
powershell -command "Compress-Archive -Path 'rsumeloy-cloudlinux\*' -DestinationPath 'rsumeloy-cloudlinux-deploy.zip' -Force"
echo Done!

echo.
echo ==========================================
echo   BUILD COMPLETED SUCCESSFULLY!
echo ==========================================
echo.
echo Package Information:
for %%A in (rsumeloy-cloudlinux-deploy.zip) do echo   Size: %%~zA bytes
echo   Location: %CD%\rsumeloy-cloudlinux-deploy.zip
echo.
echo Folder created: rsumeloy-cloudlinux\
echo   - server.js (standalone entry point)
echo   - .next\ (optimized build with bundled deps)
echo   - public\ (static assets)
echo   - .env (production config)
echo   - NO node_modules (CloudLinux handles this)
echo.
echo ==========================================
echo   CLOUDLINUX DEPLOYMENT INSTRUCTIONS
echo ==========================================
echo.
echo 1. Upload rsumeloy-cloudlinux-deploy.zip to server
echo 2. Extract to /home/rsumelo4/public_html/rsumeloy/
echo 3. In cPanel: Setup Application
echo    - Go to "NodeJS Selector"
echo    - Click "Setup"
echo    - Application Root: public_html/rsumeloy
echo    - Application URL: rsumeloy.co.id
echo    - Node.js Version: 20.x
echo    - Run "npm install" (CloudLinux will create symlink)
echo.
echo 4. Start Application:
echo    - Application Startup File: server.js
echo    - Click "Restart"
echo.
echo 5. Update .htaccess in public_html/:
echo    RewriteEngine On
echo    RewriteCond %%{REQUEST_URI} !^/\.well-known/ [NC]
echo    RewriteCond %%{REQUEST_URI} !^/cpanel [NC]
echo    RewriteRule ^(.*)$ http://127.0.0.1:3001/$1 [P,L]
echo.
echo ==========================================
echo.
pause
