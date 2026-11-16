---
title: "Backing up a Raspberry Pi Compute Module"
order: 90
---

Installing several Compute Modules from scratch takes a long time. This is how to take an image of one that already works the way you want, then shrink it so it fits on a smaller module and restores quickly.

These instructions cover backup and shrinking of a Raspbian OS. They may work with other Raspberry Pi operating systems; they are known not to work with Noobs.

You need a Compute Module IO Board — the same board used to flash the module — and Win32 Disk Imager, which makes a byte-for-byte copy of the module.

If you have not flashed a module before, read [Flashing a Raspberry Pi Compute Module](rpi-compute-module-flashing.md) first.

## Connect the module as a disk

Once the Compute Module is installed and configured, shut it down properly:

```sh
sudo shutdown -h now
```

Then disconnect power from the IO board and set the J4 (USB Slave/Boot Enable) jumper to the USB Slave position. Connect a micro USB cable to the USB Slave port of the module and to your PC, then a second micro USB cable to the Power In port.

When power is connected, Windows should find the hardware and install the driver. Once the installation is complete, run the `RPiBoot.exe` tool. Its command window closes by itself when it has finished, and the Compute Module eMMC appears under Windows as a disk.

If a dialog box offers to format the disk — press Cancel.

## Read the image

In slave mode two drives appear: one is the boot partition, the other the data partition.

1. Run Win32 Disk Imager.
2. Click the folder icon beside the **Image File** box, choose where to save the image, and give it a name.
3. Select one of the two Compute Module drives from the **Device** dropdown.
4. Click **Read** and wait.

A 4 GB module finishes quickly; a 32 GB module takes a considerable amount of time.

The backup file is the size of the module's flash, not of the data on it — a 4 GB module gives a 4 GB image, a 32 GB module a 32 GB image. The next step is to shrink it, which saves space and makes restoring faster.

## Shrink the image

This can be done directly on the Compute Module with a keyboard, mouse and monitor, though a USB hub will be necessary. The image is too large to keep on the module, so it must be copied to a USB thumb drive or hard drive whose file system can hold a file that size and that Raspbian can read. NTFS is the easiest choice, as both Windows and Linux support it; writing to an NTFS drive from Raspbian needs one package:

```sh
sudo apt-get install ntfs-3g
```

Then reboot:

```sh
sudo reboot
```

The remaining steps are the same on a Linux PC or on the module. Connect the drive holding the image, and install the PiShrink script:

```sh
wget https://raw.githubusercontent.com/Drewsif/PiShrink/master/pishrink.sh
chmod +x pishrink.sh
sudo mv pishrink.sh /usr/local/bin
```

Start the shrinking process:

```sh
sudo pishrink.sh -s imagefile.img newimagefile.img
```

`imagefile` is the name of the image and `newimagefile` the name of the shrunk one. With `-s` the script skips the auto-expanding step. Given a name for the new file, it works on a copy and leaves the original alone — you need enough free space for a full copy to use that option. Without a second name it shrinks the file in place:

```sh
sudo pishrink.sh -s imagefile.img
```

The shrunk image can be written to any Compute Module with the same or larger memory than the one it came from. On first boot the OS expands the file system to the full size of the module's memory. To write the image, follow [Flashing a Raspberry Pi Compute Module](rpi-compute-module-flashing.md).

## Source

Converted from `Backup and Compress Raspberry Pi Compute Module.pdf` (4 pages) in `T3000_CrossPlatform/Documentation/HelpDocs`. The original also carries a copy of the PiShrink script.
