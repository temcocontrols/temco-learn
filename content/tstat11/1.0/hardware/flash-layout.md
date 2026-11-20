---
title: "How flash is divided"
order: 30
---

The flash layout is a device-safety contract between the bootloader and the application. The new application image is written through the update path and only becomes active after the transfer completes.

The current `CB-Tstate-11` firmware configuration uses a custom **ESP32-S3, 32 MB flash** layout from `temco_partitions.csv`:

| Name | Type | Subtype | Offset | Size |
|---|---|---|---|---|
| nvs | data | nvs | 0x9000 | 0x10000 |
| otadata | data | ota | 0x19000 | 0x2000 |
| phy_init | data | phy | 0x1B000 | 0x1000 |
| factory | app | factory | 0x20000 | 0x600000 |
| ota_0 | app | ota_0 | 0x620000 | 0x100000 |
| matter | data | nvs | 0x720000 | 0x40000 |
| storage | data | nvs | 0x760000 | 0x20000 |
| screen_data | data | spiffs | 0x780000 | 0x100000 |

The bootloader and application must agree on the exact partition names, offsets and sizes. A mismatch can make the device unable to boot or can overwrite unrelated data. For any individual build, `build\flasher_args.json` and `build\flash_args` are the authoritative generated address list.

Do not apply an older T3-Nano or TSTAT10 partition table to a Tstat11. If the bootloader's layout cannot be confirmed, use the normal T3000 application-update route rather than direct flashing.
