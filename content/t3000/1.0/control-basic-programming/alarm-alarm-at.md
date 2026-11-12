---
title: "ALARM, ALARM-AT"
order: 670
---

ALARM

Purpose: To generate alarms based on user defined conditions and includes automatic hysterisis to reduce multiple triggers from the same event.

Format: ALARM x > y , z , string

ALARM x < y , z , string

Description: x > y and x < y are the alarm conditions

z is the alarm hysterisis, once the alarm is triggered the condition must swing back by this amount before another event is triggered.

string is the alarm message with a length of up to 69 characters.

Example:
10 ALARM SAT > SETPOINT + 5 , 2 , SUPPLY AIR TEMP IS TOO HIGH

In this example, the alarm is triggered when the supply air is 5 degrees above setpoint. Another alarm will not be triggered till the alarm resets itself by swinging thru 3 Degrees again ( 5 - 2 = 3 degrees) over setpoint.

ALARM- AT

<table>
  <tr><td>Purpose:</td><td>Selects which panel(s) will receive the alarms.</td></tr>
  <tr><td>Format:</td><td>ALARM-AT panel1 panel2 ...] or ALARM-AT ALL</td></tr>
  <tr><td>Example:</td><td>10 ALARM-AT ALL</td></tr>
  <tr><td>20REM ALARMS WILL GO TO ALL PANELS.</td></tr>
  <tr><td>30ALARM-AT 2 8</td></tr>
  <tr><td>40REM ALARMS WILL GO TO PANELS 2 AND 8 ONLY</td></tr>
</table>
