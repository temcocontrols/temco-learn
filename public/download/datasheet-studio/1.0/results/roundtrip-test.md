---
title: "Linked graphics roundtrip test"
order: 240
---

Date: 2026-05-28 00:02:48
Example: `solar-lora-sensor`
Slot: `enclosure-view`

## Steps

1. Init blend + blue render
2. Compile baseline PDF â†’ `docs/results/datasheet-blue.pdf`
3. Tint enclosure red, export, verify link state
4. Compile updated PDF â†’ `docs/results/datasheet-red.pdf`

## Hashes

| Stage | PNG SHA256 |
|-------|------------|
| Blue (before) | `32BB9D9DB8AAF052BDCFDA920F4D79866B35FD991BD5D7427C2735273EE1EC80` |
| Red (after) | `196BD5BE8F522324560C0EB3A53DFEC6C8AB5BE570ECBA1989D8685D01E43FFF` |

## Result

PASS - PNG hash changed after Blender edit.

## Commands used

```powershell
.\tools\roundtrip-test.ps1 -Example solar-lora-sensor -Slot enclosure-view
```
