---
title: "The update registers"
order: 300
---

An update is driven entirely by Modbus writes. These are the holding registers the updater touches, as defined in `main/modbus.h` of the T3_Bootloader project.

The flow that uses them is in [How a firmware update runs](update-flow.md).

## 1. Update control registers

| Register | Name | Access | Purpose |
|---:|---|---|---|
| 16 | `UPDATE_STATUS` | W | The command: start, finish or erase |
| 17 | `UPDATE_PTR_HI` | R/W | High byte of the last acknowledged position |
| 18 | `UPDATE_PTR_LO` | R/W | Low byte of the last acknowledged position |
| 23 | `UPDATE_FLAG` | R | `0x55` once an update has been accepted |
| 1991 | `MODBUS_ISP_RESUME_COUNT` | R/W | Packet count for resume |
| 1992 | `MODBUS_SECURE_KEY` | R/W | Signature bypass key; `0x0BEE` skips validation |
| 1993–1996 | `MODBUS_MD5_START` … `_END` | R/W | Four words of the expected image checksum |

Register 23 is how the updater knows the update was accepted: `0x55` means yes. Anything else means it was not.

## 2. Register 16 — the command values

| Value | Name | What the device does |
|---|---|---|
| `0x1F` | `PROGRAM_RESUME` | Start a fresh update, or continue from the saved packet count |
| `0x01` | `PROGRAM_FINISH` | End the image, validate it, mark the OTA partition bootable, set `UPDATE_FLAG = 0x55`, reboot |
| `0x3F` | `ERASE_ALL_FLASH` | Clear the resume point and the packet buffer, ready for packet 0 again |
| `0x33` | `ERASE_USED_FLASH` | Cancel a Wi-Fi/TFTP update: drop the saved MD5 and resume point, then reboot |
| `0x7F` | `PROGRAM_START` | Legacy entry point; not used by the RS485 update path |

The RS485 path uses three of these: `0x1F`, then packets, then `0x01`. `0x3F` is the recovery when a session has gone wrong.

### What `0x1F` actually does

```text
 write 0x1F
     │
     ├─ find the next OTA partition        (ota_0)
     ├─ read the saved resume packet count (NVS)
     ├─ packet count = 0 ?
     │     yes → begin a fresh image, offset 0
     │     no  → resume: raw write at count × 128, no erase
     ├─ mark "updating"
     ├─ suspend the Wi-Fi setup hotspot
     └─ accept packets
```

The resume branch deliberately skips `esp_ota_begin()`, because that call erases the partition and would discard the partial image.

### What `0x01` actually does

```text
 write 0x01
     │
     ├─ esp_ota_end()               validates the image
     ├─ esp_ota_set_boot_partition() marks ota_0 bootable
     ├─ UPDATE_FLAG = 0x55
     ├─ clear the resume counter in NVS
     └─ reboot into the new application
```

If validation fails, the boot partition is not changed and the device continues to run the previous application.

### What `0x3F` actually does

```text
 write 0x3F
     │
     ├─ flash offset = 0
     ├─ packet buffer length = 0
     ├─ resume counter high/low = 0
     ├─ not updating
     └─ the next packet is treated as packet 0
```

## 3. Checksum and bypass registers

| Register | Purpose |
|---:|---|
| 1993 | MD5 word 0 |
| 1994 | MD5 word 1 |
| 1995 | MD5 word 2 |
| 1996 | MD5 word 3 |
| 1992 | Secure key: `0x0BEE` disables signature validation |

The checksum is supplied by the updater before the transfer and stored in NVS, so it survives a reboot in the middle of an update. If the source document you were given quotes registers 1995–1998 for the MD5, that is the older numbering; the firmware in this tree uses 1993–1996.

Bypassing the signature is documented in [Skipping signature validation](skip-signature-validation.md). It is a factory and recovery tool, not a normal step.

## 4. Diagnostic registers

| Register range | Purpose |
|---|---|
| 100–150 | Diagnostic counters used during bring-up |

These are not part of the update protocol and carry no guarantees.
