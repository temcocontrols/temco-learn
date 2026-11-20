---
title: "Developer guide: build and validate firmware"
order: 230
---

This guide takes a clean checkout to a verified `temco_app.bin`, and covers building the bootloader set as well. If you have not read [The firmware map](00-firmware-overview.md), read it first: it shows which project produces which file and where each one lands.

## 1. The two projects

| Project | Output used from it | Written by |
|---|---|---|
| `T3_Bootloader` | `bootloader.bin`, `partition-table.bin`, `ota_data_initial.bin`, `T3_bootloader.bin` | Flash Download Tool over UART |
| `T3-programmable-controller-on-ESP32` | `temco_app.bin` (it also emits its own `bootloader.bin`, `partition-table.bin`, `ota_data_initial.bin`) | T3000 over RS485 |

Two consequences that cause most of the confusion:

- The application project's own `bootloader.bin` and `partition-table.bin` are **not** the installed ones. Flashing them over a working device is a layout change, not an application update.
- `temco_app.bin` must fit the `ota_0` partition defined by the partition table **actually on the device**, not by whatever the application checkout contains. Section 5 covers the difference.

Neither repository has a build guide of its own. `T3_Bootloader`'s `README.md` is a one-line description; its other documents cover the update protocol (`FIRMWARE_UPDATE_FLOWCHART.md`) and signing (`File/Sign_Guide.md`, `File/Skip_Sign_Validation.md`). The build instructions live here.

### Which branch of `T3_Bootloader` builds the ESP32-S3 binaries

Verified from the repository's branches:

| Branch | Target | Flash | Partition file | ESP32-S3 boot/update set |
|---|---|---|---|---|
| `main` (the local checkout at `C:\QN\temcocontrols\T3_Bootloader`) | `esp32` | 4 MB, DIO | `temco_partitions.cvs`, factory `0x10000`, `ota_0` `0x110000` | **No** |
| `Bhavik_Tstate11` | `esp32s3` | 32 MB, OPI | `temco_partitions.csv`, factory `0x20000` (1 MB), `ota_0` `0x120000` (6 MB), `screen_data` `0x780000` | **Yes** |
| `ResumableFirmwareUpdateBootloader` | `esp32s3` | 32 MB | `temco_partitions.csv` | Yes �?earlier line, merged into `Bhavik_Tstate11` |
| `SecureFirmwareUpdate` | `esp32` | 4 MB | `temco_partitions.cvs` | No |

So the local checkout as configured on `main` **cannot** produce the packaged ESP32-S3 files. Its partition table has different offsets, and its `sdkconfig` targets ESP32 with 4 MB flash.

`Bhavik_Tstate11` also carries code that `main` does not: `main/wifi_web_server.c`, `main/LCD_Driver/`, and an `idf_component.yml` requiring `espressif/mdns`.

To build the ESP32-S3 set locally:

```powershell
Set-Location "C:\QN\temcocontrols\T3_Bootloader"
git status                   # must be clean before switching
git fetch origin
git switch --track origin/Bhavik_Tstate11
git log -1 --oneline
```

Confirm the checked-in configuration before compiling:

```powershell
Select-String -Path .\sdkconfig -Pattern '^CONFIG_IDF_TARGET=|^CONFIG_ESPTOOLPY_FLASHSIZE=|^CONFIG_PARTITION_TABLE_CUSTOM_FILENAME='
# expect: esp32s3 / 32MB / temco_partitions.csv
```

From an **ESP-IDF 5.5 PowerShell** terminal:

```powershell
idf.py --version    # must report 5.5.3
idf.py fullclean
idf.py build
```

To reproduce the packaged set exactly rather than the newest code:

```powershell
git switch --detach 95d60a06
idf.py fullclean
idf.py build
```

Expected outputs:

```text
build\bootloader\bootloader.bin            ~21 KB
build\partition_table\partition-table.bin   3072 B
build\ota_data_initial.bin                  8192 B
build\T3_bootloader.bin                     ~840 KB   (must stay under 1 MB)
```

Rules for this build:

