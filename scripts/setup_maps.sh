#!/usr/bin/env bash
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"
require_root

log "Setting up Maps..."

# Directories
mkdir -p /opt/xprep/maps/data
chown -R neo:neo /opt/xprep/maps/

# Web files
mkdir -p /var/www/html/maps/vendor
cp "$ROOT_DIR/assets/maps/index.html" /var/www/html/maps/index.html
cp "$ROOT_DIR/assets/maps/vendor/"* /var/www/html/maps/vendor/

# Symlink data directory
ln -sf /opt/xprep/maps/data /var/www/html/maps/data

# Install pmtiles CLI
log "Installing pmtiles CLI..."
ARCH=$(uname -m)
case "$ARCH" in
  aarch64) PMTILES_URL="https://github.com/protomaps/go-pmtiles/releases/download/v1.30.1/go-pmtiles_1.30.1_Linux_arm64.tar.gz" ;;
  x86_64)  PMTILES_URL="https://github.com/protomaps/go-pmtiles/releases/download/v1.30.1/go-pmtiles_1.30.1_Linux_x86_64.tar.gz" ;;
  *) log "Unsupported architecture: $ARCH"; exit 1 ;;
esac

if [ ! -f "/usr/local/bin/pmtiles" ]; then
  curl -sL "$PMTILES_URL" -o /tmp/pmtiles.tar.gz
  tar -xzf /tmp/pmtiles.tar.gz -C /tmp/
  mv /tmp/pmtiles /usr/local/bin/pmtiles
  chmod +x /usr/local/bin/pmtiles
  rm -f /tmp/pmtiles.tar.gz
  log "pmtiles installed: $(pmtiles version)"
else
  log "pmtiles already installed"
fi

# Download global base map (zoom 0-6, ~43MB)
if [ ! -f "/opt/xprep/maps/data/base.pmtiles" ]; then
  log "Downloading global base map (~43MB)..."
  pmtiles extract "https://build.protomaps.com/20260401.pmtiles" \
    /opt/xprep/maps/data/base.pmtiles \
    --maxzoom=6 \
    --download-threads=4
  log "Global base map installed"
else
  log "Global base map already installed"
fi

# Nginx location
if ! grep -q "location /maps/" /etc/nginx/sites-enabled/default; then
  log "Adding nginx maps location..."
  python3 - << 'PYBLOCK'
from pathlib import Path
p = Path("/etc/nginx/sites-enabled/default")
c = p.read_text()
api_maps = """    location /api/maps {
        proxy_pass http://127.0.0.1:8080/api/maps;
        proxy_set_header Host $host;
        add_header Access-Control-Allow-Origin *;
    }

"""
maps_loc = """    location /maps/ {
        try_files $uri $uri/ =404;
        add_header Access-Control-Allow-Origin *;
        add_header Accept-Ranges bytes;
    }

"""
c = c.replace("    location /expat/ {", api_maps + maps_loc + "    location /expat/ {")
p.write_text(c)
PYBLOCK
  nginx -t && systemctl reload nginx
fi

chown -R neo:neo /var/www/html/maps/
log "Maps setup complete"
