#!/usr/bin/env bash

# =========================================================
# xprep Calibre-Web Setup
# ---------------------------------------------------------
# This script:
#   - creates the Calibre app/library/config folders
#   - copies the default starter library
#   - creates a Python virtual environment
#   - installs Calibre-Web
#   - creates and enables the systemd service
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load helpers
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

CALIBRE_ROOT="/opt/xprep/calibre"
CALIBRE_APP="$CALIBRE_ROOT/app"
CALIBRE_LIBRARY="$CALIBRE_ROOT/library"
CALIBRE_CONFIG="$CALIBRE_ROOT/config"
CALIBRE_ASSET_LIBRARY="$ROOT_DIR/assets/calibre-library"

log "Creating Calibre directory structure"
mkdir -p "$CALIBRE_APP" "$CALIBRE_LIBRARY" "$CALIBRE_CONFIG"

log "Setting ownership for Calibre directories"
chown -R neo:neo "$CALIBRE_ROOT"

log "Copying default Calibre library"
if [ ! -f "$CALIBRE_LIBRARY/metadata.db" ]; then
  cp -r "$CALIBRE_ASSET_LIBRARY"/* "$CALIBRE_LIBRARY"/
  chown -R neo:neo "$CALIBRE_LIBRARY"
fi

log "Creating Python virtual environment for Calibre-Web"
if [ ! -d "$CALIBRE_APP/venv" ]; then
  sudo -u neo python3 -m venv "$CALIBRE_APP/venv"
fi

log "Installing Calibre-Web in virtual environment"
sudo -u neo "$CALIBRE_APP/venv/bin/pip" install --upgrade pip
sudo -u neo "$CALIBRE_APP/venv/bin/pip" install calibreweb

log "Creating xprep Calibre-Web systemd service"
cat > /etc/systemd/system/xprep-calibre.service <<EOF
[Unit]
Description=xprep Calibre-Web
After=network.target

[Service]
Type=simple
User=neo
WorkingDirectory=$CALIBRE_APP
ExecStart=$CALIBRE_APP/venv/bin/cps
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

log "Reloading systemd"
systemctl daemon-reload

log "Enabling xprep Calibre-Web service"
systemctl enable xprep-calibre.service

log "Starting xprep Calibre-Web service"
systemctl restart xprep-calibre.service

log "Calibre-Web setup complete"
