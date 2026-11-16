---
title: "Display API: payloads and patching"
order: 170
---

## Screen payloads and patching

What a screen document looks like, how a delta patch addresses a widget by dot-path, and the headers, limits and status codes a device has to honour.

## Screen JSON format (canonical)

The editor expects a consistent JSON structure for each screen. The repo's mock returns a `json` object for each screen which typically contains keys like `fonts`, `bitmaps`, and `widgets`. The exact widget schema is driven by the EEZ/LVGL flow runtime; below is a general-purpose, implementable shape that is compatible with the editor.

Canonical screen JSON structure:

```json
{
  "fonts": [ { "name": "Roboto", "size": 16 }, ... ],
  "bitmaps": [ "logo", "icon_wifi", ... ],
  "widgets": {
    "widgetId1": {
      "type": "label",
      "x": 10,
      "y": 20,
      "w": 200,
      "h": 40,
      "text": "Hello",
      "style": { "color": "#ffffff", "font": "Roboto" }
    },
    "widgetId2": {
      "type": "image",
      "x": 220,
      "y": 20,
      "w": 48,
      "h": 48,
      "src": "logo"
    },
    "widgetId3": {
      "type": "button",
      "x": 10,
      "y": 70,
      "w": 100,
      "h": 30,
      "label": "Click",
      "onClick": { "action": "navigate", "target": "menu_screen" }
    }
  },
  "bg_color": "#000000",
  "meta": { "panelId": 0, "created": "2026-08-05T12:00:00Z" }
}
```

Notes:
- `widgets` can be an object keyed by widget id (string) — editor code in the repo expects this mapping.
- Widget `type` may be `label`, `image`, `button`, `container`, `slider`, `gauge`, `chart`, etc. Provide properties relevant to LVGL widgets.
- `bitmaps` list names that the screen references; images must be uploaded via `/images/push` or embedded in screen JSON as base64 (embedding not recommended for large assets).
- `fonts` list names and sizes used by screen.

### Recommended widget properties (common)
- `label`: `text`, `font`, `color`, `align`
- `image`: `src` (name), `scale`, `opacity`
- `button`: `label`, `onClick` (action object)
- `container`: `children` (list of widget ids or keys)

The editor will treat screen JSON generically; ensure keys are predictable.

---

## Delta patch semantics (dot-path)

Patch format: `path` is a dot-separated path into the JSON object (no array index syntax unless you implement it). Example paths:
- `widgets.myLabel.text`
- `widgets.myButton.style.color`
- `meta.created`

Patch application rules:
- For each change: resolve path left-to-right. If the intermediate key is missing, consider the change rejected (unless you choose to create intermediate objects—document that behavior).
- Replace the value at the final path with the provided `value` (deep clone semantics).
- Apply changes sequentially and return counts of applied and rejected changes.
- Return per-change error messages for rejections.

Example PATCH request:
```json
{
  "changes": [
    { "path": "widgets.w1.text", "value": "New title" },
    { "path": "widgets.w2.src", "value": "new_icon" }
  ]
}
```

Response example:
```json
{ "applied": 2, "rejected": 0, "status": "ok" }
```

---

## Headers, CORS, content-type & limits

- `Content-Type: application/json` for JSON.
- Add `Access-Control-Allow-Origin: *` or device-specific origin if frontend served from another origin.
- Respect large request bodies for screen catalogs and images. The server-side mock in this project sets `DefaultBodyLimit::max(50 * 1024 * 1024)`. Implement a sensible maximum (e.g., 10–50 MB) and return 413 Payload Too Large if exceeded.
- Consider `Accept: application/json` and respond accordingly.

---

## Error handling & status codes

- 200 OK — normal successful response (even for partial failures; inspect `status` in JSON)
- 400 Bad Request — malformed JSON; missing required fields
- 404 Not Found — missing resource (screen/image)
- 413 Payload Too Large — client sent too-large body
- 500 Internal Server Error — unhandled error
- 503 Service Unavailable — device currently cannot serve the request

Include structured `errors` arrays in partial successes.

---

## Test commands (curl examples)

Fetch device info:

```bash
curl -s http://<device>:<port>/api/eez-device/device/info | jq
```

Fetch all screens:

```bash
curl -s http://<device>:<port>/api/eez-device/screens | jq
```

Fetch single screen:

```bash
curl -s http://<device>:<port>/api/eez-device/screens/home_screen | jq
```

Deploy screens (PUT):

```bash
curl -X PUT -H "Content-Type: application/json" -d @payload.json http://<device>:<port>/api/eez-device/screens | jq
```

Patch a screen (PATCH):

```bash
curl -X PATCH -H "Content-Type: application/json" -d '{"changes":[{"path":"widgets.w1.text","value":"Hello"}]}' http://<device>:<port>/api/eez-device/screens/home_screen | jq
```

Push image:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"logo","data_base64":"<base64>"}' http://<device>:<port>/api/eez-device/images/push/0 | jq
```

Pull image:

```bash
curl -s http://<device>:<port>/api/eez-device/images/pull/0/logo | jq
```

---

## Implementation checklist (developer tasks)

1. Implement `GET /api/eez-device/device/info` (lightweight summary).
2. Implement `GET /api/eez-device/screens` and `GET /api/eez-device/screens/:name`.
3. Implement `PUT /api/eez-device/screens` and `PUT /api/eez-device/screens/:name`.
4. Implement `PATCH /api/eez-device/screens/:name` and widget-level patch.
5. Implement image push/pull/delete endpoints.
6. Return exact JSON keys and response shapes described above.
7. Add logging for requests and errors.
8. Add CORS headers if required by your deployment.
9. Add tests: run the `curl` commands above against your device.
10. (Optional) Add BACnet-style POST endpoints for legacy client compatibility.

---

## Implementation tips & examples

- Storage: store screens as JSON files on disk in a `screens/` folder keyed by `name`. Keep an index file listing order.
- Atomicity: when writing multiple screens, write to temp files then atomically rename into place.
- Concurrency: guard in-memory stores with mutexes to avoid race conditions.
- Validation: before accepting a deployed screen, validate the top-level structure contains `widgets` and at least basic meta keys; return `errors` for invalid screens.
- Memory: for devices with limited RAM, stream larger responses and avoid building huge in-memory JSON blobs.

---

## Example screen JSON (full small example)

```json
{
  "fonts": [{ "name": "Roboto", "size": 16 }],
  "bitmaps": ["logo"],
  "widgets": {
    "w1": { "type": "label", "x": 12, "y": 8, "w": 200, "h": 24, "text": "Welcome", "style": { "color": "#ffffff" } },
    "w2": { "type": "image", "x": 12, "y": 40, "w": 64, "h": 64, "src": "logo" },
    "w3": { "type": "button", "x": 80, "y": 40, "w": 120, "h": 40, "label": "Menu", "onClick": { "action": "navigate", "target": "menu_screen" } }
  },
  "bg_color": "#000000",
  "meta": { "panelId": 0, "created": "2026-08-05T12:00:00Z" }
}
```

Use this example as test payloads during development.

---
