---
title: "Networking controllers"
order: 60
---

A network consists of 2 controllers through hundreds of controllers. This section describes the set up of a basic network which can be as simple as an operator Workstation (OWS) with one controller, to a larger network with multiple segments.

The T3000, MINI 64, and MINI 16 controllers can be networked to 32 panels using RS-485 on one segment. A segment is a physical media that connect a predetermined number of panels together to form a network. Multiple segments can be connected together to form a larger network. The controller that connects to two different segment are called ROUTER controllers. If more controllers are required, extra network segments are required. The T3000 software can support 32 segments of 32 panels for a total of 1024 panels.

During the network planning stage, the designer must determine what type of panels, how many panels, how long will is the network, and how many network segments. If Ethernet is desired, consider the physical length limitation.

The following three figures show some networking examples describing their capabilities and limitations.

*Figure 26: RS-485 network, 1 segment of 32 panels with modem*

*Figure 28: Ethernet backbone with 31 segments of 32 panels.*

*Figure 27: RS-485 network with 32 segment of 32 panels.*

## Panel Number and Network Number Addressing

Assign a panel name, and a unique panel number for each controller. If the network has many segments, assign a network number to the controllers on the same segment. By default, Ethernet has a network number 1, and the MINIs have a default network number of 9999 unless configured differently. Ensure that the computer has a different panel number as the controller. Remember that an RS-485 network can support up to 32 panels including the PC. It is important that the controllers have different panel number, including the PC. For example, If two panels have the same panel number, they will overlap on the network, and one panel will be missing).

*Figure 29: Select Panel window for network with multiple segments.*

Configure the network controllers as follows:

- Go to “Configure” “Hardware” move to the “Panel number” field, press ENTER, and type the information (ex. The controller has panel # 1, the computer can be panel # 2. Enter a unique panel name for the computer in “Panel name”).
To assign a different network number to a T3000 controller:

- Connect to the T3000 Controller
- Go to “Configure” “Hardware” “COM Ports” at the respective RS-485 network port (ex. COM2) move to “More” and press enter. Use the default network number or type a new network number.
To assign a different network number to MINIs:

- Connect to the MINI
- Go to “Configure” “Hardware” “Panel Configuration” “Panel Setting” at the 'Network number' field, enter the assigned network number.
To select a panel within a NETWORK with multiple segments:

Go to “Panel” “Select Panel” and a window will appear with 2 screens as shown in Figure 29. The left screen displays the various network numbers (or network segments). The the right screen displays all the panels on a particular segment. If a panel is off line, that panel will not be displayed. However if the panel has power but does not communicate with the network, it will be displayed with the status being “OFF”.

## Network Specifications

Temco Controls recommends the following specifications for RS-485 and Ethernet networks:

RS-485:

- Maximum panels per segment: 32
- Maximum length per segment:4000 ft
- Recommended Wire:3 wire conductor, 18 gauge
- Termination:Use built-in End Of Line jumpers

Ethernet:

- Maximum panels per segment: 30
- Maximum length per segment:600 ft
- Recommended Wire:Thin coaxial (0.2 “) BNC connector 10BASE-2
- Termination:50 Ohm End Of Line resistor

## Loading Programs

Programs can be written, and tested before uploading to the controllers. The programs are unique to each controller on the network because every panel has a unique panel addressing (panel name, panel number, and network number).

For repetitive programming (same program from many controllers), Temco Controls recommend to save control basic programs as a BAS (extension name for basic program) file in the editor (F5). Re-load the BAS file (F6) from the editor when programming for a different panel, and then save the entire program file for that panel.
