---
title: "Firmware signing guide"
order: 70
---

## Requirements
- Python 3.6 or later
- `sign_firmware.py`

---

## Steps

### 1. Build firmware
Build your firmware in ESP-IDF as usual:
```bash
idf.py build
```
This produces `temco_app.bin` (unsigned raw binary).

---

### 2. Sign the firmware
```bash
python sign_firmware.py sign -i temco_app.bin -o temco_app_signed.bin
```

Expected output:
```
[INFO] Input file     : build/firmware.bin
[INFO] Firmware size  : 524288 bytes (512.0 KB)
[INFO] Footer size    : 40 bytes
[INFO] Total size     : 524328 bytes (512.0 KB)

[INFO] Computing HMAC-SHA256...
[INFO] HMAC           : a3f1c2d4e5b6a7...

[OK]  Signed firmware : build/firmware_signed.bin
[OK]  Output size     : 524328 bytes (512.0 KB)

      Ready to flash via ISP / RS485 OTA
```
---

### 3. Validate the firmware (optional)
```bash
python sign_firmware.py verify -i temco_app_signed.bin
```

Expected output:
```

[INFO] File           : temco_app_signed.bin
[INFO] Total size     : 273480 bytes
[INFO] Firmware size  : 273440 bytes
[INFO] Footer magic   : 0x0000 (Secure)
[INFO] Footer fw_size : 273440 bytes
[INFO] Stored HMAC    : 5fdd3bca0fe05ae2..
[INFO] Computed HMAC  : 5fdd3bca0fe05ae2..

[OK]  Firmware signature is VALID

```

### 4. Send via ISP / RS485 OTA tool
Use `firmware_signed.bin` — NOT `firmware.bin`.

```
firmware.bin        ← DO NOT USE THIS
firmware_signed.bin ← USE THIS
```

---

## Important
- Always sign after every new build before sending
- Never send unsigned `firmware.bin` to device — it will be rejected
