#!/usr/bin/env bash

set -e

ROOT_DIR="/home/neo/xprep-installer"
BUILD_DIR="$ROOT_DIR/dist"
RELEASE_DIR="$BUILD_DIR/xprep-release"
TARBALL="$BUILD_DIR/xprep.tar.gz"

echo "[build] Cleaning previous build..."
rm -rf "$BUILD_DIR"
mkdir -p "$RELEASE_DIR"

echo "[build] Copying installer files..."
rsync -a \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude '__pycache__' \
  --exclude '*.pyc' \
  --exclude '*.bak' \
  --exclude '*.backup*' \
  "$ROOT_DIR"/ "$RELEASE_DIR"/

echo "[build] Creating tarball..."
tar -czf "$TARBALL" -C "$BUILD_DIR" xprep-release

echo "[build] Done."
echo "[build] Output:"
echo "  $TARBALL"

source "$ROOT_DIR/config.env"
GITHUB_REPO="alik2labs/xprep"
FTP_URL="ftp://ftp.aliabuzoha.com/xprep.tar.gz"
FTP_USER="maximus@expatprepper.org:$FTP_PASSWORD"

echo "[upload] Uploading to expatprepper.org..."
curl -T "$TARBALL" "$FTP_URL" --user "$FTP_USER" --max-time 120 --retry 2 -#
echo "[upload] expatprepper.org done."

echo "[upload] Uploading to GitHub release..."
RELEASE_ID=$(curl -s   -H "Authorization: token $GITHUB_TOKEN"   https://api.github.com/repos/$GITHUB_REPO/releases/latest   | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

echo "[upload] Found GitHub release ID: $RELEASE_ID"

ASSET_ID=$(curl -s   -H "Authorization: token $GITHUB_TOKEN"   https://api.github.com/repos/$GITHUB_REPO/releases/$RELEASE_ID/assets   | python3 -c "import sys,json; assets=json.load(sys.stdin); a=[x for x in assets if x['name']=='xprep.tar.gz']; print(a[0]['id'] if a else '')")

if [ -n "$ASSET_ID" ]; then
  echo "[upload] Removing old asset..."
  curl -s -X DELETE     -H "Authorization: token $GITHUB_TOKEN"     https://api.github.com/repos/$GITHUB_REPO/releases/assets/$ASSET_ID
fi

curl -s -X POST   -H "Authorization: token $GITHUB_TOKEN"   -H "Content-Type: application/octet-stream"   -T "$TARBALL"   "https://uploads.github.com/repos/$GITHUB_REPO/releases/$RELEASE_ID/assets?name=xprep.tar.gz"   | python3 -c "import sys,json; r=json.load(sys.stdin); print('[upload] GitHub done:', r.get('browser_download_url','error'))"
