---
title: "Declare"
order: 730
---

[TBD] This statement not implemented yet

<table>
  <tr><td><strong>DECLARE</strong></td></tr>
  <tr><td>Purpose:</td><td>To receive a list of arguments into a program.</td></tr>
  <tr><td>Used in conjunction with CALL.</td></tr>
  <tr><td>Format:</td><td>DECLARE [ var1 , var2 ... ]</td></tr>
</table>

Description: var1, var2, ... are variables (i.e. A, B, VAR1)

Example:
10 DECLARE SAT SAS FAN CTRL MIN-TEMP MAX-TEMP VALVE 100 END

Notes:

1. DECLARE must be used on the first line in the program. Using DECLARE makes the program a “subroutine” and should only be run from a CALL statement.

2. The variables are set to the value of the corresponding arguments in the CALL statement.

3. Use END statement to end the program.

4. When END statement is executed, the values of the variables are copied back to the original arguments in the CALL statement.

5. [TBD] Disable the “Timer” field of a program using DECLARE so that it will not run unless called by CALL.

![](media/images-drex_module_12_10_custom.png)

6. CALL and DECLARE are useful for keeping a program modular. The logic only has to be written once and can be used by many systems by calling the routine with different arguments for each system.
