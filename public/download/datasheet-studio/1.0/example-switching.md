---
title: "Switching PDF examples in Studio"
order: 130
---

Studio edits one **example** at a time. An example is a folder under `examples/<slug>/` with a `datasheet.yaml` manifest and (for full Studio) a **reference PDF** in `examples/<slug>/reference/*.pdf`.

## Ways to switch

| Method | How |
|--------|-----|
| **Toolbar** | Click **Example ▾** in the top bar (or click the project title). |
| **Explorer** | Under **Target**, **right-click** the PDF filename (e.g. `SolarPoweredSensor.pdf`) → **Open example**. |
| **URL** | Open `http://127.0.0.1:8792/?example=current-sensor-cs` (shareable bookmark). |
| **CLI** | Start the server with a default: `python tools/studio_server.py --example widget-x` |

After switching, Studio reloads the target PDF, WYSIWYG, explorer outline, element windows, and table grids for that example **without restarting** the server.

## What counts as an example

`GET /api/examples` lists every `examples/<slug>/` that contains `datasheet.yaml`:

| `status` | Meaning |
|----------|---------|
| `ready` | Reference PDF + `document-outline.json` — full explorer + element windows |
| `reference_only` | Reference PDF only — PDF pane works; outline may be minimal |
| `incomplete` | No reference PDF — **disabled** in the picker |

Examples with only a reference PDF are still useful for layout QA against the target PDF. Studio **auto-generates a first pass** (PDF element boxes + manifests + WYSIWYG) with a visual onboarding animation — see **`docs/ONBOARDING.md`** and **`docs/PDF_ELEMENT_DETECTION.md`**.

## Persistence

| Store | Key | Purpose |
|-------|-----|---------|
| URL query | `?example=<slug>` | Bookmark / share |
| `sessionStorage` | `datasheet-studio-example` | Same browser tab session |
| `data/studio-vars.json` | `studio.active_example` | Last example (file today; per-user DB later) |

Priority on load: **URL** → **sessionStorage** → **studio-vars**.

## API (agents / automation)

```http
GET /api/examples
→ { "current": "solar-lora-sensor", "examples": [ { "slug", "title", "reference_pdf", "has_reference_pdf", "status" }, ... ] }

POST /api/switch-example
Content-Type: application/json
{ "example": "current-sensor-cs" }
→ project_info fields + "ok": true, "switched": true
```

Server replaces `StudioContext` for the new slug; no process restart.

## Adding a new example

1. Copy `examples/widget-x/` to `examples/your-product/`.
2. Add `datasheet.yaml` and put the target PDF in `examples/your-product/reference/`.
3. (Recommended) Run layout extractors for full Studio, or let Studio **auto-onboard** PDF-only examples — **`docs/ONBOARDING.md`**.
4. Restart is **not** required — use **Example ▾** in Studio.

See **`docs/DATA_HOME.md`** for canonical paths.

## Related

- **`docs/STUDIO.md`** — UI overview
- **`docs/STUDIO_VARS.md`** — `studio.active_example` and other persisted UI vars
- **`README.md`** — repo layout
