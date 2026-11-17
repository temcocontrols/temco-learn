---
title: "Linked Graphics (Typst ↔ Blender)"
order: 140
---

InDesign and Ventura Publisher keep **links** to external graphics files. This
repo uses the same pattern: Typst places the rendered PNG; Blender owns the
editable `.blend` source. A shared **`graphics.links.yaml`** file is the link
database.

## Link file format

`examples/<product>/graphics.links.json`:

```json
{
  "format_version": 1,
  "project": "solar-lora-sensor",
  "links": {
    "enclosure-view": {
      "label": "3D enclosure render",
      "blend": "assets/enclosure-view.blend",
      "output": "assets/enclosure-view.png",
      "camera": "Camera",
      "resolution": [1280, 720]
    }
  }
}
```

Typst references a slot:

```typ
#linked-graphic("enclosure-view")
```

The PDF shows the PNG plus a small link line: slot id, blend path, edit command.

## Round-trip workflow

| Step | Where | Action |
|------|-------|--------|
| 1 | Typst | Edit text in `datasheet.typ` |
| 2 | Tool | `.\tools\edit-graphic.ps1 -Slot enclosure-view` |
| 3 | Blender | Edit geometry/materials, **Save** (`Ctrl+S`), exit |
| 4 | Tool | `pull-graphic.ps1` exports PNG, verifies hash, rebuilds PDF |

`edit-graphic.ps1` automatically calls `pull-graphic.ps1` when Blender closes.

## Verification

After export, `verify_graphic.py` checks:

- blend and output files exist
- output mtime ≥ blend mtime (fresh render)
- SHA256 recorded in `graphics.links.yaml`

## Automated test

```powershell
.\tools\roundtrip-test.ps1
```

Creates a blue enclosure, compiles PDF, tints red in Blender headless, re-exports,
compiles again. Results: `docs/results/roundtrip-test.md` plus before/after PDFs.

## Files

| File | Role |
|------|------|
| `graphics.links.json` | Link database (common format) |
| `tools/blender_graphics.py` | Init / export / tint in Blender |
| `tools/edit-graphic.ps1` | Open Blender GUI for a slot |
| `tools/pull-graphic.ps1` | Export + verify + compile |
| `package/graphics.typ` | `#linked-graphic()` Typst helper |
