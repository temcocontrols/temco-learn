---
title: "How a firmware update runs"
order: 290
---

An update is a Modbus conversation, not a file copy: the updater is told to start, it receives numbered 128-byte packets, it saves how far it got, and only a separate "finish" command makes the new image the one that boots.

This page is the whole flow. The registers it writes are in [The update registers](update-registers.md), the resume bookkeeping is in [Resuming an interrupted update](resuming-an-update.md), and the source-level detail is in [Inside the bootloader](inside-the-bootloader.md).

## 1. Who is talking to whom

```text
   PC                                    Controller
   ──                                    ──────────
   T3000 / ISP tool                      T3_bootloader.bin
        │                                 (factory app, 0x20000)
        │  Modbus RTU over RS485
        │  ── write register 16 ─────────►  decides what to do
        │  ── write MD5 1993–1996 ───────►  remembered in NVS
        │  ── write 128-byte packets ────►  written into ota_0
        │  ── write register 16 = 0x01 ──►  validate, mark, reboot
        ▼
```

The updater never writes flash addresses. It counts packets; the device multiplies by 128.

## 2. The flash it writes into

```text
 0x00000 ┌──────────────────────────┐
         │ bootloader.bin           │  runs at reset
 0x08000 ├──────────────────────────┤
         │ partition table          │  this map
 0x09000 ├──────────────────────────┤
         │ nvs            64 KB     │  settings, resume counter
 0x19000 ├──────────────────────────┤
         │ otadata         8 KB     │  which app to boot
 0x1B000 ├──────────────────────────┤
         │ phy_init        4 KB     │
 0x20000 ├──────────────────────────┤
         │ factory      1 MB        │  T3_bootloader.bin
 0x120000├──────────────────────────┤
         │ ota_0        6 MB        │  temco_app.bin  ← written here
 0x720000├──────────────────────────┤
         │ matter      256 KB       │
 0x760000├──────────────────────────┤
         │ storage     128 KB       │
 0x780000├──────────────────────────┤
         │ screen_data  1 MB        │  display documents
         └──────────────────────────┘
```

Everything from `0x20000` up is untouched except `ota_0`. An update never rewrites the bootloader or the partition table; that is the [full reflash](../firmware/03-full-reflash.md).

## 3. The three commands

All three are a write to register 16 (`UPDATE_STATUS`).

| Value | Name | Effect |
|---|---|---|
| `0x1F` | `PROGRAM_RESUME` | start a new update, or continue from the saved packet |
| `0x01` | `PROGRAM_FINISH` | validate the image and make it bootable |
| `0x3F` | `ERASE_ALL_FLASH` | drop the resume point and packet buffers, ready for a fresh transfer |

Two more values exist in `modbus.h` and are handled by the firmware: `0x33` (`ERASE_USED_FLASH`) cancels a Wi-Fi/TFTP update and reboots, and `0x7F` (`PROGRAM_START`) is the legacy entry point. Neither is used by the RS485 path described here.

## 4. The packet model

```text
 packet 0        bytes      0 …   127
 packet 1        bytes    128 …   255
 packet 2        bytes    256 …   383
 …
 packet N        bytes N×128 …

 flash offset = packet number × 128
```

`OTA_PACKET_SIZE` is 128 bytes in `main/app_config.h`, and the same value is configured in the updater. If the two disagree the image is written at the wrong offsets and fails validation at the end.

## 5. Normal path

```text
 updater                                  device
 ───────                                  ──────
 write MD5 (1993–1996) ─────────────────► stored in NVS
 write reg 16 = 0x1F ───────────────────► pick ota_0
                                          resume packet = 0
                                          begin writing
 write packet 0 … N ────────────────────► append 128 bytes,
                                          advance offset,
                                          save resume counter
 write reg 16 = 0x01 ───────────────────► finish the image
                                          validate it
                                          mark ota_0 bootable
                                          UPDATE_FLAG = 0x55
                                          reboot
```

The reboot is the moment the new application starts. Before `0x01`, the device still boots the old one.

## 6. Resume path

If power is lost mid-transfer, nothing is corrupted: the new image is incomplete, but `otadata` still points at the old application, so the device boots normally and the saved packet count survives in NVS.

