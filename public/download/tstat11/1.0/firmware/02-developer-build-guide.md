---
title: "Developer guide: build and validate firmware"
order: 230
---

This guide covers the development path from a clean checkout to a verified `temco_app.bin`. It is for firmware developers and release testers. A deployed Tstat11 should normally be updated with T3000 as described in the [beginner update guide](01-user-update-guide.md).

## 1. Repository responsibilities

| Repository/project | Responsibility |
|---|---|
| `T3-programmable-controller-on-ESP32` | ESP32-S3 firmware source and build outputs |
| `temco-platform` | Tooling that authors, validates and imports documentation builds |
| `tstat11` documentation project | Source Markdown, registry, images and generated `dist/docs` |
| `temco-learn` | Published documentation content and static hosting |

The documentation source of truth for Tstat11 is the project under `C:\Users\Double\temco\projects\tstat11`. Temco Learn contains the published copy, not a second authoring source.

## 2. Prerequisites

Install:

- Git with submodule support
- Espressif ESP-IDF **5.5.3**
- The tools installed by the ESP-IDF Windows installer
- T3000 and a USB-to-RS485 adapter for hardware validation
- Optionally, ESP-IDF Eclipse if the IDE workflow is preferred

Use installation and project paths without spaces. Open an **ESP-IDF 5.5 PowerShell** terminal so that `idf.py` and the toolchain are configured.

Confirm the environment:

```powershell
idf.py --version
git --version
```

The version command must report ESP-IDF 5.5.3 or the explicitly approved maintenance build for the same toolchain line.

## 3. Select the source state

Move to the firmware repository:

```powershell
Set-Location "C:\QN\temcocontrols\T3-programmable-controller-on-ESP32"
git status
git branch --show-current
git rev-parse HEAD
git submodule update --init --recursive
```

For a Tstat11 change, use the branch assigned to that development line. The current Tstat11-focused source examined for this guide is `CB-Tstate-11`; do not silently build another product branch.

Before building a release candidate, record:

- Branch
- Exact commit SHA
- Whether the tree is clean
- ESP-IDF version
- Target: `esp32s3`
- Any local patches not present in the commit

A dirty tree must not be treated as a reproducible release build.

## 4. Integrate the modified ESP-IDF components

The project contains TEMCO replacements for two components. The CI workflow copies them into the ESP-IDF component directory before building:

```powershell
Copy-Item ".\temco_bacnet" "$env:IDF_PATH\components\temco_bacnet" -Recurse -Force
Copy-Item ".\temco_IO_control" "$env:IDF_PATH\components\temco_IO_control" -Recurse -Force
```

Use a dedicated ESP-IDF installation when possible because these commands replace files below `IDF_PATH`.

If using an IDE-created ESP-IDF installation, verify that `$env:IDF_PATH` points to the intended installation before copying.

## 5. Verify the build target and layout

The checked-in configuration currently specifies:

- `CONFIG_IDF_TARGET=esp32s3`
- 32 MB flash
- Custom partition table: `temco_partitions.csv`
- Project/application name: `temco_app`

Review the partition table whenever changing flash-related code. The application and the installed bootloader must agree on the same partition names, offsets and sizes. Never copy an address list from an older product manual into a current build.

The current file is [temco_partitions.csv](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/blob/CB-Tstate-11/temco_partitions.csv). The generated build's `flash_args` and `flasher_args.json` are authoritative for that specific build.

## 6. Build from the command line

From the firmware repository root:

```powershell
idf.py build
```

For a clean reproducibility check:

```powershell
Remove-Item .\build -Recurse -Force -ErrorAction SilentlyContinue
idf.py build
```

Expected primary output:

```text
build\temco_app.bin
```

Expected supporting build data includes:

```text
build\flash_args
build\flasher_args.json
build\partition_table\partition-table.bin
build\bootloader\bootloader.bin
```

A successful build means that those files were produced, but it does not establish hardware compatibility.

## 7. Build with ESP-IDF Eclipse

1. Open ESP-IDF Eclipse.
2. Select **File → Import**.
3. Select **Espressif → Existing IDF Project**.
4. Select the firmware repository root.
5. Confirm the target is ESP32-S3 and the ESP-IDF version is 5.5.3.
6. Right-click the project and select **Build Project**.
7. Inspect `build\temco_app.bin` and the generated flash arguments.

Use the command-line build in automation and for final reproducibility checks.

## 8. Build with GitHub Actions

The repository's [build workflow](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/blob/CB-Tstate-11/.github/workflows/build.yml) runs an ESP-IDF 5.5.3 container, installs the two TEMCO components, executes `idf.py build`, and uploads `build/*.bin` as a `firmware` artifact.

For a CI artifact:

