---
title: "Developer guide: build and validate firmware"
order: 230
---

The Tstat11 firmware comes from two ESP-IDF projects. This page is organised by which one you need, so you do not have to read everything to find the six commands that apply to you.

| You want | Section |
|---|---|
| `temco_app.bin` — the controller application, the usual job | 2 |
| the boot/update set — `bootloader.bin`, `partition-table.bin`, `ota_data_initial.bin`, `T3_bootloader.bin` | 3 |
| either of them without a local toolchain | 4 |

Section 1 is done once per machine. If you have not read [The firmware map](00-firmware-overview.md), start there: it shows what each file is and where it lands.

## 1. Set up once

### 1.1 ESP-IDF 5.5.3

Install the ESP-IDF Windows installer for **5.5.3**, in a path without spaces. Then work in an **ESP-IDF 5.5 PowerShell** terminal (Start Menu → `ESP-IDF 5.5 PowerShell`), which puts `idf.py` and the toolchain on `PATH`.

To activate an ordinary PowerShell window instead:

```powershell
& C:\Espressif\Initialize-Idf.ps1 -IdfId <idfSelectedId>
```

`<idfSelectedId>` is the `idfSelectedId` value in `C:\Espressif\esp_idf.json`. Running that script without `-IdfId` from inside a project folder fails, because it resolves `IDF_PATH` from the current directory instead of from the installer's configuration.

Confirm the environment:

```powershell
$env:IDF_PATH
python "$env:IDF_PATH\tools\idf.py" --version
git --version
```

`$env:IDF_PATH` should end in `esp-idf-v5.5.3`, and the version line should read `ESP-IDF v5.5.3`.

> Do not check the version with `idf.py --version`. On a Windows installer setup `idf.py` resolves to the `idf-exe` launcher, which prints its own version (`v1.0.3`), not the ESP-IDF version. That is normal, not a broken install.

### 1.2 The other tools

| Tool | Needed for | Where |
|---|---|---|
| T3000 + USB-to-RS485 adapter | putting an application build on a working device | TEMCO software page |
| Espressif Flash Download Tool | full reflash of the boot/update set over UART | `C:\Users\Double\Desktop\T3-S\flash_download_tool\flash_download_tool` |
| ESP-IDF Eclipse | optional GUI build | installed with ESP-IDF |

The Flash Download Tool is a low-level UART programmer. T3000 is not: it uploads over RS485 using the protocol in [How a firmware update runs](../bootloader/update-flow.md).

### 1.3 The two projects, and the two traps

| Project | Produces | Written by |
|---|---|---|
| `T3-programmable-controller-on-ESP32` | `temco_app.bin`, plus its own copy of `bootloader.bin`, `partition-table.bin` and `ota_data_initial.bin` | T3000 over RS485 |
| `T3_Bootloader` | `bootloader.bin`, `partition-table.bin`, `ota_data_initial.bin`, `T3_bootloader.bin` | Flash Download Tool over UART |

**Trap 1 — `T3_bootloader.bin` is not `bootloader.bin`.** The first is a ~1 MB factory *application* at `0x20000`; the second is the stage-1 bootloader at `0x0`.

**Trap 2 — the two projects ship different partition tables.** The bootloader's is factory 1 MB / `ota_0` 6 MB. The application project's is factory 6 MB / `ota_0` 1 MB, and a ~2.7 MB `temco_app.bin` cannot fit that 1 MB slot. Never flash the application project's `partition-table.bin` over the installed one. Both maps are in [How flash is divided](../hardware/flash-layout.md).

Neither repository has a build guide of its own; this page is it.

## 2. Build the controller application

The normal development loop: change controller code, build, load with T3000.

### 2.1 Get the source

```powershell
Set-Location "C:\QN\temcocontrols\T3-programmable-controller-on-ESP32"
git status
git branch --show-current
git rev-parse HEAD
git submodule update --init --recursive
```

Use the branch for the product line you are changing — `CB-Tstate-11` for Tstat11 — and not another product's by accident.

Record these before calling a build a release:

- branch, exact commit SHA, and whether the tree is clean
- ESP-IDF version
- target, `esp32s3`
- any local patch that is not in the commit

A dirty tree is a test build, not a reproducible one.

### 2.2 Add the two TEMCO components

The project replaces two ESP-IDF components. Both must be in the IDF component directory before the build:

```powershell
Copy-Item ".\temco_bacnet"     "$env:IDF_PATH\components\temco_bacnet"     -Recurse -Force
Copy-Item ".\temco_IO_control" "$env:IDF_PATH\components\temco_IO_control" -Recurse -Force
```

This writes below `IDF_PATH`. Prefer a dedicated ESP-IDF installation, and check `$env:IDF_PATH` points where you think before running it.

### 2.3 Check the target and the layout

