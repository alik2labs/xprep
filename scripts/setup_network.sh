#!/usr/bin/env bash

# =========================================================
# xprep Hotspot Network Configuration
# ---------------------------------------------------------
# This script:
#   - writes hostapd config (Wi-Fi access point)
#   - ensures hostapd uses that config
#   - tells NetworkManager to ignore wlan0
#
# Why:
# hostapd needs full control of wlan0. If NetworkManager
# manages it, the hotspot will fail after reboot.
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load config and helpers
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

log "Writing hostapd configuration"
mkdir -p /etc/hostapd

cat > /etc/hostapd/hostapd.conf <<EOCFG
interface=$WIFI_INTERFACE
driver=nl80211
ssid=$WIFI_SSID
hw_mode=g
channel=$WIFI_CHANNEL
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=$WIFI_PASSWORD
wpa_key_mgmt=WPA-PSK
wpa_pairwise=CCMP
rsn_pairwise=CCMP
EOCFG

# Ensure hostapd uses this config file
if grep -q '^#DAEMON_CONF=' /etc/default/hostapd; then
  sed -i 's|^#DAEMON_CONF=.*|DAEMON_CONF="/etc/hostapd/hostapd.conf"|' /etc/default/hostapd
elif grep -q '^DAEMON_CONF=' /etc/default/hostapd; then
  sed -i 's|^DAEMON_CONF=.*|DAEMON_CONF="/etc/hostapd/hostapd.conf"|' /etc/default/hostapd
else
  echo 'DAEMON_CONF="/etc/hostapd/hostapd.conf"' >> /etc/default/hostapd
fi

# Prevent NetworkManager from interfering with wlan0
log "Configuring NetworkManager to ignore $WIFI_INTERFACE"
mkdir -p /etc/NetworkManager/conf.d

cat > /etc/NetworkManager/conf.d/unmanaged-wlan0.conf <<EONM
[keyfile]
unmanaged-devices=interface-name:$WIFI_INTERFACE
EONM

# Restart NetworkManager so changes take effect
systemctl restart NetworkManager || true

log "Network setup written"
