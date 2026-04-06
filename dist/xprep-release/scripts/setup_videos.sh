#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

require_root

log "Setting up Videos..."

# ---------------------------------------------------------
# Directories
# ---------------------------------------------------------
mkdir -p /opt/xprep/videos
rm -rf /var/www/html/videos
mkdir -p /var/www/html/videos

# ---------------------------------------------------------
# Viewer
# ---------------------------------------------------------
cp "$ROOT_DIR/assets/videos/index.html" /var/www/html/videos/index.html

# ---------------------------------------------------------
# Permissions
# ---------------------------------------------------------
chown -R neo:neo /opt/xprep/videos
chown -R neo:neo /var/www/html/videos

log "Videos setup complete"
