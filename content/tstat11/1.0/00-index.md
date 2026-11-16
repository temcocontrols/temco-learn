---
title: "Tstat11"
order: 0
---

The T3-family controller with a 480 x 320 touchscreen: its IO envelope, the screens it ships with, the Design Studio that edits them, the display API, the firmware and the update path.

## Contents

- [The Tstat11](00-hub.md)
  - [The Tstat11 IO envelope](hardware/model-matrix.md)
  - [How flash is divided](hardware/flash-layout.md)
  - [The screens that ship on the device](display/shipped-screens.md)
    - [Design Studio: overview](t3-eez-studio/manual/01-overview.md)
    - [Design Studio: creating a project](t3-eez-studio/manual/02-creating-projects.md)
    - [Design Studio: designing screens](t3-eez-studio/manual/03-editing-screens.md)
    - [Design Studio: adding logic with EEZ Flow](t3-eez-studio/manual/04-eez-flow.md)
    - [Design Studio: preview, bind and deploy](t3-eez-studio/manual/05-preview-and-deploy.md)
    - [Design Studio: reference and FAQ](t3-eez-studio/manual/06-reference-and-faq.md)
  - [Design Studio: how it is built](t3-eez-studio/README.md)
  - [Design Studio API: overview](bacnet-api/README.md)
  - [Screen JSON: the format](bacnet-api/screen-json.md)
  - [Design Studio API: endpoints](bacnet-api/commands.md)
  - [The device display API](display-api/overview.md)
  - [Display API: endpoints](display-api/endpoints.md)
  - [Display API: payloads and patching](display-api/payloads.md)
  - [Display API: examples](display-api/examples.md)
  - [Importing screens from a device](t3-eez-studio/import-from-device-design.md)
  - [Deploying to a device](t3-eez-studio/device-interface-deployment-via-bacnet-design.md)
  - [The .EEZ-Project JSON format](t3-eez-studio/lvgl-eez-project-json-format.md)
  - [The static-resource asset pipeline](t3-eez-studio/static-resource-copy-build.md)
  - [The LVGL WASM browser build](t3-eez-studio/wasm-browser-build-migration.md)
  - [What the firmware runs](firmware/what-the-firmware-runs.md)
  - [Building the firmware](firmware/building.md)
  - [Loading firmware onto a device](firmware/flashing.md)
  - [MQTT publishing](firmware/mqtt-guide.md)
  - [How the MQTT task works](firmware/mqtt-implementation.md)
  - [How a firmware update runs](bootloader/update-flow.md)
  - [The update registers](bootloader/update-registers.md)
  - [Resuming an interrupted update](bootloader/resuming-an-update.md)
  - [Inside the bootloader](bootloader/inside-the-bootloader.md)
  - [Trying the update commands](bootloader/trying-the-commands.md)
  - [Signing firmware](bootloader/signing-firmware.md)
  - [Skipping signature validation](bootloader/skip-signature-validation.md)
  - [BACnet change of value](bootloader/bacnet-cov.md)
  - [The BACnet protocol stack](bootloader/bacnet-stack.md)
  - [Wi-Fi station mode](bootloader/wifi-station-mode.md)
  - [Testing the firmware without hardware](testing/host-unit-tests.md)
  - [The 729 verified APIs](testing/verified-apis.md)
