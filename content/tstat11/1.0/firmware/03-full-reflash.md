---
title: "Full reflash with the Flash Download Tool"
order: 240
---

This page is the recovery route: it writes the complete ESP32-S3 boot/update environment over UART. Use it when the device will not boot, when it shows "waiting for firmware" and refuses updates, or when a hardware developer has told you to do a full reflash.

A device that boots normally does **not** need this. Use the [beginner guide](01-user-update-guide.md) instead.

## The whole job on one page

The condensed procedure, in execution order. Each block points at the section that explains it.

**Prepare the board — this is where most attempts fail**

1. Power the board from its **own 24 V supply**.
2. USB-to-TTL adapter: **TX → board RX, RX → board TX, GND → GND**. The **3.3 V pin stays disconnected** — it is a ~30 mA regulator output, and wiring it to the board browns the chip out 30 ms into every boot ([troubleshooting §11](04-troubleshooting.md)).
3. Fit no jumpers yet.

**Enter download mode** (details in §4)

4. Power off.
5. Fit a jumper on **j4 (EN)** and on **j6 (IO0)**.
6. Power on and wait 2 seconds.
7. Remove **only j4**. Leave **j6** fitted — that is what holds the chip in the loader.
8. Confirm the chip answers:

```powershell
python -m esptool --chip esp32s3 -p COM5 --before no-reset --after no-reset chip-id
# must report: Chip type: ESP32-S3 (QFN56) (revision v0.2)
```

**Write the four boot files** (details in §3, §5, §6)

9. Add these four rows and press Start:

| File | Address | Size |
|---|---|---|
| `bootloader.bin` | `0x0` | 21,296 B |
| `partition-table.bin` | `0x8000` | 3,072 B |
| `ota_data_initial.bin` | `0x19000` | 8,192 B |
| `T3_bootloader.bin` | `0x20000` | 950,816 B |

Wait for four `Hash of data verified` results. Both projects generate an `ota_data_initial.bin`; the two copies are **byte-identical** (`sha256 7D2C7AC4…`), so either one is correct — it is not a "factory" version and an "application" version.

**Install the controller application** — choose one (details in §7)

10. **Production route:** connect the USB-to-RS485 adapter (**A→A, B→B, GND→GND**), then T3000 → *Tools → Load firmware for a single device*, **COM4**, `115200`, `temco_app.bin`. The tool writes the ota selector itself, so the device reboots into the new application.
11. **UART shortcut, when RS485 is not available:** while still in download mode write the application **and** a `seq=1` selector — `0x120000 temco_app.bin` plus the 8 KB selector at `0x19000`. The selector is **not** shipped in either package; without it the device keeps booting the factory application and shows "Waiting for firmware". How to build one is in [How flash is divided](../hardware/flash-layout.md).

**Leave download mode**

12. Power off.
13. Remove **j6** — there must be no jumper caps on the board at all.
14. Wait 2 seconds, power on.

**Verify from the boot log, not from the tool**

15. Connect to COM5 at `115200` and look for:

```text
I (905) boot: Loaded app from partition at offset 0x120000
I (1844) app_init: Project name:  temco_app
```

16. If anything is wrong, match the signature in §10 before touching the files again.

A tool reporting "Finish" only means the bytes landed. It never means the device can execute them.

## 1. What it writes, and what it does not

```text
   Flash Download Tool over UART
   ─────────────────────────────
   bootloader.bin        @ 0x00000     ← stage-1, runs at reset
   partition-table.bin   @ 0x08000     ← flash map
   ota_data_initial.bin  @ 0x19000     ← "no application selected"
   T3_bootloader.bin     @ 0x20000     ← update manager (factory app)

   then, over RS485 with T3000
   ────────────────────────────
   temco_app.bin         → ota_0 @ 0x120000   ← the controller
```

After this procedure the device has the update environment only. The controller application is still installed separately, with T3000.

## 2. What you need

- The Tstat11 board, powered as instructed for the revision
- A UART path to the ESP32-S3 and the board's way into download mode
- The Flash Download Tool folder:

```text
C:\Users\Double\Desktop\T3-S\flash_download_tool\flash_download_tool
```

- The four-file package:

```text
C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\
```

- T3000 and a USB-to-RS485 adapter for the second stage
- The approved `temco_app.bin`

## 3. Confirm the four files before you start

