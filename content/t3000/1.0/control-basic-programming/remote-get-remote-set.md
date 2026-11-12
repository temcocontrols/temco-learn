---
title: "REMOTE-GET, REMOTE-SET"
order: 1010
---

<table>
  <tr><td>Purpose:</td><td>To get a value from another system.</td></tr>
  <tr><td>Format:</td><td>REMOTE-GET a = remote point</td></tr>
</table>

Description:
a is the variable that will assume the value of the remote point remote point is the point in the remote system

<table>
  <tr><td>Example:</td><td>100</td><td>PHONE 555-1234</td></tr>
  <tr><td>110</td><td>REMOTE-GET A = 3-IN5</td></tr>
  <tr><td>120 HANGUP</td></tr>
  <tr><td>130 ALARM A &gt;24 , 2 , REMOTE SITE TOO HOT</td></tr>
</table>

<table>
  <tr><td><strong>REMOTE-SET</strong></td><td>(T3000 only)</td></tr>
  <tr><td>Purpose:</td><td>To set a value in another system.</td></tr>
</table>

<table>
  <tr><td>Format:</td><td>REMOTE-SET remote point = x</td></tr>
  <tr><td>Description</td><td>x is the variable that the remote point is to be set to</td></tr>
  <tr><td>remote point is the point in the remote system</td></tr>
  <tr><td>Example:</td><td>10</td><td>REM START A REMOTE OUTPUT</td></tr>
  <tr><td>20</td><td>PHONE 555-1234</td></tr>
  <tr><td>30</td><td>A = 1</td></tr>
  <tr><td>40</td><td>REMOTE-SET 2-OUT4 = A</td></tr>
  <tr><td>50 HANGUP</td></tr>
</table>
