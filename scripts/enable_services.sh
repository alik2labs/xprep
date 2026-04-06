#!/usr/bin/env bash

# =========================================================
# xprep Service Enablement
# ---------------------------------------------------------
# This script:
#   - enables required services at boot
#   - ensures Wi-Fi is unblocked
#   - configures wlan0 with the hotspot IP
#   - starts/restarts all services
#
# This allows the system to work immediately without reboot.
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load config and helpers
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

log "Unmasking and enabling hostapd"
systemctl unmask hostapd || true
systemctl enable hostapd

log "Enabling dnsmasq and nginx"
systemctl enable dnsmasq
systemctl enable nginx

# Some systems leave Wi-Fi soft-blocked after changes
log "Unblocking Wi-Fi radio"
rfkill unblock all || true
sleep 2

log "Bringing down $WIFI_INTERFACE before reconfiguring"
ip link set "$WIFI_INTERFACE" down || true
ip addr flush dev "$WIFI_INTERFACE" || true

log "Assigning static IP $PORTAL_IP/$PORTAL_CIDR to $WIFI_INTERFACE"
ip addr add "$PORTAL_IP/$PORTAL_CIDR" dev "$WIFI_INTERFACE"

log "Bringing up $WIFI_INTERFACE"
ip link set "$WIFI_INTERFACE" up

log "Restarting services"
systemctl restart hostapd
systemctl restart dnsmasq
systemctl restart nginx

log "Services enabled and restarted"

systemctl enable xprep-kiwix.service || true
systemctl restart xprep-kiwix.service || true
