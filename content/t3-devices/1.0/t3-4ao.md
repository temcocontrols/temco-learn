---
title: "The T3-4AO analogue output board"
order: 60
---

An I/O module with analogue outputs, digital outputs and analogue inputs, built on a Silicon Labs C8051F120 and talking Modbus. It has no program of its own — a controller drives it.

The whole repository is flat: a handful of C files in the root, with `define.h` holding the configuration and `T3IOmodbus.h` the protocol layer.

## What it carries

| | Count |
| --- | --: |
| Analogue outputs | 4 |
| Digital outputs | 8 |
| Analogue inputs | 14 |

The board's own README gives the numbers and the reason for the CPU choice: the C8051F120 includes a 12-bit ADC, which is what the 14 analogue inputs are read through. Modbus is the only field protocol listed.

## What is in the code

- `define.h` — the configuration: `MAX_OUTPUT_CHANNELS 8`, the Modbus function codes, the resistor-divider constants for the analogue inputs, and the calibration layout
- `T3IOmodbus.h`, `serial.c` — the Modbus layer and the serial port
- `Range.c` — input ranging, so an analogue input can be scaled rather than read raw
- `goalflash.c`, `flash_info.c`, `goal_flash.h` — the flash driver and the firmware/ISP split
- `LibIO_T3IO.h` — the I/O library interface
- `pic.c` — the C8051 target-specific code
- `c8051F120.h` — the register definitions for the part

## Two details worth knowing before you flash one

**The flash is split between ISP and firmware.** `DATA_TO_ISP` is `0xEE00` (60928) and `DATA_TO_FIRMWARE` is `104448` — the bootloader and the application do not share a region, and the comment for the firmware address is present with the ISP address above it, so a build has to be told which side it is going to.

**Calibration is stored as a byte.** `CALIBRATION_OFFSET 128` exists so that `FLASH_CALIBRATION` fits in an unsigned char, and `CALIBRATION_PRECISION_POINTS 10` sets the resolution. If you are writing calibration from scratch rather than through the tool, that offset is why your values look shifted.

## Input filtering

The analogue inputs are filtered in firmware, and `define.h` defines the thresholds more than once — the later definitions are the ones the compiler keeps, and earlier ones were left in place rather than deleted. Line 70 sets a noise threshold of 1 and a filter of 1; lines 76 and 84 set them to 100 and 10; a commented-out pair at line 73 would have used 200 and 10, with the comment "threshold 200/1024 = 1V". A value of 100 against a 1024-count ADC is therefore roughly a 0.1 V band, and the filter of 10 means ten samples. If you are debugging a slow or restless analogue reading, this is the block that decides it.

## Source

`T3_4AO` in the Temco controls organisation. The repository has no schematic and no manual; `define.h` and the board's README are the whole of its documentation.
