---
title: "Loading firmware onto a device"
order: 260
---

Normally the bootloader is already in the product when it ships, and a firmware update goes through T3000 over RS485. Reloading the bootloader is the recovery route: it needs a USB-to-TTL board, a jumper, and the Espressif flash tool.

***In general, there is no need to personally load the Bootloader firmware to the product, it is already done before the factory.***
***In special cases, follow the steps below to reload the Bootloader firmware.***

## Update the main firmware
Download T3000 software,<https://assets.temcocontrols.com/products/t3_series_programmable_bacnet__amp_modbus_controller/software_file/09T3000Software-4.zip>.
Connect the device to PC with RS485, open T3000, click the icon to search for the device, if the connection is normal, the device will appear in the list.
Select the device you want to update and click *Tools->Load firmware for a single* device to start the update.

## Load the bootloader firmware to T3-nano
> #### 1.   Software tools and firmware
> -	ESP32 download firmware tool and ESP32 firmware
> <https://temcocontrols.com/ftp/file/flash_download_tool_v3.8.5.zip>
> <https://temcocontrols.com/ftp/file/BootloaderT3NanoRev27.zip>
> - CH340SerSetup  for  USB-to-TTL debug board
> <https://temcocontrols.com/ftp/file/CH340SerSetup.zip>
> - UartAssist.exe  print debug messages via USB-to-TTL board
> <https://temcocontrols.com/ftp/file/UartAssist.zip>
> #### 2.	Print Debugging Information
> - Plug USB-to-TTL debug board to your PC , Download and install CH341 driver , you will find a new USB-SERIAL CH340(COMXX) under device manager->Ports .
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/1c67dae8-bc83-470c-940e-e6e1dba100cd)
> - Connect the USB-to-TTL debugging board and motherboard J4 through the male and female connector , pay attention to keep MARK point in the same position .
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/7e101795-dc9a-4673-ab69-f3667590027c)
> - Power on and open commUart  Assistant which print some messages about sensors.
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/11cca132-0fdd-4670-80b8-12f559312a07)
> #### 3.	ESP32 update firmware .
> - Hardware connection
> USB-to-TTL connect to J3 , Short J5 and J6 by a jumper until the end of the download firmware ,  turn on 24V power .
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/a60356b1-6843-4d7d-aa69-0e7f4aacd3a7)
> - Set ESP32 firmware download tool configurations.
> Run flash_download_tool_3.8.5.exe , Tools -> Developer Mode -> ESP32 Download Tool,
Set some options as shown .
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/2aa8f1dc-f473-4498-927c-82357f223b45)<br>
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/70dfe252-9187-4045-881f-ad3d6964674e)<br>
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/2d929262-56f1-4480-ac61-6af4511a1dcc)<br>
> ***ESP32 firmware contains four parts***
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/de20fa72-f5bd-45fb-a4f4-dc92149bb7c3)<br>
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/0b1a1d3d-ad20-4f99-938c-8b1571960f26)<br>
> - Click the Start button to download the latest firmware .
When it show Finish , please remove jumper on J5 & J6 and power on again,
If UartAssist.exe is running  , you can see debugging messages .

## Load the bootloader firmware to TSTAT10
> #### 1.	Connect TSTAT10 J3 to USB with a USB to TTL debug board
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/744a23a8-de2a-4e09-bdf4-6485398a0600)<br>
> Jumper J1, so that after restarting, it will enter flash download mode, momentarily jumper J2, and TSTAT10 will restart and prepare to download the bootloader.
> USB to TTL dongle has a 3.3V power supply, and if power supply is insufficient, you can connect 24V power to the TSTAT10.
> ![image](https://github.com/temcocontrols/T3-programmable-controller-on-ESP32/assets/4134931/44669f4a-0bf3-4905-bd3a-ad740fa5ec61)
> #### 2. The steps to use the ESP32 flash downloader software are the same as the T3-nano.
> #### 3. Keep in mind that the ESP32 flash downloader tool is only used to install the bootloaders and partition information.
> #### 4. On a TSTAT10 with its RS485 port, a USB to RS485 adapter can be used by the flash download tool embedded within the T3000 software
> Power the TSTat10 with 24V AC or DC
> Connect the USB to RS485 adapter to your computer and the jack on the TSTAT10.
> Launch the T3000 software and select Tools -> Load firmware to a single device
> Then select the com port of your adapter, the baud rate as 115200 and the temco_app.bin file from your build path
> Press the flash button and the device will be programmed with your binary before rebooting to launch
