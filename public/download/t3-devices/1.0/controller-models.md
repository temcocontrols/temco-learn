---
title: "The controller model table"
order: 30
---

The controller firmware is one source tree compiled many ways. Which board it is being built for is decided in `common/product.h`, by a small set of `MINI_` constants — the firmware calls each board profile a "MINI", a name that goes back to the T3000 Mini-Panel.

## The model codes

```c
#define MINI_CM5           0
#define MINI_BIG           1
#define MINI_SMALL         2
#define MINI_TINY          3   // ASIX core
#define MINI_NEW_TINY      4   // ARM core
#define MINI_BIG_ARM       5
#define MINI_SMALL_ARM     6
#define MINI_TINY_ARM      7
#define MINI_NANO          8
#define MINI_TSTAT10       9
#define MINI_VAV          10   // no used
#define MINI_T10P         11
#define MINI_TINY_11I     12
#define MINI_T3OEM_12I    14
#define MAX_MINI_TYPE     14
```

The numbering has gaps: 13 is not defined, and `MINI_VAV` is marked "no used" in the source. The comment on `MINI_TINY` reads "ASIX CORE" and on `MINI_NEW_TINY` "ARM core" — those two names describe the same form factor built around two different CPUs, which is why both exist.

## What the codes mean

The source only comments three of them, so most of what follows is read from the names themselves — treat it as a guide to the naming, not as a specification:

| Code | What the name says |
| --- | --- |
| `MINI_CM5` | A board profile named CM5; the build switches below carry both an ARM and an ASIX form of it |
| `MINI_BIG` / `MINI_SMALL` | Large and small panel boards, on the ASIX core |
| `MINI_TINY` | Small board — the source comments this one "ASIX CORE" |
| `MINI_NEW_TINY` | The same board redesigned — the source comments this one "ARM CORE" |
| `MINI_BIG_ARM` / `MINI_SMALL_ARM` / `MINI_TINY_ARM` | The three boards above, built for ARM |
| `MINI_NANO` | The T3-Nano |
| `MINI_TSTAT10` | The Tstat10 thermostat |
| `MINI_T10P` | A Tstat10 variant; it carries more analogue inputs than `MINI_TSTAT10` |
| `MINI_TINY_11I` | Small board with eleven inputs |
| `MINI_T3OEM_12I` | Twelve-input OEM board |

The only two CPU assignments stated in the header are the ASIX/ARM pair for `MINI_TINY` and `MINI_NEW_TINY`. The `_ARM` suffix on the other three does the rest of the work. Nothing in the tree assigns a CPU to `MINI_NANO`, `MINI_TSTAT10`, `MINI_T10P`, `MINI_TINY_11I` or `MINI_T3OEM_12I` by name — they are covered by the `ARM_MINI` build switch instead.

## The build switches above them

Two sets of constants sit above the model list and select the build:

```c
#define ARM_MINI        1
#define ARM_CM5         0
#define ARM_TSTAT_WIFI  0
#define ASIX_MINI       0
#define ASIX_CM5        0
```

Exactly one of these is normally set to 1. The file also carries `SW_REV`, which is the firmware revision the build reports — `6808` in the current tree.

## Two hardware flags you will meet in the code

- `MSTP_UPDATE` — whether this build accepts firmware updates over MS/TP
- `HANDLE_REBOOT_FLAG` — a special customer build that disables the boot-time program so a controller cannot get stuck rebooting on a bad program. The comment in the source is explicit that it must stay 0 normally, and it is only for PLC builds.

The per-model point ceilings that go with each of these codes are in [How many points each model carries](io-ceilings.md).
