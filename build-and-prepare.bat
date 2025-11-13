@echo off
echo ==========================================
echo   BUILD NEXT.JS FOR PRODUCTION (1GB RAM)
echo ==========================================
echo.

echo [1/5] Cleaning previous build...
if exist .next rmdir /s /q .next
if exist next-build.zip del /q next-build.zip
echo ✓ Clean completed

echo.
echo [2/5] Building Next.js application...
echo This may take 2-5 minutes...
call npm run build
if errorlevel 1 (
    echo ✗ Build failed!
    pause
    exit /b 1
)
echo ✓ Build completed

echo.
echo [3/5] Compressing .next folder...
powershell -command "Compress-Archive -Path '.next' -DestinationPath 'next-build.zip' -Force"
if errorlevel 1 (
    echo ✗ Compression failed!
    pause
    exit /b 1
)
echo ✓ Compression completed

echo.
echo [4/5] Creating upload script...
echo cd ~/public_html/rsumeloy > upload-instructions.txt
echo # 1. Upload next-build.zip via cPanel File Manager >> upload-instructions.txt
echo # 2. Extract dengan perintah: >> upload-instructions.txt
echo unzip -o next-build.zip >> upload-instructions.txt
echo rm next-build.zip >> upload-instructions.txt
echo # 3. Start aplikasi: >> upload-instructions.txt
echo pm2 delete rsumeloy 2^>^/dev/null ^|^| true >> upload-instructions.txt
echo pm2 start npm --name "rsumeloy" -- start >> upload-instructions.txt
echo pm2 save >> upload-instructions.txt
echo pm2 list >> upload-instructions.txt
echo ✓ Instructions created

echo.
echo [5/5] Summary
echo ==========================================
echo ✓ Build folder: .next/
echo ✓ Compressed file: next-build.zip (ready to upload)
echo ✓ Upload instructions: upload-instructions.txt
echo.
echo FILE SIZE:
for %%A in (next-build.zip) do echo   next-build.zip: %%~zA bytes
echo.
echo NEXT STEPS:
echo 1. Upload next-build.zip to server via cPanel
echo 2. SSH to server and run commands in upload-instructions.txt
echo 3. Access https://rsumeloy.co.id
echo ==========================================

pause