| File | Address in the tool |
|---|---:|
| `bootloader.bin` | `0x0` |
| `partition-table.bin` | `0x8000` |
| `ota_data_initial.bin` | `0x19000` |
| `T3_bootloader.bin` | `0x20000` |

Two sets can supply them. Either is valid; pick one and use it consistently.

| File | Packaged, known-good | Built on this machine |
|---|---|---|
| `bootloader.bin` | `...\T3-S\Firmware\latest\bootloader\bootloader.bin` — 21,296 B | `C:\QN\temcocontrols\T3_Bootloader\build\bootloader\bootloader.bin` — 21,296 B |
| `partition-table.bin` | same folder — 3,072 B | `...\T3_Bootloader\build\partition_table\partition-table.bin` — 3,072 B |
| `ota_data_initial.bin` | same folder — 8,192 B | `...\T3_Bootloader\build\ota_data_initial.bin` — 8,192 B |
| `T3_bootloader.bin` | same folder — 861,680 B | `...\T3_Bootloader\build\T3_bootloader.bin` — 950,816 B |

Where the packaged set is `...` = `C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader`.

The packaged `T3_bootloader.bin` is smaller because it was built from `95d60a06`; the local one comes from `9329f55` and carries the LCD driver and the Wi-Fi setup server. Both fit the 1 MB factory partition.

Verify whichever set you choose: the decoded partition table must show `factory` at `0x20000` with size `1M`, and `ota_0` at `0x120000` with size `6M`.

```powershell
& 'C:\Espressif\python_env\idf5.5_py3.11_env\Scripts\python.exe' `
  'C:\Espressif\frameworks\esp-idf-v5.5.3\components\partition_table\gen_esp32part.py' `
  'C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\partition-table.bin'
```

If it shows `0x10000` / `0x110000`, that package belongs to the older ESP32 line and must not be used on a Tstat11.

## 4. Connect the board and enter download mode

> **These photographs are legacy boards.** `flashing-04` is a T3-Nano and `flashing-10` / `flashing-11` are a TSTAT10. They show the *shape* of the job — a USB-to-TTL adapter, a header, and a jumper that holds the ESP32 in download mode — not the Tstat11 connector. Confirm the Tstat11 header, pin order and jumper with the hardware developer before connecting anything.

![USB-to-TTL adapter on the programming header — T3-Nano, not Tstat11](../media/flashing-04.jpg)

![TSTAT10 programming connection — different board](../media/flashing-10.jpg)

![TSTAT10 download jumper — different board](../media/flashing-11.jpg)

A USB-to-TTL adapter at 3.3 V is what these boards use. If the adapter cannot supply enough current, power the board from its own 24 V supply.

## 5. Configure the tool

Start `flash_download_tool_3.9.9_R2.exe`, then choose the ESP32-S3 target and UART mode.

![Choosing the chip and download mode](../media/flashing-05.png)

![Selecting the files and their addresses](../media/flashing-06.png)

![Address rows in the tool](../media/flashing-07.png)

The tool must show exactly these four rows. Note the addresses: the bootloader is at `0x0`, not `0x1000`, because this is an ESP32-S3 build with `CONFIG_BOOTLOADER_OFFSET_IN_FLASH=0x0`.

```text
C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\bootloader.bin        @ 0x0
C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\partition-table.bin   @ 0x8000
C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\ota_data_initial.bin  @ 0x19000
C:\Users\Double\Desktop\T3-S\Firmware\latest\bootloader\T3_bootloader.bin     @ 0x20000
```

![Four files, four addresses](../media/flashing-08.png)

Select the COM port shown in Device Manager. The saved configuration in this folder uses `COM5`; confirm the actual port rather than copying it.

![The ESP32 download tool starting](../media/flashing-09.jpg)

## 6. Run it

1. Click **START**.
2. Wait for all four files to report their MD5 verification as matching.
3. When the tool reports **Finish**, leave download mode.
4. Power-cycle the board as instructed.

A successful run looks like four consecutive `Hash of data verified` lines, one per file. A partially written set is not usable — rerun the whole four-file download rather than continuing.

## 7. After the reflash: install the controller application

The device now runs the update manager, not the controller. It will typically sit at "waiting for firmware".

1. Connect USB-to-RS485 and open T3000.
2. Scan for the device and select it.
3. **Tools → Load firmware for a single device**.
4. COM port of the adapter, `115200` baud, and the approved `temco_app.bin`.
5. Wait for completion and reboot.

Do not select `ota_data_initial.bin` here. It is not a firmware image.

