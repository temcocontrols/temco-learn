---
title: "Hardware installation"
order: 40
---

## T3000 Controller

The T3000 Controller is a multi-user, stand alone DDC panel with full communications capabilities. The T3000 can be used either stand alone or in a multiple network system. Multiple communication ports allow the T3000 to simultaneously operate on a network, host sub networks, and to communicate to local and remote operators. Up to 128 Input/Output points may be controlled directly by the T3000 through the use of universal Input and Output Cards. The T3000 is expandable to 4 groups of 128 points to a maximum of 512 points on each panel. The number of points on a T3000 is normally limited to 128 and occasionally to 256 points because wiring such large number of points to one location is impractical. Figure 1 shows the construction of the T3000 Controller, with the optional cards. Since the T3000 is a PC based controller, it can easily support with ease options such as internal modem, Ethernet, and serial communication cards (if it is desired to have up to 4 COM ports).

*Figure 1: T3000 Controller construction*

### Specifications

HARDWARE SPECIFICATIONS:

Input/Output: 8 ports, each support a 16 Input or 16 Output card for a total of 128 control points

Communication Speed: Ethernet (10Mbps or 100 Mbps), Serial ports (57.6 Kbps)

Optional COM Ports: Use standard add-in cards for more serial ports allow interfacing with smart sensors, chiller control panels, boiler controllers, 3rd party control systems, etc.

Interface: Each T3000 can directly drive a VGA monitor and keyboard for local interaction

RAM Memory: 4 Megabytes minimum, expandable to 64 Megabytes

Storage: 1 PC compatible Hard disk drive 1 PC compatible 3 1/2 Floppy drive

Real Time Clock: +/- 1 second accuracy per day

Watchdog Timer: Automatic reboot in the event of malfunction.

Power Input: 120 VAC, 60 HZ (230 VAC where required)

SOFTWARE SPECIFICATIONS:

- 32 Basic programs, expandable to 128
- 128 points per controller, expandable to 512
- 128 Variables, expandable
- 48 PID Controllers, expandable
- 32 Trend logs, expandable
- 32 User screens, expandable to 128
- 16 Weekly schedules, expandable to 128
- 8 Annual schedules, expandable to 32
- 16 Variable arrays, expandable to 32
- 10 User defined passwords, expandable to
- 32 Custom tables
- 8 Custom digital engineering units
- Digital/Analog alarms
- Runtime totalizers and event logs (under development)
- Full screen programming editor
- Graphical user screen editor Icon
- representation of items on displays TIFF file format supported

### Data Acquisition Card

The data acquisition card (DAQ) shown in Figure 2 has a 12 bit A/D converter which converts the analog signals to digital signals. The digital signals are processed by the CPU providing real-time readings for the inputs and outputs. A 50 pin ribbon cable carries the signals between the DAQ and the connector card providing I/O control at the input and output card.

The DAQ card uses address jumpers to define which DAQ number it is in the event that multiple DAQ are needed on a single T3000 Controller. The T3000 supports 4 DAQ cards providing a total of 516 I/O points. Usually, the T3000 I/O configuration is limited to 1 DAQ card (128 I/O points) because wiring large numbers of points to one location is not normally feasible.

The card has 2 LEDs which indicate power and activity status. Should these LEDs go off, or unusual I/O is experienced, turn off the power to the T3000. Ensure that the DAQ card firmly installed in the motherboard and the 50 pin ribbon cable is well connected at both ends.

*Figure 2: Data aquisition card with 12 bit A/D converter.*

### Connector Card

The connector card has eight (8)I/O ports which act as interface between the I/O cards and the DAC card. Figure 3 shows the numerical order of the ports. Note that port 1 is the leftmost port, nearest to the floppy drive, and the port numbers increase from left to right. Port 5 is located on the second row right under port 1, and port 8 is the rightmost bottom port.

Each port is software configured as either an input or an output port. If no I/O cards are present on a particular port, that port should be disabled from the software. It is important to track the numerical order of the ports because the I/O point addressing starts from the lowest port to the highest port. If a port has been disabled, the I/O addressing will start or continue on the next configured port.

