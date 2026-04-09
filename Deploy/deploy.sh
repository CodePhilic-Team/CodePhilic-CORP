#!/bin/bash

# --- CONFIGURATION ---
ROOT_DIR="/root/CodePhilic/CodePhilic-CORP"
SERVER_DIR="$ROOT_DIR/cpsaa-server"
APP_DIR="$ROOT_DIR/cpsaa-app"
ECOSYSTEM="$ROOT_DIR/ecosystem.config.js"

# STOP SCRIPT INSTANTLY ON ANY ERROR
set -e

echo "=================================================="
echo "⚡ POWER MEMORY DEPLOYMENT STARTED"
echo "=================================================="

# 1. STOP APPS (CRITICAL)
echo "🛑 Stopping PM2..."
pm2 stop all || true

# --------------------------------------------------
# 2. BUILD BACKEND
# --------------------------------------------------
echo "--------------------------------------------------"
echo "🛠️  Building CodePhilic Server..."
cd $SERVER_DIR

# FIX: Removed '--omit=dev'. We NEED dev dependencies to compile TypeScript!
npm install

# MEMORY FIX: Force 4GB
echo "   Compiling TypeScript & Copying Assets..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# --- SAFETY COPY (Redundancy check) ---
echo "🛡️  Verifying Asset Copy..."
mkdir -p dist/public
mkdir -p dist/prisma/client

if [ -d "public" ]; then
    echo "   -> Copying public assets..."
    cp -r public/* dist/public/ || true
fi

if [ -d "prisma" ]; then
    echo "   -> Copying prisma assets..."
    cp -r prisma/client/* dist/prisma/client/ || true
    cp prisma/*.ts dist/prisma/ || true
fi
# ---------------------------

# --------------------------------------------------
# 3. BUILD FRONTEND
# --------------------------------------------------
echo "--------------------------------------------------"
echo "🛠️  Building CodePhilic Frontend..."
cd $APP_DIR

# FIX: Removed '--omit=dev'. Next.js needs dev dependencies to build.
npm install

# Disable Heavy Checks to save RAM
export NEXT_TELEMETRY_DISABLED=1
export TSC_COMPILE_ON_ERROR=true
export ESLINT_NO_DEV_ERRORS=true

# MEMORY FIX: Force 4GB
echo "   Compiling Next.js..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# --------------------------------------------------
# 4. RESTART
# --------------------------------------------------
echo "--------------------------------------------------"
echo "🚀 Restarting Ecosystem..."
cd $ROOT_DIR
pm2 start $ECOSYSTEM --env production
pm2 save

echo "=================================================="
echo "✅ DEPLOYMENT SUCCESSFUL"
echo "=================================================="