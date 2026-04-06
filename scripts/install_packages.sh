#!/usr/bin/env bash

# =========================================================
# xprep Package Installer
# ---------------------------------------------------------
# Installs the software needed for Phase 1:
#   - nginx    web server / portal
#   - hostapd  Wi-Fi access point
#   - dnsmasq  DHCP + DNS
#   - rfkill   control Wi-Fi radio state
#   - Flask    admin web interface
#
# This script also stops services so configs can be safely
# written before they are started again.
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load shared helpers
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

log "Ensuring system time is correct"
timedatectl set-ntp true || true
systemctl restart systemd-timesyncd || true
sleep 5

log "Updating package list"
apt update

log "Installing required packages"
DEBIAN_FRONTEND=noninteractive apt install -y nginx hostapd dnsmasq rfkill python3-flask python3-venv python3-pip kiwix-tools jq curl

log "Installing Kolibri"
pip install kolibri --break-system-packages

# Stop services during setup so config files are not in use
log "Stopping services for setup"
systemctl stop hostapd || true
systemctl stop dnsmasq || true
systemctl stop nginx || true