1. Open the workflow run for the exact commit.
2. Confirm the workflow conclusion is successful.
3. Confirm the branch and full commit SHA.
4. Download the `firmware` artifact.
5. Record or calculate a SHA-256 checksum before transfer.

A newer timestamp alone is not enough to classify a build as a release.

## 9. Run checks before hardware installation

Run the repository's host unit tests according to [Testing the firmware without hardware](../testing/host-unit-tests.md).

Also review:

- Build completed without errors
- No unexpected warnings in the changed area
- `temco_app.bin` fits the application partition
- Partition definitions match the target device
- Firmware version/build identity is visible or traceable to the commit
- Required custom components were included
- No private key, credential or machine-specific path is in the output

For a security-sensitive or production image, validate the approved signing process before deployment.

## 10. Install on a development Tstat11

For a device that boots normally, use the beginner guide's T3000 route:

1. Connect power and USB-to-RS485.
2. Scan and select the exact Tstat11.
3. Open **Tools → Load firmware for a single device**.
4. Select the COM port, `115200` baud, and the generated `temco_app.bin`.
5. Start the update and preserve power until completion and reboot.

Do not use `idf.py flash` merely because the development machine has ESP-IDF installed. Direct UART flashing writes bootloader and partition files and can replace the factory layout.

## 11. Direct UART/recovery flashing

Direct flashing is a recovery activity. Before using it on Tstat11, obtain all of the following for the exact PCB revision:

- Correct USB-to-TTL adapter and voltage
- Correct header and pinout
- Exact download-mode jumper/button sequence
- Correct bootloader, partition table and application binaries
- Confirmed flash mode, frequency, size and addresses from that build

For an ESP-IDF-generated full image set, inspect `build\flasher_args.json` and `build\flash_args`; do not copy the legacy TSTAT10/T3-Nano address map without verification.

Once the exact set has been approved, the standard ESP-IDF command is a possible development path:

```powershell
idf.py -p COM5 flash
idf.py -p COM5 monitor
```

Exit the monitor with `Ctrl+]`. Replace `COM5` with the adapter's actual port.

Never use this route solely to perform a normal application update. Never flash an unverified partition table over a production device.

## 12. Hardware validation checklist

After reboot, verify at least:

- [ ] Device is rediscovered in T3000 with the expected serial number
- [ ] Expected firmware version/build is reported
- [ ] Touchscreen and home screen start normally
- [ ] 24 V power interruption/restart behaves normally
- [ ] Network configuration persists
- [ ] RS485 Modbus operates
- [ ] BACnet path required by the change operates
- [ ] Sensor/input values are plausible
- [ ] Output control behaves safely in the intended test setup
- [ ] Dynamic display screen loading still operates
- [ ] Schedules and persisted settings survive reboot
- [ ] No repeated boot, watchdog or allocation failures appear

Attach test evidence—commit SHA, binary checksum, tester, date, device serial number and results—to the release or change record.

## 13. Recommended release identity

For a development or production build, preserve a package record containing:

```text
Product: Tstat11
Firmware file: temco_app.bin
Branch: <branch>
Commit: <40-character SHA>
ESP-IDF: 5.5.3
ESP target: esp32s3
Build date: <UTC date/time>
SHA-256: <digest>
CI run: <URL or local build>
Test device: <serial/model/revision>
Signature status: <signed/unsigned/not-applicable>
Approval: <development/test/production>
```

Do not publish a CI artifact as the latest product firmware without release approval.

## 14. Publish Tstat11 documentation

From the Tstat11 documentation project:

```powershell
Set-Location "C:\Users\Double\temco\projects\tstat11"
npm run docs:registry
npm run docs:site
```

Confirm that `dist\docs` contains the intended pages and assets. In Temco Platform, use the documentation build workflow to import that build into Temco Learn. The result belongs under:

```text
C:\QN\temcocontrols\temco-learn\content\tstat11\1.0\
```

Then validate Temco Learn from its repository root:

```powershell
Set-Location "C:\QN\temcocontrols\temco-learn"
npm run catalog
npm run check
npm run build:fast
```

Publishing requires a reviewed update in Temco Learn and the repository's normal commit/push process. Temco Learn is the hosting output; do not edit its Tstat11 files as the primary source.

## 15. Failure boundaries

Stop and investigate rather than forcing a flash when:

- The product/model cannot be confirmed.
- The bootloader or partition layout differs from the selected firmware.
- The image comes from an unrelated branch.
- T3000 targets a different serial device.
- The firmware requires a signing setting that is not understood.
- The update instructions combine T3-Nano, TSTAT10 and Tstat11 hardware details.

The normal application update is intentionally the simplest route. The harder build, signing, partition and direct-flash details are development and recovery tools, not required beginner steps.
