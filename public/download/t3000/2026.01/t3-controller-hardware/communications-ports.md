---
title: "Communications Ports"
order: 160
---

The list of communications ports for the various models of controllers is shown below.

<table>
  <tr><td>Ports</td><td>BB</td><td>LB</td><td>TB</td></tr>
  <tr><td>RS485</td><td>2</td><td>2</td><td>2</td></tr>
  <tr><td>RS232</td><td>1</td><td>0</td><td>0</td></tr>
  <tr><td>Ethernet</td><td>1</td><td>1</td><td>1</td></tr>
  <tr><td>USB Port</td><td>1</td><td>1</td><td>0</td></tr>
  <tr><td>*Option Port</td><td>1</td><td>1</td><td>0</td></tr>
</table>

*The BB and LB models have an option port which can be populated with either a zigbee or GSM 3G modem.

· RS485 Communication Speed is adjustable for Modbus master or slave and Bacnet MSTP at a baud rates from 9600 to 115k baud. For longer cable runs the practical speed limitation is 38.4kbaud, you can experiment with faster baud rates if the cabling is well laid out with shielding and earthing at all the nodes.

![](media/images-drex_module_5_3_custom.png)

Ethernet speed is 100/10 MBaud

RS232 Com port on the BB model can be used as a debugging terminal and for integrating.

Baud rate us adjustable to 9600, 19.2k, 38.4k

·

The USB Port is normally available as a COM port for debugging purposes. If a GSM modem is installed, the modem will occupy this port and it will not be available for your application or debugging.

![](media/images-drex_module_5_3_custom_2.png)
