---
title: "The Tstat11"
order: 10
---

The Tstat11 is a T3-family controller with a **480 × 320 landscape touchscreen**. It runs the same ESP32 firmware as the rest of the family — Modbus RTU/IP and BACnet MSTP/IP over Ethernet, Wi-Fi and RS485 — and what makes it different is the screen: the interface is designed in a browser, stored on the device as JSON, and edited without reflashing the firmware.

This manual covers the product from the model id up: how many points it has, how its display is built and edited, what the firmware publishes, and how an image gets onto it.

## The short answer to "how many points?"

**13 universal inputs, 5 digital outputs, 2 analogue outputs, 128 variables, 8 digital inputs, 8 schedules** — the same envelope as a TSTAT10, because `main/commsub.c` maps `MINI_TSTAT11` (id 29) onto the `TSTAT10_*` limits. [The IO envelope](hardware/model-matrix.md) has the whole family in one table.

## Two things are called "the display"

Worth knowing before reading further, because both appear in this manual and they are not the same thing:

| | Static screens | Dynamic screens |
|---|---|---|
| Where | `main/TemcoScreen/` | `components/temco_dynamic_display/` |
| Built by | SquareLine Studio, into C | the Design Studio, into JSON |
| Changed by | recompiling the firmware | writing a document over HTTP |
| Ships with | the 12 `ui_*.c` screens | 13 default screen documents |

The Tstat11 work is a move from the first to the second. Both still exist in the tree, and [the screens that ship](display/shipped-screens.md) counts what the device actually holds today.

## How to read this

**If you are setting up a screen for a site:**

1. [The screens that ship on the device](display/shipped-screens.md) — what is already on it
2. [Design Studio: Overview](t3-eez-studio/manual/01-overview.md) — then chapters 2 to 6, in order
3. [Design Studio API: Overview](bacnet-api/README.md) — what the tool sends to the device

**If you are implementing the device side:**

1. [The device display API](display-api/overview.md) — the contract to satisfy
2. [Display API endpoints](display-api/endpoints.md) — the eleven routes
3. [Screen payloads and patching](display-api/payloads.md) — the shapes and the dot-path delta
4. [Display API examples](display-api/examples.md) — the bodies to compare against

**If you are updating or recovering a Tstat11:**

1. [The firmware map](firmware/00-firmware-overview.md) — the five files, where each lands, and which path you need
2. [Which files to deploy](firmware/deploy-scenarios.md) — new device, upgrade, waiting-for-firmware, bricked, developer loop
3. [Beginner guide: update a Tstat11](firmware/01-user-update-guide.md) — the normal T3000 workflow, from first connection to verification
4. [Full reflash with the Flash Download Tool](firmware/03-full-reflash.md) — when the device will not boot
5. [Loading firmware onto a device](firmware/flashing.md) — legacy T3-Nano/TSTAT10 reference; not a Tstat11 procedure

**If you are building or testing firmware:**

1. [Developer guide: build and validate firmware](firmware/02-developer-build-guide.md) — sources, branches, ESP-IDF build, GitHub Actions, checks and hardware test
2. [What the firmware runs](firmware/what-the-firmware-runs.md) — which products share this image
3. [How a firmware update runs](bootloader/update-flow.md) — the protocol underneath, over RS485
4. [The update registers](bootloader/update-registers.md) — every register the updater writes
5. [Resuming an interrupted update](bootloader/resuming-an-update.md) — why a power cut is survivable
6. [Inside the bootloader](bootloader/inside-the-bootloader.md) — the code that does it
7. [How flash is divided](hardware/flash-layout.md) — the device layout, and why two layouts exist
8. [Building the firmware](firmware/building.md) — original short ESP-IDF reference

**If you are integrating with it:**

1. [MQTT publishing](firmware/mqtt-guide.md) — turning it on and watching it
2. [How the MQTT task works](firmware/mqtt-implementation.md) — topics, COV modes, type mapping
3. [BACnet change of value](bootloader/bacnet-cov.md) — the subscription model underneath

**If you are testing a change:**

1. [Testing the firmware without hardware](testing/host-unit-tests.md) — the host harness
2. [The 729 verified APIs](testing/verified-apis.md) — what the suites reach today

## Where the other manuals are

This project is standalone on purpose: a reader with one question should not have to hop projects. Where a subject belongs to more than this product, the other manual is authoritative:

| Subject | Manual |
|---|---|
| The T3000 application that configures a Tstat11 | **T3000** |
| The REST, WebSocket and message protocols behind it | **T3000 API & Protocol** |
| The browser front end and the Designer shell | **T3000 New UI** |
| Firmware updates and signing for the whole T3 family | **T3 Firmware & Bootloader** |
| The TStat Modbus registers | **Register maps** |

## What this manual does not have

There is no Tstat11 datasheet, schematic or installation drawing in any of the repositories this was built from — the hardware facts here are read out of the firmware's own headers. The one physical document that exists is the T3-Nano schematic, which is a different board.
