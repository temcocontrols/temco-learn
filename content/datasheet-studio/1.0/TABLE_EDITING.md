---
title: "Table editing (Excel-style)"
order: 200
---

Specification tables are stored as **CSV spreadsheets**, not buried in Typst
code. Edit them in **Microsoft Excel** (or LibreOffice Calc) with normal
keyboard shortcuts, save, and rebuild the PDF.

## Table files

```
examples/solar-lora-sensor/tables/
  electrical-specs.csv
  radio-specs.csv
```

Format (header row required):

```csv
Parameter,Value
System rail,3.3 V DC
LoRa MCU,RAK3172
```

Typst loads them at compile time:

```typ
#spreadsheet-table("tables/electrical-specs.csv", table-name: "electrical-specs")
```

## Workflow

| Step | Action |
|------|--------|
| 1 | `.\tools\open-table.ps1 -Table electrical-specs` |
| 2 | Edit in Excel — Tab, Shift+Tab, Enter, arrow keys, Ctrl+C/V, fill handle |
| 3 | Save (`Ctrl+S`) in Excel |
| 4 | `.\tools\build.ps1 -Example solar-lora-sensor -SkipBlender` |

Optional one-shot rebuild: `.\tools\open-table.ps1 -Table electrical-specs -Rebuild`

## Excel shortcuts (common)

| Shortcut | Action |
|----------|--------|
| Tab | Next cell |
| Shift+Tab | Previous cell |
| Enter | Down |
| Ctrl+Arrow | Jump to edge of data |
| Ctrl+C / Ctrl+V | Copy / paste |
| Ctrl+Z | Undo |
| Ctrl+S | Save (then rebuild PDF) |

## Why CSV?

- Opens directly in Excel — no custom grid UI required for v1
- Diff-friendly in git
- Typst `#csv()` reads it natively
- Same “linked data file” idea as graphics links: **document points at external editable source**

## Inline tables

For small static tables still in Typst, use `#spec-table(...)` in `package/layout.typ`.
Product specs should prefer `tables/*.csv` for Excel editing.

## Two kinds of “table” in Studio

| Kind | Examples | Data | Double-click |
|------|----------|------|--------------|
| **PDF grid table** | `table:rh-temp`, `table:co2-specs` in **Document** tree and WYSIWYG pages 1–2 | `table-columns.json`, `element-windows.json` | **Resize** on target PDF (manual bounds) |
| **Typst CSV table** | **Tables (Typst)** explorer group only (`electrical-specs`, `radio-specs`) | `examples/*/tables/*.csv` | **Excel** (`open-table.ps1`) |

Do not confuse them: CO₂ / RH tables in the WYSIWYG are **PDF grid** tables. They are **not** opened in Excel on double-click.

## WYSIWYG double-click on a table

Sections with `data-table-id` (e.g. `co2-specs`, `rh-temp`) post `edit-table-wysiwyg` to the Studio shell:

1. If `tables/<id>.csv` exists (Typst CSV) → **Excel only** (same as explorer **Tables (Typst)**).
2. Otherwise (PDF grid) → **PDF resize mode only** — drag handles on the target PDF tint; does **not** launch Excel.

**Single click** on a WYSIWYG table still syncs panes. You can edit cell text **inline** (`contenteditable` on `<td>`) with a normal click into a cell; that is not Excel.

**Why it felt like “resize + Excel” before:** Explorer **Document** rows `table:co2-specs` / `table:rh-temp` use `kind: "table"` but are PDF grid tables. An older handler treated **all** `kind === "table"` explorer double-clicks as Typst CSV and called Excel. WYSIWYG double-click also entered resize mode, so both could appear. Explorer now opens Excel only for **Tables (Typst)** leaves (`isTypstCsvTableNode`).

See **`docs/STUDIO_NAVIGATION.md`** and **`docs/ELEMENT_WINDOW_RESIZE.md`**.

## PDF grid tables (WYSIWYG)

RH/Temp and CO₂ tables on pages 1–2 are **not** CSV files. Their column widths and row heights are locked to the target PDF via `table-columns.json` and generated CSS. See **`docs/TABLE_GEOMETRY.md`**.

```powershell
python tools/generate_table_css.py
python tools/verify_table_layout.py --example solar-lora-sensor
```
