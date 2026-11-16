---
title: "Appendices"
order: 70
---

## Special Input Tricks

This following figures will describe the features of the T3-IN16 input card, the type of inputs it can take, and it’s respective jumper configuration.

*Figure 30: T3-IN16 input card features.*

*Figure 31: Special inputs, with jumper configuration settings.*

## Modem AT Commands

This section details modem AT commands for the MINI 64, and MINI 16 only. The modem used for T3000 Controller and the PC does not require special AT commands, and they are used with their factory configuration.

If the modem is purchased from Temco Controls Ltd., the AT commands have been entered, and tested. Temco is continually sourcing and testing other modem models.

The following is a modem listing and the respective AT commands.

1. GVC
2. Zoom

Modem: GVC (external)

Speed: 14.4 to 33.6 Kbps

Connection: 25 female connector

- AT&F0: Recall factory default configuration
- ATS0=1: Auto answer ring
- AT&D0: Modem ignores the DTR signal
- AT&K0: Disables DTE/DCE flow control
- AT\N3: MNP or Normal data link
- AT\J0: Disable serial port data rate ( Keep high data rate between DTE and Modem regardless of modem-to-modem rate)
- AT\Q0: Turn off flow control
- AT&M0: Asynchronous operation
- AT&C1: Turn on CD when remote carrier is present
- ATQ1: Modem does not send responses
- AT&W0: Store as active profile 0
- AT&W1: Store as active profile 1

Modem: Zoom V.34X (external)

Speed: 14.4 to 19.2 Kbps

Connection: 25 female connector

- AT&F0: Recall factory default configuration
- ATS0=1: Auto answer ring
- AT&D0: DTR is assumed ON
- AT&K0: Disables flow control
- AT&M0: Selects direct asynchronous mode
- AT&Q0: Same as above ( no error correction or speed buffering )
- AT\G0: Disables XON/XOFF (modem to modem) flow control
- AT\N0: Normal Data Link with speed buffering: no error correction
- AT&C1: RLSD (DCD) follows remote carrier
- ATQ1: Modem does not send responses
- AT&W0: Store as active profile 0
- AT&W1: Store as active profile 1

## Software and Firmware Update

As new software features for the T3000 and the MINIs are launched, Temco Controls Ltd. will send software and hardware updates via floppy disk or by e-mail.

The T3000 software needs of 4 files in order to run:

1. T3000.exe
2. RTM.exe
3. Dpmi16bi.ovl
4. Bgi16.dll
Future software updates modify the T3000.exe only. The other 3 files remain the same through-out different versions.

The firmware update for the MINIs consist of one file. The filename does not have an extension. For example: MINI249 The distributor will receive a self extracting file (ex. T249.exe) that when expanded will have the following files:

1. Firmware file: (ex. MINI249)
2. Software file (T3000.exe) note: the number 249 represents version 2.49
Before you start updating the firmware, Temco Controls recommend the following steps:

- Save the prg file from the MINI to the PC hard disk.
- Use the old T3000 software to perform the update. Once updated, rename the old T3000 software (ex. T3000.bak) to retain as a back up,
- Use the new T3000 software version with the new Firmware version. Ex. T3000 Software v.2.43 with Firmware MINI243.

FIRMWARE UPDATE INSTRUCTIONS:

- Copy the file T249.EXE in a temporary directory ex. C:\TEMP
- Expand the file by typing T249 from DOS, or double click the file from Windows.
Two files will appear as mentioned above.

- Copy the firmware to the working directory (ex. C:\T3000)
- Connect to the MINI64 (on site or via modem). From the menu, go to Miscellaneous, Update Mini.
- If you have software version 2.40 or above, you will be prompted:
“The prg will be erased. Do you want to save it now? (Y/N)” If you saved already, choose N (No). If you haven't saved choose Y (Yes)

- For software version lower than 2.40, you will be prompted:
“Update mini firmware? (Y/N) Choose Y (Yes)”

- You will be prompted for the file name. Type the firmware file that is in the T3000 working directory. Ex. MINI243 6) If the file is present, the following messages will appear: “The update will take about 4 minutes” “The mini will reboot in 25 seconds” “You'll have to reconnect” If the update does not proceed, the software has not located the firmware. Ensure that the firmware is in the right directory and the filename is typed correctly.
- Exit the T3000 software and Rename the T3000.exe (ex. T3000.BAK) Note:
Renaming is OPTIONAL, the old T3000.EXE can be deleted.

- Copy the new T3000 software from C:\TEMP to the C:\T3000 directory. Note: if you have not renamed or deleted the old T3000.exe, you will be prompted if you want to overwrite the existing (old) T3000.exe? (Y/N)
- Start T3000 and connect to the MINI64 to verify if the firmware update was successful. Go to Miscellaneous, INFO.
- Update is successful when the new software and firmware versions are listed.

## Troubleshooting

T3000 Controller The I/O points do not respond or behave strangely:

- Verify if the data acquisition card firmly seated in the motherboard, with the LEDs on.
- Verify if the ribbon cables are well connected in the ports.
- Verify if the I/O card is alive from the heartbeat LED.
- Verify if the I/O port configuration is set up correctly.
- Verify if power supply is functioning.
- Verify if the CPU fan is running. If it jams, replace the fan.
T3000 power LED, and I/O cards LED are off:

Verify power supply. If there's no voltage out of the power supply's 12 Vdc, 5 Vdc connector, replace the power supply.

Can't see other panels on the network:

Verify that the T3-Netcard is properly connected. Verify for loose or broken network communication wires. Verify and re-initialize the COM port configuration.

Configuration, Hardware, Com port, type “O” for “OK”.

Can't dial in the T3000:

Verify the modem configuration, and re-initialize the COM port configuration.

Configuration, Hardware, Com port, type “O” for “OK”. Ensure that initialization of the modem is complete, and at the end, it should say 'successful'.

T3000 Software:

Can't log in the software:

Ensure that CAPITAL letters are used.

Can't access screens using ENTER:

Some part of the menu are accessed by pressing INSERT. For Example, to establish communications at the CONNECT screen, to view a group in the Screen menu, to view a program, to view a weekly routine, etc.

MINI 64 and MINI 16:

Can't establish communication:

- check power; cables; heartbeat:Network Number; COM port configuration:
- reset the Mini and establish communications, COM led should blink within 5 seconds.
Can't see inputs or outputs:

I/O cards are connected to the Mini-Panel before applying power.

Can't see the descriptors:

Load the DESCRIPTORS in the Miscellaneous menu.

Blown fuse:

Maximum of 14 mechanical relays at 100 Ohms.

Change some to Solid state relays.

Programs doesn't save:

The program must be saved in the flash memory (Prg -> Flash) Can't update the firmware:

Verify the file name and file path. Communications must be established with the Mini.

Wrong time and date:

Configure the Time and Date; look if the clock chip is missing (see Figure 1 for its location). It's an 8 pin chip sitting on a socket. Scan the PC for virus.

No heartbeat LED:

If 24Vac is applied, with no LED on, reset the panel. If it doesn't work, follow the next instruction to clear the panel. If the previous attempts are not successful, send the panel back to Temco Controls for repairs.

TO CLEAR PANEL: “Note this operation will erase all the program from the Flash memory. Be ready to upload a backup program”

- Power down by removing power jumper
- Locate the real time clock as shown in Figure 32, and short the pins 4 and 8 using some metallic wire. Hold for about 10 seconds. Another method is to turn the MINI around and short the green capacitor terminals (battery backup).
- Power up the MINI. The heartbeat LED should blink rapidly.
- Try to reconnect.
*Figure 32: MINI 64 clock location.*
