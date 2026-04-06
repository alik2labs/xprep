#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT_DIR/scripts/common.sh"
require_root

log "Setting up Kiwix"

mkdir -p /opt/xprep/kiwix/bin
mkdir -p /opt/xprep/kiwix/catalog
mkdir -p /opt/xprep/kiwix/config
mkdir -p /opt/xprep/kiwix/data
mkdir -p /opt/xprep/kiwix/tmp
mkdir -p /opt/xprep/kiwix/state

# Kiwix helper scripts are already installed inside /opt/xprep/kiwix/bin
# by the release package, so do not copy them again here.

chmod +x /opt/xprep/kiwix/bin/*

cat > /opt/xprep/kiwix/state/queue.json <<'QEOF'
[]
QEOF

cat > /opt/xprep/kiwix/state/status.json <<'QEOF'
{
  "state": "idle",
  "current_id": "",
  "title": "",
  "filename": "",
  "downloaded_bytes": 0,
  "total_bytes": 0,
  "speed_bps": 0,
  "elapsed_seconds": 0,
  "eta_seconds": 0,
  "queue": [],
  "last_error": "",
  "updated_at": 0
}
QEOF

cat > /etc/systemd/system/xprep-kiwix.service <<'QEOF'
[Unit]
Description=xprep Kiwix
After=network.target

[Service]
Type=simple
User=neo
WorkingDirectory=/opt/xprep/kiwix
ExecStart=/bin/bash -lc '/usr/bin/kiwix-serve --port=8084 --library /opt/xprep/kiwix/config/library.xml'
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
QEOF

systemctl daemon-reload
systemctl enable xprep-kiwix.service

chown -R neo:neo /opt/xprep/kiwix

if [ ! -f /opt/xprep/kiwix/config/library.xml ]; then
  cat > /opt/xprep/kiwix/config/library.xml <<'EOF'
<library version="1.0">
</library>
EOF
fi


log "Kiwix setup complete"
