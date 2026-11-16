---
title: "Manual resize mode (element windows)"
order: 120
---

Each block in the **Document** explorer tree maps to a rectangular **element window** on the target PDF (612×792 pt), stored in `element-windows.json`. Studio uses these boxes for PDF tints, WYSIWYG outlines, and navigation.

**Manual resize mode** lets you drag the box on the PDF when automated extract/refine is not exact enough.

For **`kind: text`** windows, saving bounds also **relocates text in the reference PDF** (redact old rect, insert at new rect). See **`docs/PDF_DIRECT_EDIT.md`** § Position edits.

## Enter resize mode

| Where you double-click | Result |
|------------------------|--------|
| **Target PDF** — passive tint box | Edit mode on that window (primary surface) |
| **Explorer** — Document leaf (`text:*`, `table:*`, `asset:*`, `link:*` with a window) | PDF pane scrolls to the window and enters edit mode |
| **WYSIWYG** — section with `data-table-id` and **no** `tables/<id>.csv` | PDF resize only (e.g. `rh-temp`, `co2-specs`) |
| **WYSIWYG** — other block with `data-studio-id` (not product-shot link) | PDF resize |
| **Explorer** — Document `table:*` PDF grid rows | PDF resize (not Excel) |

**Single click** still only selects and syncs panes; it does not show resize handles.

**Not resize mode:** Explorer **Tables (Typst)** double-click → Excel (`docs/TABLE_EDITING.md`). WYSIWYG **product shot** (`data-link-slot`) → Blender.

**Inline edit:** Single click inside a WYSIWYG `<td contenteditable>` edits HTML in place; double-click on a PDF grid table does not open Excel.

If pane highlighting is off, Studio turns it back on so tint boxes are visible while you edit.

## While editing

- The active window shows a **dashed outline** and **eight handles** (corners and edges).
- **Drag a handle** to resize; **drag the interior** (inset from edges) to move.
- Status bar: `Resize <id> on PDF — drag to move; saved to PDF on exit`.
- **Right-click** the tint → **Save manual size** (same as clicking outside).
- Right-click also offers **Show drag handles** (same as double-click).

## Exit and save

- **Click outside** the editing box (PDF background or another window) → for **text** windows: bounds and content are written to the **reference PDF**; all kinds update `element-windows.json` via `POST /api/element-window`.
- **Right-click** → **Save manual size** while editing.
- Values saved: `left_px`, `top_px`, `width_px`, `height_px` for that `id`.

After save, the PDF viewer reloads; explorer, PDF tints, and WYSIWYG overlays refresh.

## Manifest and API

| File / endpoint | Role |
|-----------------|------|
| `examples/<example>/element-windows.json` | Canonical bounds per `id` |
| `GET /api/element-windows` | Studio loads windows |
| `POST /api/element-window` | Save bounds `{ id, left_px, top_px, width_px, height_px }`; **text** → also relocates content in reference PDF |
| `POST /api/element-window/refine` | Rule-based shrink/expand (right-click menu) |

Regenerate all windows from the PDF:

```powershell
python tools/extract_element_windows.py
python tools/verify_element_windows.py
```

Or sync spacing + windows:

```powershell
.\tools\sync-layout-manifests.ps1
```

## Implementation notes

- Resize UI runs in `studio/pdf-viewer.html` (PDF.js canvas + overlay divs).
- Parent shell (`studio/app.js`) routes `enter-window-edit` from explorer/WYSIWYG into the PDF iframe.
- WYSIWYG does not host handles (PDF coordinates are authoritative); overlays mirror state for feedback only.

See also: `docs/STUDIO.md` (Element windows, navigation table), **`docs/PDF_DIRECT_EDIT.md`** (text edit on PDF).