```text
 power returns
      │
      ▼
 resume packet = saved value (say 250)
      │
      ▼
 updater sends reg 16 = 0x1F again
      │
      ▼
 device resumes at offset 250 × 128 = 32000
 (it does not erase, and does not restart the image)
      │
      ▼
 remaining packets … then 0x01 as usual
```

The detail that matters: on a resume the firmware writes directly into the partition at the saved offset instead of calling `esp_ota_begin()`, because `esp_ota_begin()` erases the partition and would throw away the partial image.

## 7. Erase and cancel

```text
 reg 16 = 0x3F  ──► offset = 0
                    packet buffer = 0
                    resume counter high/low = 0
                    not updating
                    ready for a fresh packet 0

 reg 16 = 0x33  ──► drop the saved MD5 and the resume point
                    reboot
```

Use `0x3F` when the updater has decided the transfer is bad — a wrong image, a broken session — and wants to start over.

## 8. State machine

```text
                  ┌──────────────┐
                  │     IDLE     │
                  └──┬───┬───┬───┘
          0x1F       │   │   │      0x3F
                     │   │   └────────────► ERASE ──► IDLE
                     │   └─────── 0x01 ───► FINISH ──► IDLE
                     ▼
                ┌──────────┐
                │ PREPARE  │  choose ota_0, read resume point
                └────┬─────┘
                     ▼
                ┌──────────┐
                │    RX    │◄──┐  packets arrive, offset advances
                └────┬─────┘   │
                     │         │
                     └─────────┘
                     │  updater says finished
                     ▼
                ┌──────────┐
                │  FINISH  │  validate, mark bootable, flag 0x55
                └────┬─────┘
                     ▼
                   reboot
```

## 9. Where the checks happen

| Check | When | Failure |
|---|---|---|
| MD5 supplied by the updater | registers 1993–1996, before the packets | mismatch is reported by the updater's own verification |
| Image structure and checksum | `esp_ota_end()` at `0x01` | `ESP_ERR_OTA_VALIDATE_FAILED`; the partition is not marked bootable |
| Signature / HMAC | at finish, unless the bypass key is set | see [Skipping signature validation](skip-signature-validation.md) |
| Boot selection | bootloader start-up, from `otadata` | falls back to the factory application |

A failed validation leaves the device booting the previous application. That is the designed outcome: an update that fails is an update that did not happen.

## 10. Summary

| Aspect | Value |
|---|---|
| Flash written by an update | `ota_0`, `0x120000`, 6 MB |
| OTA selection | `otadata`, `0x19000`, 8 KB |
| Packet size | 128 bytes |
| Resume granularity | one packet |
| Maximum packets | about 49,000 (6 MB ÷ 128) |
| Commands | `0x1F` start/resume, `0x01` finish, `0x3F` erase |
| MD5 registers | 1993–1996 |
| Secure-key register | 1992 (`0x0BEE` bypasses signature checks) |
| Resume counter | register 1991, mirrored in NVS |
| Success flag | `UPDATE_FLAG` (register 23) = `0x55` |

## 11. Where this page came from

The T3_Bootloader project documents this flow in `FIRMWARE_UPDATE_FLOWCHART.md`. That document was split across this `bootloader/` section, and where it disagreed with the current source it has been corrected here:

| Claim in the original | Here, and why |
|---|---|
| MD5 in registers 1995–1998 | **1993–1996** — `modbus.h` defines `MODBUS_MD5_START = 1993`, `MODBUS_MD5_END = 1996` |
| `otadata` is 2 KB | **8 KB** (`0x2000` in `temco_partitions.csv`) |
| Bootloader region runs to `0x1EFFF` | **`0x0`–`0x7FFF`**, then the partition table at `0x8000`; the old range overlapped NVS |
| No `screen_data` in the map | **`0x780000`, 1 MB** — added for dynamic screens |
| Buffer is 4096 bytes | **128 bytes** — `OTA_FLASH_CHUNK_SIZE` in `app_config.h` |
| `0x7F` is unused | it exists as `PROGRAM_START`; `0x33` as `ERASE_USED_FLASH` |