For example, if the system requires two T3-IN16 cards, and three T3-OUT16 cards, the first row can be input ports (1-4), and the second row is output ports (5-8).

Configure the software ports 1 and 2 as input ports, and ports 5,6,7 as output ports.

Ports 3, 4, and 8 should be disabled. As a result, port 1 will have inputs 1-16, and port 2 will have inputs 17-32. Ports 5, 6, and 7 will have outputs 1-16, 17-32, 33-48 respectively (see software configuration section 2.11).

*Figure 3: Conector card I/O port addressing.*

### T3-Netcard

The T3-Netcard allows the T3000 to communicate with other T3000 controllers or PCs on a RS-485 network at a maximum speed of 58600 bps. The card converts the RS-232 signal into an RS-485 signal and vice versa. Figure 4 shows how to set-up and install the T3-Netcard. The card has three RS-232 input connectors for different types of motherboard serial port connector configurations. There are two RS-485 output connectors which allow multiple controllers to join the network( see figures in section 3). Any of the two RS-485 outputs can be used since they are wired in parallel.

*Figure 4: construction and installation of the T3-Netcard on the T3000.*

The EOL (End OF Line) jumpers configuration consist of enabling resistors which prevent communication signals from bouncing once they reach the physical end of a network. Insert the jumpers if the panel is located at the physical end of a network.

- Connect the input and output.
- Apply power from the PC power supply (5 Vdc). Only the Rx (Receive) LED should be on.
- Configure the COM port as RS-485, 19200 bps in the T3000 Software(section 2.1.1).
- If both LEDs are on when powered up, there's a conflict with the RS-232 input.
The user should try the other alternate inputs. During normal operation, communication with other panels is present, the Tx (Transmit) and the Cx (receive) will blink alternately.

### Internal Modem

The modem allows remote monitoring of the controlled system under control, and has numeric paging capability in the event of an alarm.

- Configure (i.e. assign a communication port) the internal modem as COM3, IRQ 5.
Depending on the model, the internal modem can be configured either using software or using jumpers on the modem card as shown in Figure 5.

- Configure the modem's COM port in the T3000 software, as COM3, IRQ 5 (see Section 2.1.1). Then “Ok” is pressed, the T3000 operating system will display the initialization process and indicate if the communication with the modem has been successful.
*Figure 5: Internal modem with COM, and IRQ jumpers.*

### Ethernet

The T3000 can be integrated to an existing or new Local Area Network (LAN) and takes advantage of the high transmission speeds of 10 Mbps and 100 Mbps. See section 3 and to analyze the cables, and nodes limitation of Ethernet before implementing this network strategy. If Ethernet is suitable or required, it must be ordered through Temco Controls. The card and driver must be set up and tested for compatibility with the T3000. Figure 6 shows a typical Ethernet card.

The following Ethernet card installation procedures are for DOS environment. To install Ethernet in Windows95 environment see section 1.5.4.

- Power down, insert the Ethernet card to the T3000 Controller.
- Run MSD.EXE. Write down the IRQ available for the Ethernet card.
- Insert the Ethernet driver diskette provided in drive A. Change your computer's directory to drive A:\. Type CD CONFIG to change to CONFIG directory and then run EZSET.EXE to configure the IRQ and Address to the Ethernet card.
- Save and test the configuration. Do not worry if it doesn't pass the first time.
Proceed to the next step.

- Change your computer's directory to drive C:\. Create a directory called “Net” (C:\NET). Copy all the files in the directory called DOSODI (A:\DOSODI) from the

Ethernet driver diskette to the C:\NET directory.

