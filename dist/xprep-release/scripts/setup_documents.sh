#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

require_root

log "Setting up Documents..."

# ---------------------------------------------------------
# Directories
# ---------------------------------------------------------
mkdir -p /opt/xprep/documents
rm -rf /var/www/html/documents
mkdir -p /var/www/html/documents

# ---------------------------------------------------------
# Viewer + vendor libraries
# ---------------------------------------------------------
cp "$ROOT_DIR/assets/documents/index.html" /var/www/html/documents/index.html
mkdir -p /var/www/html/documents/vendor
cp "$ROOT_DIR/assets/documents/vendor/"*.js /var/www/html/documents/vendor/

# ---------------------------------------------------------
# Nginx route (if not already present)
# ---------------------------------------------------------
python3 - <<'EOPY'
from pathlib import Path

p = Path("/etc/nginx/sites-enabled/default")
content = p.read_text()

if "/api/documents" not in content:
    block = """
    location /api/documents {
        proxy_pass http://127.0.0.1:8080/api/documents;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_buffering off;
    }

    location /documents/ {
        try_files $uri $uri/ =404;
    }
"""
    content = content.replace(
        "    location /api/videos {",
        block + "    location /api/videos {"
    )
    p.write_text(content)
    print("Nginx updated")
else:
    print("Nginx already configured")
EOPY

nginx -t && systemctl reload nginx

# ---------------------------------------------------------
# Permissions
# ---------------------------------------------------------
chown -R neo:neo /opt/xprep/documents
chown -R neo:neo /var/www/html/documents

log "Documents setup complete"
