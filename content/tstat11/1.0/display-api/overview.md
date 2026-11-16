---
title: "The device display API"
order: 150
---

The controller serves its own screens over HTTP, so the Design Studio reads and writes the display directly instead of sending a project file and trusting the result. This page is the contract: what the device has to implement, what the editor does, and how the two are wired together.

## Purpose & compatibility

This API lets the EEZ Studio web frontend (and other tooling in the T3000 WebView repo) load, edit, patch, and deploy display screens (LVGL/EEZ projects), images, and metadata from a physical device. The frontend expects the following behavior and JSON shapes used in the repository's mock implementation at `api/src/eez_studio/bacnet_api_mock.rs`.

Implementations must match endpoints, HTTP methods, and JSON structures below for full compatibility.

---

## What you must implement on the device side

### 1. Device-side server (must be implemented on the device)

Your device should expose a small HTTP server that acts as the backend for the display editor. The device/server side is responsible for:

- Listening on a local or network port.
- Implementing the REST endpoints under `/api/eez-device`.
- Parsing and validating incoming JSON payloads.
- Storing screens and images locally (RAM, flash, or filesystem).
- Rendering or refreshing the display when a screen is deployed or patched.
- Returning structured success/error responses.

In practice, this means implementing:

- `GET /device/info`
- `GET /screens` and `GET /screens/:name`
- `PUT /screens` and `PUT /screens/:name`
- `PATCH /screens/:name`
- `POST /images/push/:panelId` and `GET /images/pull/:panelId/:name`
- Optional: `DELETE /images/:panelId/:name`

### 2. Client-side app (implemented in the editor/web host app)

The client is not the device; it is the web UI, desktop app, or host application that talks to the device. The client is responsible for:

- Building or editing the screen JSON.
- Sending screens to the device with `PUT` requests.
- Uploading image assets.
- Sending patch updates for live changes.
- Showing device info and errors returned by the device.

Typical client flow:

1. Read device info from the device.
2. Load current screens from the device.
3. Edit screen JSON in the UI.
4. Deploy the edited screen or patch specific widget fields.
5. Upload any referenced images.

### 3. How to wire them together

A simple architecture is:

- Device server receives HTTP requests.
- Device server stores the screen JSON and image binaries.
- Device server converts the JSON into native drawing commands for the display.
- Device server sends back success/error JSON so the client can update the UI.

Recommended implementation order:

1. Implement the device info endpoint.
2. Implement screen list and single-screen fetch.
3. Implement screen deploy endpoints.
4. Implement patching for live updates.
5. Implement image upload/download.
6. Add rendering logic that redraws the screen after each deploy or patch.

### 4. Minimal first version

If this is your first implementation, keep it small:

- One HTTP server on the device.
- One storage folder for screen JSON files.
- One storage folder for image assets.
- A simple renderer that supports text, image, and button widgets.
- Basic validation and error responses.

That is enough to support a working device-side REST UI pipeline without overcomplicating the first release.

---

## Base path & routing

- Base path: `/api/eez-device`
- Content type: `application/json` for JSON endpoints.
- Accept `serial_number` either as a URL query parameter or inside request JSON bodies where noted.

Mount examples (server side):
- `GET  /api/eez-device/device/info`
- `GET  /api/eez-device/screens`
- `GET  /api/eez-device/screens/:name`
- `PUT  /api/eez-device/screens` (deploy all)
- `PUT  /api/eez-device/screens/:name` (deploy single)
- `PATCH /api/eez-device/screens/:name` (delta apply)
- `PATCH /api/eez-device/screens/:name/widgets/:widgetId`
- `POST /api/eez-device/images/push/:panelId`
- `GET  /api/eez-device/images/pull/:panelId/:name`
- `DELETE /api/eez-device/images/:panelId/:name`
- BACnet-style: `POST /api/eez-device/screens/push/:panelId` and `POST /api/eez-device/screens/pull/:panelId`

---
