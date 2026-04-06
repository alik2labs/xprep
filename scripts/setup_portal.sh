#!/usr/bin/env bash

# =========================================================
# xprep Local Portal Setup
# ---------------------------------------------------------
# This script:
#   - creates the web root and content folders
#   - writes the homepage
#   - adds placeholder README files
#   - enables nginx directory listing for Phase 1
#
# Phase 1 keeps the portal simple on purpose.
# =========================================================

set -euo pipefail

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Load config and helpers
source "$ROOT_DIR/config.env"
source "$ROOT_DIR/scripts/common.sh"

# Must run as root
require_root


log "Creating portal folders"
mkdir -p "$WEB_ROOT"
mkdir -p "$LIBRARY_DIR"
mkdir -p "$WEB_ROOT/usb"


log "Creating USB mount point"
mkdir -p /mnt/xprep-usb
chmod 755 /mnt/xprep-usb

log "Setting up Calibre library"

CALIBRE_SRC="$ROOT_DIR/assets/calibre-library"
CALIBRE_DEST="/opt/xprep/calibre/library"

mkdir -p /opt/xprep/calibre

# Only copy if library doesn't already exist
if [ ! -f "$CALIBRE_DEST/metadata.db" ]; then
  log "Copying default Calibre library"
  mkdir -p "$CALIBRE_DEST"
  cp -r "$CALIBRE_SRC"/* "$CALIBRE_DEST"/
fi

log "Deploying fonts"
mkdir -p /var/www/html/fonts
cp "$ROOT_DIR/assets/fonts/"*.ttf /var/www/html/fonts/
chown -R neo:neo /var/www/html/fonts

log "Writing homepage"


python3 - "$ROOT_DIR" "$WEB_ROOT" <<'EOPY'

import json
import sys
from pathlib import Path

root_dir = Path(sys.argv[1])
web_root = Path(sys.argv[2])

template_path = root_dir / "assets" / "index.html"
config_path = root_dir / "assets" / "enabled_sections.json"
output_path = web_root / "index.html"

template = template_path.read_text()
config = json.loads(config_path.read_text())

cards = []

ICONS = {
    "documents": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="20" height="26" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M22 4v8h6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="18" x2="24" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="22" x2="24" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "usb": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="12" y="6" width="16" height="22" rx="3" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="28" x2="20" y2="35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="16" y="10" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><line x1="15" y1="19" x2="25" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="23" x2="25" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "videos": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="4" y="10" width="24" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M28 16l8-5v16l-8-5V16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    "kiwix": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="6" height="26" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="15" y="8" width="6" height="26" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M24 8l6 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M30 8l4 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "kolibri": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M20 4l3.5 7 7.5 1-5.5 5.5 1.5 8L20 22l-7 3.5 1.5-8L9 12l7.5-1L20 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="30" x2="28" y2="30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="34" x2="25" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "calibre": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M8 6h18a2 2 0 012 2v24a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5"/><path d="M6 34c4-3 10-3 14 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
}

def make_card(href, icon_key, title, sub, desc, onclick=None):
    icon = ICONS.get(icon_key, "")
    if onclick:
        return f'''<a class="card" href="#" onclick="{onclick}; return false;">{icon}<div class="card-title">{title}</div><div class="card-sub">{sub}</div><div class="card-desc">{desc}</div></a>'''
    return f'''<a class="card" href="{href}">{icon}<div class="card-title">{title}</div><div class="card-sub">{sub}</div><div class="card-desc">{desc}</div></a>'''

ICONS = {
    "documents": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="20" height="26" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M22 4v8h6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="18" x2="24" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="22" x2="24" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "usb": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="12" y="6" width="16" height="22" rx="3" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="28" x2="20" y2="35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="16" y="10" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><line x1="15" y1="19" x2="25" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="23" x2="25" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "videos": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="4" y="10" width="24" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M28 16l8-5v16l-8-5V16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    "kiwix": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="6" height="26" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="15" y="8" width="6" height="26" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M24 8l6 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M30 8l4 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "kolibri": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M20 4l3.5 7 7.5 1-5.5 5.5 1.5 8L20 22l-7 3.5 1.5-8L9 12l7.5-1L20 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="30" x2="28" y2="30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="34" x2="25" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "calibre": '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M8 6h18a2 2 0 012 2v24a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5"/><path d="M6 34c4-3 10-3 14 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
}

def make_card(href, icon_key, title, sub, desc, onclick=None):
    icon = ICONS.get(icon_key, "")
    if onclick:
        return f'''<a class="card" href="#" onclick="{onclick}; return false;">{icon}<div class="card-title">{title}</div><div class="card-sub">{sub}</div><div class="card-desc">{desc}</div></a>'''
    return f'''<a class="card" href="{href}">{icon}<div class="card-title">{title}</div><div class="card-sub">{sub}</div><div class="card-desc">{desc}</div></a>'''

if config.get("documents"):
    cards.append(make_card("/documents/", "documents", "Files", "Local Files", "Saved files, documents and more."))

if config.get("usb"):
    cards.append(make_card("/usb-drive/", "usb", "External Storage", "USB Drive", "Access files from a connected USB drive."))

if config.get("videos"):
    cards.append(make_card("/videos/", "videos", "Videos", "Media Player", "Watch locally stored video files in your browser."))

if config.get("kiwix"):
    kiwix_onclick = "window.location.href=window.location.protocol + '//' + window.location.hostname + ':8084'"
    cards.append(make_card(None, "kiwix", "Library", "Kiwix", "Offline Wikipedia, medical references and guides.", kiwix_onclick))

if config.get("kolibri"):
    kolibri_onclick = "window.location.href=window.location.protocol + '//' + window.location.hostname + ':8090'"
    cards.append(make_card(None, "kolibri", "Learn", "Kolibri", "Offline courses and educational content for all ages.", kolibri_onclick))

if config.get("calibre"):
    calibre_onclick = "window.location.href=window.location.protocol + '//' + window.location.hostname + ':8083'"
    cards.append(make_card(None, "calibre", "eBooks", "Calibre Library", "Browse and read your offline eBook collection.", calibre_onclick))


if config.get("prayer"):
    cards.append('''<a class="card" href="/prayer/"><svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M20 4C20 4 8 12 8 22a12 12 0 0024 0C32 12 20 4 20 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 16v8M16 20h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><div class="card-title">Prayer</div><div class="card-sub">Times & Qibla</div><div class="card-desc">Offline prayer times, Qibla direction and Hijri calendar.</div></a>''')

if config.get("maps"):
    cards.append('''<a class="card" href="/maps/"><svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M15 5L5 9v26l10-4 10 4 10-4V5L25 9 15 5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="15" y1="5" x2="15" y2="31" stroke="currentColor" stroke-width="1.5"/><line x1="25" y1="9" x2="25" y2="35" stroke="currentColor" stroke-width="1.5"/></svg><div class="card-title">Maps</div><div class="card-sub">Offline Maps</div><div class="card-desc">Navigate offline with downloaded regional maps.</div></a>''')

if config.get("games"):
    cards.append('''<a class="card" href="/games/"><svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="4" y="12" width="32" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="18" x2="13" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="24" cy="19" r="1.5" fill="currentColor"/><circle cx="28" cy="23" r="1.5" fill="currentColor"/></svg><div class="card-title">Games</div><div class="card-sub">Classic Games</div><div class="card-desc">Pong, Snake, Tetris and more offline games.</div></a>''')

if config.get("expat"):
    cards.append('''<a class="card" href="/expat/"><svg width="26" height="26" viewBox="0 0 40 40" fill="none" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="6" width="32" height="28" rx="3" stroke="currentColor"/><line x1="4" y1="14" x2="36" y2="14" stroke="currentColor"/><line x1="14" y1="6" x2="14" y2="34" stroke="currentColor"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="24" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="29" r="1.5" fill="currentColor" stroke="none"/></svg><div class="card-title">ExpatPrepper</div><div class="card-sub">Urban Survival Guide</div><div class="card-desc">Offline copy of expatprepper.org. Update when connected.</div></a>''')

if config.get("PLACEHOLDER_GAMES"):
    cards.append('''<a class="card" href="/prayer/"><svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M20 4C20 4 8 12 8 22a12 12 0 0024 0C32 12 20 4 20 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 16v8M16 20h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><div class="card-title">Prayer</div><div class="card-sub">Times & Qibla</div><div class="card-desc">Offline prayer times, Qibla direction and Hijri calendar.</div></a>''')

html = template.replace("__SECTION_CARDS__", "\n".join(cards))

output_path.write_text(html)
EOPY



log "Writing placeholder files"
cat > "$LIBRARY_DIR/README.txt" <<'EOFILE'
Put PDF, EPUB, TXT, and other documents here.
EOFILE


cat > "$WEB_ROOT/usb/index.html" <<'EOHTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>External USB</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: Arial, sans-serif; background: #f3f3f1; color: #161616; padding: 30px; }
    .box { max-width: 700px; margin: 0 auto; background: white; border-radius: 14px; padding: 24px; border: 1px solid #ddd; }
    a { color: #111; }
  </style>
</head>
<body>
  <div class="box">
    <h1>External USB</h1>
    <p>This section will provide access to connected USB storage devices.</p>
    <p><a href="/">Return to homepage</a></p>
  </div>
</body>
</html>
EOHTML


log "Enabling nginx directory listing"

# Insert 'autoindex on;' into nginx default site if it is
# not already present. Python is used here because it is
# safer than fragile shell text replacement.

python3 - <<'EOPY'
from pathlib import Path

p = Path("/etc/nginx/sites-available/default")
text = p.read_text()

if "autoindex on;" not in text:
    text = text.replace(
        "server_name _;\n",
        "server_name _;\n\n\tautoindex on;\n"
    )

if "location /usb-drive/" not in text:
    insert_block = """
    location /usb-drive/ {
        alias /mnt/xprep-usb/;
        autoindex on;
    }

    location = /home {
        return 302 /index.html;
    }

    location = /home/ {
        return 302 /index.html;
    }
"""
    text = text.replace("\n}\n", insert_block + "\n}\n")

p.write_text(text)
EOPY


# Validate nginx config before restarting
nginx -t
systemctl restart nginx

log "Portal setup complete"
