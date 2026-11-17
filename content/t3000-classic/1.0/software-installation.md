---
title: "Software installation"
order: 50
---

This section describes the installation of T3000 software into the PC or T3000 Controller, as well as configuring the I/O ports, and COM ports to allow communications between the controllers and the PC. For more information on configuring time, date, panel number, panel name, and file path refer to the software manual.

The T3000 software is a powerful, user interface for the above DDC controllers. It has real time simulation capabilities allowing the user to write, edit, and test the control basic programs before uploading to the controllers. Please ensure not to exceed the specified software capabilities of each controller. For example, the T3000 has 128 variables, while the MINI 64 has 64 variables. Review the software specifications for each controller before writing a program. Once a program (a simple program consist of inputs, outputs, variables, weekly controllers has been written, it can be tested in real-time to correct any logic programming problems.

The T3000 software is DOS based utilizing version 2.49. A demo disk is provided, and it can be quickly downloaded from our website( www.temcocontrols.com). The demonstration disk , contains a full working version of T3000.EXE with various graphics. For more details on the files required to run T3000, see Appendix E.

- Move to the floppy disk by typing A: or B: (whichever is the 3.5" drive in your system) and then type:
INSTALL [enter] The batch file creates a subdirectory on the C drive (T3000), copies the self extracting DEMO.EXE into the necessary files in this subdirectory, and then runs T3000.

- The name and password characters must be uppercase (capital letters).

Name: T [enter]

Password: T [enter] As an alternative, enter the MASTER password in the Password field:

Password: TRAVEL [enter] (note: leave name field blank)

- The main menu appears as shown in Figure 20.

## Personal Computer

The PC has 2 serial communication ports named COM1, and COM2 (unless the PC has an extra communication card which adds 2 more communication ports COM3, COM4). Generally, COM1 is used for the mouse. If an internal modem is required, it should be assigned as COM3. If the modem is external, it will be assigned COM1 or COM2. Should COM1 has a mouse, the external modem will be assigned COM2.

Figure 21 shows a typical PC COM port setup:

*Figure 20: Main menu*

*Figure 21: T3000 Commnunications port configuration window.*

To configure the communication ports, perform the following steps:

- Go to “Configuration”, “Hardware”, “COM ports” The COM ports can take “RS-232, RS-485, MODEM, or ASYNC” mode.
- Move the cursor using the arrow keys to the respective field and press enter to select the desired value.
- Note that the baud rate should be the same for the PC and the controller, and it should be limited to 19200 bps when communicating with the MINI 64 and MINI 16.
- Once configuration of COM port, IRQ, baud rate is completed, move to “OK”, and press ENTER. The software will initialize and setup the COM ports.

## T3000 Controller

This section assumes that the installer is connected locally to the T3000 using a monitor and keyboard. 2.2.1 I/O Software Configuration To configure the I/O ports for recognition of the I/O cards, perform the following steps:

- Go to “Configuration”, “Hardware”, “Panel Configuration” select “PC number of I/O boards: ” field and press enter. A pop up window appears. Figure 22 shows the resulting screen.
*Figure 22: T3000 Controller I/O ports configuration window.*

- Each of the eight port can take the value of “I” (Input card), “O” (Output card), or “ ” (no I/O card). From the example in section 1.1.3, Figure 23 displays the resulting I/O configuration.
- Press ESC (escape) to exit I/O port configuration.
- Press ESC to exit configuration. A window will appear asking “ Save new configuration? Y/N ”. Type Y [Yes].
- Test the I/O configuration by turning an input or output point from each card on and off. If they don't respond, verify the ribbon cables, and software configuration.
- If the test is positive, the T3000 Controller is now ready to accept for programming or accept a previously written program (prg file). Go to “Panel”, “File”, “Load”.

### General Operation

Once the I/O software configuration has been performed, configure the COM ports (See software manual for more information).

Determine from section 1.5.5 which standard, and protocol are suitable to communicate with the controller.

To establish connection with the controller:

## RS-232 standard, PTP protocol: go to “Miscellaneous” “ Connect” A window

will pop up as shown in Figure 24. 'Inactive' means that the computer is not connected to the controller. Press Insert key. Connection will be made within 5 seconds, then a pop up window will display “reading descriptors”.

## RS-485 standard, MS/TP protocol: go to “Panel” “Select Panel” two panel

panel should appear as shown in Figure 25. To select the controller, use the arrow keys to move to the respective line, and press “Enter” to select that panel.

*Figure 23: Example of T3000 I/O port configuration.*

If only one panel or none is present, verify the following steps:

- One COM port has been configured as RS-485
- Configure the Panel (panel number and name). Ensure that the computer has a different panel number as the controller (an RS-485 network can support up to 32 panels including the PC. It is important that the controllers have different panel number, including the PC. For example, If two panels have the same panel number, they will overlap on the network, and one panel will be missing).
*Figure 24: Connect window for RS-232 standard, PTP protocol.*

*Figure 25: Select Panel window for RS-485 standard, MSTP protocol.*

- Move to “Panel number” field, press ENTER, and type the information (ex. The controller is usually panel # 1, the computer can be panel # 2.
- Enter a unique panel name for the computer in “Panel name”.
- Once connected to the controller, the installer can enter the information (Inputs, Outputs, Variables, WR, etc.) and write the control basic programs, or simply upload a previously written prg program.
- Configure the Time and Date.

## T3000 MINI 64

- Once the installation is complete with the I/O cards connected, power up the controller using the power jumper located to the left of the 24 Vac connector.
- The software configuration of the I/O cards is executed automatically upon power up.
- To connect to the controller, use the same procedure as the T3000 (section 2.2.2).
- Once connected, verify if the number of I/O points in the software correspond with the actual I/O cards.
- If the I/O number is correct, start programming, or upload a previously written program. If not, go to Appendix F for troubleshooting.

TIP: Save your work as often as you can.

## T3000 MINI 16

- Power up, and connect using the same procedure as in section 2.2.2.
- Perform a simple On/Off test on the inputs and outputs to verify that they are operational.
- Start programming , or upload a previously written program.
