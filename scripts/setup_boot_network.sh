#!/usr/bin/env bash

# =========================================================
# xprep Boot Network Service Setup
# ---------------------------------------------------------
# This script creates:
#   - /usr/local/bin/xprep-network.sh
#   - /etc/systemd/system/xprep-network.service
#
# Why:
# On boot, wlan0 must be:
#   - unblocked
#   - assigned the hotspot IP
#   - brought up before hostapd starts
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load config and helpers
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

log "Creating boot-time network script"

cat > /usr/local/bin/xprep-network.sh <<EOBIN
#!/usr/bin/env bash

# Unblock Wi-Fi in case it was soft-blocked
rfkill unblock all
sleep 2

# Reset interface and assign hotspot IP
ip link set $WIFI_INTERFACE down || true
ip addr flush dev $WIFI_INTERFACE || true
ip addr add $PORTAL_IP/$PORTAL_CIDR dev $WIFI_INTERFACE
ip link set $WIFI_INTERFACE up
EOBIN

chmod +x /usr/local/bin/xprep-network.sh

log "Creating systemd service for boot-time network setup"

cat > /etc/systemd/system/xprep-network.service <<EOF2
[Unit]
Description=xprep network setup
Before=hostapd.service
After=NetworkManager.service network.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/xprep-network.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF2

log "Reloading systemd and enabling xprep-network service"
systemctl daemon-reexec
systemctl daemon-reload
systemctl enable xprep-network.service

log "Boot network service setup complete"
