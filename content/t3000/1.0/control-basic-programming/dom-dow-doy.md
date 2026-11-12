---
title: "DOM, DOW, DOY"
order: 750
---

<table>
  <tr><td>Purpose:</td><td>To find the current day of the month.</td></tr>
  <tr><td>Format:</td><td>DOM</td></tr>
  <tr><td>Example:</td><td>10</td><td>IF+ DOM = 1 THEN 100</td></tr>
  <tr><td>20 END</td></tr>
  <tr><td>30 REM NEW MONTH</td></tr>
</table>

<table>
  <tr><td><strong>DOW</strong></td></tr>
  <tr><td>Purpose:</td><td>To find the current day of week (Sun=0).</td></tr>
  <tr><td>Format:</td><td>DOW</td></tr>
  <tr><td>Example:</td><td>10 A = DOW</td></tr>
  <tr><td>20</td><td>IF DOW = MON THEN START BLR2</td></tr>
</table>

DOY

Purpose:
To find the day of year as a number from JAN1 which evaluates to 1, on up to DEC31 which is 365.

Format:
DOY

Example:
10 IF DOY = JUL1 THEN GOSUB 100 20 END

30 REM HOLIDAY PROCEDURE

40 RETURN
