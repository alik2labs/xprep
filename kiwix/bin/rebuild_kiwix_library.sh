#!/usr/bin/env bash
set -euo pipefail

DATA_DIR="/opt/xprep/kiwix/data"
CONFIG_DIR="/opt/xprep/kiwix/config"
LIBRARY="$CONFIG_DIR/library.xml"

mkdir -p "$CONFIG_DIR"
rm -f "$LIBRARY"

for zim in "$DATA_DIR"/*.zim; do
  [ -e "$zim" ] || continue
  kiwix-manage "$LIBRARY" add "$zim"
done

echo "Library rebuilt at $LIBRARY"
