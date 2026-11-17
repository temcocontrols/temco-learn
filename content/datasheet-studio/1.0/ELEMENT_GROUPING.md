---
title: "Group and ungroup elements"
order: 110
---

Studio can **merge multiple element windows into one** (group) or **split a grouped block back apart** (ungroup). Grouping unions PDF tint boxes, WYSIWYG HTML, and explorer leaves; ungroup reverses that when `join_history` or merge metadata is present.

Implementation: **`tools/join_elements.py`**, **`tools/ungroup_elements.py`**.

## Multi-select

**Ctrl+click** (Cmd on Mac) in any pane adds/removes items from the selection:

| Pane | Behavior |
|------|----------|
| Explorer | Document leaf rows |
| Target PDF | Tint boxes |
| WYSIWYG | Blocks with `data-studio-id` |

When **two or more** joinable items are selected, **right-click** shows **Join into single element**.

## Group (join)

| Input | Action |
|-------|--------|
| **Ctrl+G** | Join current selection (PDF, WYSIWYG, or shell when not in a text field) |
| Context menu | **Join into single element** |

Requirements:

- At least **two** windows on the **same page**.
- Kinds: `text`, `link`, `asset`, `table` (not full-page).
- At least one **`text`** or **`table`** anchor (subtitle/text block).

Result:

- One **target** window keeps its `id` (prefers subtitle/text anchor).
- Union bbox in `element-windows.json`.
- WYSIWYG inner HTML merged; absorbed blocks removed from `wysiwyg-body.html`.
- **`join_history`** stored on the target for reliable ungroup later.
- Image/table followers stored as **`merged_followers`** with relative geometry.

API: `POST /api/join-elements` `{ ids: ["text:…", "link:…"] }`.

## Ungroup

| Input | Action |
|-------|--------|
| **Ctrl+U** | Ungroup the selected grouped element |
| — | Select **one** grouped block first |

Requirements: selected window is grouped (`join_history`, `merged_followers`, or `merged_section_body`).

Ungroup modes:

1. **`join_history`** (preferred) — restores exact pre-join windows and HTML.
2. **`merged_followers` only** — splits embedded images back to separate link windows.
3. **Fallback** — splits at `<h2>` boundaries when no history (approximate layout).

API: `POST /api/ungroup-elements` `{ id: "<window_id>" }`.

## Persistent storage

User-defined **join/ungroup** state is stored separately from onboard subtitle+body merges.

| Now (filesystem) | Planned |
|------------------|---------|
| `examples/<slug>/pdf-element-groups.json` | **PostgreSQL** table(s) per example / tenant |

### Current file: `pdf-element-groups.json`

Written on every join/ungroup (`tools/pdf_element_groups.py` → `sync_groups_from_windows()`). One record per grouped target window:

| Field | Purpose |
|-------|---------|
| `target_id` | Surviving window id after join |
| `absorbed_ids` | Window ids removed from `element-windows.json` |
| `join_history` | Full snapshots for ungroup (preferred) |
| `merged_followers` | Relative geometry for folded-in images/tables |
| `merged_section_body` | Whether block includes body paragraphs |
| `created_at` / `updated_at` | UTC timestamps |

Studio loads this file when serving `GET /api/element-windows` and merges `join_history` / `merged_followers` onto windows that lack them (e.g. after manual edits to `element-windows.json` only).

API: `GET /api/pdf-element-groups` — returns the groups manifest.

Regenerate from windows:

```powershell
python -c "from pathlib import Path; import sys; sys.path.insert(0,'tools'); from pdf_element_groups import ensure_groups_file; print(ensure_groups_file(Path('examples/current-sensor-cs')))"
```

### TODO — PostgreSQL

- [ ] **Migrate `pdf-element-groups` to PostgreSQL** — canonical store for PDF element grouping; filesystem JSON is interim only.
- [ ] Schema: `example_slug`, `target_id`, `absorbed_ids` (jsonb), `join_history` (jsonb), `merged_followers` (jsonb), timestamps, optional user/session.
- [ ] Studio server: read/write through a small repository layer (`tools/pdf_element_groups.py` keeps the same public API; swap `save_groups` / `load_groups` backend).
- [ ] One-time import: load existing `pdf-element-groups.json` per example into the database.

Until then, **`pdf-element-groups.json` is the source of truth** for user join/ungroup metadata; `element-windows.json` remains the source of truth for live bounds and window list.

## After join/ungroup

Studio calls `refreshProject()`, `refreshOutline()`, and reloads PDF/WYSIWYG panes so all three views stay aligned.

See also: **`docs/STUDIO.md`**, **`docs/PDF_ELEMENT_DETECTION.md`** §5.5 (subtitle+body merge rules).