| Setting | Expected |
|---|---|
| `CONFIG_IDF_TARGET` | `esp32s3` |
| flash size | 32 MB |
| partition table | `temco_partitions.csv` |
| project name | `temco_app` |

```powershell
Select-String -Path .\sdkconfig -Pattern '^CONFIG_IDF_TARGET=|^CONFIG_ESPTOOLPY_FLASHSIZE=|^CONFIG_PARTITION_TABLE_CUSTOM_FILENAME='
```

An RS485 update obeys the partition table **on the device**, not this file. This file only has to agree with it.

### 2.4 Build

```powershell
idf.py build
```

For a clean rebuild:

```powershell
idf.py fullclean
idf.py build
```

### 2.5 What you get

```text
build\temco_app.bin        the application
build\flash_args           the flash addresses for this build
build\flasher_args.json    the same, structured
```

A successful build proves the files exist. It does not prove the image fits the device or behaves — that is sections 5 and 7.

### 2.6 Optional: build in Eclipse

1. **File → Import**
2. **Espressif → Existing IDF Project**
3. Select the repository root
4. Confirm target ESP32-S3 and ESP-IDF 5.5.3
5. Right-click the project, **Build Project**

Use the command line for anything that has to be reproducible.
## 3. Build the bootloader set

Only needed when the boot/update environment itself changes. A device that already boots does not need this.

### 3.1 Which branch

| Branch | Target | Flash | Partition file | Produces the ESP32-S3 set |
|---|---|---|---|---|
| `main` | `esp32` | 4 MB, DIO | `temco_partitions.cvs`, factory `0x10000`, `ota_0` `0x110000` | **No** |
| `Bhavik_Tstate11` | `esp32s3` | 32 MB, OPI | `temco_partitions.csv`, factory `0x20000` 1 MB, `ota_0` `0x120000` 6 MB | **Yes** |
| `ResumableFirmwareUpdateBootloader` | `esp32s3` | 32 MB | same CSV | earlier line, merged into `Bhavik_Tstate11` |
| `SecureFirmwareUpdate` | `esp32` | 4 MB | `.cvs` | No |

`Bhavik_Tstate11` also carries work `main` lacks: `main/wifi_web_server.c`, `main/LCD_Driver/`, and an `idf_component.yml` that pulls in `espressif/mdns`.

```powershell
Set-Location "C:\QN\temcocontrols\T3_Bootloader"
git status
git fetch origin
git switch --track origin/Bhavik_Tstate11
git log -1 --oneline
```

### 3.2 Build

```powershell
Select-String -Path .\sdkconfig -Pattern '^CONFIG_IDF_TARGET=|^CONFIG_ESPTOOLPY_FLASHSIZE=|^CONFIG_PARTITION_TABLE_CUSTOM_FILENAME='
# expect: esp32s3 / 32MB / temco_partitions.csv

idf.py fullclean
idf.py build
```

Four rules for this project:

- **Never run `idf.py set-target esp32s3`.** The committed `sdkconfig` is already `esp32s3`; `set-target` rebuilds it from defaults, renames yours to `sdkconfig.old`, and drops this project's settings.
- The first build downloads `espressif/mdns` 1.13.1 from the component registry, so it needs network access.
- No `temco_bacnet` / `temco_IO_control` copy here. That is the application project only.
- Switching branches rewrites `sdkconfig` and removes `temco_partitions.cvs`.

To reproduce the packaged set rather than the newest code:

```powershell
git switch --detach 95d60a06
idf.py fullclean
idf.py build
```

### 3.3 Verify the output

```text
build\bootloader\bootloader.bin             ~21 KB
build\partition_table\partition-table.bin    3072 B
build\ota_data_initial.bin                   8192 B
build\T3_bootloader.bin                     ~840-930 KB   (must stay under 1 MB)
```

```powershell
python "$env:IDF_PATH\components\partition_table\gen_esp32part.py" .\build\partition_table\partition-table.bin
```

It must print `factory 0x20000 1M` and `ota_0 0x120000 6M`. If it prints `0x10000` / `0x110000`, you built `main`, not `Bhavik_Tstate11`.

The build prints the flash addresses itself:

```text
0x0      build\bootloader\bootloader.bin
0x8000   build\partition_table\partition-table.bin
0x19000  build\ota_data_initial.bin
0x20000  build\T3_bootloader.bin
```

### 3.4 A verified build, for comparison

Built 2026-11-20 at `9329f55` with ESP-IDF 5.5.3:

| Output | Size | Against the packaged set |
|---|---:|---|
| `bootloader.bin` | 21,296 B | same size, different hash — the compile date is embedded |
| `partition-table.bin` | 3,072 B | **byte-identical** |
| `ota_data_initial.bin` | 8,192 B | **byte-identical** |
| `T3_bootloader.bin` | 950,816 B | 861,680 B packaged — 89 KB larger |

