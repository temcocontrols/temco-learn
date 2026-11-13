---
title: "Skip firmware signature validation"
order: 80
---

## Skip Firmware Signature Validation via Modbus Register 1992

This firmware supports bypassing firmware HMAC validation when the Modbus secure key register is written with the special value `0x0BEE`.

## What happens
- Modbus register `1992` is mapped to `MODBUS_SECURE_KEY`.
- When the stored value equals `0x0BEE`, firmware validation is skipped during update.
- The firmware logs: `Skip firmware HMAC validation, secure key found in modbus register`.

## Register details
- Register address: `1992`
- Expected bypass value: `0x0BEE`
- Data type: 16-bit register

## How to write the bypass key
Use your Modbus master / RS485 tool to write register `1992` with value `0x0BEE`.

Example:
- Register: `1992`
- Value: `30574` decimal or `0x0BEE` hexadecimal
- Byte order in the register: the firmware reads the 16-bit value directly and stores it in flash

If your tool allows writing a register word, set it to `0x0BEE`.
If your tool writes high/low bytes separately, send `0x0B` as the high byte and `0xEE` as the low byte.

## How to verify
After writing the register:
1. Reboot or restart the update flow as needed.
2. Start firmware upload/update.
3. The device should skip HMAC validation and continue.

## Important notes
- This bypass is intended for testing, recovery, or controlled validation scenarios only.
- Do not leave the bypass key enabled in production.
- For normal signed firmware validation, clear the register value or restore it to `0`.

## Quick reference
```text
Register   : 1992
Bypass key : 0x0BEE
Result     : skip firmware HMAC validation
```
