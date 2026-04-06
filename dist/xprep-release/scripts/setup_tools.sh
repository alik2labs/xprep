#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

require_root

log "Setting up Tools..."

rm -rf /var/www/html/tools
mkdir -p /var/www/html/tools
cp "$ROOT_DIR/assets/tools/index.html" /var/www/html/tools/index.html
mkdir -p /var/www/html/tools/sections
cp "$ROOT_DIR/assets/tools/sections/"*.js /var/www/html/tools/sections/
chown -R neo:neo /var/www/html/tools

log "Tools setup complete"
