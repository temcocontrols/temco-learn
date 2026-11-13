---
title: "Glossary"
order: 1340
---

The words this manual uses in a particular way. Where a term also has an everyday meaning, the entry gives the meaning T3000 gives it.

## The system

| Term | Meaning |
|---|---|
| **Panel** | A controller on the network. Used interchangeably with *controller* and *device*; a panel holds the points, the programs and the database record. |
| **T3** | The Temco Controls controller family. A T3 is the panel most of this manual describes. |
| **TStat8** | The Temco Controls thermostat. It has its own points and schedules and is documented separately. |
| **Expansion module** | A board that adds points to a panel — `T3-8O` for outputs, `T3-22I` for inputs, `T3-PT12` for temperature. It carries its own serial number and names its parent. |
| **Subnet** | The group of panels reachable on one network segment. Panels are found and read by scanning their subnet. |
| **Serial number** | The identity of a panel. Everything T3000 keeps about a panel is keyed by it, and it does not change when the panel's address does. |
| **Modbus ID** | The address a panel answers to on a serial Modbus segment. Two panels on one segment cannot share one. |
| **BACnet instance** | The object number a device answers to on a BACnet network, in the same role the Modbus ID plays on Modbus. |
| **Scan** | Asking the network what is there. A scan can run automatically when T3000 opens or on demand. |
| **PTP** | The connection T3000 uses to reach a panel through the Temco server when neither end can be dialled directly. |

## Points

| Term | Meaning |
|---|---|
| **Point** | One addressable value on a panel — an input, an output or a variable. |
| **Input** | A value read from the panel's terminals: a temperature, a contact, a pulse count. |
| **Output** | A value the panel drives: a relay, a 0–10 V signal, a triac. |
| **Variable** | A value the panel holds for its own use — a setpoint, a counter, a flag. |
| **Analog / digital** | Whether a point carries a number or is on or off. |
| **Range** | The engineering meaning of an input's raw value: what a reading of 4 mA or 500 counts represents. |
| **Custom digital range** | A digital range with a label of its own, so a contact reads as *Filter dirty* rather than *Off*. |
| **Pulse counting** | Counting digital transitions over time instead of reporting a state. |
| **Point type** | Which of the three tables a point lives in: `INPUT`, `OUTPUT` or `VARIABLE`. |

## Control

| Term | Meaning |
|---|---|
| **Control Basic** | The panel's programming language. Programs are written in numbered lines, in the style of BASIC. |
| **Program** | A Control Basic program held by a panel. A panel runs its programs once per scan. |
| **PRG file** | A file holding a panel's database record — points, names, ranges, settings — so it can be carried between machines without the panel. |
| **PID loop** | A control loop that corrects an output from the error between a setpoint and a measured value, using proportional, integral and derivative terms. |
| **Setpoint** | The value a loop is trying to reach. |
| **Process variable** | The measured value a loop is trying to hold at the setpoint. |
| **Schedule** | A weekly program: which hours of which days a panel does something. Repeats every seven days. |
| **Annual routine** | The year's exceptions — holidays and one-off closures — applied on top of the weekly schedules. |
| **Auto / manual** | Whether a point is driven by the panel's own logic (*auto*) or held at a value somebody typed (*manual*). A manual point ignores its program. |

## Records

| Term | Meaning |
|---|---|
| **Trend log** | A record of a point's value over time, stored so the history can be read back and graphed. |
| **Alarm** | A condition the panel reports when a point crosses a limit, with the time it happened and whether it was acknowledged. |
| **Graphic screen** | A drawing of the plant with live points placed on it, so a system can be read at a glance. |
| **Building database** | The stored copy of every panel's points and settings. It exists whether or not the panels are online, which is what allows a site to be built before the hardware is. |
| **Offline mode** | Working with the building database when no panel is reachable. |
| **Write / read back** | Sending a value or a table to a panel, then reading it to confirm what the panel actually holds. |

## Connections

| Term | Meaning |
|---|---|
| **COM port** | A serial port on the PC or the panel. T3000 numbers them `COM0`, `COM1`, `COM2`. |
| **MSTP** | BACnet over a serial segment — the BACnet equivalent of Modbus RTU. |
| **BBMD** | A BACnet broadcast management device, which lets broadcast traffic cross between IP subnets. |
| **Port forwarding** | A router rule that lets a connection from outside reach a device inside. Needed for direct access to a panel. |
| **VPN** | A tunnel that makes a remote network reachable as though it were local. |
| **WireGuard** | The VPN protocol T3000 is being built to configure itself, per remote site rather than per panel. |
| **Firmware** | The software inside a panel. Updating it is a maintenance task, and the update is checked by version. |
