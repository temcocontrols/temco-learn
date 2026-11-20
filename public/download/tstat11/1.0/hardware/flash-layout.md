---
title: "How flash is divided"
order: 30
---

The flash layout is a device-safety contract between the first-stage bootloader, the TEMCO boot/update application, and the normal controller application.

## Installed/recovery package layout

The approved T3-S `latest` recovery package contains a `partition-table.bin` that decodes as follows:

| Name | Type | Subtype | Offset | Size | What normally occupies it |
|---|---|---|---|---|---|
| nvs | data | nvs | 0x9000 | 0x10000 | Controller settings |
| otadata | data | ota | 0x19000 | 0x2000 | Selects factory/OTA application state |
| phy_init | data | phy | 0x1B000 | 0x1000 | PHY calibration data |
| factory | app | factory | 0x20000 | 0x100000 | `T3_bootloader.bin` |
| ota_0 | app | ota_0 | 0x120000 | 0x600000 | `temco_app.bin` after T3000 update |
| matter | data | nvs | 0x720000 | 0x40000 | Matter data |
| storage | data | nvs | 0x760000 | 0x20000 | Storage |
| screen_data | data | spiffs | 0x780000 | 0x100000 | Screen resources |

The matching four-file UART flash map is:

| File | Address |
|---|---:|
| `bootloader.bin` | `0x0` |
| `partition-table.bin` | `0x8000` |
| `ota_data_initial.bin` | `0x19000` |
| `T3_bootloader.bin` | `0x20000` |

This makes the two application binaries intentionally different:

- `T3_bootloader.bin` is the approximately 1 MB TEMCO update application in the factory partition.
- `temco_app.bin` is the larger normal controller application loaded into the 6 MB OTA partition by T3000.

## Application-project layout warning

The current `T3-programmable-controller-on-ESP32` checkout has a different `temco_partitions.csv`: its factory partition is 6 MB and `ota_0` is 1 MB. That does not describe the decoded `latest` recovery package above.

Do not mix the application project's generated `partition-table.bin` with the recovery package's `bootloader.bin`, `T3_bootloader.bin` and OTA data. Rebuild the complete compatible set only after identifying the exact bootloader branch, commit, SDK configuration and partition source.

The bootloader and all application data must agree on the exact partition names, offsets and sizes. A mismatch can make the device unable to boot or overwrite unrelated data. Use `build\flasher_args.json` or `build\flash_args` for a specific application-project build, and use the approved packaged address map above for the known recovery package.
