---
title: "ON-ALARM"
order: 910
---

<table>
  <tr><td>Purpose:</td><td>To redirect program execution if there was an alarm.</td></tr>
  <tr><td>Format:</td><td>ON-ALARM line</td></tr>
  <tr><td>Description:</td><td>line is the line number</td></tr>
  <tr><td>Example:</td><td>10 DALARM FIRE = 1 , 10 , THERE IS A FIRE</td></tr>
  <tr><td>20 ON-ALARM 100</td></tr>
  <tr><td>30 REM CONTINUES HERE IF NO ALARM</td></tr>
  <tr><td>40 END</td></tr>
  <tr><td>100</td><td>REM SPECIAL FIRE PROCEDURES</td></tr>
  <tr><td>110 STOP BOILER1 : STOP BOILER2</td></tr>
  <tr><td>Note:</td><td>This branch happens only once when the alarm is generated.</td></tr>
</table>
