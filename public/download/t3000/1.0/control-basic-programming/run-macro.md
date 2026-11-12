---
title: "RUN-MACRO"
order: 1030
---

[TBD]

<table>
  <tr><td>Purpose:</td><td>To start a system program running in a connected PC.</td></tr>
  <tr><td>Format:</td><td>RUN-SYSTEM num</td></tr>
</table>

Description: num is a number from 1 through 16 representing the desired program

Example:
10 IF+ TIME >4:00 THEN PHONE 9-555-1234 ELSE 100 20 ON-ERROR 100

30 RUN-SYSTEM 1

35 REM WAIT WHILE SYSTEM PROGRAM IS RUNNING

40 WAIT 0:10

50 HANGUP

60 END

70 REM CONNECTION NOT MADE
