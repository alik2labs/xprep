#!/usr/bin/env python3
import json, time, subprocess, urllib.request
from pathlib import Path

PING_URL = "https://script.google.com/macros/s/AKfycbxQWkIfQXOA3yzAB0-EPYH2bvAzuvIbHyB-ErTOVvNQLlvWU4Ohg8OZ41IU3pJ4JVss/exec"
LAST_PING_FILE = Path("/opt/xprep/last_ping.txt")
VERSION_FILE = Path("/opt/xprep/version.txt")
PING_INTERVAL = 7 * 24 * 3600

def get_mac():
    try:
        result = subprocess.run(["cat", "/sys/class/net/wlan0/address"], capture_output=True, text=True)
        return result.stdout.strip()
    except:
        return "unknown"

def get_location():
    try:
        req = urllib.request.Request("http://ip-api.com/json/", headers={"User-Agent": "xPrep/1.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode())
            return data.get("country", ""), data.get("city", "")
    except:
        return "", ""

def get_version():
    try:
        if VERSION_FILE.exists():
            return VERSION_FILE.read_text().strip()
    except:
        pass
    return "unknown"

def get_storage_used():
    try:
        import shutil
        total, used, free = shutil.disk_usage("/")
        return round(used / (1024**3), 1)
    except:
        return 0

def should_ping():
    if not LAST_PING_FILE.exists():
        return True
    try:
        last = float(LAST_PING_FILE.read_text().strip())
        return (time.time() - last) >= PING_INTERVAL
    except:
        return True

def save_ping_time():
    LAST_PING_FILE.parent.mkdir(parents=True, exist_ok=True)
    LAST_PING_FILE.write_text(str(time.time()))

def ping():
    if not should_ping():
        print("Ping not due yet")
        return False
    mac = get_mac()
    country, city = get_location()
    version = get_version()
    storage = get_storage_used()
    payload = json.dumps({
        "mac": mac,
        "country": country,
        "city": city,
        "version": version,
        "storage_used_gb": storage,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }).encode()
    try:
        req = urllib.request.Request(
            PING_URL, data=payload,
            headers={"Content-Type": "application/json", "User-Agent": "xPrep/1.0"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=15) as r:
            r.read()
        save_ping_time()
        print("Ping sent successfully")
        return True
    except Exception as e:
        print("Ping failed:", e)
        return False

if __name__ == "__main__":
    ping()
