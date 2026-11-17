---
title: "datasheet"
order: 20
---

Canonical repo for the **datasheet application**: Typst sources, templates,
build tooling, rendered assets, and product examples.

**AI agents:** start with **docs/READ_ME_FIRST.md** (especially when this folder lives inside WooIntegration2), then **AGENTS.md** for Studio depth.

Edit text and layout in Typst, edit 3D graphics in Blender, and rebuild with
one script. **All example and working files live in this repo** (`D:\XDrive\datasheet`).
Hardware projects may be used as a *read-only import* source via `sync-from-source.ps1`;
nothing is stored back in the hardware repo. See **`docs/DATA_HOME.md`**.

## Layout

```
datasheet/
  package/                        Typst package (template + helpers)
  tools/                          Build scripts, Blender export, asset sync
  examples/solar-lora-sensor/     Primary product (SSL-1)
    reference/SolarPoweredSensor.pdf   Target datasheet (from hardware repo)
    datasheet.typ                 Editable Typst layer (specs + links)
    datasheet.yaml                Manifest
    assets/                       Supporting graphics and BOM
    baseline/datasheet.pdf        Last accepted PDF (compare: original)
    out/datasheet.pdf             Working PDF (compare: proposed)
  examples/current-sensor-cs/     Temco current sensor brochure (reference PDF)
    reference/CS_single-phase.pdf
  examples/widget-x/              Minimal template example
```

## Datasheet Studio (InDesign-style UI)

Launch the app — one window with PDF preview, Links panel, and Tables panel:

```powershell
cd D:\XDrive\datasheet
.\tools\studio.ps1
```

See **`docs/STUDIO.md`** for the full InDesign-like workflow. **Direct PDF edits** (spelling, grammar, text-block position) write into the reference PDF — **`docs/PDF_DIRECT_EDIT.md`**. **Group/ungroup** elements with Ctrl+G / Ctrl+U — **`docs/ELEMENT_GROUPING.md`**. **Pane bounds (no dead space in PDF/WYSIWYG):** **`docs/STUDIO_PANE_BOUNDS.md`** — verify with `python tools/verify_pane_bounds.py`. Switch between product PDFs with **Example ▾** in Studio — **`docs/EXAMPLE_SWITCHING.md`**. New PDF-only examples auto-generate a first pass: the PDF is documented with element boxes, then a visual onboarding sequence plays (explorer flashes, WYSIWYG blocks pop in) — **`docs/ONBOARDING.md`**, **`docs/PDF_ELEMENT_DETECTION.md`**. WYSIWYG must match the target PDF per **`docs/WYSIWYG_MATCH_RULES.md`** (hard rules for titles, tables, typography, and layout). Document-wide margins and paragraph styles: **`docs/DOCUMENT_LAYOUT.md`**. Primary text column width: **`docs/DOCUMENT_TEXT_COLUMN.md`** (`studio/document-text-column.css`).

Early Studio layout step: generate **element windows** per explorer item (`python tools/extract_element_windows.py` → `element-windows.json`). The PDF pane shows light tinted outlines; tree dots use the same colors.

## Quick start (CLI)

1. Install [Typst](https://github.com/typst/typst) and add `blender` to your PATH.
2. (Optional) Import reference files from the hardware repo **into datasheet only**:

   ```powershell
   cd D:\XDrive\datasheet
   $env:DATASHEET_SYNC_SOURCE = "D:\XDrive\Solar-Powered-Lora-Sensor"  # read-only
   .\tools\sync-from-source.ps1
   ```

   Copies into `examples/solar-lora-sensor/reference/` and `assets/` — never writes to the source repo.

3. Open Studio (side-by-side compare) or the PDF directly:

   ```powershell
   .\tools\studio.ps1
## or
   start examples\solar-lora-sensor\reference\SolarPoweredSensor.pdf
   ```

4. (Optional) Rebuild the Typst overlay after editing `.typ` / tables / Blender links:

   ```powershell
   .\tools\build.ps1 -Example solar-lora-sensor -SkipBlender
   ```

## Repository roles

| Repo | Role |
|------|------|
| **datasheet** (this repo) | App home — Typst, assets, tools, PDF output |
| **Solar-Powered-Lora-Sensor** | Optional read-only import source (not a data home) |
| **typst** | Typst compiler (upstream) |
| **blender** | Blender (upstream) |

## Workflow

| Step | Tool | Location |
|------|------|----------|
| Edit specs & layout | Typst | `examples/*/datasheet.typ` |
| Edit spec tables (Excel) | CSV + Excel | `examples/*/tables/*.csv` — see `docs/TABLE_EDITING.md` |
| Edit linked 3D graphics | Blender | `graphics.links.yaml` — see `docs/LINKED_GRAPHICS.md` |
| Import hw reference files (into datasheet) | Script | `tools/sync-from-source.ps1` |
| Render + compile | Script | `tools/build.ps1` |

Full round-trip guide: **`docs/EDITING_WORKFLOW.md`**

## Manifest (`datasheet.yaml`)

Each example has a manifest. `data_home` is this repo; `source_project` is optional
read-only import only. All bundled assets live under `examples/<name>/`.

```yaml
source_project: "Solar-Powered-Lora-Sensor"

assets:
  block_diagram: "assets/block-diagram.jpg"
```

## Typst package

```typ
#import "../../package/lib.typ": datasheet, spec-table, datasheet-image
```

Build scripts use `--root` pointing at this repo root.

## Adding another product

1. Copy `examples/widget-x/` to `examples/your-product/`.
2. Edit `datasheet.typ`, `datasheet.yaml`, and add assets under `assets/`.
3. Optionally extend `tools/sync-from-source.ps1` or add a product-specific sync script.
4. Build with `.\tools\build.ps1 -Example your-product`.

## Requirements

- Typst 0.12+
- Blender 4.x (for rendering)
- PyYAML in Blender's Python (for `export_blender.py`)
