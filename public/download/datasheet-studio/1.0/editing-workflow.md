---
title: "Datasheet editing workflow"
order: 70
---

Two external edit environments, one document — similar to high-end DTP packages.

## 1. Text & layout → Typst

Edit `examples/<product>/datasheet.typ` in Cursor. Compile with `build.ps1`.

## 2. Linked graphics → Blender

See [LINKED_GRAPHICS.md](LINKED_GRAPHICS.md).

```powershell
.\tools\edit-graphic.ps1 -Slot enclosure-view
## … edit in Blender, save, exit …
## pull-graphic runs automatically
```

Common format: **`graphics.links.json`**

## 3. Specification tables → Excel

See [TABLE_EDITING.md](TABLE_EDITING.md).

```powershell
.\tools\open-table.ps1 -Table electrical-specs
## … edit in Excel, Ctrl+S …
.\tools\build.ps1 -Example solar-lora-sensor -SkipBlender
```

Common format: **`tables/*.csv`**

## Repository layout

```
examples/solar-lora-sensor/
  datasheet.typ           # document (Typst)
  graphics.links.json     # Blender link database
  tables/*.csv            # Excel-editable tables
  assets/                 # blends, PNG renders, synced refs
  out/datasheet.pdf       # output
```

## Test results

Run the linked-graphics roundtrip test:

```powershell
.\tools\roundtrip-test.ps1
```

Report: `docs/results/roundtrip-test.md`
