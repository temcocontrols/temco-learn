---
title: "ErrorMessages"
order: 1160
---

## 10.5 ERROR MESSAGES

When the programming changes are done the user hits the F2 key or "SEND" from the menu system to send the changes to the controller. The software checks the program for errors and if all is clear sends the program to the controller. If errors are found the program is not sent and the errors are displayed in a popup and also at the bottom of the editor.

![](media/images-drex_module_12_51_custom.png)

## 10.5.1 SYNTAX ERRORS

Syntax errors usually are caused by spelling mistakes of syntax errors.

Here is a list of the error messages:

<table>
  <tr><td>1.</td><td>Expecting variable</td><td>7.</td><td>Illegal extra characters on line</td></tr>
  <tr><td>2.</td><td>Expecting =</td><td>8.</td><td>Expecting another expression</td></tr>
  <tr><td>3.</td><td>Expecting operator</td><td>9.</td><td>Illegal line number in goto</td></tr>
  <tr><td>4.</td><td>Bracket error</td><td>10.</td><td>String is missing end quote (“)</td></tr>
  <tr><td>5.</td><td>Not variable on left of equals</td><td>11.</td><td>Attempt to change the value of a point in another panel</td></tr>
  <tr><td>6.</td><td>Function argument not expression</td></tr>
</table>

<table>
  <tr><td>10.5.2 <strong>STRUCTURAL ERRORS</strong></td></tr>
  <tr><td>1.</td><td>Program too large —- text buffer</td><td>7.NEXT without FOR in line ###</td></tr>
  <tr><td>2.</td><td>Too many GOTOs —- allowed 50</td><td>8.Too many FOR's —- allowed 10</td></tr>
  <tr><td>3.</td><td>Program too large at line ###</td><td>9.Expecting line number after line ###</td></tr>
  <tr><td>4.</td><td>Too many lines —- allowed 100</td><td>10. Line after ### is too long</td></tr>
</table>

5. FOR without NEXT

6. GOTO or GOSUB to undefined line ###
