import subprocess
from flask import request, redirect
from admin.helpers import load_config, save_config, SECTIONS, SETUP_SCRIPT, MOUNT_USB_SCRIPT

def load_wifi_config():
    import re
    conf = {}
    try:
        from admin.helpers import BASE_DIR
        env = (BASE_DIR / "config.env").read_text()
        for line in env.splitlines():
            m = re.match(r'^(\w+)="([^"]*)"', line.strip())
            if m:
                conf[m.group(1)] = m.group(2)
    except Exception:
        pass
    return conf

def build_settings_context():
    wifi = load_wifi_config()
    config = load_config()
    order = config.get("order", [s[0] for s in SECTIONS])
    section_map = {key: (key, label, icon, sub, desc) for key, label, icon, sub, desc in SECTIONS}
    # Add any new sections not in saved order
    for key, *_ in SECTIONS:
        if key not in order:
            order.append(key)
    sections = [(key, label, icon, sub, desc, config.get(key, False))
                for key in order if key in section_map
                for _, label, icon, sub, desc in [section_map[key]]]
    return {
        "sections": sections,
        "wifi_ssid": wifi.get("WIFI_SSID", "xPrep"),
        "wifi_password": wifi.get("WIFI_PASSWORD", ""),
        "portal_ip": wifi.get("PORTAL_IP", "55.55.55.55"),
    }

def register_settings_routes(app):
    @app.route("/save", methods=["POST"])
    def save():
        new_config = {}
        enabled_str = request.form.get("section_enabled", "")
        if enabled_str:
            enabled_keys = set(k.strip() for k in enabled_str.split(",") if k.strip())
            for key, _label, _icon, _sub, _desc in SECTIONS:
                new_config[key] = key in enabled_keys
        else:
            for key, _label, _icon, _sub, _desc in SECTIONS:
                new_config[key] = key in request.form
        order_str = request.form.get("section_order", "")
        if order_str:
            new_config["order"] = [k.strip() for k in order_str.split(",") if k.strip()]
        save_config(new_config)
        subprocess.run(["bash", str(SETUP_SCRIPT)], check=True)
        return redirect("/?tab=settings&msg=Sections+saved+successfully")

    @app.route("/save-wifi", methods=["POST"])
    def save_wifi():
        import re, subprocess
        from admin.helpers import BASE_DIR
        ssid     = request.form.get("wifi_ssid", "").strip()
        password = request.form.get("wifi_password", "").strip()

        if not ssid or len(password) < 8:
            return redirect("/?tab=settings")

        # Update config.env
        env_path = BASE_DIR / "config.env"
        env = env_path.read_text()
        env = re.sub(r'^WIFI_SSID="[^"]*"', f'WIFI_SSID="{ssid}"', env, flags=re.MULTILINE)
        env = re.sub(r'^WIFI_PASSWORD="[^"]*"', f'WIFI_PASSWORD="{password}"', env, flags=re.MULTILINE)
        env_path.write_text(env)

        # Update hostapd.conf directly
        hostapd = f"""interface=wlan0
driver=nl80211
ssid={ssid}
hw_mode=g
channel=6
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase={password}
wpa_key_mgmt=WPA-PSK
wpa_pairwise=CCMP
rsn_pairwise=CCMP
"""
        with open("/etc/hostapd/hostapd.conf", "w") as f:
            f.write(hostapd)

        # Restart hostapd in background after a short delay so Flask can respond first
        import threading
        def restart_hostapd():
            import time
            time.sleep(2)
            subprocess.run(["systemctl", "restart", "hostapd"], check=False)
        threading.Thread(target=restart_hostapd, daemon=True).start()

        return redirect("/?tab=settings&msg=USB+mounted+successfully")

    @app.route("/mount-usb", methods=["POST"])
    def mount_usb():
        subprocess.run(["bash", str(MOUNT_USB_SCRIPT)], check=True)
        return redirect("/?tab=settings")
