---
title: "INTERVAL"
order: 850
---

INTERVAL

<table>
  <tr><td>Purpose:</td><td>To perform an operation at a regular interval. The functions returns 1 every</td></tr>
  <tr><td>expression time, otherwise it will return 0.</td></tr>
  <tr><td>Format:</td><td>INTERVAL( expression )</td></tr>
  <tr><td>Example:</td><td>10 IF INTERVAL( 0:10:00 ) THEN GOSUB 50</td></tr>
  <tr><td>20</td><td>REM VAR1 WILL INCREMENT BY 2 EVERY HOUR</td></tr>
  <tr><td>30</td><td>VAR1 = VAR1 + 2 * INTERVAL( 100 )</td></tr>
  <tr><td>40 END</td></tr>
  <tr><td>50</td><td>REM THIS ROUTINE IS EXECUTED EVERY 10 MINUTES</td></tr>
  <tr><td>60 RETURN</td></tr>
</table>