- **Do not run `idf.py set-target esp32s3`.** The committed `sdkconfig` is already `esp32s3`; `set-target` regenerates it from defaults, renames the existing file to `sdkconfig.old`, and drops this project's settings.
- The first build downloads `espressif/mdns` from the component registry �?network access is required. `dependencies.lock` pins version 1.13.1.
- No `temco_bacnet` / `temco_IO_control` copy is needed here. That step belongs to the application project only.
- Switching branches rewrites `sdkconfig` and removes `temco_partitions.cvs`. Switch back to `main` when you need the ESP32 line.

Verify the result before flashing:

```powershell
& 'C:\Espressif\python_env\idf5.5_py3.11_env\Scripts\esptool.exe' --chip esp32s3 image_info .\build\bootloader\bootloader.bin
& 'C:\Espressif\python_env\idf5.5_py3.11_env\Scripts\python.exe' `
  'C:\Espressif\frameworks\esp-idf-v5.5.3\components\partition_table\gen_esp32part.py' `
  .\build\partition_table\partition-table.bin
```

The decoded table must show `factory` at `0x20000` size `1M` and `ota_0` at `0x120000` size `6M`. If it shows `0x10000` / `0x110000`, the build came from `main`, not from `Bhavik_Tstate11`.

## 2. Prerequisites

Install or obtain:

- Git with submodule support
- Espressif ESP-IDF **5.5.3** for source builds
- The tools installed by the ESP-IDF Windows installer
- T3000 and a USB-to-RS485 adapter for normal application updates
- Espressif Flash Download Tool and the approved four-file bootloader package for full reflash/recovery
- Optionally, ESP-IDF Eclipse if the IDE workflow is preferred

The working T3-S recovery tool is under `C:\Users\Double\Desktop\T3-S\flash_download_tool\flash_download_tool`. Do not confuse this low-level UART tool with T3000's RS485 firmware loader.

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

The approved four-file Flash Download Tool package has a different layout: factory `0x20000` size 1 MB and `ota_0` `0x120000` size 6 MB. This is the layout decoded from its packaged `partition-table.bin`, and it is exactly the `temco_partitions.csv` on the bootloader branch `Bhavik_Tstate11`.

The application project's file is the other variant �?the comments in it call it "for flash directly without bootloader": factory `0x20000` size 6 MB and `ota_0` `0x620000` size 1 MB.

This is not cosmetic. The application image is about 2.7 MB, so under the application project's layout it would not fit the 1 MB `ota_0` partition at `0x620000`, and an RS485 update would fail. Under the bootloader layout it fits comfortably in the 6 MB `ota_0` at `0x120000`.

Therefore: when testing an application build, the partition table that is **actually on the device** decides where the update lands. Do not flash the application project's `partition-table.bin` over the bootloader's.

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
2. Select **File �?Import**.
3. Select **Espressif �?Existing IDF Project**.
4. Select the firmware repository root.
5. Confirm the target is ESP32-S3 and the ESP-IDF version is 5.5.3.
6. Right-click the project and select **Build Project**.
7. Inspect `build\temco_app.bin` and the generated flash arguments.

Use the command-line build in automation and for final reproducibility checks.

## 8. Build with GitHub Actions

Both projects build in GitHub Actions. The artifacts are the intended way to obtain binaries without a local toolchain �?but they expire, and each project publishes a different, non-interchangeable set.

### 8.1 The bootloader project

