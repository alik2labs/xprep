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
