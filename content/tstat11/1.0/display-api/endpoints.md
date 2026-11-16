---
title: "Display API: endpoints"
order: 160
---

## Display API endpoints

Eleven endpoints: device information, the screen list, one screen, a whole-deploy, a single deploy, and a patch that changes one widget by path. Every path is under `/api/eez-device`.

## Endpoint details

All request and response examples show canonical shapes; implementors should return matching JSON keys and appropriate HTTP status codes.

### GET /api/eez-device/device/info

Purpose: quick summary for UI (screen list, counts, sizes).

Request:
- Query: optional `serial_number` (int)

Response (200):
```json
{
  "panel_name": "T3-ESP32",
  "serial_number": 12345,
  "screen_size": { "width": 480, "height": 320 },
  "screen_count": 12,
  "screens": ["start_up_screen","home_screen","menu_screen"],
  "image_count": 25,
  "font_count": 4,
  "firmware_version": "1.2.3",
  "lvgl_version": "9.1.0",
  "dark_theme": true,
  "color_format": "RGB"
}
```

Errors:
- 503 Service Unavailable if device cannot report info.
- 500 Internal Server Error on unexpected failures.

---

### GET /api/eez-device/screens

Purpose: return all screens (heavy JSON). This is used by the editor to load projects.

Request:
- Query: optional `serial_number` (int)

Response (200):
```json
{
  "screens": [
    { "name": "home_screen", "json": { /* screen JSON object */ } },
    { "name": "menu_screen", "json": { /* ... */ } }
  ],
  "meta": { /* optional: device meta (panel_name, serial_number) */ }
}
```

Behavior:
- Return screens in the desired UI order.
- For very large responses, streaming or compressed transfer is OK as long as `application/json` is returned.

Errors:
- 200 with `screens: []` if no screens or parse fails but service still available.
- 500 if service cannot produce screens.

---

### GET /api/eez-device/screens/:name

Purpose: fetch a single screen by name.

Response (200):
```json
{ "name": "home_screen", "json": { /* screen JSON object */ } }
```

Errors:
- 404 Not Found if screen not present.
- 500 on parse error.

---

### PUT /api/eez-device/screens

Purpose: deploy/replace all screens on device (editor "deploy" action).

Request body:
```json
{
  "screens": [ { "name": "screen1", "json": { /*...*/ } }, ... ],
  "serial_number": 12345
}
```

Response (200):
```json
{
  "deployed": 10,
  "failed": 0,
  "status": "ok",
  "errors": null
}
```

Errors:
- 400 Bad Request when required fields missing.
- 200 with `status: "partial"` and `errors` array if some screens failed validation.
- 500 on internal failure.

---

### PUT /api/eez-device/screens/:name

Purpose: deploy/replace a single screen by name.

Request body:
```json
{ "json": { /* screen JSON */ }, "serial_number": 12345 }
```

Response (200):
```json
{ "name": "home_screen", "status": "ok", "error": null }
```

Errors: 400/500 as above.

---

### PATCH /api/eez-device/screens/:name

Purpose: apply delta (dot-path) changes to a screen's JSON.

Request body:
```json
{
  "changes": [
    { "path": "widgets.myLabel.text", "value": "New text" },
    { "path": "widgets.tempSensor.value", "value": 22.5 }
  ],
  "serial_number": 12345
}
```

Response (200):
```json
{
  "applied": 2,
  "rejected": 0,
  "status": "ok",
  "errors": null
}
```

Behavior:
- For each change, set the dot-path to provided value. If path missing, mark rejection but continue.
- Apply operations in order.

Errors:
- 200 with `applied`/`rejected` counts and error details for rejected changes.
- 500 if processing fails catastrophically.

---

### PATCH /api/eez-device/screens/:name/widgets/:widgetId

Same as the single-screen PATCH but server should apply each change with a prefix of `widgets.<widgetId>.`.

Request:
```json
{ "changes": [ { "path": "text", "value": "Click" } ], "serial_number": 123 }
```

Server internally applies to `widgets.<widgetId>.text`.

---

### Images

#### POST /api/eez-device/images/push/:panelId

Purpose: upload/replace an image/bitmap on device.

Request JSON:
```json
{ "name": "logo", "data_base64": "<base64-encoded PNG or LVGL binary>" }
```

Response:
```json
{ "name": "logo", "status": "ok" }
```

Behavior:
- Validate `name` non-empty.
- Store image bytes; return 200.
- Reject and return 400 if `data_base64` invalid or too large.

#### GET /api/eez-device/images/pull/:panelId/:name

Response (200):
```json
{ "name": "logo", "data_base64": "<base64>" }
```

Errors: 404 if not found.

#### DELETE /api/eez-device/images/:panelId/:name

Purpose: remove stored image. Return 200 OK.

---

### BACnet-style compatibility (optional but recommended)

Some legacy clients expect RPC POST handlers (used in the repo's mock):

- POST /api/eez-device/screens/push/:panelId
  - Body: { "serial_number": int, "screens": [ {name,json}, ... ] }
  - Response: same structure as PUT /screens (DeployAllResponse)

- POST /api/eez-device/screens/pull/:panelId
  - Body: { "serial_number": int }
  - Response: { "screens": [ ... ], "meta": ... }

Implement these endpoints to ease integration with BACnet fallback clients.

---
