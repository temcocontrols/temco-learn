---
title: "Flashing a Raspberry Pi Compute Module"
order: 80
---

How to write a Linux image onto a Compute Module from a Windows PC. This is the procedure used for the T3 Router, which runs on a Compute Module.

You need: a Compute Module, a Compute Module IO Board (CMIO), two micro USB cables, and the Raspberry Pi Windows installer that provides the drivers and `RPiBoot.exe`.

## Put the module in flash mode

1. Download and run the Windows installer to install the drivers and boot tool.
2. Insert the Compute Module into the SODIMM connector of the Compute Module IO Board (CMIO).
3. Plug your host PC USB into the CMIO USB SLAVE port, making sure J4 is set to the USB Slave position.

The instructions were written against a Compute Module IO Board v3.0, and the IO boards are cross compatible with newer and older Compute Modules — a v1.2 board works with both 1.1 and 3+ modules.

4. Apply power to the CMIO board. Windows should now find the hardware and install the driver.
5. Once the driver installation is complete, run the `RPiBoot.exe` tool that was previously installed.
6. After a few seconds, the Compute Module eMMC will pop up under Windows as a disk (USB mass storage device).

## Write the image

The instructions use Balena Etcher; download the install or portable version and run it.

1. Click **Select image** and choose the image file — in this case the most recent Raspbian Stretch lite image.
2. Click **Select Drive** and choose the Compute Module from the list of drives.
3. Click **Flash** and wait for the write to finish.
4. After validation completes, close Etcher and follow the install procedure below.

Unplug the Compute Module from the computer and proceed to the Raspbian install procedure.

## Install a minimal Raspbian

This is a guide to installing the minimum needed for a Raspberry Pi Lite install that can run a desktop and a command line, without the extra software a standard desktop install brings. It is written for Compute Modules but works on a standard Raspberry Pi too.

To work with the Compute Module on the CMIO board, or a Temco T3 Router, as a standalone system, an HDMI display must be connected to the HDMI output of whichever board you are using. On the CMIO board a USB hub is needed to connect a Wi-Fi dongle or USB-to-LAN adapter, a keyboard and a mouse. The T3 Router provides three USB ports, so a hub is usually unnecessary.

After the system has booted and you are logged in — the default Raspberry Pi user is `pi`, password `raspberry` — open the configuration tool:

```sh
sudo raspi-config
```

### Network

Select **Network Options**, then Wi-Fi. On a new installation it first asks for your country, to set the available Wi-Fi channels, then prompts for the SSID and password.

To run the system headless and reach it over SSH, all you need is a Wi-Fi or USB-to-LAN adapter. If Wi-Fi is used, configure it first by editing the configuration file on the rootfs partition. Connect the IO board in slave mode to a computer and edit:

```sh
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Add, on either Linux or Windows:

```
network={ ssid="testing" psk="testingPassword" }
```

Replace `testing` with your router's SSID and `testingPassword` with your Wi-Fi password, save the file and disconnect the IO board from the computer.

### Boot and enable SSH

Set the J4 jumper to the USB Slave position. Connect the CMIO board to HDMI, keyboard and mouse, and to a network through a USB-to-LAN adapter or a compatible USB Wi-Fi adapter. Boot the board by connecting a micro USB cable to the power input only.

```sh
sudo raspi-config
```

Select **Interfacing Options**, and enable SSH — and SPI, which the T3 Router uses.

To enable SSH on a headless system instead, create a file named `ssh` on the boot partition of the Compute Module from a Linux or Windows computer.

### Locale, time zone and keyboard

Set these in the same tool with **Localization Options**. When everything is configured, exit the tool by tabbing to **Finish**, then update the system:

```sh
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
```

Clean the package cache to free space, and reboot before installing the desktop environment:

```sh
sudo apt clean
sudo reboot
```

### Desktop environment

Install LXDE without the recommended extras:

```sh
sudo apt install --no-install-recommends xserver-xorg
sudo apt install --no-install-recommends xinit
sudo apt install lxde-core lxappearance
sudo apt install lightdm
sudo reboot
```

The system boots into the desktop. After logging in again, disable the desktop from starting on boot:

```sh
sudo raspi-config
```

Under **Boot Options** you choose whether the system boots to desktop or command line.

### Browser

```sh
sudo apt-get install -y rpi-chromium-mods
sudo apt-get install -y python-sense-emu python3-sense-emu
```

### Mono, for the T3000 GUI

Import the Mono repository by following the official distribution instructions on the Mono project website, then:

```sh
sudo apt install apt-transport-https dirmngr gnupg ca-certificates
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb https://download.mono-project.com/repo/debian stable-raspbianstretch main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list
sudo apt update
```

## Source

Converted from `RPi_Compute_Module_Instructions.pdf` (11 pages) in `T3000_CrossPlatform/Documentation/HelpDocs`. Screenshots in the original are not reproduced here; read the PDF and this page together when you are following the installer dialogs.
