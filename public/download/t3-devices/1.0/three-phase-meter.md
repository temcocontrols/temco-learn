---
title: "The three-phase power meter"
order: 80
---

A power meter for three-phase electrical service, reporting over Modbus and BACnet. The repository's README is one line — "Three phase power meter with modbus and bacnet protocol" — so everything below comes from the code and from the schematic in `Docs/Rev06_SCH.pdf`.

## How it is put together

An STM32F10x running FreeRTOS, with an **ADE7753** energy metering front end. `main()` starts seven tasks:

| Task | What it does |
| --- | --- |
| `PowerMeter` | Reads the metering chip and maintains voltage, current and watt-hour measurements |
| `COMM` | Modbus |
| `NET` | The network stack |
| `MSTP` | BACnet MS/TP |
| `AnalogInput` | The analogue input points a controller sees |
| `AnalogOutput` | The analogue output points |
| `LED0` | The status LED |

The application is linked at `0x8008000` — `main()` sets the vector table there explicitly, the same offset the I/O modules use, so the same bootloader arrangement applies across the family.

## What it measures

`vPowerMeterTask` initialises the ADE7753 and then loops thirty times at 100 ms, reading:

- frequency
- voltage peak and current peak
- RMS voltage and RMS current (`get_vrms`, `get_irms`)
- watt-hour calibration through the chip's CF output, when `cf_calibration_enable` is set

So the meter is measuring real electrical quantities from a dedicated metering IC, not inferring them from an ADC.

## One thing to know before trusting a three-phase reading

The phase counter is hard-coded to one phase:

```c
int8 PHASE_TEMP = 0;
...
//		if(PHASE_TEMP > 2) PHASE_TEMP = 0;
//		else
//			PHASE_TEMP++;
		PHASE_TEMP = 1;
```

The block that would step through phases 0, 1 and 2 is commented out, and `PHASE_TEMP` is set to 1 on every pass. As the code stands, the metering task reads and calibrates a single phase — `wh_calibration[PHASE_TEMP]` is indexed with that same constant, so the other two entries in the array are never touched.

Whether that reflects the shipping firmware or a work-in-progress tree is not recorded in the repository. If you are commissioning a unit, check which binary it is running before you assume three phases of measurement.

## What else is in the tree

| Folder | What it carries |
| --- | --- |
| `HARDWARE`, `STM32F10x_FWLib`, `CORE`, `SYSTEM` | The STM32F10x target and its libraries |
| `baclib` | The BACnet stack, including `baclib/object/ms-input.h` |
| `MODBUS` | The Modbus stack |
| `IO_control`, `INPUT`, `OUTPUT`, `INPUT_LIB` | The I/O layer — `analog_input.c`, `analog_output.c`, `outputs.c` |
| `FreeRTOS`, `UCOSII` | Two RTOS trees are present; the code above uses FreeRTOS |
| `TCPIP`, `uIP-1.0`, `uIP-APP` | TCP/IP stacks |
| `FATFS`, `FLASH`, `USB` | File system, flash driver and USB |
| `KEY`, `FILTER`, `VMALLOC`, `USMART`, `INFO`, `OBJ`, `USER` | Key handling, filtering, allocation, the debug shell, build output |

Two RTOS trees and two TCP/IP trees in one repository says this board was built by lifting a working controller project and adding metering to it. If you are building it, find out which pair the Keil project actually compiles — `test.uvprojx` in the root decides.

## Documents

`Docs/Rev06_SCH.pdf` is the board schematic for revision 06, and the only drawing in the repository.

## Source

`Three-PhasePower-Meter` in the Temco controls organisation.