Workflow: [`.github/workflows/build.yml`](https://github.com/temcocontrols/T3_Bootloader/blob/Bhavik_Tstate11/.github/workflows/build.yml) in `temcocontrols/T3_Bootloader`.

It runs `espressif/idf:v5.5.3`, executes `idf.py fullclean` then `idf.py build`, and uploads one artifact named **`firmware`** containing:

```text
build/bootloader/bootloader.bin
build/partition_table/partition-table.bin
build/*.bin        �?includes ota_data_initial.bin and T3_bootloader.bin
```

Only pushes to `Bhavik_Tstate11` produce the ESP32-S3 set. Building `main` in Actions yields the ESP32/4 MB set.

**Download through the browser**

1. Open <https://github.com/temcocontrols/T3_Bootloader/actions/workflows/build.yml>.
2. Use the branch filter and select **`Bhavik_Tstate11`**.
3. Open the run you want (the newest successful one, or the specific commit).
4. Confirm the run's conclusion is �?and note the branch and commit SHA.
5. In the run summary page, scroll to **Artifacts** and click **`firmware`**.
6. The browser downloads `firmware.zip`. Extract it; it contains the binaries (sometimes as an inner `firmware.zip` with the same name, which must be extracted too).
7. Record the SHA-256 of each file before flashing.

Signing in to GitHub is required; artifacts from a private repository are not anonymous downloads, and each artifact expires (the retention window is shown on the artifact row �?the run examined here expires 2026-12-06 and 2026-12-30 respectively).

**Download with the GitHub CLI**

```powershell
gh run list --repo temcocontrols/T3_Bootloader --branch Bhavik_Tstate11 --limit 10
gh run download <run-id> --repo temcocontrols/T3_Bootloader --name firmware --dir .\bootloader-pack
```

**Download with the REST API**

The artifact ZIP requires an authenticated request:

```powershell
$headers = @{ Authorization = "Bearer $env:GITHUB_TOKEN" }
Invoke-WebRequest -Headers $headers -OutFile .\firmware.zip `
  'https://api.github.com/repos/temcocontrols/T3_Bootloader/actions/artifacts/<artifact-id>/zip'
```

### 8.2 The application project

Workflow: [`.github/workflows/build.yml`](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/blob/CB-Tstate-11/.github/workflows/build.yml) in `temcocontrols/T3-programmable-controller-on-ESP32`.

It runs an ESP-IDF 5.5.3 container, copies `temco_bacnet` and `temco_IO_control` into the IDF components directory, executes `idf.py build`, and uploads `build/*.bin` as a `firmware` artifact. That artifact includes `temco_app.bin` **and** the application project's own `bootloader.bin`, `partition-table.bin` and `ota_data_initial.bin`.

Download it the same way, from:

<https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/actions/workflows/build.yml>

For an application artifact:

1. Open the workflow run for the exact commit.
2. Confirm the workflow conclusion is successful.
3. Confirm the branch and full commit SHA.
4. Download the `firmware` artifact.
5. Take `temco_app.bin` for T3000. Do not flash the application project's `bootloader.bin` or `partition-table.bin` as part of a normal update.
6. Record or calculate a SHA-256 checksum before transfer.

A newer timestamp alone is not enough to classify a build as a release.

For which build produced the package on disk, see [Full reflash, section 8](03-full-reflash.md).

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

## 10. Installing what you built

Two routes exist, and they are different operations:

| Route | Use it for | Guide |
|---|---|---|
| T3000 over RS485 | any device that boots and answers | [Beginner guide](01-user-update-guide.md) |
| Flash Download Tool over UART | the boot/update environment, when the device will not boot | [Full reflash](03-full-reflash.md) |

For a development device that boots normally:

1. Connect power and USB-to-RS485.
2. Scan for and select the exact Tstat11 in T3000.
3. Open **Tools �� Load firmware for a single device**.
4. Select the COM port, `115200` baud, and the `temco_app.bin` you just built.
5. Keep power connected through completion and reboot.

T3000 sends the image through the bootloader's RS485 update protocol, which places it in the OTA application slot. The `ota_data_initial.bin` in the build output is not selected here.

## 11. Hardware validation checklist

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

## 12. Recommended release identity

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

## 13. Failure boundaries

Stop and investigate rather than forcing a flash when:

- The product/model cannot be confirmed.
- The bootloader or partition layout differs from the selected firmware.
- The image comes from an unrelated branch.
- T3000 targets a different serial device.
- The firmware requires a signing setting that is not understood.
- The update instructions combine T3-Nano, TSTAT10 and Tstat11 hardware details.

The normal application update is intentionally the simplest route. The harder build, signing, partition and direct-flash details are development and recovery tools, not required beginner steps.
