---
title: "Inside the bootloader"
order: 320
---

The code-level view of the update path: the state it keeps, the calls it makes, how it fails, and which files hold it all.

The protocol itself is in [How a firmware update runs](update-flow.md); the source is `T3_Bootloader`, branch `Bhavik_Tstate11`.

## 1. State held in RAM

```c
// update state
uint8_t  com_update_firmware        = 0;    // 1 while a transfer is open
uint8_t  com_update_firmware_timer  = 0;    // watchdog / gate for TFTP packets
uint8_t  update_flag                = 0;    // 0x55 once accepted

// resume
uint16_t rs485_resume_chunk         = 0;    // packet count, restored from NVS
uint8_t  com_flash_high             = 0;    // position, high byte
uint8_t  com_flash_low              = 0;    // position, low byte

// OTA handle
esp_ota_handle_t        update_com_handle      = 0;
const esp_partition_t  *update_com_partition   = NULL;

// 128-byte assembly buffer
static uint8_t  s_rs485_ota_chunk_buf[OTA_FLASH_CHUNK_SIZE];  // 128 bytes
static size_t   s_rs485_ota_chunk_len       = 0;
static uint32_t s_rs485_ota_next_offset     = 0;

// checksum
unsigned short firmware_md5[4];             // registers 1993–1996
uint16_t       modbus_secure_key    = 0;    // register 1992
```

`OTA_PACKET_SIZE` and `OTA_FLASH_CHUNK_SIZE` are both 128 in `main/app_config.h`, and both must match the updater's own packet size.

## 2. The write path

Two different calls, chosen by whether this is a fresh transfer or a resume:

```c
if (rs485_resume_chunk == 0) {
    // fresh: erase and start a new image
    esp_ota_begin(update_com_partition, OTA_SIZE_UNKNOWN, &update_com_handle);
    ...
    esp_ota_write_with_offset(update_com_handle, buf, off, len);
}
else {
    // resume: never erase, write straight into the partition
    update_com_handle = 0;
    s_rs485_ota_next_offset = rs485_resume_chunk * OTA_PACKET_SIZE;
    esp_partition_write(update_com_partition, off, buf, len);
}
```

This is the one place where reading the protocol is not enough and the code matters: the resume branch must not touch `esp_ota_begin()`.

## 3. Command handling

```c
if (address == UPDATE_STATUS) {

    if (value == PROGRAM_RESUME) {          // 0x1F
        com_update_firmware        = 1;
        update_com_partition       = esp_ota_get_next_update_partition(NULL);
        update_ota_address(rs485_resume_chunk);
        ...
    }
    else if (value == PROGRAM_FINISH) {     // 0x01
        esp_ota_end(update_com_handle);
        esp_ota_set_boot_partition(update_com_partition);
        update_flag     = 0x55;
        rs485_resume_chunk = 0;
        save_uint32_to_flash(FLASH_RS_RES_PACKAGE, 0);
        com_update_firmware = 0;
    }
    else if (value == ERASE_ALL_FLASH) {    // 0x3F
        s_rs485_ota_next_offset = 0;
        s_rs485_ota_chunk_len   = 0;
        com_flash_high = com_flash_low = 0;
        com_update_firmware = 0;
        update_flag = 0;
    }
    else if (value == ERASE_USED_FLASH) {   // 0x33
        tftp_clear_saved_and_reboot();
    }
}
```

Values come from `main/modbus.h`: `PROGRAM_FINISH 0x01`, `PROGRAM_RESUME 0x1F`, `ERASE_USED_FLASH 0x33`, `ERASE_ALL_FLASH 0x3F`, `PROGRAM_START 0x7F`.

## 4. How it fails

| Failure | What the firmware does |
|---|---|
| No OTA partition available | logs `No OTA partition available`, stays idle |
| `esp_ota_begin()` fails | logs the error, restarts to recover |
| A flash write fails | returns the error; the resume position is already saved, so the transfer can continue |
| `esp_ota_end()` reports `ESP_ERR_OTA_VALIDATE_FAILED` | does **not** mark the partition bootable; the old application keeps running |
| `esp_ota_set_boot_partition()` fails | logs the error but does not restart, so the updater can retry |
| Signature check fails | same as validation failure; `0x0BEE` in register 1992 bypasses it |

The pattern: a failure never leaves the device unbootable. The image is only switched after validation succeeds.

## 5. The files

| File | Holds |
|---|---|
| `main/app_main.c` | the Modbus write handler, the packet buffering, the OTA calls |
| `main/modbus.h` | register numbers and the command constants |
| `main/app_config.h` | `OTA_PACKET_SIZE`, `OTA_FLASH_CHUNK_SIZE` |
| `main/flash.c` | NVS read/write for the resume counter, MD5 and secure key |
| `main/temco_dfu.c` | the Wi-Fi/TFTP transfer path |
| `main/wifi_web_server.c` | the setup page used to join a network |
| `temco_partitions.csv` | the flash map this code assumes |

One caution for developers: the partition table in this project is not the same as the one in the application project. The bootloader is built against `factory` 1 MB at `0x20000` and `ota_0` 6 MB at `0x120000`; see [How flash is divided](../hardware/flash-layout.md).
