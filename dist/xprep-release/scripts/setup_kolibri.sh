#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT_DIR/scripts/common.sh"
require_root

log "Setting up Kolibri..."

# ---------------------------------------------------------
# Directories
# ---------------------------------------------------------
mkdir -p /opt/xprep/kolibri
chown -R neo:neo /opt/xprep/kolibri

# ---------------------------------------------------------
# Initialize Kolibri database
# ---------------------------------------------------------
log "Initializing Kolibri database..."
KOLIBRI_HOME=/opt/xprep/kolibri kolibri manage migrate 2>&1 | tail -5

# ---------------------------------------------------------
# Configure Kolibri port
# ---------------------------------------------------------
KOLIBRI_HOME=/opt/xprep/kolibri kolibri configure allow_guest_access --value=True 2>/dev/null || true

# ---------------------------------------------------------
# Systemd service
# ---------------------------------------------------------
cat > /etc/systemd/system/xprep-kolibri.service <<'EOF'
[Unit]
Description=xPrep Kolibri Learning Platform
After=network.target

[Service]
Type=simple
User=neo
Environment=KOLIBRI_HOME=/opt/xprep/kolibri
ExecStart=/usr/local/bin/kolibri start --foreground --port=8090
Restart=always
RestartSec=5
WorkingDirectory=/opt/xprep/kolibri

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable xprep-kolibri.service
systemctl restart xprep-kolibri.service

log "Kolibri setup complete — running on port 8090"
