#!/usr/bin/env bash

# =========================================================
# xprep Admin Service Setup
# ---------------------------------------------------------
# This script:
#   - creates the systemd service for the admin app
#   - reloads systemd
#   - enables the service at boot
#   - starts or restarts the service
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load helpers
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

log "Creating xprep admin systemd service"

cat > /etc/systemd/system/xprep-admin.service <<EOF
[Unit]
Description=xprep Admin Web Interface
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$ROOT_DIR
ExecStart=/usr/bin/python3 $ROOT_DIR/admin_app.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

log "Reloading systemd"
systemctl daemon-reload

log "Enabling xprep admin service"
systemctl enable xprep-admin.service

log "Starting xprep admin service"
systemctl restart xprep-admin.service

log "Admin service setup complete"
