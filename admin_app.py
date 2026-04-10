from flask import Flask, request, render_template_string
from admin.settings_tab import register_settings_routes, build_settings_context
from admin.kiwix_tab import register_kiwix_routes, build_kiwix_context
from admin.status_tab import register_status_api
from admin.documents_tab import register_documents_routes, register_documents_api, build_documents_context
from admin.videos_tab import register_videos_routes, register_videos_api, build_videos_context, register_videos_upload
from admin.maps_tab import register_maps_routes

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024 * 1024  # 10GB


HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>xprep Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {% if active_tab == 'kiwix' and (queue_status.state in ['starting','downloading'] or queue_status.queue) %}
  <meta http-equiv="refresh" content="8">
  {% endif %}
  <style>
    @font-face {
      font-family: 'PixelifySans';
      src: url('http://55.55.55.55/fonts/PixelifySans-Bold.ttf') format('truetype');
      font-weight: 700;
    }
    @font-face {
      font-family: 'PixelifySans';
      src: url('http://55.55.55.55/fonts/PixelifySans-Regular.ttf') format('truetype');
      font-weight: 400;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f3f3f1; color: #161616; min-height: 100vh; margin:0; padding:0; }
    .wrap { max-width: 1100px; margin: 0 auto; padding: 28px 20px 60px; }

    header {
      display: flex; justify-content: space-between; align-items: center;
      gap: 20px; background: white; border: 1px solid #ddd;
      border-radius: 14px; padding: 20px 24px; flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .header-left h1 {
      font-family: 'PixelifySans', Arial, sans-serif;
      font-weight: 700;
      font-size: 2.2rem;
      color: #5EA259;
      line-height: 1;
    }
    .header-left p {
      font-size: 0.82rem;
      color: #aaa;
      margin-top: 4px;
    }

    .header-right {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    .stat-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }

    .stat-label {
      font-size: 0.72rem;
      color: #bbb;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 0.88rem;
      color: #555;
      font-weight: bold;
    }

    .status-dot {
      display: inline-block; width: 7px; height: 7px;
      border-radius: 50%; background: #22c55e; margin-right: 4px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .card {
      background: white; border-radius: 14px; padding: 14px 16px;
      border: 1px solid #ddd; text-decoration: none; color: #161616;
      display: flex; flex-direction: column; align-items: center;
      gap: 5px; text-align: center;
      transition: box-shadow 0.15s, border-color 0.15s;
    }
    .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); border-color: #bbb; }
    .card-title { font-size: 13px; font-weight: bold; color: #161616; }
    .card-sub { font-size: 10px; color: #888; }
    .card-desc { font-size: 9px; color: #aaa; line-height: 1.4; }

    footer {
      margin-top: 20px; background: white; border-radius: 14px;
      padding: 14px 24px; font-size: 0.82rem; color: #888;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 8px;
    }
    .footer-logo {
      font-family: 'PixelifySans', Arial, sans-serif;
      font-weight: 700;
      font-size: 1rem;
      color: #5EA259;
    }
    footer a { color: #888; text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    .footer-left { display: flex; gap: 16px; align-items: center; }
    .footer-center { display: flex; align-items: center; }
    .footer-right { display: flex; gap: 20px; align-items: center; }

    @media (max-width: 700px) {
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .header-right { gap: 12px; }
    }
    @media (max-width: 440px) {
      .grid { grid-template-columns: 1fr; }
    }

    body.dark { background: #1a1a1a; color: #e0e0e0; }
    body.dark header { background: #242424; border-color: #333; }
    body.dark .card { background: #242424; border-color: #333; color: #e0e0e0; }
    body.dark .card:hover { border-color: #555; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
    body.dark .card-title { color: #e0e0e0; }
    body.dark .card-sub { color: #888; }
    body.dark .card-desc { color: #666; }
    body.dark .card svg { stroke: #888; }
    body.dark footer { background: #242424; border-color: #333; }
    body.dark footer a { color: #888; }
    body.dark .stat-value { color: #ccc; }
    body.dark .stat-label { color: #666; }
    body.dark .header-left p { color: #666; }

    #theme-toggle {
      background: white; border: 1px solid #ddd; border-radius: 8px;
      padding: 6px 8px; cursor: pointer; color: #888;
      display: flex; align-items: center; justify-content: center;
      position: fixed; top: 16px; right: 20px; z-index: 999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    #theme-toggle:hover { border-color: #aaa; }
    body.dark #theme-toggle { background: #242424; border-color: #444; color: #ccc; }
    body.dark #theme-toggle svg { stroke: #ccc; }
    #theme-toggle svg { stroke: #888; }
  

    .panel { background:white; border:1px solid #ddd; border-radius:14px; padding:24px; margin-bottom:20px; }
    .tabs { display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap; }
    .tab { display:inline-block; padding:12px 18px; border-radius:10px; background:#e9e9e9; color:#111; text-decoration:none; font-weight:bold; }
    .tab.active { background:#151515; color:white; }
    .note { color:#666; line-height:1.5; }
    button { margin-top:16px; background:#151515; color:white; border:none; border-radius:10px; padding:12px 18px; font-size:1rem; cursor:pointer; }
    button:hover { background:#000; }
    .danger { background:#8b1e1e; }
    .danger:hover { background:#6f1717; }
    .secondary { background:#444; }
    .secondary:hover { background:#222; }
    table { width:100%; border-collapse:collapse; margin-top:12px; font-size:0.95rem; }
    th, td { padding:10px 8px; border-bottom:1px solid #eee; text-align:left; vertical-align:top; }
    th { background:#fafafa; }
    .status { font-weight:bold; color:#0a7a2f; }
    .muted { color:#777; font-size:0.92rem; margin-top:4px; }
    .top-actions, .filter-form, .queue-line, .button-row { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
    select { padding:10px 12px; border-radius:8px; border:1px solid #ccc; font-size:1rem; background:white; max-width:280px; width:280px; }
    details.group { margin-top:18px; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; background:#fcfcfc; }
    summary { cursor:pointer; font-weight:bold; }
    .summary-row { display:flex; justify-content:space-between; gap:12px; align-items:center; }
    .queue-box { background:#fafafa; border:1px solid #eee; border-radius:10px; padding:14px; }
    .meter { height:14px; background:#eaeaea; border-radius:999px; overflow:hidden; margin-top:10px; }
    .meter > div { height:100%; background:#151515; }
    .pill { display:inline-block; padding:4px 8px; border-radius:999px; background:#eee; font-size:0.88rem; }
    .name-line { font-weight:bold; }
    .title-row { margin-bottom:10px; }
    a { color:#111; }
    .loader-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.35); z-index:9999; align-items:center; justify-content:center; }
    .loader-box { background:#fff; padding:24px 28px; border-radius:14px; border:1px solid #ddd; min-width:260px; text-align:center; }
    .spinner { width:34px; height:34px; margin:0 auto 12px auto; border:4px solid #ddd; border-top-color:#111; border-radius:50%; animation:spin 0.9s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }
    .dir-region{margin-top:14px;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;}
    .dir-region-header{display:flex;align-items:center;gap:12px;padding:12px 16px;background:#f5f5f5;cursor:pointer;user-select:none;font-weight:bold;}
    .dir-region-header:hover{background:#ececec;}
    .dir-region-header .chevron{font-size:0.8rem;transition:transform 0.2s;}
    .dir-region-header.open .chevron{transform:rotate(90deg);}
    .dir-region-body{display:none;padding:0 0 8px 0;}
    .dir-region-body.open{display:block;}
    .dir-entry{display:flex;align-items:center;gap:12px;padding:9px 16px;border-bottom:1px solid #f0f0f0;font-size:0.95rem;}
    .dir-entry:last-child{border-bottom:none;}
    .dir-entry.region-file{background:#fafaf7;font-weight:bold;}
    .dir-entry input[type=checkbox]{width:16px;height:16px;cursor:pointer;flex-shrink:0;}
    .dir-entry .entry-name{flex:1;}
    .dir-entry .entry-size{color:#888;font-size:0.88rem;width:80px;text-align:right;flex-shrink:0;}
    .dir-entry .entry-zoom{color:#aaa;font-size:0.82rem;width:60px;text-align:right;flex-shrink:0;}
    .dir-entry .entry-status{width:90px;text-align:right;flex-shrink:0;font-size:0.85rem;}
    .installed-badge{color:#0a7a2f;font-weight:bold;}
    .queue-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.9rem;}
    .queue-item:last-child{border-bottom:none;}
    .queue-item .qi-name{flex:1;}
    .qi-bar-wrap{width:160px;background:#eee;border-radius:999px;height:8px;overflow:hidden;flex-shrink:0;}
    .qi-bar{height:8px;background:#151515;border-radius:999px;transition:width 0.5s;}
    .qi-state{width:90px;text-align:right;font-size:0.82rem;color:#888;flex-shrink:0;}
    .qi-state.done{color:#0a7a2f;font-weight:bold;}
    .qi-state.error{color:#8b1e1e;font-weight:bold;}
    .qi-state.active{color:#111;}
    body.dark .panel { background:#242424; border-color:#333; }
    body.dark .tab { background:#2a2a2a; color:#ccc; }
    body.dark .tab.active { background:#e0e0e0; color:#111; }
    body.dark table th { background:#2a2a2a; }
    body.dark table td, body.dark table th { border-color:#333; }
    body.dark select, body.dark input[type=text], body.dark input[type=file] { background:#2a2a2a; color:#e0e0e0; border-color:#444; }
    body.dark .queue-box { background:#2a2a2a; border-color:#333; }
    body.dark details.group { background:#2a2a2a; border-color:#333; }
    body.dark .dir-region { border-color:#333; }
    body.dark .dir-region-header { background:#2a2a2a; }
    body.dark .dir-region-header:hover { background:#333; }
    body.dark .dir-entry { border-color:#333; }
    body.dark .dir-entry.region-file { background:#252520; }
    body.dark .loader-box { background:#242424; border-color:#333; }
    body:not(.dark) .settings-card { background:#f5f5f5 !important; border-color:#e0e0e0 !important; }
    body:not(.dark) .settings-card .card-label { color:#161616 !important; }
    body:not(.dark) .settings-card .card-sub-label { color:#888 !important; }
    body:not(.dark) .settings-card .card-desc-label { color:#aaa !important; }
    body:not(.dark) .settings-card .card-icon { color:#555 !important; }
    body:not(.dark) .settings-card.enabled { border-color:#5EA259 !important; background:#f6fbf6 !important; }
</style>
</head>
<body>
  <div class="loader-overlay" id="loaderOverlay">
    <div class="loader-box">
      <div class="spinner"></div>
      <div><strong>Starting download...</strong></div>
      <div class="note">This page will refresh automatically while downloads run.</div>
    </div>
  </div>

  <div class="wrap">
    <header>
      <div class="header-left">
        <h1>xPrep</h1>
        <p>Admin Panel</p>
      </div>
      <div class="header-right">
        <div class="stat-block">
          <div class="stat-label">Device</div>
          <div class="stat-value" id="stat-hostname">—</div>
        </div>
        <div class="stat-block">
          <div class="stat-label">Hotspot IP</div>
          <div class="stat-value">55.55.55.55</div>
        </div>
        <div class="stat-block">
          <div class="stat-label">Network IP</div>
          <div class="stat-value" id="stat-network-ip">—</div>
        </div>
      </div>
    </header>

    <div class="tabs">
      <a class="tab {% if active_tab == 'settings' %}active{% endif %}" href="/?tab=settings">Settings</a>
      <a class="tab {% if active_tab == 'maps' %}active{% endif %}" href="/?tab=maps">Maps</a>
      <a class="tab {% if active_tab == 'kiwix' %}active{% endif %}" href="/?tab=kiwix">Kiwix</a>
      <a class="tab {% if active_tab == 'videos' %}active{% endif %}" href="/?tab=videos">Videos</a>
      <a class="tab {% if active_tab == 'documents' %}active{% endif %}" href="/?tab=documents">Documents</a>
    </div>

    {% if active_tab == 'settings' %}
      <div class="panel">
        <h1 style="margin:0 0 6px;">Settings</h1>
        <p class="note">Select which sections appear on the public homepage.</p>
        <form method="post" action="/save">
          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px;">
            {% for key, label, icon, sub, desc, enabled in sections %}
            <label onclick="toggleCard(this)" class="settings-card {% if enabled %}enabled{% endif %}" style="position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;padding:14px 16px;border-radius:14px;cursor:pointer;background:#242424;border:1px solid {% if enabled %}#5EA259{% else %}#333{% endif %};text-align:center;transition:all 0.2s;opacity:{% if enabled %}1{% else %}0.5{% endif %};">
              <input type="checkbox" name="{{ key }}" {% if enabled %}checked{% endif %} style="display:none;">
              <div style="position:absolute;top:10px;right:10px;width:18px;height:18px;border-radius:50%;background:{% if enabled %}#5EA259{% else %}transparent{% endif %};display:flex;align-items:center;justify-content:center;border:1.5px solid {% if enabled %}#5EA259{% else %}#555{% endif %};" class="check-dot">
                {% if enabled %}<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>{% endif %}
              </div>
              <div class="card-icon" style="color:#aaa;margin-bottom:4px;">{{ icon | safe }}</div>
              <div class="card-label" style="font-weight:bold;font-size:13px;color:#e0e0e0;">{{ label }}</div>
              <div class="card-sub-label" style="font-size:10px;color:#888;">{{ sub }}</div>
              <div class="card-desc-label" style="font-size:9px;color:#666;line-height:1.4;">{{ desc }}</div>
            </label>
            {% endfor %}
          </div>
          <script>
          function toggleCard(label) {
            const cb = label.querySelector('input[type=checkbox]');
            cb.checked = !cb.checked;
            const dot = label.querySelector('.check-dot');
            if (cb.checked) {
              label.classList.add('enabled');
              label.style.borderColor = '#5EA259';
              label.style.opacity = '1';
              dot.style.background = '#5EA259';
              dot.style.borderColor = '#5EA259';
              dot.innerHTML = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            } else {
              label.classList.remove('enabled');
              label.style.borderColor = document.body.classList.contains('dark') ? '#333' : '#e0e0e0';
              label.style.opacity = '0.5';
              dot.style.background = 'transparent';
              dot.style.borderColor = document.body.classList.contains('dark') ? '#555' : '#ccc';
              dot.innerHTML = '';
            }
          }
          </script>
          <button type="submit" style="margin-top:20px;">Save Changes</button>
        </form>
      </div>

      <div class="panel">
        <h2>USB Tools</h2>
        <p class="note">If a USB drive is connected, use this button to mount it for user access.</p>
        <form method="post" action="/mount-usb">
          <button type="submit">Mount USB</button>
        </form>
      </div>
    {% endif %}

    {% if active_tab == 'kiwix' %}
      <div class="panel">
        <div class="title-row">
          <h1 style="margin:0;">Kiwix</h1>
        </div>

        <div class="button-row">
          <form method="post" action="/refresh-kiwix-catalog" style="margin:0;">
            <button type="submit" class="secondary">Refresh Pull</button>
          </form>

          <form method="post" action="/stop-download" style="margin:0;">
            <button type="submit" class="danger">Stop Download</button>
          </form>

          <form method="post" action="/purge-temp-files" style="margin:0;">
            <button type="submit" class="secondary">Purge Temp Files</button>
          </form>

          <form method="get" action="/" class="filter-form" style="margin:0;">
            <input type="hidden" name="tab" value="kiwix">
            <label><strong>Language:</strong></label>
            <select name="language" onchange="this.form.submit()">
              <option value="">All</option>
              {% for lang in languages %}
                <option value="{{ lang }}" {% if lang == current_language %}selected{% endif %}>{{ lang }}</option>
              {% endfor %}
            </select>
          </form>
        </div>

        <p class="note">Source: library.kiwix.org catalog</p>
      </div>

      <div class="panel">
        <h2>Download Queue</h2>
        <div class="queue-box">
          <div class="queue-line">
            <span class="pill">State: {{ queue_status.state }}</span>
            <span class="pill">Queued: {{ queue_status.queue|length }}</span>
          </div>

          {% if queue_status.current_display %}
            <p><strong>Current:</strong> {{ queue_status.current_display }}</p>
          {% endif %}

          {% if queue_status.total_bytes > 0 %}
            <p class="note">
              {{ queue_status.downloaded_mb }} / {{ queue_status.total_mb }} MB
              • {{ queue_status.speed_text }}
              • elapsed {{ queue_status.elapsed_text }}
              • ETA {{ queue_status.eta_text }}
            </p>
            <div class="meter"><div style="width: {{ queue_status.percent }}%;"></div></div>
          {% elif queue_status.state in ['starting','downloading'] %}
            <p class="note">Starting download...</p>
          {% endif %}

          {% if queue_status.queue_display %}
            <p><strong>Queue:</strong></p>
            <ul>
              {% for q in queue_status.queue_display %}
                <li>{{ q }}</li>
              {% endfor %}
            </ul>
          {% endif %}

          {% if queue_status.last_error %}
            <p class="note">Last error: {{ queue_status.last_error }}</p>
          {% endif %}
        </div>
      </div>

      <div class="panel">
        <h2>Installed Content</h2>
        <p class="note">Select downloaded items to remove them.</p>
        <form method="post" action="/delete-zims">
          <table>
            <thead>
              <tr>
                <th style="width:50px;">Pick</th>
                <th>Name</th>
                <th style="width:110px;">Articles</th>
                <th style="width:110px;">Media</th>
                <th style="width:140px;">Updated</th>
                <th style="width:110px;">Size MB</th>
                <th style="width:260px;">File</th>
              </tr>
            </thead>
            <tbody>
              {% if installed_catalog %}
                {% for item in installed_catalog %}
                  <tr>
                    <td><input type="checkbox" name="zim_ids" value="{{ item['id'] }}"></td>
                    <td>
                      <div class="name-line">{{ item['display_name'] }}</div>
                      <div class="muted">{{ item['summary'] }}</div>
                    </td>
                    <td>{{ item['articleCount'] }}</td>
                    <td>{{ item['mediaCount'] }}</td>
                    <td>{{ item['updated_short'] }}</td>
                    <td>{{ item['length_mb'] }}</td>
                    <td class="muted">{{ item['filename'] }}</td>
                  </tr>
                {% endfor %}
              {% else %}
                <tr><td colspan="7">No installed content yet.</td></tr>
              {% endif %}
            </tbody>
          </table>
          <button type="submit" class="danger">Delete Selected</button>
        </form>
      </div>

      <div class="panel">
        <h2>Available Kiwix Content</h2>
        <form method="post" action="/queue-zims">
          {% for heading, items in grouped_catalog %}
            <details class="group" open>
              <summary>
                <div class="summary-row">
                  <span>{{ heading }}</span>
                  <span class="muted">{{ items|length }} items</span>
                </div>
              </summary>
              <table>
                <thead>
                  <tr>
                    <th style="width:50px;">Pick</th>
                    <th>Name</th>
                    <th style="width:110px;">Articles</th>
                    <th style="width:110px;">Media</th>
                    <th style="width:140px;">Updated</th>
                    <th style="width:110px;">Size MB</th>
                    <th style="width:110px;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {% for item in items %}
                    <tr>
                      <td>
                        {% if not item['installed'] and item['id'] not in queue_status.queue and item['id'] != queue_status.current_id %}
                          <input type="checkbox" name="zim_ids" value="{{ item['id'] }}">
                        {% endif %}
                      </td>
                      <td>
                        <div class="name-line">{{ item['display_name'] }}</div>
                        <div class="muted">{{ item['summary'] }}</div>
                      </td>
                      <td>{{ item['articleCount'] }}</td>
                      <td>{{ item['mediaCount'] }}</td>
                      <td>{{ item['updated_short'] }}</td>
                      <td>{{ item['length_mb'] }}</td>
                      <td>
                        {% if item['installed'] %}
                          <span class="status">Installed</span>
                        {% elif item['id'] == queue_status.current_id %}
                          Downloading
                        {% elif item['id'] in queue_status.queue %}
                          Queued
                        {% else %}
                          Available
                        {% endif %}
                      </td>
                    </tr>
                  {% endfor %}
                </tbody>
              </table>
            </details>
          {% endfor %}
          <button type="submit">Queue Selected</button>
        </form>
      </div>
    {% endif %}



    {% if active_tab == 'maps' %}
      <div class="panel">
        <h2>Installed Maps</h2>
        <p class="note">PMTiles files stored on this device. The global base map cannot be deleted.</p>
        <form id="delete-maps-form" method="post" action="/delete-map-selected">
        <table>
          <thead>
            <tr>
              <th style="width:40px;"></th>
              <th>Name</th>
              <th>File</th>
              <th style="width:100px;">Size</th>
              <th style="width:70px;">Zoom</th>
            </tr>
          </thead>
          <tbody id="maps-list">
            <tr><td colspan="5">Loading...</td></tr>
          </tbody>
        </table>
        <button type="submit" class="danger">Delete Selected</button>
        </form>
      </div>

      <div class="panel">
        <h2>Upload Map</h2>
        <p class="note">Upload a .pmtiles file from your computer. Cancel any active downloads first.</p>
        <form method="post" action="/upload-map" enctype="multipart/form-data" id="uploadMapForm">
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            <input type="file" name="pmtiles_file" required style="flex:1;">
            <button type="submit">Upload</button>
          </div>
          <div id="uploadMapNote" style="margin-top:10px;display:none;">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:4px;">
              <span>Uploading...</span>
              <span id="upload-pct">0%</span>
            </div>
            <div style="background:#eee;border-radius:4px;height:8px;overflow:hidden;">
              <div id="upload-bar" style="background:#5EA259;height:8px;width:0%;transition:width 0.3s;"></div>
            </div>
            <div id="upload-msg" style="font-size:11px;color:#aaa;margin-top:4px;"></div>
          </div>
        </form>
        <script>
          document.getElementById("uploadMapForm").addEventListener("submit", function(e) {
            e.preventDefault();
            const form = this;
            const fileInput = form.querySelector("input[type=file]");
            if (!fileInput.files.length) return;

            const note = document.getElementById("uploadMapNote");
            const bar = document.getElementById("upload-bar");
            const pct = document.getElementById("upload-pct");
            const msg = document.getElementById("upload-msg");
            note.style.display = "block";

            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(e) {
              if (e.lengthComputable) {
                const p = Math.round(e.loaded / e.total * 100);
                bar.style.width = p + "%";
                pct.textContent = p + "%";
                msg.textContent = (e.loaded / 1024 / 1024).toFixed(1) + " / " + (e.total / 1024 / 1024).toFixed(1) + " MB";
              }
            });
            xhr.addEventListener("load", function() {
              bar.style.width = "100%";
              pct.textContent = "100%";
              msg.textContent = "Upload complete!";
              setTimeout(() => location.reload(), 1000);
            });
            xhr.addEventListener("error", function() {
              bar.style.background = "#e55";
              msg.textContent = "Upload failed.";
            });

            const formData = new FormData(form);
            xhr.open("POST", "/upload-map");
            xhr.send(formData);
          });
        </script>
      </div>

      <div class="panel">
        <h2>Download Map</h2>
        <p class="note">Extract a region from a PMTiles source using bounding box coordinates. Find bbox at <a href="http://bboxfinder.com" target="_blank">bboxfinder.com</a>.</p>
        <form method="post" action="/download-map" id="downloadMapForm">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:4px;"><label style="font-size:12px;color:#888;">Source URL</label><br>
                <input type="text" name="url" placeholder="https://build.protomaps.com/20260401.pmtiles" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;font-size:13px;">
              </td>
            </tr>
            <tr>
              <td style="padding:4px;"><label style="font-size:12px;color:#888;">Output filename</label><br>
                <input type="text" name="filename" placeholder="uae.pmtiles" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;font-size:13px;">
              </td>
            </tr>
            <tr>
              <td style="padding:4px;"><label style="font-size:12px;color:#888;">Bounding box (min_lon,min_lat,max_lon,max_lat)</label><br>
                <input type="text" name="bbox" placeholder="51,22,56,26" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;font-size:13px;">
              </td>
            </tr>
            <tr>
              <td style="padding:4px;"><label style="font-size:12px;color:#888;">Max zoom (15 = full detail, 6 = overview only — source max is 15)</label><br>
                <input type="text" name="maxzoom" placeholder="15" value="15" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;font-size:13px;">
              </td>
            </tr>
            <tr>
              <td style="padding:8px 4px 4px;">
                <button type="submit">Start Extract</button>
              </td>
            </tr>
          </table>
        </form>
        <div id="download-status" style="margin-top:12px;display:none;">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:4px;">
            <span id="dl-label">Extracting...</span>
            <span id="dl-filename"></span>
          </div>
          <div style="background:#eee;border-radius:4px;height:8px;overflow:hidden;">
            <div id="dl-bar" style="background:#5EA259;height:8px;width:0%;transition:width 0.5s;"></div>
          </div>
          <div id="dl-msg" style="font-size:11px;color:#aaa;margin-top:4px;"></div>
        </div>

        <script>
          // Poll download status
          let dlPoll = null;
          let dlStart = null;

          function startPolling() {
            dlStart = Date.now();
            document.getElementById("download-status").style.display = "block";
            document.getElementById("dl-bar").style.width = "5%";
            dlPoll = setInterval(checkDownloadStatus, 2000);
          }

          function checkDownloadStatus() {
            fetch("/api/maps/download-status?t=" + Date.now())
              .then(r => r.json())
              .then(data => {
                const label = document.getElementById("dl-label");
                const bar = document.getElementById("dl-bar");
                const msg = document.getElementById("dl-msg");
                const fname = document.getElementById("dl-filename");

                fname.textContent = data.filename || "";

                if (data.state === "downloading") {
                  const elapsed = Math.round((Date.now() - dlStart) / 1000);
                  // Animate bar - grows over time but never reaches 100%
                  const pct = Math.min(5 + elapsed * 0.5, 90);
                  bar.style.width = pct + "%";
                  label.textContent = "Extracting...";
                  msg.textContent = "Elapsed: " + elapsed + "s";
                } else if (data.state === "done") {
                  bar.style.width = "100%";
                  bar.style.background = "#5EA259";
                  label.textContent = "Complete!";
                  msg.textContent = "Map downloaded successfully.";
                  clearInterval(dlPoll);
                  setTimeout(() => location.reload(), 1500);
                } else if (data.state === "error") {
                  bar.style.background = "#e55";
                  bar.style.width = "100%";
                  label.textContent = "Error";
                  msg.textContent = data.error || "Download failed.";
                  clearInterval(dlPoll);
                } else if (data.state === "idle") {
                  clearInterval(dlPoll);
                }
              });
          }

          document.getElementById("downloadMapForm").addEventListener("submit", function() {
            startPolling();
          });

          // Check status on page load in case download is in progress
          fetch("/api/maps/download-status?t=" + Date.now())
            .then(r => r.json())
            .then(data => {
              if (data.state === "downloading") {
                startPolling();
              }
            });
        </script>
      </div>

      <script>
        // Load installed maps list
        fetch("/api/maps/list")
          .then(r => r.json())
          .then(data => {
            const tbody = document.getElementById("maps-list");
            if (!data.maps || !data.maps.length) {
              tbody.innerHTML = "<tr><td colspan='3'>No maps installed.</td></tr>";
              return;
            }
            data.maps.sort((a, b) => a.deletable === b.deletable ? 0 : a.deletable ? 1 : -1);
            tbody.innerHTML = data.maps.map(m => `
              <tr>
                <td style="width:40px;">${m.deletable ? `<input type="checkbox" form="delete-maps-form" name="map_files" value="${m.filename}">` : ''}</td>
                <td>${m.name}</td>
                <td class="muted">${m.stem}</td>
                <td>${m.size}</td>
                <td>${m.zoom}</td>
              </tr>
            `).join("");
          });
      </script>

      <div class="panel">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 style="margin:0;">Map Directory</h2>
            <p class="note" style="margin:4px 0 0;">Browse and download map extracts by region and country.</p>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <span id="dir-updated" class="muted" style="font-size:0.85rem;"></span>
            <button id="dir-update-btn" class="secondary" style="margin-top:0;" onclick="updateDirectory()">Update Directory</button>
          </div>
        </div>
        <div id="dir-loading" style="margin-top:16px;color:#888;">Loading directory...</div>
        <div id="dir-error" style="margin-top:16px;color:#8b1e1e;display:none;"></div>
        <div id="dir-content" style="display:none;">
          <div id="dir-regions"></div>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:16px;">
            <button onclick="downloadSelected()" style="margin-top:0;">Download Selected</button>
            <button class="secondary" style="margin-top:0;padding:12px 14px;font-size:0.9rem;" onclick="selectAllVisible()">Select All</button>
            <button class="secondary" style="margin-top:0;padding:12px 14px;font-size:0.9rem;" onclick="clearAllSelected()">Clear</button>
            <span id="dir-selected-count" class="muted" style="font-size:0.9rem;"></span>
          </div>
          <div id="dir-queue-wrap" style="display:none;margin-top:20px;">
            <h3 style="margin:0 0 10px;">Download Queue</h3>
            <div id="dir-queue-list"></div>
          </div>
        </div>
      </div>

      <style>
        .dir-region{margin-top:14px;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;}
        .dir-region-header{display:flex;align-items:center;gap:12px;padding:12px 16px;background:#f5f5f5;cursor:pointer;user-select:none;font-weight:bold;}
        .dir-region-header:hover{background:#ececec;}
        .dir-region-header .chevron{font-size:0.8rem;transition:transform 0.2s;}
        .dir-region-header.open .chevron{transform:rotate(90deg);}
        .dir-region-body{display:none;padding:0 0 8px 0;}
        .dir-region-body.open{display:block;}
        .dir-entry{display:flex;align-items:center;gap:12px;padding:9px 16px;border-bottom:1px solid #f0f0f0;font-size:0.95rem;}
        .dir-entry:last-child{border-bottom:none;}
        .dir-entry.region-file{background:#fafaf7;font-weight:bold;}
        .dir-entry input[type=checkbox]{width:16px;height:16px;cursor:pointer;flex-shrink:0;}
        .dir-entry .entry-name{flex:1;}
        .dir-entry .entry-size{color:#888;font-size:0.88rem;width:80px;text-align:right;flex-shrink:0;}
        .dir-entry .entry-zoom{color:#aaa;font-size:0.82rem;width:60px;text-align:right;flex-shrink:0;}
        .dir-entry .entry-status{width:90px;text-align:right;flex-shrink:0;font-size:0.85rem;}
        .installed-badge{color:#0a7a2f;font-weight:bold;}
        .queue-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.9rem;}
        .queue-item:last-child{border-bottom:none;}
        .queue-item .qi-name{flex:1;}
        .qi-bar-wrap{width:160px;background:#eee;border-radius:999px;height:8px;overflow:hidden;flex-shrink:0;}
        .qi-bar{height:8px;background:#151515;border-radius:999px;transition:width 0.5s;}
        .qi-state{width:90px;text-align:right;font-size:0.82rem;color:#888;flex-shrink:0;}
        .qi-state.done{color:#0a7a2f;font-weight:bold;}
        .qi-state.error{color:#8b1e1e;font-weight:bold;}
        .qi-state.active{color:#111;}
      </style>

      <script>
        var dirData=null,installedFiles=new Set(),dirQueue=[],dirQueueRunning=false,dirQueuePoll=null;

        Promise.all([
          fetch("/api/maps/list").then(r=>r.json()),
          fetch("/api/maps/directory").then(r=>r.json())
        ]).then(function(results){
          var listData=results[0],dirJson=results[1];
          installedFiles=new Set((listData.maps||[]).map(function(m){return m.filename;}));
          document.getElementById("dir-loading").style.display="none";
          if(dirJson.error){showDirError(dirJson.error);}
          else{dirData=dirJson;renderDirectory();}
        }).catch(function(err){
          document.getElementById("dir-loading").style.display="none";
          showDirError("Failed to load directory: "+err);
        });

        function showDirError(msg){
          var el=document.getElementById("dir-error");
          el.textContent=msg;el.style.display="block";
        }

        function renderDirectory(){
          if(!dirData||!dirData.regions)return;
          var wrap=document.getElementById("dir-regions");
          wrap.innerHTML="";
          if(dirData.updated)document.getElementById("dir-updated").textContent="Updated: "+dirData.updated;
          dirData.regions.forEach(function(region){
            var div=document.createElement("div");div.className="dir-region";
            var header=document.createElement("div");header.className="dir-region-header";
            header.innerHTML='<span class="chevron">&#9658;</span><span>'+region.name+'</span><span class="muted" style="font-size:0.85rem;font-weight:normal;margin-left:auto;">'+region.entries.length+' items</span>';
            var body=document.createElement("div");body.className="dir-region-body";
            header.onclick=function(){header.classList.toggle("open");body.classList.toggle("open");};
            region.entries.forEach(function(entry){
              var isInstalled=installedFiles.has(entry.filename);
              var row=document.createElement("div");
              row.className="dir-entry"+(entry.is_region_file?" region-file":"");
              var label=entry.is_region_file?entry.name+' <span style="color:#aaa;font-size:0.8rem;font-weight:normal;">(region file)</span>':entry.name;
              row.innerHTML='<input type="checkbox" class="dir-cb" data-filename="'+entry.filename+'" data-name="'+entry.name+'" data-cmd="'+entry.cmd.replace(/"/g,"&quot;").replace(/'/g,"&#39;")+'"'+(isInstalled?" disabled":"")+'>'+
                '<span class="entry-name">'+label+'</span>'+
                '<span class="entry-size">'+(entry.size||"")+' MB</span>'+
                '<span class="entry-zoom"><input type="number" class="zoom-input" min="1" max="15" value="'+entry.maxzoom+'" style="width:54px;padding:3px 5px;border:1px solid #ccc;border-radius:6px;font-size:0.85rem;text-align:center;" title="Max zoom (1-15)"></span>'+
                '<span class="entry-status">'+(isInstalled?'<span class="installed-badge">&#10003; Installed</span>':"")+' </span>';
              body.appendChild(row);
            });
            div.appendChild(header);div.appendChild(body);wrap.appendChild(div);
          });
          document.getElementById("dir-content").style.display="block";
          updateSelectedCount();
          document.querySelectorAll(".dir-cb").forEach(function(cb){cb.addEventListener("change",updateSelectedCount);});
        }

        function updateSelectedCount(){
          var checked=document.querySelectorAll(".dir-cb:checked");
          document.getElementById("dir-selected-count").textContent=checked.length>0?checked.length+" selected":"";
        }
        function selectAllVisible(){
          document.querySelectorAll(".dir-cb:not(:disabled)").forEach(function(cb){cb.checked=true;});
          updateSelectedCount();
        }
        function clearAllSelected(){
          document.querySelectorAll(".dir-cb:checked").forEach(function(cb){cb.checked=false;});
          updateSelectedCount();
        }

        function downloadSelected(){
          var checked=Array.from(document.querySelectorAll(".dir-cb:checked"));
          if(!checked.length){alert("No maps selected.");return;}
          if(dirQueueRunning){alert("A download is already in progress.");return;}
          dirQueue=checked.map(function(cb){
            var row=cb.closest(".dir-entry");
            var zoomInput=row?row.querySelector(".zoom-input"):null;
            var zoom=zoomInput?zoomInput.value:null;
            var cmd=cb.dataset.cmd;
            if(zoom){cmd=cmd.replace(/--maxzoom=\d+/,"--maxzoom="+zoom);}
            return{name:cb.dataset.name,filename:cb.dataset.filename,cmd:cmd,state:"queued",elapsed:0};
          });
          checked.forEach(function(cb){cb.checked=false;});
          updateSelectedCount();
          renderQueueUI();
          runNextInQueue();
        }

        function renderQueueUI(){
          document.getElementById("dir-queue-wrap").style.display="block";
          document.getElementById("dir-queue-list").innerHTML=dirQueue.map(function(item,i){
            return '<div class="queue-item" id="qi-'+i+'"><span class="qi-name">'+item.name+'</span><div class="qi-bar-wrap"><div class="qi-bar" id="qi-bar-'+i+'" style="width:0%"></div></div><span class="qi-state" id="qi-state-'+i+'">Queued</span></div>';
          }).join("");
        }

        function updateQueueItem(i){
          var item=dirQueue[i];
          var stateEl=document.getElementById("qi-state-"+i);
          var barEl=document.getElementById("qi-bar-"+i);
          if(!stateEl)return;
          if(item.state==="downloading"){
            stateEl.className="qi-state active";stateEl.textContent=item.elapsed+"s";
            barEl.style.width=Math.min(5+item.elapsed*0.5,90)+"%";
          }else if(item.state==="done"){
            stateEl.className="qi-state done";stateEl.textContent="Done";
            barEl.style.width="100%";barEl.style.background="#5EA259";
          }else if(item.state==="error"){
            stateEl.className="qi-state error";stateEl.textContent="Error";
            barEl.style.background="#e55";barEl.style.width="100%";
          }
        }

        function runNextInQueue(){
          var idx=-1;
          for(var i=0;i<dirQueue.length;i++){if(dirQueue[i].state==="queued"){idx=i;break;}}
          if(idx===-1){
            dirQueueRunning=false;
            fetch("/api/maps/list").then(r=>r.json()).then(function(data){
              installedFiles=new Set((data.maps||[]).map(function(m){return m.filename;}));
              document.querySelectorAll(".dir-cb").forEach(function(cb){
                if(installedFiles.has(cb.dataset.filename)){
                  cb.disabled=true;
                  var statusEl=cb.closest(".dir-entry")?cb.closest(".dir-entry").querySelector(".entry-status"):null;
                  if(statusEl)statusEl.innerHTML='<span class="installed-badge">&#10003; Installed</span>';
                }
              });
            });
            return;
          }
          dirQueueRunning=true;
          dirQueue[idx].state="downloading";dirQueue[idx].elapsed=0;
          updateQueueItem(idx);
          fetch("/api/maps/directory-download",{
            method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({cmd:dirQueue[idx].cmd,filename:dirQueue[idx].filename})
          });
          var pollStart=Date.now();
          dirQueuePoll=setInterval(function(){
            dirQueue[idx].elapsed=Math.round((Date.now()-pollStart)/1000);
            updateQueueItem(idx);
            fetch("/api/maps/download-status?t="+Date.now()).then(r=>r.json()).then(function(data){
              if(data.state==="done"&&data.filename===dirQueue[idx].filename){
                clearInterval(dirQueuePoll);dirQueue[idx].state="done";
                updateQueueItem(idx);setTimeout(function(){runNextInQueue();},500);
              }else if(data.state==="error"&&data.filename===dirQueue[idx].filename){
                clearInterval(dirQueuePoll);dirQueue[idx].state="error";
                updateQueueItem(idx);setTimeout(function(){runNextInQueue();},500);
              }
            });
          },2000);
        }

        function updateDirectory(){
          var btn=document.getElementById("dir-update-btn");
          btn.textContent="Updating...";btn.disabled=true;
          document.getElementById("dir-loading").style.display="block";
          document.getElementById("dir-content").style.display="none";
          fetch("/api/maps/directory-update",{method:"POST"}).then(r=>r.json()).then(function(data){
            btn.textContent="Update Directory";btn.disabled=false;
            document.getElementById("dir-loading").style.display="none";
            if(data.error){showDirError(data.error);}
            else{dirData=data;document.getElementById("dir-error").style.display="none";renderDirectory();}
          }).catch(function(err){
            btn.textContent="Update Directory";btn.disabled=false;
            document.getElementById("dir-loading").style.display="none";
            showDirError("Update failed: "+err);
          });
        }
      </script>

    {% endif %}

    {% if active_tab == 'documents' %}
      <div class="panel">
        <h1 style="margin:0;">Documents</h1>
        <p class="note">Upload and manage documents stored on this device.</p>
      </div>

      <div class="panel">
        <h2>Upload Document</h2>
        <p class="note">Upload any document file directly from your device.</p>
        <form method="post" action="/upload-document" enctype="multipart/form-data" id="uploadDocForm">
          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top:12px;">
            <input type="file" name="document_file" required
              style="padding:8px; border:1px solid #ccc; border-radius:8px; background:white;">
            <button type="submit">Upload</button>
          </div>
          <p class="note" id="uploadDocNote" style="margin-top:8px;"></p>
        </form>
        <script>
          document.getElementById("uploadDocForm").addEventListener("submit", function() {
            document.getElementById("uploadDocNote").textContent = "Uploading... please wait.";
          });
        </script>
      </div>

      <div class="panel">
        <h2>Installed Documents</h2>
        <p class="note">Select documents to remove them.</p>
        <form method="post" action="/delete-documents">
          <table>
            <thead>
              <tr>
                <th style="width:50px;">Pick</th>
                <th>Filename</th>
                <th style="width:110px;">Size MB</th>
              </tr>
            </thead>
            <tbody>
              {% if documents %}
                {% for d in documents %}
                  <tr>
                    <td><input type="checkbox" name="document_names" value="{{ d.filename }}"></td>
                    <td>{{ d.filename }}</td>
                    <td>{{ d.size_mb }}</td>
                  </tr>
                {% endfor %}
              {% else %}
                <tr><td colspan="3">No documents uploaded yet.</td></tr>
              {% endif %}
            </tbody>
          </table>
          <button type="submit" class="danger">Delete Selected</button>
        </form>
      </div>
    {% endif %}

    {% if active_tab == 'videos' %}
      <div class="panel">
        <h1 style="margin:0;">Videos</h1>
        <p class="note">Manage video files stored on this device.</p>
      </div>

      <div class="panel">
        <h2>Upload Video</h2>
        <p class="note">Upload a video file directly from your device. Supported formats: MP4, MKV, AVI, WebM.</p>
        <form method="post" action="/upload-video" enctype="multipart/form-data" id="uploadForm">
          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top:12px;">
            <input type="file" name="video_file" accept=".mp4,.mkv,.avi,.webm" required
              style="padding:8px; border:1px solid #ccc; border-radius:8px; background:white;">
            <button type="submit">Upload</button>
          </div>
          <p class="note" id="uploadNote" style="margin-top:8px;"></p>
        </form>
        <script>
          document.getElementById("uploadForm").addEventListener("submit", function() {
            document.getElementById("uploadNote").textContent = "Uploading... please wait, do not close this page.";
          });
        </script>
      </div>

      <div class="panel">
        <h2>Installed Videos</h2>
        <p class="note">Select videos to remove them.</p>
        <form method="post" action="/delete-videos">
          <table>
            <thead>
              <tr>
                <th style="width:50px;">Pick</th>
                <th>Title</th>
                <th style="width:110px;">Size MB</th>
                <th style="width:200px;">File</th>
              </tr>
            </thead>
            <tbody>
              {% if videos %}
                {% for v in videos %}
                  <tr>
                    <td><input type="checkbox" name="video_names" value="{{ v.filename }}"></td>
                    <td>{{ v.filename | replace("_", " ") | replace(".", " ") }}</td>
                    <td>{{ v.size_mb }}</td>
                    <td class="muted">{{ v.filename }}</td>
                  </tr>
                {% endfor %}
              {% else %}
                <tr><td colspan="4">No videos installed yet. Copy .mp4 .mkv .avi or .webm files to /opt/xprep/videos/ on the Pi.</td></tr>
              {% endif %}
            </tbody>
          </table>
          <button type="submit" class="danger">Delete Selected</button>
        </form>
      </div>
    {% endif %}

  <footer>
    <div class="footer-left">
      <span class="footer-logo">xPrep</span>
      <span id="footer-version" style="color:#bbb;font-size:0.78rem;">v1.0.0</span>
      <a href="/">Home</a>
    </div>
    <div class="footer-center">
      <a href="https://expatprepper.org/xprep">expatprepper.org/xprep</a>
    </div>
    <div class="footer-right">
      <div class="stat-block">
        <div class="stat-label">Storage</div>
        <div class="stat-value" id="stat-storage-footer">—</div>
      </div>
      <div class="stat-block">
        <div class="stat-label">Connected</div>
        <div class="stat-value" id="stat-users-footer">—</div>
      </div>
      <div class="stat-block">
        <div class="stat-label">Time</div>
        <div class="stat-value" id="stat-time">--:--</div>
      </div>
    </div>
  </footer>

  </div>

  <button id="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode" style="background:white;border:1px solid #ddd;border-radius:8px;padding:6px 8px;cursor:pointer;color:#888;display:flex;align-items:center;justify-content:center;position:fixed;top:16px;right:20px;z-index:9999;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <svg id="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="display:none"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    <svg id="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>
  </button>

  <style>
    @font-face {
      font-family: 'PixelifySans';
      src: url('/fonts/PixelifySans-Bold.ttf') format('truetype');
      font-weight: 700;
    }
    body.dark { background:#1a1a1a; color:#e0e0e0; }
    body.dark .panel { background:#242424; border-color:#333; }
    body.dark .tab { background:#2a2a2a; color:#ccc; }
    body.dark .tab.active { background:#e0e0e0; color:#111; }
    body.dark table th { background:#2a2a2a; }
    body.dark table td, body.dark table th { border-color:#333; }
    body.dark select, body.dark input[type=text], body.dark input[type=file] { background:#2a2a2a; color:#e0e0e0; border-color:#444; }
    body.dark .queue-box { background:#2a2a2a; border-color:#333; }
    body.dark details.group { background:#2a2a2a; border-color:#333; }
    body.dark .dir-region { border-color:#333; }
    body.dark .dir-region-header { background:#2a2a2a; }
    body.dark .dir-region-header:hover { background:#333; }
    body.dark .dir-entry { border-color:#333; }
    body.dark .dir-entry.region-file { background:#252520; }
    body.dark footer { background:#242424; border-color:#333; }
    body.dark #theme-toggle { background:#242424; border-color:#444; }
    body.dark header { background:#242424; border-color:#333; }
    body.dark .loader-box { background:#242424; border-color:#333; }
    body:not(.dark) .settings-card { background:#f5f5f5 !important; border-color:#e0e0e0 !important; }
    body:not(.dark) .settings-card .card-label { color:#161616 !important; }
    body:not(.dark) .settings-card .card-sub-label { color:#888 !important; }
    body:not(.dark) .settings-card .card-desc-label { color:#aaa !important; }
    body:not(.dark) .settings-card .card-icon { color:#555 !important; }
    body:not(.dark) .settings-card.enabled { border-color:#5EA259 !important; background:#f6fbf6 !important; }
  </style>

  <script>
    async function loadStatus() {
      try {
        const res = await fetch("/api/status");
        const d = await res.json();
        if (d.hostname) document.getElementById("stat-hostname").textContent = d.hostname;
        if (d.ips) {
          const networkIp = d.ips.find(ip => !ip.startsWith("55.55.55."));
          document.getElementById("stat-network-ip").textContent = networkIp || "—";
        }
        if (d.storage) {
          document.getElementById("stat-storage").textContent = d.storage.free_gb + " GB free";
          document.getElementById("stat-storage-footer").textContent = d.storage.free_gb + " GB";
        }
        if (d.connected_users !== undefined) {
          const u = d.connected_users + " user" + (d.connected_users !== 1 ? "s" : "");
          document.getElementById("stat-users").textContent = u;
          document.getElementById("stat-users-footer").textContent = u;
        }
        if (d.version) document.getElementById("footer-version").textContent = "v" + d.version;
      } catch(e) {}
    }
    loadStatus();

    function updateTime() {
      const now = new Date();
      document.getElementById("stat-time").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    updateTime();
    setInterval(updateTime, 60000);

    function setIcons(dark) {
      const sun = document.getElementById("icon-sun");
      const moon = document.getElementById("icon-moon");
      if (dark) { sun.style.display = "none"; moon.style.display = "block"; }
      else { moon.style.display = "none"; sun.style.display = "block"; }
    }

    function toggleTheme() {
      const dark = document.body.classList.toggle("dark");
      localStorage.setItem("xprep-theme", dark ? "dark" : "light");
      setIcons(dark);
    }

    const savedTheme = localStorage.getItem("xprep-theme");
    if (savedTheme === "dark") { document.body.classList.add("dark"); setIcons(true); }
    else { setIcons(false); }
  </script>
</body>
</html>
"""

register_settings_routes(app)
register_kiwix_routes(app)
register_documents_routes(app)
register_documents_api(app)
register_status_api(app)
register_videos_routes(app)
register_videos_api(app)
register_videos_upload(app)
register_maps_routes(app)


@app.route("/api/expat/update", methods=["POST"])
def expat_update():
    import urllib.request, json, os, csv, io, time
    EXPAT_DIR = "/var/www/html/expat"
    LANG_CSV  = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR276je1o-hfHrYFFkGOyVwr0aZtaTWkXGKxzCBrko49ERYJzLpPrMmQYcKQ-3zebo2cwWp6jC4-3_A/pub?gid=709541201&single=true&output=csv"
    LINKS_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR276je1o-hfHrYFFkGOyVwr0aZtaTWkXGKxzCBrko49ERYJzLpPrMmQYcKQ-3zebo2cwWp6jC4-3_A/pub?gid=118225141&single=true&output=csv"
    PDF_URL   = "https://docs.google.com/document/d/1ygae0l0ncuzBFvhS1jUgU2V4nTuzTgdxi4MGbmCWlxU/export?format=pdf&export=download"
    try:
        def fetch(url):
            req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8")

        # Find English CSV link
        lang_rows = list(csv.DictReader(io.StringIO(fetch(LANG_CSV))))
        english = next((r for r in lang_rows if "english" in r.get("Language","").lower()), None)
        if not english:
            return {"ok": False, "error": "English row not found"}, 400

        # Fetch content
        eng_url = english["CSV Link"].replace("/pubhtml?", "/pub?") + "&output=csv"
        content_rows = list(csv.DictReader(io.StringIO(fetch(eng_url))))
        links_rows = list(csv.DictReader(io.StringIO(fetch(LINKS_CSV))))

        # Save JSON
        with open(os.path.join(EXPAT_DIR, "content.json"), "w") as f:
            json.dump(content_rows, f)
        with open(os.path.join(EXPAT_DIR, "links.json"), "w") as f:
            json.dump(links_rows, f)

        # Fetch PDF
        req = urllib.request.Request(PDF_URL, headers={"User-Agent":"Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            pdf_data = r.read()
        with open(os.path.join(EXPAT_DIR, "checklist.pdf"), "wb") as f:
            f.write(pdf_data)

        # Save timestamp
        with open(os.path.join(EXPAT_DIR, "last_updated.json"), "w") as f:
            json.dump({"ts": int(time.time()*1000), "date": time.strftime("%d %b %Y %H:%M")}, f)

        # Fix permissions so nginx can serve files
        import stat
        for fname in ["content.json", "links.json", "checklist.pdf", "last_updated.json"]:
            fpath = os.path.join(EXPAT_DIR, fname)
            if os.path.exists(fpath):
                os.chmod(fpath, stat.S_IRUSR|stat.S_IWUSR|stat.S_IRGRP|stat.S_IROTH)

        return {"ok": True, "content": len(content_rows), "links": len(links_rows), "pdf_kb": len(pdf_data)//1024}
    except Exception as e:
        return {"ok": False, "error": str(e)}, 500

@app.route("/")
def index():
    active_tab = request.args.get("tab", "settings")
    if active_tab not in ["settings", "maps", "kiwix", "videos", "documents"]:
        active_tab = "settings"

    context = {"active_tab": active_tab}

    context.update(build_settings_context())
    context.update(build_kiwix_context(request.args.get("language", "")))
    context.update(build_documents_context())
    context.update(build_videos_context())

    return render_template_string(HTML_TEMPLATE, **context)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
