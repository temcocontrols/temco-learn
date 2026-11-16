---
title: "Display API: examples"
order: 180
---

## Display API examples

The exact request and response bodies a working implementation returns, and the curl commands that produce them. Any device that answers these shapes can be driven by the Design Studio.

## JSON request/response formats from the mock implementation

This section lists the exact request and response JSON shapes defined in the repository mock handler `api/src/eez_studio/bacnet_api_mock.rs`.

### Device info response
```json
{
  "panel_name": "T3-ESP32-Firmware",
  "serial_number": 0,
  "screen_size": { "width": 480, "height": 320 },
  "screen_count": 12,
  "screens": ["start_up_screen", "home_screen", "menu_screen"],
  "image_count": 30,
  "font_count": 5,
  "firmware_version": "5.1.0",
  "lvgl_version": "9.1.0",
  "dark_theme": true,
  "color_format": "RGB"
}
```

### Screen list response
```json
{
  "screens": [
    { "name": "home_screen", "json": { /* full screen JSON */ } },
    { "name": "menu_screen", "json": { /* full screen JSON */ } }
  ],
  "meta": {
    "panel_name": "T3-ESP32-Firmware",
    "serial_number": 0
  }
}
```

### Single screen response
```json
{ "name": "home_screen", "json": { /* full screen JSON */ } }
```

### Deploy all screens request body
```json
{
  "screens": [
    { "name": "home_screen", "json": { /* full screen JSON */ } },
    { "name": "menu_screen", "json": { /* full screen JSON */ } }
  ],
  "serial_number": 12345
}
```

### Deploy single screen request body
```json
{
  "json": { /* full screen JSON */ },
  "serial_number": 12345
}
```

### Patch request body
```json
{
  "changes": [
    { "path": "widgets.button1.text", "value": "OK" },
    { "path": "widgets.status.value", "value": 42 }
  ],
  "serial_number": 12345
}
```

### Deploy all screens response
```json
{
  "deployed": 10,
  "failed": 0,
  "status": "ok",
  "errors": null
}
```

### Deploy single screen response
```json
{ "name": "home_screen", "status": "ok", "error": null }
```

### Patch response
```json
{
  "applied": 2,
  "rejected": 0,
  "status": "ok",
  "errors": null
}
```

### BACnet push request body
```json
{
  "serial_number": 12345,
  "screens": [
    { "name": "home_screen", "json": { /* full screen JSON */ } }
  ]
}
```

### BACnet pull request body
```json
{
  "serial_number": 12345
}
```

### Image upload request body
```json
{
  "name": "logo",
  "data_base64": "<base64-encoded image>"
}
```

### Image upload response
```json
{
  "name": "logo",
  "status": "ok"
}
```

### Image download response
```json
{
  "name": "logo",
  "data_base64": "<base64-encoded image>"
}
```

### Patch error example
```json
{
  "applied": 1,
  "rejected": 1,
  "status": "partial",
  "errors": [
    { "path": "widgets.missing.value", "message": "key 'missing' not found" }
  ]
}
```

---

## Where this maps in the T3000 WebView repo

- The server-side mock implementing these endpoints is: `api/src/eez_studio/bacnet_api_mock.rs`.
- The bridge router that mounts `eez-device` endpoints is: `api/src/eez_studio/mod.rs`.
- The frontend client uses `src/t3-eez-studio/bridge/eez-studio-api.ts` to call these endpoints.

Use those files as reference for exact behavior and JSON keys.

---

## Final notes

- Keep the JSON shapes and endpoints stable. If you need to change shapes, version the API (e.g., `/v1/` prefix) and update the editor counterpart accordingly.
- Start with the minimal set (device/info, screens GET, screen GET) then implement PUT/PATCH and images.
- If you want, I can generate a small skeleton server in your device language (Rust/Node/Python/C#) that implements all above endpoints and stores screens on disk — tell me which language and I'll scaffold it.

## Test commnads

IP=192.168.31.164   # replace with your device IP

curl -v http://192.168.31.164/api/eez-device/device/info

# GET all screens
curl -v http://192.168.31.164/api/eez-device/screens

# PUT all screens

curl -s http://192.168.31.164/api/eez-device/screens -o current_screens.json

curl -v -X PUT http://192.168.31.164/api/eez-device/screens -H "Content-Type: application/json" --data-binary "@current_screens.json"

# GET one screen
curl -v http://192.168.31.164/api/eez-device/screens/start_up_screen
curl -v http://192.168.31.164/api/eez-device/screens/home_screen
curl -v http://192.168.31.164/api/eez-device/screens/main_menu
curl -v http://192.168.31.164/api/eez-device/screens/network_config
curl -v http://192.168.31.164/api/eez-device/screens/parameters
curl -v http://192.168.31.164/api/eez-device/screens/protocols
curl -v http://192.168.31.164/api/eez-device/screens/schedule_edit_screen
curl -v http://192.168.31.164/api/eez-device/screens/schedule_screen
curl -v http://192.168.31.164/api/eez-device/screens/time
curl -v http://192.168.31.164/api/eez-device/screens/wifi_config
curl -v http://192.168.31.164/api/eez-device/screens/holiday_calender_screen
curl -v http://192.168.31.164/api/eez-device/screens/ddns_screen
curl -v http://192.168.31.164/api/eez-device/screens/wireguard_screen

# PUT one screen
curl -v -X PUT http://192.168.31.164/api/eez-device/screens/start_up_screen \
  -H "Content-Type: application/json" -d '{"name":"start_up_screen"}'

# PATCH one screen
curl -v -X PATCH http://192.168.31.164/api/eez-device/screens/start_up_screen \
  -H "Content-Type: application/json" -d '{"name":"updated"}'

# Image pull
curl -v http://192.168.31.164/api/eez-device/images/pull/output_40

# Reset/defaults endpoints
curl -v -X POST http://192.168.31.164/api/eez-device/reset-defaults
curl -v -X POST http://192.168.31.164/api/eez-device/set-default-screens
curl -v -X POST http://192.168.31.164/api/eez-device/load-default-screens

# OPTIONS (CORS preflight)
curl -v -X OPTIONS http://192.168.31.164/api/eez-device/screens

---

Generated by the T3000 WebView codebase analysis; meant to be used as a developer integration guide for device-side REST API implementation supporting EEZ Studio and the web editor.
