#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
log() { echo "[expat] $1"; }
log "Setting up ExpatPrepper offline page..."
mkdir -p /var/www/html/expat
cp "$ROOT_DIR/assets/expat/index.html" /var/www/html/expat/index.html
cp "$ROOT_DIR/assets/expat/papaparse.min.js" /var/www/html/expat/papaparse.min.js
if [ -f "$ROOT_DIR/assets/expat/logo.png" ]; then
    cp "$ROOT_DIR/assets/expat/logo.png" /var/www/html/expat/logo.png
fi
if [ -f "$ROOT_DIR/assets/expat/prepper-apps-sm.png" ]; then
    cp "$ROOT_DIR/assets/expat/prepper-apps-sm.png" /var/www/html/expat/prepper-apps-sm.png
fi
if [ -f "$ROOT_DIR/assets/expat/checklist.pdf" ]; then
    cp "$ROOT_DIR/assets/expat/checklist.pdf" /var/www/html/expat/checklist.pdf
fi
if ! grep -q "location /expat/" /etc/nginx/sites-enabled/default; then
    log "Adding nginx location block..."
    sed -i '/location \/games\/ {/a\    }\n\n    location \/expat\/ {\n        try_files $uri $uri\/ =404;\n    ' /etc/nginx/sites-enabled/default
    nginx -t && systemctl reload nginx
fi
log "Done."