The full sequence, from the T3000 side, is in the [beginner guide](01-user-update-guide.md).

## 8. Which build is in this package

The files in `Firmware\latest\bootloader` come from a GitHub Actions build, not from a local `main` checkout:

| Fact | Value |
|---|---|
| Workflow | Build Firmware #47, `T3_Bootloader` |
| Branch | `Bhavik_Tstate11` |
| Commit | `95d60a06` — "Updated partition to store Dynamic screen data" |
| Run | <https://github.com/temcocontrols/T3_Bootloader/actions/runs/34086246535> |
| Artifact | `firmware`, id `10005379381`, created 2026-09-07 05:21:55 UTC |
| Evidence | artifact time matches the local file timestamps and the decoded partition table |
| Expiry | 2026-12-06 |

Later successful builds exist on the same branch — #48, #49 and #50 — so "latest" in the folder name does not mean the newest commit. Keep a verified copy of the package; the artifact link will expire.

## 9. Rebuilding this package from source

The source is `C:\QN\temcocontrols\T3_Bootloader` on branch **`Bhavik_Tstate11`**. The repository's `main` branch is the older ESP32 / 4 MB line and cannot produce these files.

```powershell
Set-Location "C:\QN\temcocontrols\T3_Bootloader"
git fetch origin
git switch --track origin/Bhavik_Tstate11
idf.py fullclean
idf.py build
```

To reproduce this exact package rather than newer code, switch to the commit first:

```powershell
git switch --detach 95d60a06
```

The build and verification details are in the [developer guide](02-developer-build-guide.md).

## 10. If it fails

| Symptom | Likely cause |
|---|---|
| Tool cannot connect | Wrong COM port, board not in download mode, or another program holding the port |
| Connects, then stops early | Power or cable quality; retry with a shorter cable and the board on its own 24 V supply |
| One file verifies, the next does not | Address typo in that row; the four addresses are fixed |
| Flashes fine, device does nothing | `ota_data_initial.bin` written at the wrong address, or the image set is not the ESP32-S3 one |
| Device shows "waiting for firmware" afterwards | Expected — install `temco_app.bin` with T3000, step 7 |
| T3000 update then fails | The installed partition table does not match the application's expectations; see [How flash is divided](../hardware/flash-layout.md) |

### Read the boot log before changing anything

The console on COM5 at `115200` names the cause in one line. These signature lines are unambiguous:

| Boot log line | Cause | Fix |
|---|---|---|
| `rst:0xf (BROWNOUT_RST)` repeating every ~30 ms | Supply starved — usually the adapter's 3.3 V pin powering the board, or two supplies on one 3.3 V rail | 24 V only, adapter TX/RX/GND only ([troubleshooting §11](04-troubleshooting.md)) |
| No output at all | EN held low, or IO0 held low — the chip is in reset or parked in the loader | Remove j4 and j6, power-cycle |
| `waiting for download` instead of the application | IO0 low at reset — j6 still fitted | Remove j6, power-cycle |
| `Defaulting to factory image` | `ota_data_initial.bin` was written, so no application is selected — this is the expected state after step 9 | Install `temco_app.bin`, step 10 or 11 |
| `E (120) boot: ota data partition invalid, falling back to factory` | A hand-built selector has a wrong CRC | Rebuild it as described in [How flash is divided](../hardware/flash-layout.md) |
| `invalid header: 0xffffffff` | The boot files went to the wrong addresses | Recheck the four addresses in step 9 |

Never flash a single file from this set alone, and never use `temco_app.bin` in place of `T3_bootloader.bin`.

## 11. Recap

```text
tool      C:\Users\Double\Desktop\T3-S\flash_download_tool\flash_download_tool\
          flash_download_tool_3.9.9_R2.exe    →    ESP32-S3, UART

files     bootloader.bin          @ 0x0
          partition-table.bin     @ 0x8000
          ota_data_initial.bin    @ 0x19000
          T3_bootloader.bin       @ 0x20000

reboot    → "waiting for firmware"

then      T3000 → Tools → Load firmware for a single device
          COM port, 115200, temco_app.bin
          → reboot → controller runs
```

That is the whole procedure. The UART stage only ever installs the four boot files; `temco_app.bin` always goes through T3000.

For a working device, skip this page entirely — [Which files to deploy](deploy-scenarios.md) shows that an upgrade needs only `temco_app.bin`, through T3000.
