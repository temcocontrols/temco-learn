---
title: "T3 firmware and bootloader"
order: 10
---

A T3 controller runs firmware that can be replaced over the wire. Three things make that safe enough to do on a site: the image is signed, the transfer can resume after a drop, and the controller reports where the update has got to rather than leaving you to guess.

This project is the engineering side of that: the bootloader's registers and state machine, the signing tool, the bypass that exists for recovery, and the protocol notes for the ESP32-based controllers.

## Read it in this order

1. **How a firmware update runs** — the flow, and the partition layout it writes into.
2. **The update registers** — the control, checksum and status registers.
3. **Resuming an interrupted update** — why a dropped transfer does not start over.
4. **Inside the bootloader** — the code path, the state machine, the errors.
5. **Trying the commands** — the sequence to send by hand.
6. **Signing firmware**, and the **signature bypass** kept for recovery only.
7. **BACnet COV**, **BACnet stack** and **Wi-Fi station mode** — the same controllers, from the protocol side.

## Related

- [Firmware update, on a single device](../t3000/1.0/firmware-update-single-device/firmware-update-single-device.md) — the same job from the T3000 screen.
