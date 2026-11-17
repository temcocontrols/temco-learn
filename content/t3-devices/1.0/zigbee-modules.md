---
title: "The Zigbee coordinator and end devices"
order: 120
---

A Modbus bridge across a Zigbee mesh: a coordinator that connects to a controller, and end devices that carry the far end of the link. Built on a TI chipset, with a CC2591 front end for range.

The repository has one source tree that produces **both** device types, decided at run time — and the revision log explains how and why, step by step, over 2012 to 2014.

## One image, two devices

From revision 10 of `Revision.txt`:

> Make two type device in one hex file, first time start up it checks which product it connected in one minute, then will remember.

So a single firmware image is flashed to every board, and on first boot it spends up to a minute working out whether it is a coordinator or an end device, then stores the answer. There is no separate coordinator build to keep track of.

## What it exposes over Modbus

The same revision entry lists the register surface:

- read and write the **PAN ID**, the **channel** and the **device type**
- read the **MAC address**
- read the **signal strength of every node** it is connected to

Earlier revisions added pieces of this: revision 05 (December 2012) added register 21 of the Tstat6 returning the PAN ID.

## How the mesh behaves when the coordinator dies

Revision 09 (April 2013) added dead-master support: an end device sends an acknowledgement request to the coordinator, and if there is no response it restores its factory settings. That is the recovery path when the coordinator has been replaced or re-addressed and the end device is holding stale network parameters.

## Radio

- TI chipset, per the repository README
- The board schematic in `Schematic/` is named `SCHEMATIC1 _ Zigbee_TI_2591_SMA_rev1.pdf`, so the design carries a **CC2591** front end and an SMA antenna connector
- Revision 04 (September 2012) added support for the CC2591 power amplifier and low-noise amplifier

Revision 07 (March 2013) dealt with the UART: Modbus messages longer than 85 bytes are sent in two packets. If you are writing a Modbus master that talks to these, that is why a long response can arrive in pieces.

## Building and flashing

Revision 08 (March 2013) added a bootloader for ISP upgrade and changed the application layout to fit behind it. As with the I/O modules, an application image built against the older layout will not run on a bootloader-equipped board.

## Source

`Tstat8-T3-controllers` in the Temco controls organisation — the name is misleading; there is no thermostat in this repository, only the radio modules. The tree has `Components`, `Projects` and `Schematic`, plus the revision log.
