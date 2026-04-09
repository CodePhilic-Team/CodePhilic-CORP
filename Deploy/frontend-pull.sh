#!/usr/bin/env bash
set -e

# -------- CONFIG --------
APP_ID=3326002
INSTALLATION_ID=122637072
REPO_URL="https://github.com/CodePhilic-Team/CodePhilic-CORP.git"
BRANCH="main"
REPO_DIR="$HOME/CodePhilic/CPSAA/cpsaa-app"
KEY_PATH="$HOME/CodePhilic/cpsaa-droplet-pull.2026-02-01.private-key.pem"
# ------------------------

echo "🔐 Generating JWT..."

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

echo "📦 Pulling frontend repo..."

cd "$REPO_DIR"
git fetch https://x-access-token:$TOKEN@github.com/CodePhilic-Team/CodePhilic-CORP.git
git reset --hard FETCH_HEAD
git clean -fd

echo "✅ Frontend updated successfully"
