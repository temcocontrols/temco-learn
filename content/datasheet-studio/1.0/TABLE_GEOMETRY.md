---
title: "Table geometry (enforced)"
order: 210
---

WYSIWYG spec tables must match the target PDF grid. **Do not hand-edit** column widths or row heights in `studio/target-wysiwyg.css` — they are generated from manifests.

## Authority

| Layer | File |
|-------|------|
| Measured grid | `examples/<example>/reference/*.pdf` |
| Manifest | `examples/<example>/table-columns.json` |
| Generated CSS | `studio/generated-table-vars.css`, `studio/generated-table-rules.css` |
| Studio shell | `studio/target-wysiwyg.css` (imports generated files) |

See also `docs/STUDIO.md` → Table geometry and **`docs/DOCUMENT_LAYOUT.md`** (page margins vs table width).

## Table grid overlay (PDF + WYSIWYG)

Toggle **Table grid** in the Studio toolbar to show a light green **column/row grid** on every PDF grid table. Use it to compare Studio’s idea of column widths against the target PDF.

| Artifact | Purpose |
|----------|---------|
| `examples/<name>/table-columns.json` → `grid_x_px`, `grid_y_px` | Measured PDF stroke positions |
| `examples/<name>/table-grids.json` | Auto-generated overlay manifest (`column_lines_px`, `column_widths_px`, box) |
| `studio/generated-table-layout.css` | WYSIWYG table `margin-left` / `margin-top` aligned to grid (not text-column padding) |
| `element-windows.json` (table rows) | Tint box synced to grid bounds on `generate_table_css.py` |

**Reading the overlay**

- Dashed green rectangle = table bounding box (`left_px`, `top_px`, `width_px`, `height_px` from grid lines).
- Vertical lines = column boundaries (`grid_x_px`). Label shows `columns_px` widths (e.g. `131 | 203 | 205`).
- Horizontal lines = row boundaries (`grid_y_px`).
- PDF table tint (green) uses the same box when grid data is loaded.

Rebuild after changing geometry:

```powershell
python tools/generate_table_css.py
```

Then **Reload UI** in Studio.

## Row/grid reconciliation (automatic)

`tools/table_geometry.py` → `reconcile_table_geometry()` runs on every **`generate_table_css.py`** and **`verify_table_layout.py`** pass. It double-checks **all** tables in `table-columns.json`.

| Check | Action |
|-------|--------|
| `len(grid_y_px) < len(row_heights_px) + 1` | Append missing bottom grid line(s) from `row_heights_px` |
| `height_px` | Set to `sum(row_heights_px)` (WYSIWYG authority) |
| `pdf_bbox_height_px` | Set to `grid_y_px[-1] - grid_y_px[0]` after fix |
| `measured_band_heights_px` | Refreshed from reconciled grid bands |

### Why Page 2 CO₂ missed the last row

The **standard sizer** uses two inputs:

1. **`row_heights_px`** — six bands `[17, 17, 53, 71, 17, 17]` (sum **192 px**), from text/row measurements (`measured_band_heights_px`).
2. **`grid_y_px`** — horizontal **PDF stroke** positions from PyMuPDF.

For `co2_specs`, extraction found **six** `grid_y_px` lines → only **five** bands (173.7 px tall). The **last row’s bottom border** is often missing in vector drawings (table edge open above the TVOC paragraph), so the final **17 px** row was in `row_heights_px` but not in `grid_y_px`.

Downstream, `pdf_grid_box()` and Studio table tints used `grid_y_px[-1] - grid_y_px[0]`, so the PDF green box and **Table grid** overlay stopped **one row short** while WYSIWYG CSS still used the full 192 px.

**Fix:** reconciliation appends `grid_y_px[-1] + row_heights_px[-1]` (or walks remaining rows) so `len(grid_y_px) == row_count + 1`. Re-run:

```powershell
python tools/generate_table_css.py
python tools/verify_table_layout.py --example solar-lora-sensor
```

RH/Temp (page 1) already had nine lines for eight rows (`grid_y_px` includes top + bottom table border).

## Rules (hard)

1. **`columns_px` must sum to `width_px`** (±1 px drift on last column).
2. **`row_heights_px` must sum to `height_px`** (±1 px on last row).
3. **`len(grid_y_px) == row_count + 1`** after reconciliation (enforced in `validate_table`).
3. **`table-layout: fixed`** + `<colgroup>` with profile classes (`col-label`, `c-param`, …).
4. **RH/Temp:** uniform row height, `white-space: nowrap` — no wrap-inflated height.
5. **CO₂:** per-row band heights from `row_heights_px` (short / tall / xl).
6. **Page fill:** table area within **5%** of PDF (`tools/verify_table_layout.py`).

## Commands

```powershell
## Re-measure PDF grid → update table-columns.json (manual copy from output)
python D:\XDrive\datasheet\tools\analyze_pdf.py

## Validate JSON + regenerate CSS (required before Studio / build)
python D:\XDrive\datasheet\tools\generate_table_css.py
python D:\XDrive\datasheet\tools\verify_table_layout.py --example solar-lora-sensor

## All examples that ship table-columns.json
python D:\XDrive\datasheet\tools\verify_table_layout.py --all
```

`tools/build.ps1` runs generate + verify automatically when `table-columns.json` exists.

## Adding tables to a new example

1. Add `examples/<name>/table-columns.json` with keys defined in `tools/table_geometry.py` → `PROFILES`.
2. Run `generate_table_css.py`.
3. Use `table.spec-rh` or `table.spec-co2` classes and matching `<colgroup>` in `wysiwyg-body.html`.
4. Studio re-applies classes/colgroup on every preview (`enforce_table_markup`).

## HTML profiles

| JSON key | Studio block id | CSS class |
|----------|-----------------|-----------|
| `rh_temp` | `table:rh-temp` | `spec spec-rh` |
| `co2_specs` | `table:co2-specs` | `spec spec-co2` |

CSV-backed Typst tables (`tables/*.csv`) use `package/tables.typ` and are separate from PDF grid tables.
