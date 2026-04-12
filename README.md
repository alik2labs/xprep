# xPrep

Portable Knowledge Infrastructure, built on Raspberry Pi.

xPrep creates an offline WiFi hotspot that serves maps, documents, videos, libraries and tools with no internet required. It is designed for emergency preparedness, remote communities, and field use.

## What it does

- Creates a local WiFi hotspot (SSID: xPrep, IP: 55.55.55.55)
- Serves a web portal accessible from any device on the network
- Works completely offline after installation

## Sections

- Maps: Offline maps using PMTiles and Protomaps
- Documents: Upload and serve PDF, Word, and other files
- Videos: Serve locally stored video files
- Kiwix: Offline Wikipedia and reference libraries
- Tools: Field utilities and reference tools
- Prayer Times: Offline prayer times and Qibla direction
- Games: Offline browser games
- ExpatPrepper: Offline copy of expatprepper.org content

## Tech Stack

- Hardware: Raspberry Pi (Linux/Ubuntu)
- Backend: Python / Flask
- Frontend: Vanilla HTML, CSS, JavaScript
- Web server: Nginx
- Offline maps: PMTiles, Protomaps, MapLibre GL JS
- Offline content: Kiwix
- Deployment: Shell scripts, systemd services

## Installation

Run the following on a fresh Raspberry Pi:

    curl -L -O https://github.com/alik2labs/xprep/releases/latest/download/xprep.tar.gz
    tar -xzf xprep.tar.gz
    cd xprep-release
    sudo bash install.sh

## Project Structure

    xprep-installer/
      admin_app.py              Flask admin backend
      admin/
        maps_tab.py             Maps admin routes
        kiwix_tab.py            Kiwix admin routes
        videos_tab.py           Videos admin routes
        documents_tab.py        Documents admin routes
        settings_tab.py         Settings and WiFi routes
        status_tab.py           Status dashboard API
        helpers.py              Shared helpers and constants
      assets/
        maps/                   Map viewer
        documents/              Document viewer
        videos/                 Video player
        games/                  Offline games
        tools/                  Field tools
        prayer/                 Prayer times
        expat/                  ExpatPrepper content
      scripts/
        setup_*.sh              Per-service install scripts
        ping_home.py            Device registry ping
      install.sh                Main installer
      build_release.sh          Builds and uploads the release
      config.env.example        Configuration template

## Admin Panel

The admin panel runs on port 8080. Access it at:

    http://55.55.55.55:8080

From here you can manage maps, documents, videos, Kiwix content, WiFi settings, and view system status.

## Configuration

Copy config.env.example to config.env and update the values before installing:

    cp config.env.example config.env

## Configuration

Copy config.env.example to config.env and update the values before installing:

    cp config.env.example config.env

## License

Copyright (c) 2026 Ali Khawaja / ExpatPrepper.org

xPrep is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

You are free to use, share, and adapt xPrep for non-commercial purposes, provided you give appropriate credit to the original author.

**You may not:**
- Sell xPrep or devices pre-loaded with xPrep
- Use xPrep as part of a paid commercial service
- Remove or obscure the original attribution

**For commercial licensing:** contact ali@k2labs.io

Full license: https://creativecommons.org/licenses/by-nc/4.0/
