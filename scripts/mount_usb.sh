#!/usr/bin/env bash

# =========================================================
# xprep USB Mount Script
# ---------------------------------------------------------
# This script:
#   - finds the first attached USB partition
#   - mounts it at /mnt/xprep-usb
#   - prints the result
#
# Current scope:
#   - first USB partition only
#   - read/write mount using automatic filesystem detection
# =========================================================

set -euo pipefail

MOUNT_POINT="/mnt/xprep-usb"

echo "[xprep-usb] Looking for USB storage devices..."

# Find the first partition on a removable USB disk.
# Example output could be /dev/sda1

USB_PARTITION="$(
  lsblk -pnro NAME,TYPE,PKNAME |
  while read -r name type pkname; do
    if [ "$type" = "part" ] && [ -n "${pkname:-}" ]; then
      parent_tran="$(lsblk -dnro TRAN "$pkname" 2>/dev/null || true)"

      if [ "$parent_tran" = "usb" ]; then
        echo "$name"
        break
      fi
    fi
  done
)"

if [ -z "${USB_PARTITION:-}" ]; then
  echo "[xprep-usb] No USB storage device found."
  exit 1
fi

echo "[xprep-usb] Found device: $USB_PARTITION"

# Unmount existing mount if needed
if mountpoint -q "$MOUNT_POINT"; then
  echo "[xprep-usb] Unmounting existing device from $MOUNT_POINT"
  umount "$MOUNT_POINT"
fi

# Ensure mount point exists
mkdir -p "$MOUNT_POINT"

# Mount the USB partition
mount "$USB_PARTITION" "$MOUNT_POINT"

echo "[xprep-usb] Mounted $USB_PARTITION at $MOUNT_POINT"
