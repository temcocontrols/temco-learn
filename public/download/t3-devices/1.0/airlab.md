---
title: "The AIRLAB air-quality transmitter"
order: 100
---

An air-quality instrument that measures five things at once — CO2, particulate matter, pressure, temperature and humidity — in one enclosure, with a Modbus and BACnet interface and enough local logic to run a PID loop and log to a flash card.

It is a much bigger project than the other sensor repository: 515 C and header files, and the folder names are the specification.

## What is measured, and with what

| Quantity | Where the code is |
| --- | --- |
| CO2 | `co2/co2.c` |
| PM2.5 and an air-quality index | `PM25/pm25.c`, `PM25/aqi.c` |
| Differential pressure | `PRESSURE/pressure.c`, `PRESSURE/DLVR-L01D.c` |
| Temperature | `TEMPERATURE/temperature.c` |
| Humidity | `TEMPERATURE/Hum_Para.c`, `HARDWARE/HUMIDITY` |

The pressure sensor is named in the source: **DLVR-L01D**, a differential pressure sensor. That matters — what it reports is a pressure *difference*, which is the right quantity for filter loading and duct static, and the wrong one if you were expecting barometric pressure.

PM2.5 comes with an AQI calculation beside it (`aqi.c`), so the instrument reports a derived air-quality index as well as the raw particulate count.

## What else it does

Beyond measuring, the tree carries:

- `PID/` — a PID loop, so the instrument can control something rather than only report
- `STORE_DATA/` — data logging to the FATFS file system
- `MENU/` — a local menu, with `menuCo2_Conf.c` and `menuCo2_Opt.c` for configuration and options
- `KEY/` — the front-panel keys
- `MODBUS/` and `baclib/` — both protocols
- `FreeRTOS/`, `UCOSII/`, `TCPIP/`, `uIP-1.0/`, `USB/`, `FATFS/` — the same stack the controllers use

The menu files are named for CO2 rather than for the air-quality unit, which is a fair sign that the menu predates the PM2.5 and pressure channels.

## Protocol

Modbus and BACnet, same as everything else in the estate. There is no register map in the repository; see the register maps project on this site for the sensor products covered there.

## Source

`CO2_HUM_PRESSURE_AIRLAB` in the Temco controls organisation. The repository has no README — the folder structure above was read from the source tree, and it is the only description of the product that exists.
