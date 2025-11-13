@echo off
echo ==========================================
echo   PREPARE FULL UPLOAD PACKAGE (FTP)
echo   Tanpa SSH - cPanel Only
echo ==========================================
echo.

echo [1/4] Cleaning previous package...
if exist rsumeloy-ftp-upload.zip del /q rsumeloy-ftp-upload.zip
if exist temp-upload rmdir /s /q temp-upload
mkdir temp-upload
echo Done!

echo.
echo [2/4] Copying necessary files...

REM Copy config files
copy package.json temp-upload\ >nul
copy package-lock.json temp-upload\ >nul
copy next.config.mjs temp-upload\ >nul
copy tsconfig.json temp-upload\ >nul
copy tailwind.config.ts temp-upload\ >nul
copy postcss.config.js temp-upload\ >nul
copy middleware.ts temp-upload\ >nul
copy next-env.d.ts temp-upload\ >nul
copy types.ts temp-upload\ >nul
copy metadata.json temp-upload\ >nul
copy server.js temp-upload\ >nul

REM Copy from rsumeloy-deploy (has .env)
copy rsumeloy-deploy\.env temp-upload\ >nul

REM Copy folders
echo   - Copying app/ folder...
xcopy /E /I /Q app temp-upload\app >nul
echo   - Copying components/ folder...
xcopy /E /I /Q components temp-upload\components >nul
echo   - Copying lib/ folder...
xcopy /E /I /Q lib temp-upload\lib >nul
echo   - Copying public/ folder...
xcopy /E /I /Q public temp-upload\public >nul
echo   - Copying types/ folder...
xcopy /E /I /Q types temp-upload\types >nul
echo   - Copying data/ folder...
xcopy /E /I /Q data temp-upload\data >nul
echo   - Copying supabase/ folder...
xcopy /E /I /Q supabase temp-upload\supabase >nul
echo   - Copying services/ folder...
xcopy /E /I /Q services temp-upload\services >nul
echo   - Copying contexts/ folder...
xcopy /E /I /Q contexts temp-upload\contexts >nul
echo   - Copying hooks/ folder...
xcopy /E /I /Q hooks temp-upload\hooks >nul

REM Copy build file
echo   - Copying next-build.zip...
copy next-build.zip temp-upload\ >nul

echo Done! All files copied.

echo.
echo [3/4] Compressing to ZIP...
powershell -command "Compress-Archive -Path 'temp-upload\*' -DestinationPath 'rsumeloy-ftp-upload.zip' -CompressionLevel Optimal -Force"
echo Done!

echo.
echo [4/4] Cleanup...
rmdir /s /q temp-upload
echo Done!

echo.
echo ==========================================
echo   PACKAGE READY FOR UPLOAD!
echo ==========================================
echo.

for %%A in (rsumeloy-ftp-upload.zip) do (
    echo File: rsumeloy-ftp-upload.zip
    echo Size: %%~zA bytes ^(~%%~zA megabytes^)
)

echo.
echo WHAT'S INSIDE:
echo   - All source code (app, components, lib, etc)
echo   - Configuration files (.env, package.json, etc)
echo   - Build files (next-build.zip)
echo   - NO node_modules (will be installed on server)
echo.
echo NEXT STEPS:
echo   1. Upload rsumeloy-ftp-upload.zip to cPanel
echo   2. Extract di /public_html/rsumeloy/
echo   3. Extract next-build.zip juga
echo   4. Follow DEPLOY-FTP-ONLY.md guide
echo.
echo ==========================================

pause
