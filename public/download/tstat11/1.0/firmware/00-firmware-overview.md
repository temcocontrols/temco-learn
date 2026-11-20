---
title: "The firmware map"
order: 215
---

Five binary files end up on a Tstat11, produced by two different projects. This page is the map: what each file is, where it lands, and which guide you need. Read this before the step-by-step pages.

## 1. The whole picture

```text
      GitHub                                        GitHub
 temcocontrols/T3_Bootloader         temcocontrols/T3-programmable-controller-on-ESP32
   branch Bhavik_Tstate11                     branch CB-Tstate-11
        │                                             │
        │ idf.py build                                │ idf.py build
        ▼                                             ▼
  bootloader.bin        @ 0x00000              temco_app.bin  (~2.7 MB)
  partition-table.bin   @ 0x08000                     │
  ota_data_initial.bin  @ 0x19000                     │
  T3_bootloader.bin     @ 0x20000 (~840 KB)           │
        │                                             │
        │  UART                                       │  RS485
        │  Flash Download Tool                        │  T3000
        ▼                                             ▼
  ┌──────────────────────────────────────────────────────────────┐
  │  ESP32-S3 flash, 32 MB                                       │
  │                                                              │
  │  0x00000  bootloader.bin       runs first at every reset      │
  │  0x08000  partition-table      says where everything lives    │
  │  0x09000  nvs                  controller settings            │
  │  0x19000  otadata              which application to boot      │
  │  0x1B000  phy_init             radio calibration              │
  │  0x20000  T3_bootloader.bin    1 MB factory: update manager   │
  │  0x120000 temco_app.bin        6 MB ota_0: the controller     │
  │  0x720000 matter                                              │
  │  0x760000 storage                                             │
  │  0x780000 screen_data         1 MB spiffs: screen documents   │
  └──────────────────────────────────────────────────────────────┘
```

Only the left column is ever written over UART. Only the right column is ever written over RS485.

## 2. Which path do I need?

```text
Does the device boot and answer over RS485?
│
├─ YES ─────────────────────────────► T3000 → temco_app.bin
│                                     ~5 minutes, no ESP-IDF needed
│
└─ NO — blank screen, will not start, or "waiting for firmware"
   │
   └─► Flash Download Tool → the four files over UART
       │  ~10 minutes, needs the tool and a UART connection
       │
       └─► reboot, then T3000 → temco_app.bin

Building either set from source instead?
   └─► ESP-IDF, or a GitHub Actions artifact
```

- The `YES` branch is the [beginner guide](01-user-update-guide.md).
- The `NO` branch is the [full reflash](03-full-reflash.md), followed by the beginner guide.
- Building instead of installing is the [developer guide](02-developer-build-guide.md).

## 3. What happens when you power it on

```text
power on
  │
  ▼
bootloader.bin            reads partition-table, then reads otadata
  │
  ▼
otadata names one application partition
  │
  ├─ factory ─► T3_bootloader.bin
  │               · shows "waiting for firmware"
  │               · accepts updates over RS485, Wi-Fi, BACnet
  │               · writes temco_app.bin into ota_0, then reboots
  │
  └─ ota_0   ─► temco_app.bin
                  · the controller: display, I/O, Modbus, BACnet, MQTT
```

This is why a device can be perfectly healthy and still show "waiting for firmware": the boot/update half is alive and the controller application is not installed yet.

## 4. The five files

| File | Built by | Address | What it is |
|---|---|---|---|
| `bootloader.bin` | `T3_Bootloader` | `0x0` | ESP-IDF stage-1 bootloader. Runs first, at every reset. |
| `partition-table.bin` | `T3_Bootloader` | `0x8000` | The map of the flash: names, offsets, sizes. |
| `ota_data_initial.bin` | both | `0x19000` | Empty OTA state: "nothing selected". Not a firmware image. |
| `T3_bootloader.bin` | `T3_Bootloader` | `0x20000` | TEMCO update manager in the 1 MB factory partition. |
| `temco_app.bin` | application project | T3000, RS485 | The controller application, written into the 6 MB `ota_0`. |

Three of these names are easy to confuse:

- **`T3_bootloader.bin` is not `bootloader.bin`.** The first runs at `0x20000` and is an application; the second runs at `0x0` and is what starts the chip.
- **`ota_data_initial.bin` is not firmware.** It is 8 KB of "no selection", so the factory application is what boots first.
- **Both projects produce a `bootloader.bin` and a `partition-table.bin`, and they are not interchangeable.** The installed pair is the one that decides where an update may land.

The firmware image itself is shared across products, so the same `temco_app.bin` line runs on more than a Tstat11 — see [What the firmware runs](what-the-firmware-runs.md).

## 5. Read next

| You want to | Read |
|---|---|
| Put firmware on a device that works | [Beginner guide: update a Tstat11](01-user-update-guide.md) |
| Recover a device that will not boot | [Full reflash with the Flash Download Tool](03-full-reflash.md) |
| Build either set from source, or from GitHub Actions | [Developer guide: build and validate firmware](02-developer-build-guide.md) |
| Know why an interrupted update resumes instead of bricking | [How a firmware update runs](../bootloader/update-flow.md) |
| Know which partition is which, and why the two layouts differ | [How flash is divided](../hardware/flash-layout.md) |
