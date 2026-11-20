---
title: "When the update will not start"
order: 245
---

The device shows "waiting for firmware" and the updater says the device is offline. That combination has one common cause, and it is not the wiring.

> **Start here:** if you have just used the Flash Download Tool and the screen is black with no serial output, it is almost certainly [section 8](#8-the-device-stays-in-the-download-stub-after-flashing) — the chip was never restarted. That one is a single command.

## 1. The symptom

T3000 / ISP tool output:

```text
|Open COM5 successful.
|Programming device...
|Current Hex Programming device ID is : 255
Reading device version information!(8)
Device is offline,Please check the connection!
|Initializing device...
|Erasing device...
|ID 255: Programming lines 0 to 128.(0%)
|ID 255 Error : Update was interrupted! Please verify connection.
```

The four-file flash worked — the screen says "waiting for firmware", so `T3_bootloader.bin` is running. What failed is the RS485 conversation that comes after it.

## 2. Why the device ignores the updater

The bootloader only listens on RS485 when its stored UART configuration says "Modbus slave". That setting lives in NVS, not in any of the four files:

`main/flash.c`

```c
err = nvs_get_u8(my_handle, FLASH_UART_CONFIG, &uart0_config);
if (err == ESP_ERR_NVS_NOT_FOUND) {
    uart0_config = 2;                    // default: RS485 Modbus slave
    nvs_set_u8(my_handle, FLASH_UART_CONFIG, uart0_config);
}
```

`main/modbus.c` decides what to run from it:

```c
if (uart0_config == 2) {
    ...  receive Modbus, answer the updater
}
else if (uart0_config == 9 || uart0_config == 1) {   // MSTP
    ...  consumed by Modbus/RS485 MSTP, answers nothing
}
else {
    if (uart0_config == 0) { ... }   // otherwise: sleep forever
    else vTaskDelay(pdMS_TO_TICKS(50));
}
```

In this build `MSTP_UPDATE` is `0` (`main/wifi.h`), so the middle branch is compiled out. If NVS holds `1` or `9`, execution falls to the last `else`, `uart0_config == 0` is false, and the task delays forever.

**The device boots, shows "waiting for firmware", and never answers a single Modbus frame.**

### Why NVS can hold a stale value

The four-file flash writes `0x0`, `0x8000`, `0x19000` and `0x20000`. It does **not** touch NVS at `0x9000`. If the board previously ran different firmware — another product, another product line, an old test image — the old `uart0_config`, `modbus_address` and `baud_rate` are still there.

| Key | Default after erase | Stale value that breaks the updater |
|---|---|---|
| `FLASH_UART_CONFIG` | `2` — RS485 Modbus slave | `1` or `9` — MSTP |
| `FLASH_MODBUS_ID` | `1` | any other address |
| `FLASH_BAUD_RATE` | `9` — 115200 | a slower rate |

## 3. The fix: erase, then flash

Erase the whole chip so NVS is recreated with the defaults above. The ROM loader still works with the bootloader gone, so nothing is lost.

```powershell
# 1. confirm the environment
$env:IDF_PATH

# 2. erase everything
python -m esptool --chip esp32s3 -p COM5 erase_flash

# 3. write the four files in one verified pass
python -m esptool --chip esp32s3 -p COM5 -b 460800 write_flash `
  --flash_mode dout --flash_size 32MB --flash_freq 80m `
  0x0     C:\QN\temcocontrols\T3_Bootloader\build\bootloader\bootloader.bin `
  0x8000  C:\QN\temcocontrols\T3_Bootloader\build\partition_table\partition-table.bin `
  0x19000 C:\QN\temcocontrols\T3_Bootloader\build\ota_data_initial.bin `
  0x20000 C:\QN\temcocontrols\T3_Bootloader\build\T3_bootloader.bin
```

Replace `COM5` with the port of the USB-to-TTL adapter. The board must be in download mode as usual.

`write_flash` prints each file, its address and its hash check. That is the verification the GUI also does, but here it is one command and it cannot half-finish a row.

Then:

1. Leave download mode, power-cycle.
2. Screen shows "waiting for firmware".
3. Connect **USB-to-RS485** to the device's RS485 terminals — A, B and GND — and open the updater on that COM port.
4. Device ID `1`, baud `115200`, the `temco_app.bin` you built.
5. Start. The transfer should leave 0%.

The Flash Download Tool can do the same erase: its saved configuration has the erase button enabled (`erase_button_en = True`). Use it **before** the four rows, not after.

## 4. Confirm the failure before erasing

The bootloader logs to UART0 at 115200 on the same two pins it uses for RS485 (GPIO43 TX, GPIO44 RX, DE on GPIO15). A USB-to-TTL adapter on the debug header shows what the device thinks:

```text
python -m esptool --chip esp32s3 -p COM5 --after no_reset --before no_reset run
```

or any terminal at 115200. Look for the OTA partition line:

```text
I (xxxx) boot: OTA partition subtype=0 address=0x120000
```

- `address=0x120000` — the right layout, the updater can proceed.
- `address=0x110000` or another value — the partition table on the device is not the one you wrote.
- No output at all — the wrong pins, the wrong baud, or the bootloader is not running.

## 5. The other two things that produce this message

| Check | What to look for |
|---|---|
| **Wrong adapter** | The updater needs a **USB-to-RS485** adapter on the RS485 terminals, not a USB-to-TTL on the debug header. A TTL adapter cannot drive an RS485 bus, and on this board the transceiver owns GPIO43/44. |
| **Wrong port** | Device Manager: the RS485 adapter's `COMxx` is the one the updater must open. The TTL adapter is a different port. |

Everything else — wrong file, wrong address, wrong branch — fails differently: `Hash of data verified` reports it, or nothing boots at all.

## 6. If it still fails after the erase

| Result | Meaning | Next |
|---|---|---|
| Still "Device is offline" at ID 255 | no RS485 response at all | check A/B polarity, swap them; check the adapter is RS485; check baud 115200 |
| Answers, then 0% and "interrupted" | the link drops during the erase | power the board from 24 V rather than the adapter; shorter cable; lower the tool's baud |
| Answers, transfers, then the device will not boot | image does not fit or the layout differs | confirm `ota_0` is 6 MB at `0x120000`; `temco_app.bin` is 3.0 MB |
| Answers at a different address | NVS address was not the default | the erase did not reach NVS; erase again and confirm `erase_flash` reported `Chip erase completed successfully` |

## 7. Sizes, for reference

| File | Size | Fits |
|---|---:|---|
| `bootloader.bin` @ `0x0` | 21 KB | 1 MB region |
| `partition-table.bin` @ `0x8000` | 3 KB | — |
| `ota_data_initial.bin` @ `0x19000` | 8 KB | — |
| `T3_bootloader.bin` @ `0x20000` | 928 KB | 1 MB factory partition |
| `temco_app.bin` | 3072 KB | 6 MB `ota_0` |

The application is 24,583 packets of 128 bytes. The updater must be configured for a 128-byte packet size; a mismatch shows up as a transfer that stalls or fails validation at the end rather than at the start.
## 8. The device stays in the download stub after flashing

The screen is black, the serial port shows nothing, and the updater reports `Device is offline`. The flash itself was fine.

### How to recognise it

Ask the chip directly, with nothing holding IO0 low:

```powershell
python -m esptool --chip esp32s3 -p COM5 --before no-reset --after no-reset chip-id
```

```text
Chip type: ESP32-S3 (QFN56) (revision v0.2)
Stub flasher is already running. No upload is necessary.
```

`Stub flasher is already running` is the tell. The flasher stub your Flash Download Tool loaded is **still resident in RAM**, which means the chip has not been reset since the flash. `app_main` has never run, so nothing draws on the screen and nothing prints on UART0.

The tool's own configuration explains it — `configure\esp32s3\spi_download.conf`:

```ini
[ESPTOOL_PARAM]
after = no_reset
before = default_reset
```

It flashes and deliberately does not reset.

### Why a power cycle may not help

If the USB-to-TTL adapter feeds 3.3 V into the board, unplugging the 24 V supply leaves the ESP32 running from the adapter's rail. The chip never loses power, so it never reboots. The stub survives, and the screen stays black.

### The fix — reset from the stub

```powershell
python -m esptool --chip esp32s3 -p COM5 --before no-reset --after watchdog-reset flash-id
```

```text
Stub flasher is already running. No upload is necessary.
Flash Memory Information:
Detected flash size: 32MB
Hard resetting with a watchdog...
```

The chip reboots into the application. Confirm it worked — this must now **fail**, because the stub is gone:

```powershell
python -m esptool --chip esp32s3 -p COM5 --before no-reset --after no-reset chip-id
# ERROR: Failed to connect to ESP32-S3: No serial data received.   ← expected
```

And the application announces itself on the console:

```text
W (17324) MB: Received data[120] with invalid CRC, ignoring.
```

That line is `modbus_task` running inside `T3_bootloader.bin`.

### Other ways reset, if the stub path is unavailable

| Method | When |
|---|---|
| `--after watchdog-reset` | stub resident — the normal case above |
| Momentary EN-to-GND tap, IO0 left high | board in front of you, no tool open |
| Unplug the **USB cable** as well as the 24 V, then power up | adapter feeding 3.3 V back into the board |

`--after soft-reset` does **not** work here: esptool reports `Soft resetting is currently only supported on ESP8266`.

### Why the DTR/RTS tricks fail on this board

Setting `DtrEnable`/`RtsEnable` in any order produces no output at all, because this board has **no auto-reset circuit**: the CH340's modem-control lines are not wired to EN and IO0. The jumpers are the only way in, and that is why `--before no-reset` is required for every esptool command here.

Net effect: after every Flash Download Tool run, the device needs one deliberate reset. Make it part of the procedure and the "black screen" never happens again.

## 9. Verifying the flash without trusting the tool

Read the content back and compare it with the file you flashed:

```powershell
python -m esptool --chip esp32s3 -p COM5 --before no-reset --after no-reset read-flash 0x20000 0x2000 "$env:TEMP\rb_app.bin"

function Head($path,$n){ $b=[System.IO.File]::ReadAllBytes($path)[0..($n-1)]; (Get-FileHash -InputStream ([System.IO.MemoryStream]::new($b)) -Algorithm SHA256).Hash }
"flash : $(Head "$env:TEMP\rb_app.bin" 8192)"
"file  : $(Head 'C:\QN\temcocontrols\T3_Bootloader\build\T3_bootloader.bin' 8192)"
```

Identical hashes plus a sane header mean the flash is right and the problem is elsewhere:

```text
E9 06 03 5F C8 56 37 40 ...   magic 0xE9, 6 segments, entry 0x403756C8
```

A first byte other than `0xE9` means nothing valid sits at `0x20000` — the row was wrong or the file was not `T3_bootloader.bin`.
## 10. The chip stops answering entirely

No download mode, no console, no Modbus — every path silent. Distinguish "not running" from "flash is wrong": the ROM loader executes **without** any flash content, so if `--before no-reset` gets no answer, the problem is power or reset, never the image.

```powershell
python -m esptool --chip esp32s3 -p COM5 --before no-reset --after no-reset chip-id
# Failed to connect ... No serial data received.
```

Work through these, in order. Each is cheap and each has a distinct signature.

| Check | Expected | Signature if wrong |
|---|---|---|
| **EN / reset** not shorted | ~3.3 V | held low → nothing runs at all |
| 3.3 V rail | ~3.3 V | chip dark |
| IO0 | ~3.3 V, or low for download mode | — |
| Only one supply feeds the board | 24 V **or** adapter 3.3 V | two supplies on one rail can hold it below spec |

### The adapter can be the power source

A USB-to-TTL adapter with its 3.3 V pin wired to the board keeps the ESP32 alive after the 24 V is removed. Two consequences, both observed in practice:

- **A "power cycle" that only removes the 24 V resets nothing** — the chip keeps running, the stub survives, the screen stays black.
- Unplugging the USB cable is the only true power-on reset. That also loses the COM port for a second, so the boot messages are missed; use an EN tap when you need to see the boot.

Decide which supply is authoritative and disconnect the other. Feeding both is how a working board starts behaving like a broken one.

### If nothing answers

The flash cannot be the cause at this point. Hand it over with the evidence:

- the four regions hash-compared against the files (`section 9`),
- `Chip type` / `MAC` from the last successful connect,
- the supply arrangement, including whether the adapter's 3.3 V is wired.

## 11. Black screen, silent console, and `BROWNOUT_RST` in a loop

The screen is completely black — not even a faint glow — and the console shows nothing, yet `esptool` connects in download mode and every flash write verifies. Do not reflash: nothing is wrong with the image.

Capture the console during a power cycle. The signature is unmistakable:

```text
rst:0x1 (POWERON),boot:0xb (SPI_FAST_FLASH_BOOT)
entry 0x403c8944
I (32                                  <-- application starts, then dies
ESP-ROM:esp32s3-20210327
rst:0xf (BROWNOUT_RST),boot:0xb (SPI_FAST_FLASH_BOOT)
I (33)
rst:0xf (BROWNOUT_RST),boot:0xb (SPI_FAST_FLASH_BOOT)
I (33)  ... repeats forever
```

`rst:0xf (BROWNOUT_RST)` is the ESP32's own supply supervisor firing because the 3.3 V rail fell below roughly 2.5 V. No partition table, image checksum or `otadata` decision can produce it. It means **power**.

### Why download mode works but the application does not

| What runs | Current draw | On a 30–50 mA supply |
|---|---|---|
| ROM loader / flasher stub (what `esptool` talks to) | ~20–30 mA | survives — this is why flashing always succeeded |
| Bootloader enabling octal flash + PSRAM, ~30 ms after reset | 100 mA+ | rail collapses → `BROWNOUT_RST` |
| `Lcd_Task`, backlight, Wi-Fi | 300–500 mA | never reached |

Because the reset happens before `xTaskCreate(Lcd_Task, …)` at `app_main.c:466`, `LCD_Init()` never runs and the backlight on GPIO46 is never switched on — hence a totally dark panel rather than a lit but blank one.

### The usual cause: the adapter is the only power source

A USB-to-TTL adapter's 3.3 V pin is an output of a small regulator inside the CH340 chip, good for tens of milliamps. Wiring it to the board makes the adapter the board's power supply, and the board then browns out 30 ms into every boot. Classic fingerprints:

- flashing works, the application never runs;
- the screen is dead but the chip answers `chip-id`;
- it "worked once" — the one time the 24 V happened to be connected as well.

Power the board from its own 24 V input and use **three wires only** on the adapter:

```text
adapter TX  -> board RX (UART0 RX, GPIO44)
adapter RX  -> board TX (UART0 TX, GPIO43)
adapter GND -> board GND
adapter 3.3V -> NOT CONNECTED
```

Never let two supplies feed the same rail. Back-feeding the 3.3 V rail while the board's own regulator is running pushed this board into a state where the chip answered nothing at all for hours, including download mode.

## 12. The Modbus uploader gets no reply

The bootloader speaks Modbus on UART0 — the same GPIO43/44 pair the console uses (`modbus.c:156`). Two details break stock tools and hand-written frames.

### The CRC goes on the wire high byte first

`checkdata()` compares the received CRC as `((U16_T)data[len - 2] << 8 | data[len - 1])` (`modbus.c:205`), and replies are built the same way — `uart_send[6] = CRChi; uart_send[7] = CRClo;` (`app_main.c:1311`). Standard Modbus RTU is the other way round, so a frame built by any normal Modbus library is rejected and the bootloader logs:

```text
W (238304) MB: Received data[8] with invalid CRC, ignoring.
```

When hand-building a frame, append `CRChi` then `CRClo`.

### A floating RS485 pair floods the parser

The board's transceiver receiver is connected to UART0 RX permanently. With nothing driving the A/B terminals it outputs noise, so a valid request arrives buried in junk and the log reports more bytes than were sent — an 8-byte request was reported as `Received data[120]`. That fails `checkdata()` on the very first byte (the address), so the device stays silent.

Wire the RS485 adapter's A/B (and GND) to the board's RS485 terminals before concluding that the parser or the firmware is at fault:

```powershell
# with the board running, this should show the board's log text on the RS485 side
# if it shows 0 bytes, the A/B wiring is not connected
```

### What a working request looks like

Read `UPDATE_STATUS` (register 16), address 1:

```text
01 03 00 10 00 02 CE C5      request   (CRC high byte CE, low byte C5)
```

A reply that starts `01 03` means the link, the CRC order and the address are all correct; the firmware-update registers in `bootloader/update-registers.md` can then be used.
