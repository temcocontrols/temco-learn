---
title: "How flash is divided"
order: 30
---

The bootloader, the factory image, two over-the-air slots and the storage partition. The layout is the reason an update can be interrupted: the new image is written into the slot that is not running, and a completed transfer is what makes it the one that boots.

| Name | Type | Subtype | Offset | Size |
|---|---|---|---|---|
| nvs | data | nvs | 0x9000 | 0x4000 |
| otadata | data | ota | 0xd000 | 0x2000 |
| phy_init | data | phy | 0xf000 | 0x1000 |
| factory | app | factory | 0x10000 | 0x100000 |
| ota_0 | app | ota_0 | 0x110000 | 0x200000 |
| storage | data | nvs | 0x310000 | 0x20000 |

The partition file is `temco_partitions.cvs` in the bootloader repository, and the bootloader and the application both read it. Changing an offset without changing the other image is how a device ends up unable to boot, so treat this table as fixed.
