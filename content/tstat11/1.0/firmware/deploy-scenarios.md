---
title: "Which files to deploy"
order: 217
---

Find the condition your device is in, then follow that scenario. Each one names the exact files, the tool, and the order.

This page answers "what do I actually flash". The background — what each file is and where it lands — is in [The firmware map](00-firmware-overview.md).

## 1. Find your situation

| Situation | How you know | Files | Tool | Time |
|---|---|---|---|---|
| **A. Brand-new blank board** | flash erased, never programmed, or a bare ESP32-S3 module | 4 boot files, then `temco_app.bin` | Flash Download Tool, then T3000 | ~15 min |
| **B. Upgrade a working device** | boots, shows the normal screen, answers in T3000 | `temco_app.bin` only | T3000 over RS485 | ~5 min |
| **C. "Waiting for firmware"** | boots, screen says waiting, T3000 can find it | `temco_app.bin` only | T3000 over RS485 | ~5 min |
| **D. Will not boot / corrupt** | blank screen, boot loop, T3000 cannot find it | 4 boot files, then `temco_app.bin` | Flash Download Tool, then T3000 | ~20 min |
| **E. Developer loop** | you built a new `temco_app.bin` | `temco_app.bin` only | T3000 over RS485 | ~5 min |
| **F. Screens only** | only the touchscreen content changed | no firmware at all | Design Studio over HTTP | ~1 min |

A device that arrives from the factory is already programmed. It is **situation B**, not A.

## 2. The file matrix

| File | A. Blank | B. Upgrade | C. Waiting | D. Bricked | E. Dev loop | F. Screens |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| `bootloader.bin` @ `0x0` | ✔ | — | — | ✔ | — | — |
| `partition-table.bin` @ `0x8000` | ✔ | — | — | ✔ | — | — |
| `ota_data_initial.bin` @ `0x19000` | ✔ | — | — | ✔ | — | — |
| `T3_bootloader.bin` @ `0x20000` | ✔ | — | — | ✔ | — | — |
| `temco_app.bin` (T3000) | ✔ | ✔ | ✔ | ✔ | ✔ | — |

The dash is not a suggestion. Writing the boot files over a working device changes its flash layout; there is no reason to do that for an application upgrade.

## 3. A. Brand-new blank board

```text
Flash Download Tool (UART)          T3000 (RS485)
──────────────────────────          ─────────────
bootloader.bin       @ 0x0
partition-table.bin  @ 0x8000
ota_data_initial.bin @ 0x19000
T3_bootloader.bin    @ 0x20000
        │
        └─► reboot ──► "waiting for firmware"
                          │
                          └─► temco_app.bin ──► reboot ──► controller runs
```

