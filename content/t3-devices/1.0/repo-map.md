---
title: "Where each board's source lives"
order: 130
---

Every board in this project is a repository in the [temcocontrols organisation](https://github.com/temcocontrols). This is the index: what each repository is, and what you build it with.

## Firmware

| Repository | What it is | Toolchain |
| --- | --- | --- |
| `T3_ProgrammableController_ST` | Every T3 controller and the Tstat10, on the STM32F103ZE — the annotated reference tree | Keil (`CM5_arm.uvprojx`), with Makefiles |
| `T3-programmable-controller-on-ESP32` | The current firmware for the same products, plus the Tstat11 profile | CMake |
| `T3_Bootloader` | The bootloader those firmware images are linked behind | CMake, Eclipse (`.cproject`) |
| `BacnetThermostat` | The legacy Tstat8 configurable thermostat | Keil, STM32F10x |
| `Tstat8-T3-controllers` | The Zigbee coordinator and end devices, one image for both | IAR (`GenericApp.ewp`, `Boot.ewp`) |
| `T3_4AO` | The C8051F120 analogue output board | Keil (`T3_4AO.uvproj`) |
| `T3_Modules` | The Modbus and BACnet I/O module family, including the 6CTA | Keil (`test.uvprojx`), with Makefiles |
| `Three-PhasePower-Meter` | The three-phase meter, ADE7753 front end | Keil (`test.uvprojx`) |
| `CO2_HUM_PRESSURE_AIRLAB` | The AIRLAB air-quality transmitter | Keil (`test.uvprojx`) |
| `CO2_Sensor` | No source — product images, wiring diagrams and a product link | — |

## Documents in this project

| Page | Repository it came from |
| --- | --- |
| [The controller model table](controller-models.md) | `T3_ProgrammableController_ST`, `common/product.h` |
| [How many points each model carries](io-ceilings.md) | `T3_ProgrammableController_ST`, `common/product.h` |
| [The move from STM32 to ESP32](stm32-to-esp32.md) | both controller repositories |
| [The T3-4AO analogue output board](t3-4ao.md) | `T3_4AO` |
| [The Modbus and BACnet I/O modules](t3-io-modules.md) | `T3_Modules` |
| [The three-phase power meter](three-phase-meter.md) | `Three-PhasePower-Meter` |
| [The CO2 sensor family](co2-sensor.md) | `CO2_Sensor` |
| [The AIRLAB air-quality transmitter](airlab.md) | `CO2_HUM_PRESSURE_AIRLAB` |
| [The legacy Tstat8 thermostat](tstat8-legacy.md) | `BacnetThermostat`, `Docs/Revisions.txt` |
| [The Zigbee coordinator and end devices](zigbee-modules.md) | `Tstat8-T3-controllers`, `Revision.txt` |

## Two repositories that confuse people

**`Tstat8-T3-controllers` contains no Tstat8 controller.** It is the Zigbee radio firmware. The Tstat8 thermostat itself is in `BacnetThermostat`. The name presumably records that the radio modules were built for Tstat8-era products.

**The Tstat11 lives in two places.** It is a profile in the ESP32 controller firmware (`MINI_TSTAT11 29` in `main/define.h`), and it has its own repository and its own project on this site. The ESP32 tree is where the model is defined; the separate repository is where its display and application work happened.

## Where the schematics are

| Board | Drawing | Repository |
| --- | --- | --- |
| Tstat8 | `Docs/SchematicTstat8rev4_3.pdf` | `BacnetThermostat` |
| Three-phase meter | `Docs/Rev06_SCH.pdf` | `Three-PhasePower-Meter` |
| Zigbee radio | `Schematic/SCHEMATIC1 _ Zigbee_TI_2591_SMA_rev1.pdf` | `Tstat8-T3-controllers` |
| T3-Nano | `Hardware/T3-Nano_REV7_1_ALL.zip` | `T3_ProgrammableController_ST` |
| T3-BB | `Schematics/T3BB_top_rev27.pdf`, `T3BB_bot_rev28_1.pdf` | `T3_CrossPlatform` — described in the legacy manuals project on this site |