- Use any Editor to edit a file called NET.CFG (This file should reside in the C:\NET directory. Type the following commands:
*Figure 6: Ethernet card with RJ-45 jack or BNC connector option.*

Link Driver ODI1001 Frame ETHERNET_802.2 Protocol IPX E0 ETHERNET_802.2 INT 10 PORT 300 Netware DOS Requests FIRST NET WORK DRIVE = F The above example, indicates that driver ODI1001 will be used. IRQ 10, and address 300 is assigned to the Ethernet card. If driver NE200E is used instead, simply replace ODI1001 by NE200E.

- Change your computer's to drive C:\. Use the editor to create a batch file called “N.BAT”. That file should contain the following information:
C:

CD\ CD \NET LH LSL LH ODI1001 (replace ODI1001 if you use NE200E driver) LH IPXODI /A CD \ Save the batch file and exit the editor.

- Add the command “CALL N.BAT” to the AUTOEXEC.BAT file. Save the file and restart the T3000 Controller.
- As the file loads the driver for the Ethernet card, watch for any error message on the screen. If there are no error messages, and upon start-up of the T3000 operating system, a window should pop-up with a message saying" Network Adapter Installed Successfully" the T3000 Controller is in the LAN.
- To view other T3000 controllers, go to “Panel” “Select Panel” Two windows will appear next to each other. The left window displays the Segments, and the right window displays the panels in each segment (see section 3 for more information on segments).

### Installation

This section addressed the T3000 Controller installation. If modem, Ethernet, or T3-Netcard (RS-485) are required, please review the respective section to install them into the T3000 Controller. To save time at the site, all hardware should be tested before the installation. Before the installation of the T3000, the user must determine how to communicate with the controller. A local monitor and keyboard or a laptop may be used.

For a basic stand alone T3000 installation, the following components are required:

- T3000 Controller with power cord
- Input/Output cards with ribbon cables
- Enclosure with back plate:
For four I/O cards (30"h x 24"w x 9" d) For eight I/O cards (42"h x 24"w x 9”d)

- Wiring ducts
- Monitor (optional)
- Keyboard (optional)
- Monitor and Keyboard arm holder (optional)

PROCEDURES:

- Purchase an enclosure large enough to facilitate installation and wiring (see recommended size).
- Find a good location to install the T3000 system.
- Away from electromagnetic field, dust, vibration, and heat.
- Allow enough room to open the enclosure door.
- Near a power outlet (if possible).
- Near a phone outlet (if possible).
- Mount the enclosure, T3000, and I/O cards as per recommended arrangement.
- Connect the ribbon cables (T3-Cable)from the I/O cards to the T3000.
- Connect the local monitor and keyboard or setup the remote OSW (section 1.5)
- Power up the T3000.

IMPORTANT NOTE: For equipment provided with a cord and a grounding-type attachment plug for connection to the equipment supply circuit, the following instructions, or the equivalent, shall be provided: “To reduce the risk of electrical shock, this equipment has a grounding type plug, that has a third (grounding)pin. This plug will only fit into a grounding type outlet. If the plug does not fit into the outlet, contact a qualified electrician to install a proper outlet. Do not change the plug in any way.”

- Log-in the T3000 software and configure the I/O and COM port (section 2.1.1).
- Test the inputs and outputs.

To test the input: set the software units a particular input as On/Off and short the input with a jumper. The software should change value from Off to On. To test the output: set the software units a particular output as On/Off and from the software, turn that output On. The respective output LED will turn on. Set the jumpers of the inputs to the type of reading desired(see section 1.4)

- Wire the fields devices (sensors, relays, and actuators) to the I/O cards. For output drive capability, see section 1.1.1.
*Figure 8: Recommended T3000 Controller arrangement.*

## T3000 MINI 64

The MINI 64 is a stand alone Micro-processor based controller designed to control HVAC equipment as well as devices operating on the BacNet. It supports up to 4 universal I/O cards (T3-IN16, T3-OUT16, T3-8IN/8OUT). The I/O cards can be used in any configuration to meet the site's specific requirements of inputs and outputs.

Two communication ports are provided with the MINI 64. The ports are user definable via software and jumper settings. The factory setting of the COM ports are as follows:

COM1 as RS-485, COM2 as RS-232.

The MINI 64 has a flash memory of 256 Kb which provide permanent storage for the firmware, and panel program. A static RAM of 128 Kb is shared between the variables, groups, monitors, etc. The Flash memory technology allows the user to upgrade the firmware through software without the requirement to remove any EPROM chips. With no chips to remove, the firmware can be updated remotely via network or modem. Every MINI 64 comes with a real-time clock. The panel with the lowest address (panel number) will share the time to other panels as reference. The built-in capacitor can provide power to hold the program in the static RAM up to 72 hours in the event of power failure. As an extra safety measure, the MINI 64 is programmed to save the contents in the static RAM every 8 hours. Figure 9 shows the construction of the MINI 64.

### I/O Port Configuration

The MINI 64 has four (4)I/O port to support the universal T3-IN16 (16 input), T3-OUT16 (16 output)card, and the T3-IN8/OUT8 (8 input/8output) for a total of 64 points. Figure 9 shows the order of the ports. Port 1 is the lowest port, and the port numbers increases from bottom to top. Port 4 is the highest port.

Upon power up, the MINI 64 recognizes the ports that have I/O cards and automatically configures the total number of inputs and outputs available. If no I/O cards are present on a particular port, the I/O point addressing will start or continue on the next configured port.

Consider the following example:

Port 1: one T3-IN16 card

Port 2: one T3-OUT16 card

Port 3: one T3-OUT16 card

Port 4: one T3-IN8/OUT8 card The MINI 64 will automatically recognize that there are in total, 24 inputs (16+8) and 40 outputs (16+16+8). Port 1 will have input 1-16, port 2 will have output 1-16, port 3 will have output 17-32, and port 4 will have input 17-24 and output 33-40.

*Figure 9: T3000 MINI 64 layout.*

If port 3 was empty, there will be a total of 24 inputs, and 24 outputs. Port 1 will have input 1-16, port 2 will have output 1-16, port 3 is ignored, and port 4 will have input 17-24 and output 17-24.

### Specifications

HARDWARE SPECIFICATIONS:

Input/Output: 4 ports, each accommodates a 16 Input, 16 Output, or an 8 input/8 output card for a total of 64 control points

Output drive: 10 mechanical relays (12 Vdc @ 100-150 Omhs, 100 mA)

Communication Ports: Serial communication of 19 200 bp2 software configurable

COM ports Factory setting: COM1: RS-485, COM2: RS-232

STATIC RAM Memory: 128 Kbytes

FLASH Memory: 256 Kbytes

Real Time Clock: +/- 1 second accuracy per day

Watchdog Timer: Automatic reboot in the event of a panel malfuntion Power

Input: 24 VAC, 60 HZ (40 VA)

SOFTWARE SPECIFICATIONS:

- 16 Basic programs
- 64 Variables
- 16 PID Controllers
- 8 Trend logs
- 16 User screens
- 8 Weekly schedules
- 4 Annual schedules
- Variable arrays
- 8 User defined passwords
- 5 Custom tables
- 8 Custom digital engineering units
- Digital/Analog alarms
- 64 Runtime totalizers and event logs (under development)
- Full screen programming editor
- Graphical user screen editorTIFF file format supported

### Modem

For remote control and monitoring, all the microprocessor based (MINI 64, MINI 16) controllers will need an external modem. The modem that will be connected to the MINIs will need special AT commands. Temco controls suggest the GVC (25 pin, up to 33.6 Kbps), and the Zoom (25 pin, V33.4 bis). The AT commands are in Appendix D. Figure 10 shows the pin out for the modem connected to the MINI 64.

### Installation

This section describes the MINI 64 controller installation. If a modem is required, please review Appendix D to set-up, and test the modem before the installation.

Also, before the installation of the MINI 64, the user must plan how to communicate with the controller. Either with RS-232, or RS-485, and then obtain the necessary communications cable.

The following parts are required to install a MINI 64:

- MINI 64 Controller
- Input/Output cards with ribbon cables
- 24 Vac, 40 VA class 2 transformer
- Communications cable (see section 1.5.6)
- Enclosure with back plate
- Wiring duct
- Modem (optional)
*Figure 10: Modem connention to the T3000 MINI 64.*

PROCEDURES:

- Purchase an enclosure (with a back plate)large enough to facilitate installation, and wiring.
- Find a good location to install the MINI 64 system.
- Away from electromagnetic field, dust, vibration, and heat.
- Allow enough room to open the enclosure door.
- Near by a power outlet (if possible).
- Near by a phone outlet (if possible).
- Mount the enclosure, MINI 64, and I/O cards as per recommended layout (Figure
11. .
- Connect the ribbon cables from the I/O cards to the MINI 64.
- Connect the communications cables from COM1 (RS-232) or COM2 (RS-485) of the MINI 64 (see section 1.2) to the local PC or laptop.
- Power up the MINI 64.
- Run the T3000 software, and establish connection with the MINI 64 (see section2.2.2).
- From the software, verify if the total of inputs and outputs points correspond to the physical I/O points.
- Set the jumpers of the inputs to the type of reading desired (see section 1.4)
- Wire the corresponding fields devices (sensors, relays, and actuators) to the I/O cards. For output drive capability, review the specifications in section 1.3.1 .
*Figure 11: Recommended T3000 MINI 64 installation layout.*

## T3000 MINI 16

The MINI 16 has the same architecture and functionality as the MINI 64. It is a microprocessor based controller with 2 configurable communication ports (COM1 RS-485, COM2 RS-232), 256 Kbytes flash memory, and 128 Kbytes static RAM.

This panel has 8 universal inputs with built-in 250 Ohm resistor and jumpers to support 4-20 mA inputs. It has 8 universal outputs with LED and Hand-Off-Auto jumper directly on board. Figure 12 shows the construction of the MINI 16.

### Specifications

HARDWARE SPECIFICATIONS:

Input/Output: 8 input: analog 0-5 VDC, 4-20 mA, digital input 8 output: analog 0-10 VDC, digital 0-12 VDC

Output drive: 10 mechanical relays (12 Vdc @ 100-150 Omhs, 100 mA)

Communication Speed: Serial communication of 19200 bps

Communication Ports: 2 software configurable COM ports Factory setting: COM1:

RS-485, COM2: RS-232

*Figure 12: T3000 MINI 16 layout.*

STATIC RAM Memory: 128 Kbytes

FLASH Memory: 256 Kbytes

Real Time Clock: +/- 1 second accuracy per day Watchdog Timer: Automatic reboot in the event of a panel malfunction.

Power Input: 24 VAC, 60 HZ (40 VA)

SOFTWARE SPECIFICATIONS:

- 8 Basic programs
- 24 Variables
- 16 PID Controllers
- 4 Trend logs
- 4 User screens
- 8 Weekly schedules
- 8 Annual schedules
- 2 Variable arrays
- 4 User defined passwords
- 8 Custom tables
- 8 Custom digital engineering units
- Digital/Analog alarms
- Runtime totalizers and event logs (under development)
- Full screen programming editor
- Graphical user screen editor TIFF file format supported

### Modem

The modem set up for the MINI 16 is exactly the same as for the MINI64 (refer to section 1.2.3).

### Installation

The architecture of the MINI 16 and the MINI 64 are the same except for the number of I/O points and the installation is very similar. If a modem is required, please review Appendix D to set-up and test the modem before the installation. Also, before the installation of the MINI 16, the user must plan how to communicate with the controller.

Either with RS-232, or RS-485, and then obtain the necessary communications cable.

For a basic MINI 16 installation, the following parts are required:

- MINI 16 Controller
- 24 Vac, 40 VA class 2 transformer
- Enclosure
- Communications cable
- Modem (optional)

PROCEDURES:

- Purchase an enclosure large enough to facilitate installation, and wiring.
- Find a good location to install the MINI 16 system.
- Away from electromagnetic field, dust, vibration, and heat.
- Allow enough room to open the enclosure door.
- Near a power outlet (if possible).
- Near a phone outlet (if possible).
- Mount the enclosure, and MINI 16 as per recommended layout (Figure 12).
- Set the jumpers of the inputs to the type of reading desired (see section 1.4)
- Wire the corresponding fields devices (sensors, relays, and actuators) to the I/O cards. For output drive capability, review specifications.
- Power up the controller.
- Run the T3000 software and establish connection with the MINI 64.

## INPUT/OUTPUT CARDS

### T3-IN16 (Input Card)

The 16 Channel Input Card is a general purpose Input card designed to be used with the T3000 and MINI 64 Controllers . The Input Card accepts either Analog, Digital or Pulse Signals at each of its 16 channels. Signals that are sensed include thermistors, 0-5VDC, 4-20mA, potenti ometers and volt free contacts. A 250 Ohm resistor, is included with every input to allow readings of 4-20 mA transmitters. A red LED provides visual indication of each input point. See Appendix A) for more details on jumper settings.

Input termination cards can be added to suit your application to a total of 8 cards per T3000 and 2 cards per Mini-Panel. Note that one T3-CABLE is needed per card to connect to either the T3000 Controller or MINI 64. The card is supplied mounted in 3.25" Snaptrack.

SPECIFICATIONS:

Supply Voltages: +15Vdc, -15 Vdc, +5 Vdc

Input Sense Voltage: 0 to 5 Vdc

Input Impedance: Jumper on THERMISTOR position: 100 kOhm

Jumper on 4-20 mA: 250 Ohm

Ribbon Connectors: 20 pin header, and ribbon cable.

Input connectors: Removable 2 or 3 pole connectors. Max. Two 18 gauge wire per hole.

Operating Temp.: 0 to 49 deg. C (32 to 120 deg. F)

Dimensions: 8.5” L x 3.25” W.

Mounting: 3.25” snaptrack.

### T3-OUT16 (Output Card)

The 16 Channel Output Card is a general purpose Output card designed to be used with the T3000 and MINI 64Controllers. The Output Card delivers either an Analog or Digital signal at each of the 16 channels. Output voltages for Analog signals are 0 - 10 VDC and for Digital signals are 0 - 12 VDC.

Manual ON provides a 12VDC signal.Any combination of Input and/or Output cards can be added to suit the application, up to a total of 8 cards for the T3000 and up to two cards per Mini-Panel. Each output has a red LED for visual indication, and a Hand-Off-Auto switch for manual override of the controller (See Appendix A for more details).

Note that one T3-CABLE is needed per card to connect to the either the T3000 Controller or the MINI 64. The card is supplied mounted in 3.25" Snaptrack.

SPECIFICATIONS:

Supply Voltages: +15Vdc, -15 Vdc, +5 Vdc

Output Voltages: Analog: 0 to 10 Vdc, Digital: 0 to 12 Vdc.

Ribbon Connectors: 20 pin header, and ribbon cable.

Output connectors: Removable 2 or 3 pole connectors. Max. Two 18 gauge wire er hole.

Current draw: 200 mA per output: 600 mA per output card. If exceded, the polyfuse will open the circuit until it cools down.

Status LED: Flashes when output card is beeing accessed.

Output LED: LED bightness is proportional to output voltages.

Output switches: Each output is provided with an AUTO / HAND / OFF.

Operating Temp.: 0 to 49 deg. C (32 to 120 deg. F)

Dimensions: 8.5” L x 3.25” W.

Mounting: 3.25” snaptrack.

### T3-IN8/OUT8 (8 input/8Output Card)

The T3000 8input / 8 Output Card is a general purpose I/O card designed to be used with the MINI 64 Controllers. The Input channels can take 0-5 VDC, 4-20 mA, or digital input signals. There are 250 Ohm resistors built-in and jumper settings to allow 4-20 mA readings. The Output channels delivers either an Analog or Digital signal at each of the 16 channels. Output voltages for Analog signals are 0 - 10 VDC and for Digital signals are 0 - 12 VDC. Manual ON provides a 12VDC signal.

Any combination of Input and/or Output cards can be added to suit the application, up to a total of 4 cards for the MINI 64. Each output has a red LED for visual indication, and a Hand-Off-Auto switch for manual override of the controller. Note that one T3-CABLE is needed per card to connect to the MINI 64.

SPECIFICATIONS:

Supply Voltages: +15Vdc, -15 Vdc, +5 Vdc

Input sensing Voltage: 0 to + 5 Vdc

Output Voltages: Analog: 0 to 10 Vdc, Digital: 0 to 12 Vdc.

Ribbon Connectors: 20 pin header, and ribbon cable.

I/O connectors: Removable 2 or 3 pole connectors. Max. Two 18 gauge wire er hole.

Current draw: 200 mA per output: 600 mA per card. If exceded, the polyfuse will open the circuit until it cools down.

Status LED: Flashes when output card is beeing accessed.

Output LED: LED bightness is proportional to output voltages.

Output switches: Each output is provided with an AUTO / HAND / OFF.

Operating Temp.: 0 to 49 deg. C (32 to 120 deg. F)

Dimensions: 8.5” L x 3.25” W.

Mounting: 3.25” snaptrack.

### T3-CABLE

The T3-CABLE is a 20 pin flat ribbon cable which transmit the input readings to the controllers. The controllers sends control signals, and power to the I/O cards via the same cable.

The cable’s connector has a notch to prevent wrong insertion to the I/O ports.

Basically pin1 of the cable should always be to the left as shown in Figure 13.

## Operator Workstation and PC Setup

The operator workstation (OWS) is a computer system which consist of a desktop personal computer (PC) , monitor , keyboard, printer (optional), modem (optional) and the T3000 software to interface with the controllers. The OWS can be at the site (local) or in a remote location.

To interface with the controllers (T3000, MINI 64, MINI 16), the user will need either a PC or laptop with the T3000 software installed, and the respective communication cable. A printer is desirable in order to print reports, and alarm messages. If remote control and monitoring is desired, a modem (internal or external) will be required.

### Specifications

Minimum requirements:

CPU: IBM Compatible, 486DX, 66 Mhz

Storage: 40 Mbytes

*Figure 13: T3-CABLE construction.*

RAM: 8 Mbytes

I/O ports: 2 serial ports

### Modem for PC

There is a variety of modem brand names for the PC. Occasionally, some models might not be able to communicate with the controllers. If it occurs, send Temco Controls the modem and manual, our R&D department will perform tests at our facility. The user may choose an internal or external modem. The benefits of an internal modem are space, speed, and saving a serial port (COM2). The external modem's main benefit is the ability to see the communications through the LED.

Troubleshooting communication problems becomes much easier.

The installation of an internal modem for a PC is similar for the T3000 Controller as the T3000 is a PC based controller. Refer to section 1.1.5. To install an external modem, follow the instructions of the modem manufacturer. The PC modem does not require any special AT command (only the modem dedicated for the MINI controllers need special AT commands, Appendix D).

Once the installation is completed and tested with the modem's communication software, perform the communications port configuration for the T3000 software (Section 2.1.1).

### T3-Netcard for PC (PC-Netcard)

The T3-Netcard, it has three alternative serial (RS-232) port inputs (two 10 pin ribbon cables, one 25 pin connector), and two 3 pin connector output for RS-485. Refer to section 1.1.6 for the installation procedure.

### Ethernet

Currently, the T3000 controller is shipped with a DOS operating system. The installation of the Ethernet card for the PC in DOS environment is similar to the T3000 (refer to section 1.1.6).

If the PC has Windows operating system (Windows 3.1 or Windows 95) and is already part of a LAN using Ethernet follow the next procedures:

- Wire the thin coaxial cable from the T3000 Controller to the PC
- If the PC or T3000 is at the physical end of the network, terminate with a 50 Ohm End Of Line BNC connector.
*Figure 14: PC and T3000 Controller (RS-232, PTP)*

*Figure 15: PC and MINI controller (RS-232, PTP)*

*Figure 16: PC and T3000 with T3-NETCARDs (RS-485, MSTP)*

*Figure 17: MINI 64 and PC with T3-Netcard (RS-485, MS/TP)*

*Figure 18: PC and T3000 without T3-NETCARD (RS-232, MS/TP)*

*Figure 19: PC and MINI without T3-NETCARD (RS-232, MS/TP)*

- Start the T3000 software and configure for Ethernet. Select “Configuration” “Hardware” “COM Ports” at the Ethernet field, press enter toggle from “No” to “Yes”.
The following Ethernet installation procedures is for a PC with Windows 95. The Ethernet package is tested and sold by Temco Controls Ltd.

- Turn off the PC's power.
- Install the Ethernet card firmly into an ISA slot of the motherboard.
- Run MSD.exe to find out what interrupt are available for the Ethernet card.
- Run the manufacturer's configuration software EZSET.exe
- Assign the card and IRQ, and address through manufacturer's software and save the configuration (ex. IRQ 10, I/O address 300).
- Perform an IRQ and I/O test using the manufacturer's software. It might not pass the test at this time. Complete all the steps, then test again.
- From Windows 95 select “New Hardware” select manually a Network Connection, then click Next.
- Wait until a pop up window appear, choose the Manufacturer called Novell/Anthem by click the left button on your mouse. Some drivers will display on the right of your window. Select the one called NE2000 compatible and click Next.
9. The computer will start processing the installation for you, but you will be
prompt to insert a diskette with the LSL file ( Windows 95 CD has the file or available at Temco Controls) to drive A:\ and click OK. The computer will continue its installing process.

- Once the computer finished installing, it will show you an IRQ and address assigned for the Ethernet card. If these setting do not match with the setting in your card, Windows will allow manual configuration later. Click OK to reboot your computer.
- Once your computer turns on again, you probably see an error message. Ignore it.
Go to Control Panel, select System Icon and then select Device Manager. You will see a bunch of devices (icons) appear. Use your mouse to click the Network Adapters. One or two sub-icons will appear. Click on the one called N2000 compatible icon. The NE2000 Compatible Properties pop up window will open.

Click Resources so that you will see sources Setting window open. Move the cursor to the device that you want to change, click left mouse button once and then click Change Setting to change your Interrupt request (IRQ) or Input/ Output Range. However, for the Input/Output address range, your Ethernet card can only allow you to set for it's starting address not the ending address. See Table 1 for typical address settings (add 1F Hex to your starting address).

- Ensure that the address range that assigned must not have any conflict with another devices. After the change is made, click OK to reboot the system.
- The final step is to bind a Protocol with the Ethernet card. From Windows 95, double click the Network Icon. A screen will open showing the WS-E200 Ethernet card. Select Add, select Protocol, choose Microsoft's IPX/SPX Protocol. Click Ok and Windows 95 will complete the binding.
- Re-boot the computer, and start the T3000 software. Toggle the Ethernet field to “Yes” from the COM ports configuration. Press “Ok” to initialize the ports, a window describing “Network Adapter Installed Succesfully”.
- Move to “Panel” “Select Panel” and other T3000 Controller having Ethernet should be present.

Table 1: Typical Ethernet addresses Starting address Ending Address 0x240 0x25F 0x280 0x29F 0x2C0 0x2DF 0x300 0x31F 0x320 0x33F 0x340 0x35F 0x360 0x37F

### Communication Cables

There are many ways a computer can communicate with the controllers. Basically, there are two standards. The RS-232 and RS-485 standards. Note that these standards specify how the information is sent electrically. They are not software protocol.

Point-To-Point (PTP), and Master Slave Token Passing (MSTP) are software protocols.

1. PTP protocol allows communications between two devices only.
2. MSTP protocol allows communications between 32 devices.
Table 1 summarizes their characteristics for the TEMCO controllers. The table can be used to select the appropriate standard, and protocol to communicate with the controllers.

Table 1: RS-232 RS-485

Cable length 50 ft 4000 ft Interface required No (Fig 14, 15) Yes (Fig 16, 17) No (Fig 18,19) Protocol used PTP MS/TP Max. data rate 19200 bps 57600 bps The figures 14 to 19 below show how the communications standards, and protocols are implemented in practice.

### Printer

The T3000 software accepts all types of printers connected to a parallel port. The printer must be turned-on upon start up of the T3000 operating system, otherwise a message “Printer is not available” will appear. The text messages (ex. Alarms) will still be saved in a file with extension TXT, which can be printed with any text editing software. See software manual on how to write alarm statements to appear on all panels.
