# #!/usr/bin/env bash
# set -e

# # -------- CONFIG --------
# APP_ID=3326002
# INSTALLATION_ID=122637072
# REPO_URL="https://github.com/CodePhilic-Team/CodePhilic-CORP.git"
# BRANCH="main"
# REPO_DIR="$HOME/CodePhilic/codephilic-website/frontend"
# KEY_PATH="$HOME/CodePhilic/codephilic-website/Deploy/codephilic-app.2026-04-09.private-key.pem"
# # ------------------------

# echo "🔐 Generating JWT..."

# JWT=$(python3 - <<EOF
# import jwt, time
# from pathlib import Path

# private_key = Path("$KEY_PATH").read_text()
# now = int(time.time())

# payload = {
#     "iat": now - 60,
#     "exp": now + 600,
#     "iss": $APP_ID
# }

# print(jwt.encode(payload, private_key, algorithm="RS256"))
# EOF
# )

# echo "🎫 Requesting installation token..."

# TOKEN=$(curl -s -X POST \
#   -H "Authorization: Bearer $JWT" \
#   -H "Accept: application/vnd.github+json" \
#   https://api.github.com/app/installations/$INSTALLATION_ID/access_tokens \
#   | jq -r .token)

# if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
#   echo "❌ Failed to get token"
#   exit 1
# fi

# echo "📦 Pulling frontend repo..."

# cd "$REPO_DIR"
# git fetch https://x-access-token:$TOKEN@github.com/CodePhilic-Team/CodePhilic-CORP.git
# git reset --hard FETCH_HEAD
# git clean -fd

# echo "✅ Frontend updated successfully"




#!/bin/bash

# ==========================
# CONFIGURATION
# ==========================

# GitHub App info
APP_ID=3326002
INSTALLATION_ID=122637072

# Repo info
REPO_URL="CodePhilic-Team/CodePhilic-CORP"
BRANCH="main"

# Folder where the repo will live
REPO_DIR="$HOME/CodePhilic/codephilic-website/frontend"

# Automatically use the first PEM key in Deploy folder
KEY_PATH=$(ls "$HOME/CodePhilic/codephilic-website/Deploy"/*.pem | head -n1)

# ==========================
# SCRIPT START
# ==========================

echo "🔐 Generating JWT from key: $KEY_PATH"

JWT=$(python3 - <<EOF
import jwt, time
from pathlib import Path

private_key = Path("$KEY_PATH").read_text()
now = int(time.time())

payload = {
    "iat": now - 60,
    "exp": now + 600,
    "iss": $APP_ID
}

print(jwt.encode(payload, private_key, algorithm="RS256"))
EOF
)

echo "🎫 Requesting installation token..."

TOKEN=$(curl -s -X POST \
  -H "Authorization: Bearer $JWT" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/app/installations/$INSTALLATION_ID/access_tokens \
  | jq -r .token)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "❌ Failed to get token"
  exit 1
fi

# Make sure repo folder exists
mkdir -p "$REPO_DIR"
cd "$REPO_DIR" || exit 1

# ==========================
# Clone if empty, else pull updates
# ==========================
if [ ! -d .git ]; then
    echo "📦 Repo empty, cloning..."
    git clone -b "$BRANCH" https://x-access-token:$TOKEN@github.com/$REPO_URL.git .
else
    echo "📦 Repo exists, pulling latest..."
    git fetch https://x-access-token:$TOKEN@github.com/$REPO_URL.git
    git reset --hard FETCH_HEAD
    git clean -fd
fi

echo "✅ Frontend repo updated successfully"