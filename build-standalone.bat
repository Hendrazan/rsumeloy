@echo off
echo ==========================================
echo   BUILD STANDALONE FOR PRODUCTION
echo   Mode: Standalone Output
echo ==========================================
echo.

echo [1/6] Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist rsumeloy-standalone rmdir /s /q rsumeloy-standalone
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
mkdir rsumeloy-standalone
echo Done!

echo.
echo [4/6] Copying standalone output...
xcopy /E /I /Q .next\standalone rsumeloy-standalone
xcopy /E /I /Q .next\static rsumeloy-standalone\.next\static
xcopy /E /I /Q public rsumeloy-standalone\public
echo Done!

echo.
echo [5/6] Creating production .env...
echo # Production Environment Variables > rsumeloy-standalone\.env
echo NEXT_PUBLIC_SUPABASE_URL=https://jaybcyjkhjdndcinobcx.supabase.co >> rsumeloy-standalone\.env
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=%NEXT_PUBLIC_SUPABASE_ANON_KEY% >> rsumeloy-standalone\.env
echo SUPABASE_SERVICE_ROLE_KEY=%SUPABASE_SERVICE_ROLE_KEY% >> rsumeloy-standalone\.env
echo NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj >> rsumeloy-standalone\.env
echo GEMINI_API_KEY=AIzaSyCtzR5ZX-r8YHwNgTjIhfYzFpEhtGmTLRc >> rsumeloy-standalone\.env
echo NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true >> rsumeloy-standalone\.env
echo NEXT_PUBLIC_SITE_URL=https://rsumeloy.co.id >> rsumeloy-standalone\.env
echo NODE_ENV=production >> rsumeloy-standalone\.env
echo PORT=3000 >> rsumeloy-standalone\.env
echo Done!

echo.
echo [6/6] Compressing deployment package...
powershell -command "Compress-Archive -Path 'rsumeloy-standalone\*' -DestinationPath 'rsumeloy-production-deploy.zip' -Force"
echo Done!

echo.
echo ==========================================
echo   BUILD COMPLETED SUCCESSFULLY!
echo ==========================================
echo.
echo Package Information:
for %%A in (rsumeloy-production-deploy.zip) do echo   Size: %%~zA bytes (~%%~zA MB)
echo   Location: %CD%\rsumeloy-production-deploy.zip
echo.
echo Folder created: rsumeloy-standalone\
echo   - server.js (auto-generated standalone server)
echo   - .next\ (optimized build)
echo   - public\ (static assets)
echo   - .env (production config)
echo.
echo ==========================================
echo   DEPLOYMENT INSTRUCTIONS
echo ==========================================
echo.
echo 1. Upload rsumeloy-production-deploy.zip to server
echo 2. Extract di /home/rsumelo4/public_html/rsumeloy/
echo 3. Via SSH or cPanel Terminal:
echo    cd ~/public_html/rsumeloy
echo    source ~/nodevenv/public_html/rsumeloy/20/bin/activate
echo    PORT=3001 node server.js
echo.
echo    OR with PM2:
echo    pm2 delete rsumeloy
echo    PORT=3001 pm2 start server.js --name rsumeloy
echo    pm2 save
echo.
echo 4. Update .htaccess to proxy port 3001
echo 5. Website should be live!
echo.
echo ==========================================

pause
