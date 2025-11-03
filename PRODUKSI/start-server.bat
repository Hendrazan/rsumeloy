@echo off
REM RSU Meloy Production Server Starter for Windows
REM Script untuk menjalankan website RSU Meloy di production

echo ================================================
echo    RSU Meloy Production Server
echo ================================================
echo.

REM Set environment
set NODE_ENV=production

REM Check if .env.local exists
if not exist .env.local (
    echo [ERROR] .env.local file not found!
    echo Please copy .env.production.template to .env.local and fill in the credentials
    echo Command: copy .env.production.template .env.local
    pause
    exit /b 1
)

REM Check if standalone directory exists
if not exist standalone (
    echo [ERROR] standalone directory not found!
    echo Please make sure you have uploaded all files correctly
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js version 18 or higher
    pause
    exit /b 1
)

REM Show Node version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%

REM Check if server.js exists
if not exist server.js (
    echo [ERROR] server.js not found!
    pause
    exit /b 1
)

echo [OK] Environment variables loaded
echo [INFO] Server will run on port 3000
echo [INFO] Access: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ------------------------------------------------
echo.

REM Start server
node server.js
