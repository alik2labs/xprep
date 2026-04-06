#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log() { echo "[prayer] $1"; }

log "Setting up prayer times page..."
mkdir -p /var/www/html/prayer
cp "$ROOT_DIR/assets/prayer/index.html" /var/www/html/prayer/index.html

# Add nginx location block if not already present
if ! grep -q "location /prayer/" /etc/nginx/sites-enabled/default; then
    log "Adding nginx location block..."
    sed -i '/location \/videos\/ {/a\    }\n\n    location \/prayer\/ {\n        try_files $uri $uri\/ =404;\n    ' /etc/nginx/sites-enabled/default
    nginx -t && systemctl reload nginx
    log "Nginx updated"
fi

log "Done."
