---
title: "The move from STM32 to ESP32"
order: 50
---

Every T3 controller, and the Tstat10, once ran on an STM32F103ZE. Then it did not.

The repository that holds that firmware says it plainly:

> This is the source code to our T3 series of programmable controllers including all T3 controllers and the Tstat10 programmable thermostat. The CPU is the Arm STMF103ZE which has reached end of life for most products around Temco. Most products have been switched to the ESP32 cpu which provides an 8X increase in rom and ram.

So the split is not a rewrite for its own sake: a part reached end of life, and the replacement brings eight times the ROM and RAM.

## What this means when you are looking for code

| You want | Look in |
| --- | --- |
| Firmware for a controller still in the field on STM32 | `T3_ProgrammableController_ST` |
| Firmware for current product | `T3-programmable-controller-on-ESP32` |
| The annotated model table | either, but the ST tree's comments are fuller |
| The Tstat11 | the ESP32 tree's `main/` — it is a profile there, and it also has its own repository |

The ST tree is the better reference for *why* the firmware is shaped the way it is — the "ASIX CORE" and "ARM CORE" annotations and the customer-build switches are all there, and the ASIX-era boards only exist there. Read it for structure, and the ESP32 tree for what ships.

## The model codes survived the change

This is the useful part: the numbering is stable. The ESP32 tree keeps `MINI_BIG_ARM 5`, `MINI_SMALL_ARM 6`, `MINI_TINY_ARM 7`, `MINI_NANO 8`, `MINI_TSTAT10 9`, `MINI_VAV 10`, `MINI_T10P 11` and `MINI_TINY_11I 12` exactly where the ST tree put them.

What changed at the margins:

- The five ASIX-era profiles — `CM5`, `BIG`, `SMALL`, `TINY`, `NEW_TINY` (codes 0 to 4) — are **commented out** in the ESP32 `main/define.h`. The numbers are still reserved; the boards are no longer built.
- `MINI_T3OEM_12I` (14) is **gone entirely**: the name does not appear in the ESP32 tree at all. The OEM board's role was taken by two new profiles, `NG2` and `NEWNG2`.
- `MINI_TSTAT11` is **new at 29**, and `MAX_MINI_TYPE` moves from 14 to 30 to make room. The Tstat11 is a profile of the ESP32 controller firmware as well as its own repository.

## The ceilings did change

The point model is *not* identical, and the difference matters when you are porting:

| Profile | ST tree | ESP32 tree |
| --- | --- | --- |
| `TSTAT10` analogue outputs | 4 | **2** |
| `T3OEM_12I` | 21 AI / 7 DO / 4 AO | removed, replaced by `NG2` and `NEWNG2` |

`NG2` allows `16 + 6` analogue inputs, 7 digital outputs and no analogue outputs; `NEWNG2` allows `24 + 4` analogue inputs, 8 digital outputs and 4 analogue outputs. The `+` is part of the macro, so `NG2_MAX_AIS` is the expression `16 + 6` rather than a resolved 22 — anything that uses it has to survive that.

The ESP32 tree also adds `NANO_MAX_*` and `LPWM_MAX_*`, neither of which exists in the ST tree.

The full per-profile tables are in [How many points each model carries](io-ceilings.md).

## One conflict worth knowing about

Inside the ESP32 tree, the two headers disagree about code 8. `main/define.h` defines `MINI_NANO 8`; `main/product.h` defines `MINI_ROUTER 8`. Both are live definitions, not commented out. If you are working in that tree and code 8 matters, check which header the file you are editing includes before trusting either name.

## The display layer moved too

The ST tree drives its display directly through `display/LCD.c`, `font.c` and a driver for an ER-TFT024-3 4-wire SPI panel — a fixed panel driven from C.

The ESP32 generation, and the Tstat11 after it, use two render paths in parallel: SquareLine-generated C screens, and a JSON-driven dynamic display built on LVGL. If you are porting a screen, the panel driver in the ST tree is not the code you carry across — the layout and the widget tree are.
