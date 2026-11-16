---
title: "The Modbus and BACnet I/O modules"
order: 70
---

The `T3_Modules` repository holds the firmware for Temco's I/O modules — boards that add inputs and outputs to a controller and speak Modbus or BACnet over the field bus. Unlike the T3-4AO, these are not one board: the repository carries a family, and the README is really a build note for one member of it.

## The 6CTA, and how its firmware is built

The README describes generating a hex file for the T3 6CTA, and every step is about placing the application correctly:

1. Make sure the application address is `0x8008000`.
2. Create a hex file of the firmware.
3. Set the vector table to `0x8008000`.
4. Write the character string `TemcoT36CTA` to address `0x08008200` — the ISP tool uses this to confirm it is the right firmware for the device.

Four steps, three of which are about the same address. That is the shape of a module firmware build: the application starts at a fixed offset into flash rather than at address zero, the vector table has to be relocated to match, and a magic string at a known address tells the programming tool whether the image belongs on the board it is talking to.

If a module refuses a firmware file that is otherwise correct, the magic string is the first thing to check. It is not a version number — it identifies the board, not the release — and the README is explicit that the ISP tool is what reads it.

## Where the modules fit

An I/O module has no program of its own. It exposes points to whichever controller is on the bus, and the controller's point limits — not the module's — decide how many can be used. See [How many points each model carries](io-ceilings.md).

## Related boards

- [The T3-4AO analogue output board](t3-4ao.md) — a separate repository, separate CPU, same idea
- [The Zigbee coordinator and end devices](zigbee-modules.md) — modules that carry Modbus over a radio rather than a wire

## Source

`T3_Modules` in the Temco controls organisation. There is no schematic, no register map and no manual in the repository; the README is four lines long and is reproduced above in full.
