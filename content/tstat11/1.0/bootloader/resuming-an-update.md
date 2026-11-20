---
title: "Resuming an interrupted update"
order: 310
---

An update writes into a partition the device is not running from, so losing power mid-transfer costs nothing: the old application still boots, and the number of packets already written is waiting in NVS.

The full protocol is in [How a firmware update runs](update-flow.md).

## 1. What is saved, and where

```text
 NVS key  "RS_RES_PACKAGE"  ──►  uint32 packet count
                                 (0 = nothing pending)
```

Only the packet count is stored. Everything else — the byte offset, the high/low protocol bytes — is derived from it on the next `0x1F`.

```text
 resume packet = 250
        │
        ├─ flash byte offset   = 250 × 128 = 32,000
        ├─ UPDATE_PTR_HI/LO    = 0x7D00  (as bytes)
        └─ next packet written = 250
```

## 2. Why the count and not the offset

A packet is the unit of acknowledgement: the updater sends 128 bytes, the device writes them, the count advances. Storing the count instead of an arbitrary byte offset means the resume point is always on a packet boundary, so a resumed transfer cannot splice together two halves of a packet.

## 3. The two write paths

```text
 resume count = 0  (fresh)
 ────────────────────────
 esp_ota_begin()              ← erases ota_0, starts a new image
 loop: esp_ota_write_with_offset()
       esp_ota_write()

 resume count > 0  (continue)
 ────────────────────────
 no esp_ota_begin()           ← would erase the partial image
 offset = count × 128
 loop: raw partition write at offset
```

That difference is the whole trick. Calling `esp_ota_begin()` on a resume would wipe everything transferred before the power cut, and the update would restart from zero — repeatedly, if power keeps failing.

## 4. A power cut, step by step

```text
 t0   updater: MD5 → NVS
 t1   updater: reg16 = 0x1F          device: fresh begin, offset 0
 t2   packets 0 … 249 arrive          device: count = 250, offset 32000
 t3   POWER LOSS
      ├─ ota_0 holds a partial image
      ├─ otadata unchanged → old app still selected
      ├─ NVS count = 250
      └─ device boots the OLD application

 t4   power returns, device boots normally, old version runs
 t5   updater: reg16 = 0x1F          device: resume, offset 32000
 t6   packets 250 … N arrive
 t7   updater: reg16 = 0x01          device: validate, mark, reboot
```

At no point between `t2` and `t7` is the device unbootable.

## 5. When resuming will not help

| Situation | Why |
|---|---|
| The updater starts again from packet 0 without `0x3F` | The device resumes at the saved count and misinterprets the data |
| The image changed since the interrupted transfer | The partial bytes belong to a different build |
| `esp_ota_end()` reports a validation failure | The assembled image is corrupt; erase with `0x3F` and transfer again |

Before restarting a transfer that was interrupted, decide which it is: **same file → resume**, **different file → `0x3F` first**.

## 6. Reading the state from the updater

| Want to know | Read |
|---|---|
| How many packets the device has | register 1991 |
| The protocol position bytes | registers 17 and 18 |
| Whether the last update was accepted | register 23 — `0x55` means yes |

There is no register that says "an update is in progress"; an updater discovers that by starting `0x1F` and watching whether the position is zero or not.
