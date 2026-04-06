#!/bin/bash
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
log() { echo "[games] $1"; }
log "Setting up games..."
mkdir -p /var/www/html/games/pong /var/www/html/games/snake /var/www/html/games/tetris
mkdir -p /var/www/html/games/breakout /var/www/html/games/asteroids /var/www/html/games/dotmaze
mkdir -p /var/www/html/games/spaceinvaders /var/www/html/games/2048 /var/www/html/games/minesweeper
cp "$ROOT_DIR/assets/games/index.html"               /var/www/html/games/index.html
cp "$ROOT_DIR/assets/games/pong/index.html"          /var/www/html/games/pong/index.html
cp "$ROOT_DIR/assets/games/snake/index.html"         /var/www/html/games/snake/index.html
cp "$ROOT_DIR/assets/games/tetris/index.html"        /var/www/html/games/tetris/index.html
cp "$ROOT_DIR/assets/games/breakout/index.html"      /var/www/html/games/breakout/index.html
cp "$ROOT_DIR/assets/games/asteroids/index.html"     /var/www/html/games/asteroids/index.html
cp "$ROOT_DIR/assets/games/dotmaze/index.html"       /var/www/html/games/dotmaze/index.html
cp "$ROOT_DIR/assets/games/spaceinvaders/index.html" /var/www/html/games/spaceinvaders/index.html
cp "$ROOT_DIR/assets/games/2048/index.html"          /var/www/html/games/2048/index.html
cp "$ROOT_DIR/assets/games/minesweeper/index.html"   /var/www/html/games/minesweeper/index.html
if ! grep -q "location /games/" /etc/nginx/sites-enabled/default; then
    log "Adding nginx location block..."
    sed -i '/location \/prayer\/ {/a\    }\n\n    location \/games\/ {\n        try_files $uri $uri\/ =404;\n    ' /etc/nginx/sites-enabled/default
    nginx -t && systemctl reload nginx
fi
log "Done."
