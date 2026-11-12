---
title: "UNACK"
order: 1120
---

<table>
  <tr><td>Purpose:</td><td>To determine if there are any unacknowledged alarms in the system. The function returns 1 if there are alarms that are still on and that have not been acknowledged, otherwise it will return 0.</td></tr>
  <tr><td>Format:</td><td>UNACK</td></tr>
  <tr><td>Example:</td><td>10 IF UNACK THEN START ALRM-OUT ELSE STOP ALRM-OUT</td></tr>
</table>
