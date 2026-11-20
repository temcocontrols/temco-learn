---
title: "Trying the update commands"
order: 330
---

The protocol in the order an updater uses it, with the register writes spelled out. Useful for bringing up a new updater, or for checking what a device believes about an interrupted transfer.

Registers and their meanings are in [The update registers](update-registers.md).

## 1. A complete update, step by step

```python
# step 0: read the device identity
serial   = read_registers(<serial registers>)
model    = read_register(<model register>)

# step 1: hand over the expected checksum, registers 1993..1996
write_registers(1993, [0xABCD, 0xEF12, 0x3456, 0x7890])

# step 2: start, or resume, the transfer
write_register(16, 0x1F)

# step 3: check where the device intends to continue
pos = read_registers(17, 2)        # UPDATE_PTR_HI / LO
pkt = read_register(1991)          # ISP_RESUME_COUNT

# step 4: different image and pkt != 0 ? erase first, then restart
if pkt != 0 and image_changed:
    write_register(16, 0x3F)
    write_register(16, 0x1F)

# step 5: send the image, 128 bytes at a time

# step 6: finish - validate, mark the partition, reboot
write_register(16, 0x01)

# step 7: confirm acceptance
if read_register(23) == 0x55:
    print("accepted")
else:
    print("not accepted — read the serial log")
```

Step 3 is the one worth doing even on a first attempt: it tells you whether the device is about to append to a stale transfer or start clean.

## 2. Recovering a bad session

```python
write_register(16, 0x3F)     # drop the resume point and buffers
write_register(16, 0x1F)     # start again from packet 0
```

Without the `0x3F`, a device that already has a saved packet count will keep resuming instead of restarting — the transfer looks like it is being ignored.

## 3. Cancelling a Wi-Fi transfer

```python
write_register(16, 0x33)     # drop the saved MD5 and resume point, reboot
```

`0x3F` clears the RS485 session; `0x33` also clears the saved MD5 and restarts the device, which is what the Wi-Fi/TFTP path needs.

## 4. Reading position without changing anything

| Register | Read it when |
|---|---|
| 1991 | you want the packet count the device will resume from |
| 17, 18 | you want the protocol-level position bytes |
| 23 | you want to know whether the last `0x01` was accepted |
| 1992 | you want to see whether signature validation is bypassed |

All four are readable at any time and do not disturb an update in progress.

## 5. What you should observe

| Step | Healthy device |
|---|---|
| `0x1F` after a clean state | register 1991 reads 0, `UPDATE_PTR` 0x0000 |
| packets in flight | 1991 climbs by one per packet |
| `0x01` accepted | `UPDATE_FLAG` reads 0x55, then the device reboots |
| `0x01` rejected | flag stays clear, the device keeps running the old application, serial log names the reason |
