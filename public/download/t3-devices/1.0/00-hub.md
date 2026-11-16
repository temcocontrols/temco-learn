---
title: "The boards this estate runs on"
order: 10
---

Temco builds controllers, thermostats, I/O modules, sensors and meters, and the firmware for each is a separate repository. This project is the map: which board is which, what it carries, how many points it can hold, and where its source lives.

Most of these boards have no manual of their own — the documentation *is* the firmware repository and its commit history. What follows was taken from the repositories themselves: the IO ceilings in `product.h`, the README files, the revision logs, and the board headers. Where a number could not be confirmed from the source, it is not here.

## Start here

- [The product families](families.md) — how the catalogue divides up, and which repositories belong to each part
- [The controller model table](controller-models.md) — the model codes the firmware compiles against
- [How many points each model carries](io-ceilings.md) — the input, output and variable ceilings per model
- [The move from STM32 to ESP32](stm32-to-esp32.md) — why a whole generation of firmware was replaced

## The boards

- [The T3-4AO analogue output board](t3-4ao.md)
- [The Modbus and BACnet I/O modules](t3-io-modules.md)
- [The three-phase power meter](three-phase-meter.md)
- [The CO2 sensor family](co2-sensor.md)
- [The AIRLAB air-quality transmitter](airlab.md)
- [The legacy Tstat8 thermostat](tstat8-legacy.md)
- [The Zigbee coordinator and end devices](zigbee-modules.md)

## Reference

- [Where each board's source lives](repo-map.md)

## A note on what is not documented

Two families have no source published here at all: the T3-BB and T3-Nano controller boards are covered by the legacy manuals project on this site and their schematics, and the sensors that are only sold as finished products appear only through their product pages. The Tstat11 has its own project on this site, because it has both source and a manual.
