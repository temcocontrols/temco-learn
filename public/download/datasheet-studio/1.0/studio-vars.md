---
title: "Studio persistent variables"
order: 190
---

UI preferences that must survive **Reload UI** and server restarts. Stored in a single key–value table until per-user DB settings exist.

## File (current)

| Path | Role |
|------|------|
| `data/studio-vars.json` | `vars` object: dotted keys → JSON values |
| `tools/studio_vars.py` | Read/merge defaults, patch, write |

## API

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/api/studio-vars` | — | `{ format_version, updated_at, path, vars }` |
| PATCH | `/api/studio-vars` | `{ "vars": { "key": value, ... } }` | Same shape after merge |

Unknown keys are allowed. Missing keys fall back to `DEFAULT_VARS` in `studio_vars.py`.

## Keys in use

| Key | Type | Default | UI |
|-----|------|---------|-----|
| `wysiwyg.guide_visible` | boolean | `true` | Toolbar **Guide** — faint PDF underlay in WYSIWYG |
| `studio.active_example` | string \| null | `null` | Last opened example slug (see **`docs/EXAMPLE_SWITCHING.md`**) |

## Client (`studio/app.js`)

- Load once at startup via `loadStudioVars()`.
- On toggle, PATCH immediately (do not rely on `localStorage` for Guide).
- Apply `body.hide-guide` in the WYSIWYG iframe when `wysiwyg.guide_visible` is false.
- **Guide** button uses `aria-pressed` and `.toggle-on` when the guide is visible.

## TODO (database)

Replace `data/studio-vars.json` with a per-user row store (same key names), e.g. `user_settings(key, value_json, user_id)`. Keep the REST shape so `app.js` does not change.

Other settings still in `localStorage` (split ratio, zoom, highlights) should migrate into this table over time — see `docs/STUDIO.md`.
