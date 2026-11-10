---
title: "Variables"
order: 640
---

VARIABLES

Variables as used in Control Basic consist of conventional variables, and points.

LOCAL VARIABLES

There are 26 local variables available to each program. These variables can assume any floating point value. The current value of a local variable can be determined by using the PRINT command (i.e.: PRINT A). Local variables are unique to each program and cannot be used anywhere else in the system. The symbols used for local variables are the characters of the alphabet (i.e.: A,B,C...Z).

POINTS

The 10 point types are variables because they have a value. This value may be accessed, and some points are set through Control Basic. The table below summarizes the fields of each point that can be read or written to:

<table>
  <tr><td><strong>POINT TYPE</strong></td><td><strong>MNEMONIC</strong></td><td><strong>READ FIELD</strong></td><td><strong>WRITE FIELD</strong></td></tr>
  <tr><td>Outputs</td><td>OUT1 thru OUT128 Output</td><td>Output</td></tr>
  <tr><td>Inputs</td><td>IN1 thru IN128</td><td>Input</td><td>Input</td></tr>
  <tr><td>Variables</td><td>VAR1 thru VAR128 Value</td><td></td><td>Value</td></tr>
  <tr><td>Controllers</td><td>CON1 thru CON64</td><td>Output</td><td>Setpoint Value</td></tr>
  <tr><td>Weekly Routines</td><td>WR1 thru WR32</td><td>Output</td><td>n/a</td></tr>
  <tr><td>Annual Routines</td><td>AR1 thur AR8</td><td>Output</td><td>n/a</td></tr>
  <tr><td>Programs</td><td>PRG1 thru PRG128</td><td>Status</td><td>Status</td></tr>
  <tr><td>Control Groups</td><td>GRP1 thru GRP32</td><td>n/a</td><td>n/a</td></tr>
  <tr><td>Digital Monitors</td><td>DMON1 thru DMON128</td><td>On Time</td><td>n/a</td></tr>
  <tr><td>Analog Monitors</td><td>AMON1 thru AMON96</td><td>S(Status)</td><td>S</td></tr>
  <tr><td>Array Elements</td><td>AY1[x] thru AY48[x]</td><td>Value</td><td>Value</td></tr>
</table>

All point type variables can be referred to by their label. Some statements and functions would be illogical using certain points. If an illogical operation is attempted, nothing will happen.

Examples:
START WR1 (cannot start Weekly Routines in BASIC)

DMON1 = 23 * A. (DMONS cannot be set by BASIC)