1. Put the board in download mode and connect the UART adapter.
2. In Flash Download Tool, select the ESP32-S3 target, UART mode.
3. Add the four rows from `...\T3-S\Firmware\latest\bootloader\` at the addresses above.
4. Start and wait for four successful hash verifications.
5. Leave download mode, power-cycle. The screen should say "waiting for firmware".
6. Connect USB-to-RS485, open T3000, scan, select the device.
7. **Tools → Load firmware for a single device**, `115200`, and the approved `temco_app.bin`.
8. Wait for completion and reboot.

Details: [Full reflash](03-full-reflash.md), then [Beginner guide](01-user-update-guide.md).

## 4. B. Upgrade an existing working device

```text
T3000 (RS485)
─────────────
temco_app.bin ──► ota_0 @ 0x120000 ──► reboot ──► new version runs
```

1. Record the current firmware version and the device serial number.
2. Connect USB-to-RS485, open T3000, scan, select the device.
3. **Tools → Load firmware for a single device**.
4. COM port, `115200` baud, `temco_app.bin`.
5. Start, keep power connected, wait for reboot.
6. Rescan and confirm the new version and normal operation.

Do not flash `bootloader.bin`, `partition-table.bin`, `ota_data_initial.bin` or `T3_bootloader.bin` here. The device already has a working boot/update environment; replacing it is a different operation with a different risk.

Keep the previous `temco_app.bin` before upgrading. Rolling back is loading that file the same way.

Details: [Beginner guide](01-user-update-guide.md).

## 5. C. "Waiting for firmware"

The device is half alive: the boot/update application runs, the controller application is missing. That is exactly what a device looks like between the two stages of scenario A, and what it looks like after an update that never completed.

1. Confirm T3000 can find the device over RS485.
2. Load `temco_app.bin` as in scenario B.

If T3000 cannot find it, the boot/update half is not running either — that is scenario D.

## 6. D. Will not boot, or the flash is corrupt

1. Do the four-file UART flash from scenario A.
2. Then install `temco_app.bin` with T3000.

A device that only ever shows "waiting for firmware" and never accepts a T3000 update also belongs here.

Details: [Full reflash](03-full-reflash.md).

## 7. E. Developer loop

While iterating on controller code, each build replaces the same file:

```powershell
Set-Location "C:\QN\temcocontrols\T3-programmable-controller-on-ESP32"
idf.py build
# → build\temco_app.bin
```

Then load it with T3000 as in scenario B. Repeat for every build.

Switch to the four-file flow only when the change itself touches the bootloader, the partition table, or the OTA layout. Those three are what make a device stop booting, so they are not part of the normal loop.

## 8. F. Screens only

No firmware file is involved. The display is a JSON document on the device, replaced over HTTP by Design Studio.

Use [Design Studio: preview, bind and deploy](../t3-eez-studio/manual/05-preview-and-deploy.md). See also [The screens that ship on the device](../display/shipped-screens.md).

## 9. Where each file comes from

| File | Source | Where to get it |
|---|---|---|
| the four boot files | `T3_Bootloader`, branch `Bhavik_Tstate11` | Actions artifact `firmware`, or `C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader` |
| `temco_app.bin` | `T3-programmable-controller-on-ESP32`, branch `CB-Tstate-11` | Actions artifact `firmware`, or your own `build\temco_app.bin` |

Building and downloading both: [Developer guide](02-developer-build-guide.md).

### 9.1 The exact paths, built and packaged

**Built on this machine** (2026-11-20, bootloader `9329f55` / application `fc13533`):

| File | Size | Path |
|---|---:|---|
| `bootloader.bin` | 21,296 B | `C:\QN\temcocontrols\T3_Bootloader\build\bootloader\bootloader.bin` |
| `partition-table.bin` | 3,072 B | `C:\QN\temcocontrols\T3_Bootloader\build\partition_table\partition-table.bin` |
| `ota_data_initial.bin` | 8,192 B | `C:\QN\temcocontrols\T3_Bootloader\build\ota_data_initial.bin` |
| `T3_bootloader.bin` | 950,816 B | `C:\QN\temcocontrols\T3_Bootloader\build\T3_bootloader.bin` |
| `temco_app.bin` | 3,146,704 B | `C:\QN\temcocontrols\T3-programmable-controller-on-ESP32\build\temco_app.bin` |

**Packaged and known-good** (2026-09-07, bootloader build #47 / `95d60a06`):

| File | Size | Path |
|---|---:|---|
| `bootloader.bin` | 21,296 B | `C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\bootloader.bin` |
| `partition-table.bin` | 3,072 B | `C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\partition-table.bin` |
| `ota_data_initial.bin` | 8,192 B | `C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\ota_data_initial.bin` |
| `T3_bootloader.bin` | 861,680 B | `C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\T3_bootloader.bin` |
| `temco_app.bin` | 2,804,672 B | `C:\Users\Double\Desktop\T3-S\Firmware\latest\ESP32\temco_app.bin` |

Both sets are valid. Use the packaged set to bring a device back to a known state, the built set to test your own change.

## 10. Mistakes that cost a device

| Mistake | What happens |
|---|---|
| Using the application project's `partition-table.bin` on a working device | layout changes; a 3.0 MB image no longer fits `ota_0` |
| Writing `T3_bootloader.bin` at `0x0` | the factory application overwrites the stage-1 bootloader |
| Writing `bootloader.bin` at `0x20000` | nothing boots; "waiting for firmware" forever |
| Selecting `ota_data_initial.bin` in T3000 | not a firmware image; the update cannot start |
| Flashing an ESP32 (`main` branch) set on an ESP32-S3 board | no boot, no serial output |
| Running `idf.py flash` from the application project | its address list writes `temco_app.bin` to `0x20000`, over the factory partition |
| Upgrading without keeping the previous `temco_app.bin` | no rollback path |

If a mistake lands you here, scenario D is the recovery.

## 11. Summary card

Everything on this page, on one card.

### Upgrade a working device

```text
tool    T3000, over USB-to-RS485
file    temco_app.bin          (one file, nothing else)
steps   scan → select → Tools → Load firmware for a single device
        COM port, 115200, temco_app.bin → start → wait for reboot
```

### Full reflash

```text
tool    C:\Users\Double\Desktop\T3-S\flash_download_tool\flash_download_tool
        flash_download_tool_3.9.9_R2.exe   →  ESP32-S3, UART mode

file                                          address
bootloader.bin                                0x0
partition-table.bin                           0x8000
ota_data_initial.bin                          0x19000
T3_bootloader.bin                             0x20000

then    reboot → "waiting for firmware"
        T3000 → temco_app.bin → reboot → controller runs
```

### Which file belongs to which tool

```text
T3_Bootloader  build\bootloader\bootloader.bin             → UART, 0x0
               build\partition_table\partition-table.bin   → UART, 0x8000
               build\ota_data_initial.bin                  → UART, 0x19000
               build\T3_bootloader.bin                     → UART, 0x20000

application    build\temco_app.bin                         → T3000, RS485
```

Nothing crosses that line. The UART tool never receives `temco_app.bin`, and T3000 never receives the four boot files.
