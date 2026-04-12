#!/usr/bin/env bash

# =========================================================
# xprep Phase 1 Main Installer
# =========================================================

set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ---------------------------------------------------------
# Validate config
# ---------------------------------------------------------
if [ ! -f "$ROOT_DIR/config.env" ]; then
  if [ -f "$ROOT_DIR/config.env.example" ]; then
    echo "[xprep] config.env not found, copying from config.env.example"
    cp "$ROOT_DIR/config.env.example" "$ROOT_DIR/config.env"
    sed -i "s/your_password_here/11223344/" "$ROOT_DIR/config.env"
  else
    echo "[xprep] ERROR: config.env not found"
    exit 1
  fi
fi

source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

require_root

cd "$ROOT_DIR"

log "Starting xprep Phase 1 installer"
log "Version: $VERSION"
mkdir -p /opt/xprep
echo "$VERSION" > /opt/xprep/version.txt
log "SSID: $WIFI_SSID"
log "Offline IP: $PORTAL_IP"

# ---------------------------------------------------------
# Validate required files
# ---------------------------------------------------------
log "Validating installer files..."

required_files=(
  "$ROOT_DIR/config.env"
  "$ROOT_DIR/scripts/install_packages.sh"
  "$ROOT_DIR/scripts/setup_network.sh"
  "$ROOT_DIR/scripts/setup_dnsmasq.sh"
  "$ROOT_DIR/scripts/setup_boot_network.sh"
  "$ROOT_DIR/scripts/setup_portal.sh"
  "$ROOT_DIR/scripts/setup_admin.sh"
  "$ROOT_DIR/scripts/setup_calibre.sh"
  "$ROOT_DIR/scripts/setup_kiwix.sh"
  "$ROOT_DIR/scripts/enable_services.sh"
  "$ROOT_DIR/scripts/setup_videos.sh"
  "$ROOT_DIR/scripts/setup_documents.sh"
  "$ROOT_DIR/scripts/setup_tools.sh"
  "$ROOT_DIR/scripts/setup_prayer.sh"
  "$ROOT_DIR/scripts/setup_games.sh"
  "$ROOT_DIR/scripts/setup_maps.sh"
  "$ROOT_DIR/scripts/setup_expat.sh"
  "$ROOT_DIR/scripts/setup_kolibri.sh"
)

for f in "${required_files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "[xprep] ERROR: Missing file: $f"
    exit 1
  fi
done

# ---------------------------------------------------------
# Install steps
# ---------------------------------------------------------

log "Installing packages..."
bash "$ROOT_DIR/scripts/install_packages.sh"

log "Setting up network..."
bash "$ROOT_DIR/scripts/setup_network.sh"

log "Setting up dnsmasq..."
bash "$ROOT_DIR/scripts/setup_dnsmasq.sh"

log "Setting up boot network..."
bash "$ROOT_DIR/scripts/setup_boot_network.sh"

log "Setting up portal..."
bash "$ROOT_DIR/scripts/setup_portal.sh"

log "Setting up admin..."
bash "$ROOT_DIR/scripts/setup_admin.sh"

log "Setting up calibre..."
bash "$ROOT_DIR/scripts/setup_calibre.sh"

log "Setting up kiwix..."
bash "$ROOT_DIR/scripts/setup_kiwix.sh"

log "Setting up maps..."
bash "$ROOT_DIR/scripts/setup_maps.sh"

log "Setting up tools..."
bash "$ROOT_DIR/scripts/setup_tools.sh"
bash "$ROOT_DIR/scripts/setup_prayer.sh"
bash "$ROOT_DIR/scripts/setup_games.sh"
bash "$ROOT_DIR/scripts/setup_expat.sh"

log "Setting up documents..."
bash "$ROOT_DIR/scripts/setup_documents.sh"

log "Setting up videos..."
bash "$ROOT_DIR/scripts/setup_videos.sh"

log "Setting up kolibri..."
bash "$ROOT_DIR/scripts/setup_kolibri.sh"

log "Setting up device registry ping..."
mkdir -p /opt/xprep
cp "$ROOT_DIR/scripts/ping_home.py" /opt/xprep/ping_home.py
chmod +x /opt/xprep/ping_home.py

log "Enabling services..."
bash "$ROOT_DIR/scripts/enable_services.sh"

# ---------------------------------------------------------
# Final checks
# ---------------------------------------------------------

if systemctl is-active --quiet xprep-kiwix.service; then
  log "Kiwix service running on port 8084"
else
  echo "[xprep] WARNING: Kiwix service not running"
fi

log "Phase 1 install complete"
log "Wi-Fi SSID: $WIFI_SSID"
log "Access URL: http://$PORTAL_IP/"
