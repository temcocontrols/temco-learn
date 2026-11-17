---
title: "The T3-BB board schematics"
order: 100
---

Two sheets in `Documentation/Schematics` are the only surviving board drawings for the T3-BB controller:

| File | Sheet | Size |
| --- | --- | --- |
| `T3BB_top_rev27.pdf` | Top copper, revision 27 | 111 KB |
| `T3BB_bot_rev28_1.pdf` | Bottom copper, revision 28.1 | 326 KB |

Both are in the [T3000_CrossPlatform repository](https://github.com/temcocontrols/T3000_CrossPlatform/tree/master/Documentation/Schematics).

## What they are for

They are the fabrication drawings — copper layers, not a wiring diagram. Read them when you need to identify a component position, check a revision difference between 27 and 28.1, or confirm how a terminal block is routed. For how a panel is wired and addressed, the [installation chapter](hardware-installation.md) is the more useful document.

## Revision differences

Revision 27 and revision 28.1 are two different boards, not two layers of one. The top sheet is 27 and the bottom sheet is 28.1, so the pair does not describe a single board — each sheet belongs to the revision in its name. If you are working on a specific unit, find which revision it is before using either sheet.

## Missing drawings

The folder contains no schematic for the T3000 main panel, the DAQ card, the connector card or the T3-Netcard, even though the technical manual describes all of them in detail. The T3-Nano board drawing that does survive is archived as `T3-Nano_REV7_1_ALL.zip` inside the controller firmware repository, and the Zigbee radio drawing is `SCHEMATIC1 _ Zigbee_TI_2591_SMA_rev1.pdf` in the Tstat8-T3-controllers repository.
