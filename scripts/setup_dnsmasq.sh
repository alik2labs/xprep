#!/usr/bin/env bash

# =========================================================
# xprep DHCP + DNS Configuration
# ---------------------------------------------------------
# dnsmasq provides:
#   - DHCP: gives IP addresses to connected devices
#   - DNS: resolves all domains to the local portal
#
# Note:
# HTTP sites will redirect to the portal.
# HTTPS sites may not due to certificate restrictions.
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load config and helpers
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root

log "Writing dnsmasq configuration"

# Backup existing config once (safety)
backup_file /etc/dnsmasq.conf

# Write new config
cat > /etc/dnsmasq.conf <<EOCFG
interface=$WIFI_INTERFACE
dhcp-range=$DHCP_RANGE_START,$DHCP_RANGE_END,255.255.255.0,$DHCP_LEASE
address=/#/$PORTAL_IP
EOCFG

log "dnsmasq setup written"
