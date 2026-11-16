---
title: "How many points each model carries"
order: 40
---

Each board profile in the firmware has a ceiling for every point type, and the ceilings are not proportional to anything — a big board carries fewer discrete inputs than a small one, and one small board carries more analogue outputs than a large one. These numbers are what the firmware will index; they are not necessarily what a given board is populated with.

Taken from `common/product.h` in the T3 controller firmware.

| Model | AI | DO | AO | AV | DI | SC |
| --- | --: | --: | --: | --: | --: | --: |
| `BIG` | 32 | 12 | 12 | 128 | 0 | 8 |
| `SMALL` | 16 | 6 | 4 | 128 | 0 | 8 |
| `TINY` | 11 | 6 | 2 | 128 | 0 | 8 |
| `NEW_TINY` | 8 | 8 | 6 | 128 | 0 | 8 |
| `TINY_11I` | 11 | 6 | 5 | 128 | 0 | 8 |
| `VAV` | 6 | 1 | 2 | 5 | 0 | 8 |
| `CM5` | 24 | 10 | 0 | 128 | 8 | 8 |
| `TSTAT10` | 13 | 5 | 4 | 128 | 8 | 8 |
| `T10P` | 17 | 5 | 4 | 128 | 8 | 8 |
| `T3OEM_12I` | 21 | 7 | 4 | 128 | 8 | 8 |

These are the STM32 firmware's ceilings. The ESP32 tree keeps most of them but not all — `TSTAT10` analogue outputs drop from 4 to 2, `T3OEM_12I` is gone, and `NG2`, `NEWNG2`, `NANO` and `LPWM` are new profiles with no STM32 equivalent. See [The move from STM32 to ESP32](stm32-to-esp32.md) for that comparison.

## The point-type letters

The header does not expand its own abbreviations. AI, DO, AO, AV and DI are the standard analogue input, digital output, analogue output, analogue variable and digital input; SC is used identically across every profile at 8, and the source does not say what it stands for.

## What the table says

**Analogue variables are 128 almost everywhere.** Only the VAV profile breaks the pattern, with 5 — and its whole ceiling is small: 6 inputs, one digital output, no digital inputs.

**Digital inputs appear only on the four newest profiles.** `CM5`, `TSTAT10`, `T10P` and `T3OEM_12I` all carry 8, and every older profile carries none. That is a hardware generation boundary in a single header, and it matches what the boards are: the older panels took discrete points through the analogue input cards, the newer ones have dedicated digital inputs.

**The T10P is a Tstat10 with a bigger input count.** 17 analogue inputs against 13, with every other ceiling identical. If you need to know whether a unit is the 13-input or the 17-input build, this is the difference.

**`NEW_TINY` is not a bigger `TINY`.** It has fewer analogue inputs (8 against 11) and more of everything else — 8 digital outputs against 6, and 6 analogue outputs against 2. It is a different board, not a revision.

## The VAV profile

`MINI_VAV` is marked "no used" in the model list, and its ceilings match that: 6 inputs, 1 output, 2 analogue outputs and 5 variables. Treat any code path that mentions VAV as dormant.

## Related ceilings elsewhere in the tree

`TSTAT10_MAX_*` is also used outside the controller firmware — the Tstat11 firmware in the T3-programmable-controller repository shares the TSTAT10 limits rather than defining its own, which is why the two thermostats look identical at the point-model level despite different hardware. See the Tstat11 project on this site for what it actually runs.

The `BIG`, `SMALL` and `TINY` names should not be confused with the old T3000's panel sizes. The DOS-era manual advertises "128 points per controller, expandable to 512", 48 PID controllers and 32 trend logs for a machine with a VGA monitor and a hard disk — a completely different generation, and none of those numbers come from this header.
