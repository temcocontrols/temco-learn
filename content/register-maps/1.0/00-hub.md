---
title: "Reading a register map"
order: 10
---

A register map is the contract between a controller and whatever is talking to it. These pages are the maps themselves: the address, the width, and what the value means.

| Map | What it is for |
|---|---|
| TStat registers | The Modbus map of the TStat, in address order |
| BACnet points by controller | The object names each T3 model publishes, and how many |
| WireGuard registers | The registers that configure a WireGuard tunnel on a T3 ESP32 controller |

The TStat map is the longest and the one support asks about most: a reading that looks wrong is usually a register read at the wrong width.
