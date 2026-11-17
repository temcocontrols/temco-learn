---
title: "Data home policy"
order: 80
---

**All example and working files live under `D:\XDrive\datasheet`.**

We do **not** store datasheet app outputs, edits, or working copies in the hardware repo (`Solar-Powered-Lora-Sensor`) or any other external project folder.

## Canonical paths (solar-lora-sensor)

| Purpose | Path |
|---------|------|
| Target PDF (authoritative layout) | `examples/solar-lora-sensor/reference/SolarPoweredSensor.pdf` |
| Typst source | `examples/solar-lora-sensor/datasheet.typ` |
| WYSIWYG body | `examples/solar-lora-sensor/wysiwyg-body.html` |
| WYSIWYG saves | `examples/solar-lora-sensor/wysiwyg-overrides.json` |
| Spec tables (CSV) | `examples/solar-lora-sensor/tables/*.csv` |
| Linked graphics | `examples/solar-lora-sensor/assets/` |
| Blender links DB | `examples/solar-lora-sensor/graphics.links.json` |
| PDF guide images | `examples/solar-lora-sensor/assets/reference-pdf/` |
| Accepted baseline | `examples/solar-lora-sensor/baseline/` |
| Working build output | `examples/solar-lora-sensor/out/` |

## Optional import (read-only)

`tools/sync-from-source.ps1` may **read** files from another repo (default: sibling `Solar-Powered-Lora-Sensor`) and **copy into** `datasheet` only. It never writes back to the source project.

Override the import location:

```powershell
$env:DATASHEET_SYNC_SOURCE = "D:\path\to\hardware\repo"
.\tools\sync-from-source.ps1
```

If the source repo is missing, Studio and builds use files already present under `examples/`.

## Studio

Datasheet Studio resolves all assets from `examples/<example>/` and serves them via `/asset/...`. No runtime dependency on external folders.
