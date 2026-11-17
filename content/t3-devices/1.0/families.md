---
title: "The product families"
order: 20
---

Temco's catalogue divides along the line between *controllers* — programmable devices that run Control Basic — and *everything that hangs off them*: I/O modules, sensors, meters and radios. The repository layout follows that line only roughly, so this page sorts it out.

## Programmable controllers

The T3 family. A controller is a panel with a CPU, a fixed set of I/O and a BACnet or Modbus connection, and it runs programs you write. The firmware for the whole generation lives in one repository — the STM32 build covers "all T3 controllers and the Tstat10 programmable thermostat" — and its replacement is the ESP32 build.

The model table is in [The controller model table](controller-models.md). The point ceilings are in [How many points each model carries](io-ceilings.md).

## Thermostats

Two generations, and the difference matters:

- **Tstat8** — the configurable thermostat. Legacy: its repository says so in the first line. It is configured through registers rather than programmed.
- **Tstat10 and Tstat11** — programmable, with a graphical display. The Tstat10 shares a firmware image with the T3 controllers; the Tstat11 is a separate 480 × 320 device with its own project on this site.

The Tstat8 repository points to the Tstat10E as its successor, and its source is the ESP32 repository.

## I/O modules

Boards that add points to a controller over Modbus or BACnet and have no program of their own:

- **T3-4AO** — analogue outputs, digital outputs and analogue inputs on a C8051F120
- **The Modbus and BACnet I/O modules** — the 6CTA and its siblings

## Sensors and transmitters

Devices that measure and report, with a Modbus interface and no control logic beyond optional PID:

- **CO2 sensor** — CO2, temperature and humidity for commercial and industrial spaces
- **AIRLAB** — CO2, PM2.5, pressure, temperature and humidity in one enclosure

## Meters

- **Three-phase power meter** — electrical measurement over Modbus and BACnet

## Radios

- **Zigbee coordinator and end devices** — a Modbus bridge to a Zigbee mesh, built on a TI chipset with a CC2591 front end

## What the families have in common

Every board here speaks Modbus, and most also speak BACnet. That is not a coincidence: it is what makes them interchangeable parts of one system, and it is why so much of the source is shared — the same `baclib`, the same `IO_control` library, the same FreeRTOS and FATFS trees appear repository after repository.

Those shared trees are also why README files are thin. Most of these repositories were split out of one project, so each one describes only its own delta.
