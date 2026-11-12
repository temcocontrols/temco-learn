---
title: "STATUS"
order: 1080
---

<table>
  <tr><td><strong>STATUS</strong></td></tr>
  <tr><td>Purpose:</td><td>To find the status of a panel. The function returns 0 if there's loss of</td></tr>
  <tr><td>communication, 2 if the panel has no program, and 1 if everything is fine.</td></tr>
  <tr><td>Format:</td><td>STATUS( expression )</td></tr>
  <tr><td>Example:</td><td>10</td><td>REM TAKE SPECIAL ACTION IF PANEL 2 NOT OK</td></tr>
  <tr><td>20</td><td>IF STATUS( 2 ) THEN GOSUB 40</td></tr>
  <tr><td>30 END</td></tr>
  <tr><td>40</td><td>START OUT1 : STOP OUT2 : RETURN</td></tr>
</table>
