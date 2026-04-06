#!/usr/bin/env bash

# =========================================================
# xprep Shared Helper Functions
# ---------------------------------------------------------
# Reusable helpers for logging, validation, and backups.
# Every installer script can source this file.
# =========================================================

set -euo pipefail

# Print a consistent installer log line.
log() {
  echo
  echo "[xprep] $*"
}

# Ensure the script is running with root privileges.
require_root() {
  if [ "${EUID}" -ne 0 ]; then
    echo "[xprep] ERROR: Please run with sudo."
    exit 1
  fi
}

# Create a one-time backup of a file before modifying it.
# Example:
#   backup_file /etc/dnsmasq.conf
backup_file() {
  local target="$1"

  if [ -f "$target" ] && [ ! -f "${target}.bak" ]; then
    cp "$target" "${target}.bak"
  fi
}