The partition table matching proves the branch and CSV are correct. The application is larger because `9329f55` adds the LCD driver and the Wi-Fi setup server; it still fits, with 9% of the 1 MB factory partition free.

## 4. Download from GitHub Actions

Both repositories build on every push and publish one artifact named `firmware`. Artifacts expire, and the two are not interchangeable.

### 4.1 The application artifact

<https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/actions/workflows/build.yml>

1. Open the run for the exact commit and confirm it succeeded
2. Note the branch and full SHA
3. Download `firmware`
4. Take `temco_app.bin`, and leave the project's own `bootloader.bin` and `partition-table.bin` alone
5. Record a SHA-256 before transferring

### 4.2 The bootloader artifact

<https://github.com/temcocontrols/T3_Bootloader/actions/workflows/build.yml>

1. Filter the branch to `Bhavik_Tstate11`
2. Open the run, confirm ✔, note the SHA
3. Download `firmware`
4. Extract it — it may contain an inner `firmware.zip` with the same name

Contents:

```text
build/bootloader/bootloader.bin
build/partition_table/partition-table.bin
build/*.bin      ← ota_data_initial.bin, T3_bootloader.bin
```

Only `Bhavik_Tstate11` runs produce the ESP32-S3 set.

Browser downloads need a GitHub sign-in. With the GitHub CLI:

```powershell
gh run list   --repo temcocontrols/T3_Bootloader --branch Bhavik_Tstate11 --limit 10
gh run download <run-id> --repo temcocontrols/T3_Bootloader --name firmware --dir .\bootloader-pack
```

The REST API needs an authenticated request for the ZIP:

```powershell
$headers = @{ Authorization = 'Bearer <token>' }
Invoke-WebRequest -Headers $headers -OutFile .\firmware.zip `
  'https://api.github.com/repos/temcocontrols/T3_Bootloader/actions/artifacts/<artifact-id>/zip'
```

Retention is 90 days and the artifact row shows the exact date. Which build produced the package on disk is recorded in [Full reflash](03-full-reflash.md).

### 4.3 An artifact is not a release

A green run means it compiled. It says nothing about the device it was tested on, whether it was signed, or who approved it. Section 8 is the record that turns a build into a release.

## 5. Check before it goes on hardware

- build finished without errors, and no new warnings in the area you changed
- the image fits the `ota_0` partition on the device
- partition definitions match what the device has installed
- the version or commit is traceable from the binary
- both TEMCO components were included
- no key, credential or machine-specific path leaked into the output
- host unit tests pass — [Testing the firmware without hardware](../testing/host-unit-tests.md)

For a production image, follow the approved signing process: [Signing firmware](../bootloader/signing-firmware.md).

## 6. Install what you built

| Build | Route |
|---|---|
| `temco_app.bin` | T3000 → **Tools → Load firmware for a single device**, `115200` — [Beginner guide](01-user-update-guide.md) |
| the four boot files | Flash Download Tool over UART, then `temco_app.bin` with T3000 — [Full reflash](03-full-reflash.md) |

Loading an application build on a development device:

1. Power the device and connect USB-to-RS485
2. Scan for it in T3000 and select the exact serial number
3. **Tools → Load firmware for a single device**
4. COM port, `115200`, the `temco_app.bin` you built
5. Keep power connected until it reboots

`ota_data_initial.bin` is never selected here. It is not an image.

## 7. Validate on the device

- [ ] rediscovered in T3000 with the expected serial number
- [ ] expected version or build reported
- [ ] touchscreen and home screen start normally
- [ ] survives a power cycle
- [ ] network settings persist
- [ ] RS485 Modbus responds
- [ ] the BACnet path you changed works
- [ ] sensor values plausible, outputs safe in the test setup
- [ ] dynamic screens still load
- [ ] schedules and stored settings survive a reboot
- [ ] no repeated boot loops, watchdog resets or allocation failures in the log

## 8. Record the release

```text
Product:      Tstat11
Firmware:     temco_app.bin
Branch:       <branch>
Commit:       <40-character SHA>
ESP-IDF:      5.5.3
Target:       esp32s3
Build date:   <UTC>
SHA-256:      <digest>
Source:       <CI run URL, or local>
Test device:  <serial / model / revision>
Signature:    <signed / unsigned / not applicable>
Approval:     <development / test / production>
```

A CI artifact becomes released firmware only when this record exists and someone approved it.

## 9. Stop and ask

Do not force a flash when:

- the product or model cannot be confirmed
- the bootloader or partition layout differs from the image
- the image comes from an unrelated branch
- T3000 is pointed at a different serial number
- a signing setting is required that nobody has explained
- the instructions in front of you mix T3-Nano, TSTAT10 and Tstat11 hardware

The application update is deliberately the simple path. Everything else here — signing, partitions, direct UART flashing — is a development or recovery tool.
