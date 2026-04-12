import shutil
import socket
import subprocess
from pathlib import Path
from flask import jsonify

VERSION_FILE = Path("/opt/xprep/version.txt")

def get_hostname():
    try:
        return socket.gethostname()
    except:
        return "xprep"

def get_ips():
    try:
        result = subprocess.run(
            ["hostname", "-I"],
            capture_output=True, text=True, timeout=3
        )
        ips = result.stdout.strip().split()
        # Filter out docker/loopback ranges
        filtered = [ip for ip in ips if not ip.startswith("172.") and not ip.startswith("127.")]
        return filtered
    except:
        return []

def get_storage():
    try:
        total, used, free = shutil.disk_usage("/")
        return {
            "total_gb": round(total / (1024**3), 1),
            "used_gb": round(used / (1024**3), 1),
            "free_gb": round(free / (1024**3), 1),
            "percent_used": round((used / total) * 100, 1),
        }
    except:
        return {}

def get_connected_users():
    try:
        import time
        from pathlib import Path
        now = int(time.time())

        # Get active leases MACs
        leases_file = Path("/var/lib/misc/dnsmasq.leases")
        if not leases_file.exists():
            leases_file = Path("/tmp/dnsmasq.leases")
        active_macs = set()
        if leases_file.exists():
            for line in leases_file.read_text().splitlines():
                parts = line.split()
                if len(parts) >= 3 and int(parts[0]) > now:
                    active_macs.add(parts[1].lower())

        # Get MACs currently in arp table on wlan0
        result = subprocess.run(["arp", "-n"], capture_output=True, text=True, timeout=3)
        arp_macs = set()
        for line in result.stdout.strip().split("\n")[1:]:
            parts = line.split()
            if len(parts) >= 5 and "wlan0" in parts and "incomplete" not in line:
                arp_macs.add(parts[2].lower())

        # Only count devices that are both in leases and arp
        return len(active_macs & arp_macs)
    except:
        return 0

def get_version():
    try:
        if VERSION_FILE.exists():
            return VERSION_FILE.read_text().strip()
        # Fall back to config.env
        import re
        from pathlib import Path
        config_env = Path(__file__).resolve().parents[1] / "config.env"
        if config_env.exists():
            m = re.search(r'VERSION="([^"]+)"', config_env.read_text())
            if m:
                return m.group(1)
        return "1.0.0"
    except:
        return "1.0.0"

def get_uptime():
    try:
        result = subprocess.run(["uptime", "-p"], capture_output=True, text=True, timeout=3)
        return result.stdout.strip().replace("up ", "")
    except:
        return "unknown"

def get_service_status(service):
    try:
        result = subprocess.run(
            ["systemctl", "is-active", service],
            capture_output=True, text=True, timeout=3
        )
        return result.stdout.strip() == "active"
    except:
        return False

def get_maps_info():
    try:
        from pathlib import Path
        maps_dir = Path("/opt/xprep/maps/data")
        if not maps_dir.exists():
            return {"count": 0, "size_gb": 0}
        files = list(maps_dir.glob("*.pmtiles"))
        total = sum(f.stat().st_size for f in files)
        return {"count": len(files), "size_gb": round(total / (1024**3), 2)}
    except:
        return {"count": 0, "size_gb": 0}

def get_wifi_ssid():
    try:
        from pathlib import Path
        conf = Path("/etc/hostapd/hostapd.conf").read_text()
        for line in conf.splitlines():
            if line.startswith("ssid="):
                return line.split("=", 1)[1].strip()
    except:
        pass
    return "xPrep"

def run_ping_if_due():
    try:
        import subprocess
        subprocess.Popen(
            ["python3", "/opt/xprep/ping_home.py"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
        )
    except:
        pass

_latest_version_cache = {"version": None, "fetched": 0}

def check_latest_version():
    import threading, time
    now = time.time()
    if now - _latest_version_cache["fetched"] < 3600:
        return _latest_version_cache["version"]
    def fetch():
        try:
            import urllib.request, json
            req = urllib.request.Request(
                "https://api.github.com/repos/alik2labs/xprep/releases/latest",
                headers={"User-Agent": "xPrep/1.0"}
            )
            with urllib.request.urlopen(req, timeout=10) as r:
                data = json.loads(r.read().decode())
                tag = data.get("tag_name", "").lstrip("v")
                _latest_version_cache["version"] = tag
                _latest_version_cache["fetched"] = time.time()
        except:
            pass
    threading.Thread(target=fetch, daemon=True).start()
    return _latest_version_cache["version"]

def get_last_ping():
    try:
        from pathlib import Path
        p = Path("/opt/xprep/last_ping.txt")
        if not p.exists():
            return None
        return float(p.read_text().strip())
    except:
        return None

def register_status_api(app):
    @app.route("/api/status/ping", methods=["POST"])
    def api_status_ping():
        try:
            import subprocess
            from pathlib import Path
            # Force ping by temporarily removing last_ping file
            ping_file = Path("/opt/xprep/last_ping.txt")
            if ping_file.exists():
                ping_file.unlink()
            result = subprocess.run(
                ["python3", "/opt/xprep/ping_home.py"],
                capture_output=True, text=True, timeout=20
            )
            if "successfully" in result.stdout:
                return {"ok": True}
            else:
                return {"ok": False, "error": result.stdout or result.stderr}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    @app.route("/api/status")
    def api_status():
        services = {
            "WiFi Hotspot": get_service_status("hostapd"),
            "Web Server": get_service_status("nginx"),
            "Admin Panel": get_service_status("xprep-admin"),
            "Kiwix": get_service_status("xprep-kiwix"),
            "Kolibri": get_service_status("xprep-kolibri"),
            "Calibre": get_service_status("xprep-calibre"),
        }
        run_ping_if_due()
        last_ping = get_last_ping()
        import time
        ping_age_days = round((time.time() - last_ping) / 86400, 1) if last_ping else None
        latest_version = check_latest_version()
        return jsonify({
            "hostname": get_hostname(),
            "ips": get_ips(),
            "storage": get_storage(),
            "connected_users": get_connected_users(),
            "version": get_version(),
            "uptime": get_uptime(),
            "services": services,
            "maps": get_maps_info(),
            "wifi_ssid": get_wifi_ssid(),
            "last_ping_days": ping_age_days,
            "latest_version": latest_version,
        })
