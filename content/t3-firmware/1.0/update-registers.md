---
title: "The update registers"
order: 30
---

The host drives the whole update through a handful of Modbus registers: the control registers that start and stop it, the checksum registers that decide whether the image is the intended one, and the status register that says where the update has got to.

## 3. Modbus Register Mapping for Firmware Update

### Update Control Registers

| Register | Address | Type | Purpose | Values |
|----------|---------|------|---------|--------|
| **UPDATE_STATUS** | 16 | W | Firmware update trigger | See below |
| **UPDATE_PTR_HI** | 17 | R/W | Resume position HIGH byte | 0x00-0xFF |
| **UPDATE_PTR_LO** | 18 | R/W | Resume position LOW byte | 0x00-0xFF |
| **UPDATE_FLAG** | 23 | R/W | Update completion status | 0x55 = success |
| **ISP_RESUME_COUNT** | 1991 | R/W | Packet count for resume | 0-65535 |

### MD5 Checksum Registers

| Register | Address | Type | Purpose | Size |
|----------|---------|------|---------|------|
| **MD5[0]** | 1995 | R/W | MD5 checksum word 0 | 16-bit |
| **MD5[1]** | 1996 | R/W | MD5 checksum word 1 | 16-bit |
| **MD5[2]** | 1997 | R/W | MD5 checksum word 2 | 16-bit |
| **MD5[3]** | 1998 | R/W | MD5 checksum word 3 | 16-bit |

### Test Buffer Registers (Diagnostic)

| Register | Address | Range | Purpose |
|----------|---------|-------|---------|
| **TEST_BUF** | 100-150 | 100-150 | Diagnostic counters |

---

## 4. UPDATE_STATUS Register (Address 16) - Command Values

```
UPDATE_STATUS write values trigger different firmware update modes:

┌─────────────────────────────────────────────────────────────┐
│ Write Value │ Command                  │ Action              │
├─────────────────────────────────────────────────────────────┤
│ 0x00        │ PROGRAM_FINISH           │ End OTA update      │
│ 0x01        │ PROGRAM_FINISH           │ End OTA update      │
│ 0x1F        │ PROGRAM_RESUME           │ Start/Resume update │
│ 0x3F        │ ERASE_ALL_FLASH          │ Erase OTA partition │
│ 0x7F        │ PROGRAM_START (unused)   │ Reserved            │
└─────────────────────────────────────────────────────────────┘

Detailed Command Descriptions:

1. Write 0x1F to UPDATE_STATUS (Address 16):
   ├─ Start new firmware update OR resume interrupted update
   ├─ Retrieves resume position from flash (FLASH_RS_RES_PACKAGE)
   ├─ Calls esp_ota_begin() to prepare OTA partition
   ├─ Expects subsequent firmware data on UPDATE_PTR registers
   └─ Updates com_flash_high/low for resume tracking

2. Write 0x01 to UPDATE_STATUS (Address 16):
   ├─ Complete firmware update process
   ├─ Call esp_ota_end() to finalize image
   ├─ Validate image checksum
   ├─ Call esp_ota_set_boot_partition() to mark active
   ├─ Set UPDATE_FLAG = 0x55 on success
   ├─ Clear resume counter
   └─ Device ready to restart

3. Write 0x3F to UPDATE_STATUS (Address 16):
   ├─ Full erase of OTA partition
   ├─ Reset all resume tracking data
   ├─ Clear flash resume counter
   ├─ Abort any in-progress update
   ├─ com_update_firmware = 0
   └─ Ready for new update from packet 0
```

---
