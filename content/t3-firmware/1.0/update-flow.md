---
title: "How a firmware update runs"
order: 20
---

An update is not a file transfer: the bootloader checks what it is about to write, keeps a position so an interrupted transfer can continue, and only then replaces the running image. This page follows the route from the partition layout to a completed update.

## 1. Overview

This document describes the complete firmware update flow with:
- **Modbus register mappings** for update control and status
- **Resumable firmware update** mechanism for reliability
- **OTA (Over-The-Air) partition switching**

---

## 2. Partition Layout

```
ESP32-S3 Flash Memory Layout
├─ Bootloader          0x00000   - 0x1EFFF (120 KB)
├─ NVS                 0x09000   - 0x18FFF (64 KB)
├─ OTA Data           0x19000   - 0x1AFFF (8 KB)   ← OTA select info
├─ PHY Init           0x1B000   - 0x1BFFF (4 KB)
├─ Factory App        0x20000   - 0x11FFFF (1 MB)  ← Primary app
├─ OTA_0 App          0x120000  - 0x71FFFF (6 MB)  ← OTA update slot
├─ Matter NVS         0x720000  - 0x75FFFF (256 KB)
└─ Storage           0x760000  - 0x77FFFF (128 KB)
```

**OTA Packet Size:** `128 bytes` (must match ISP.exe configuration)

---
