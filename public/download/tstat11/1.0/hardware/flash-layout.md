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

## Where the package's `ota_data_initial.bin` comes from

`otadata` is the partition the ESP-IDF second-stage bootloader reads to decide which application to start. `ota_data_initial.bin` is that partition's *initial* content — 8192 bytes with no selection recorded, so the factory application runs first.

Both projects generate one because both partition tables declare `otadata` at `0x19000`. In the packages examined here the two files are byte-identical, so either copy is the same content. It is flashed at `0x19000` in the full-reflash flow, and it is **not** a firmware image that T3000 would select.

## Writing an ota selector by hand (developer shortcut)

A full bootloader flash leaves `otadata` blank, so the device boots `factory` (`T3_bootloader.bin`) and shows "Waiting for firmware". To boot the application in `ota_0` without going through T3000, write the application to `0x120000` **and** a selector record to `0x19000`.

The record is 32 bytes:

| Offset | Field | Value |
|---:|---|---|
| 0 | `ota_seq` | `1` selects `ota_0` |
| 4 | `seq_label[20]` | zeros |
| 24 | `ota_state` | `0` (`NEW`); ignored when `CONFIG_BOOTLOADER_APP_ROLLBACK_ENABLE` is off |
| 28 | `crc` | see below |

The CRC covers **only the four `ota_seq` bytes** and comes from `bootloader_common_ota_select_crc()` → `esp_rom_crc32_le(UINT32_MAX, &ota_seq, 4)`. The ROM implementation is `crc = ~crc; …; return ~crc;`, so with `UINT32_MAX` passed in it becomes init `0` with no final inversion. In Python that is:

```python
crc = zlib.crc32(struct.pack("<I", 1), 0xFFFFFFFF)   # 0x4743989A for seq = 1
```

Two values that look right and are not, both of which produce a device that ignores the selector:

| Expression | For `seq = 1` | Result on the device |
|---|---:|---|
| `zlib.crc32(d)` | `0x99F8B879` | `ota data partition invalid` |
| `zlib.crc32(d) ^ 0xFFFFFFFF` | `0x66074786` | `ota data partition invalid` |
| `zlib.crc32(d, 0xFFFFFFFF)` | **`0x4743989A`** | boots `ota_0` |

The failure is quiet in the sense that nothing is damaged — the second-stage bootloader logs one line and falls back:

```text
E (120) boot: ota data partition invalid, falling back to factory
```

With a correct selector the same slot logs instead:

```text
I (905) boot: Loaded app from partition at offset 0x120000
```

## Application-project layout warning

The current `T3-programmable-controller-on-ESP32` checkout has a different `temco_partitions.csv`: its factory partition is 6 MB and `ota_0` is 1 MB at `0x620000`. That does not describe the decoded `latest` recovery package above.

The package's layout is the `temco_partitions.csv` from the bootloader branch **`Bhavik_Tstate11`**. That branch is the ESP32-S3 one; the bootloader repository's `main` is the older ESP32 / 4 MB variant.

Do not mix the application project's generated `partition-table.bin` with the recovery package's `bootloader.bin`, `T3_bootloader.bin` and OTA data. A ~2.7 MB `temco_app.bin` cannot fit the application project's 1 MB `ota_0`, so that mix fails at update time even though the flash tool reports success.

The bootloader and all application data must agree on the exact partition names, offsets and sizes. Use `build\flasher_args.json` or `build\flash_args` for a specific application-project build, and the approved packaged address map above for the known recovery package.
