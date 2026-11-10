---
title: "List of Statements"
order: 650
---

The complete list of Control Basic statements and operators:

<table>
  <tr><td><strong>STATEMENT</strong></td><td><strong>TYPE</strong></td><td><strong>DESCRIPTONSUMMARY</strong></td></tr>
  <tr><td>NUMBERS</td><td>DATA</td><td>Real numbers are handled by the T3000 in full floating point format</td></tr>
  <tr><td>DAYS</td><td>DATA</td><td>Days are evaluated as an integer from SUN=0, MON=1, TUE = 2, WED=3... to SAT = 6</td></tr>
  <tr><td>DATES</td><td>DATA</td><td>Dates are handled internally by the T3000 as a number from JAN1=1 up to DEC31=365</td></tr>
  <tr><td>TIMES</td><td>DATA</td><td>Times are handled internally as hours, but can be typed HH:MM:SS in a program</td></tr>
  <tr><td>VARIABLES</td><td>DATA</td><td>Variables are handled internally as real numbers with full floating point notation</td></tr>
  <tr><td>NOT</td><td>OPERATOR</td><td>Evaluates to TRUE if the opposite is true. IF NOT HOT evaluates to true when COLD</td></tr>
  <tr><td>^</td><td>OPERATOR</td><td>Exponent, raises a number to a power as in 2^2 = 4</td></tr>
  <tr><td>* / \ MOD</td><td>OPERATOR</td><td>Multiplication, division, integer portion of a division, remained of a division</td></tr>
  <tr><td>+ -</td><td>OPERATOR</td><td>Addition and subtraction</td></tr>
  <tr><td>&lt; &gt; ... etc</td><td>OPERATOR</td><td>Less than, greater than, and other combinations.</td></tr>
</table>

<table>
  <tr><td>AND</td><td>LOGIC</td><td>Logical AND, both conditions must be TRUE for the expression to evaluate to TRUE</td></tr>
  <tr><td>OR</td><td>LOGIC</td><td>Logical OR, if either expression is TRUE the result is TRUE</td></tr>
  <tr><td>XOR</td><td>LOGIC</td><td>Logical Exclusive OR, evalutates to TRUE if the two expressions are different</td></tr>
  <tr><td>ABS</td><td>FUNCTION</td><td>Absolute Value, returns the positive equivalent of a negative or positive number</td></tr>
  <tr><td><a href="../../../../../../QN/temcocontrols/temco-platform/control-basic-programming/alarm-alarm-at.md">ALARM</a></td><td>COMMAND</td><td>Causes an alarm, has built in hysterisis to avoid multiple alarms from the same event</td></tr>
  <tr><td><a href="../../../../../../QN/temcocontrols/temco-platform/control-basic-programming/alarm-alarm-at.md">ALARM-AT</a></td><td>COMMAND</td><td>Selects which panel will annunciate alarms, default is ALL panels</td></tr>
  <tr><td>AVG</td><td>FUNCTION</td><td>Average of all numbers enclosed in the brackets following this command</td></tr>
  <tr><td>CALL</td><td>COMMAND</td><td>Calls an other program which functions as a sub routine, takes arguments</td></tr>
  <tr><td>CLEAR</td><td>COMMAND</td><td>Clears all the local variables in a given program</td></tr>
  <tr><td>CLOSE</td><td>COMMAND</td><td>Sets a variable or out put to 0, same as STOP but is more intuitive in some cases</td></tr>
  <tr><td>CONPROP</td><td>FUNCTION</td><td>Allows a Basic program to up date the proportional term in a particular PID controller</td></tr>
  <tr><td>CONRATE</td><td>FUNCTION</td><td>Allows a Basic program to up date the derivative term in a particular PID controller</td></tr>
  <tr><td>CONRESET</td><td>FUNCTION</td><td>Allows a Basic program to up date the integral term in a particular PID controller</td></tr>
  <tr><td>DALARM</td><td>COMMAND</td><td>Delayed alarm, allows generation of alarms if a condition is true for a certain time</td></tr>
  <tr><td>DECLARE</td><td>COMMAND</td><td>First line of a sub routine to accept the list of arguments from a CALL statement</td></tr>
  <tr><td>DISABLE</td><td>COMMAND</td><td>Same as STOP or CLOSE, sets an item to 0</td></tr>
  <tr><td>DOM</td><td>FUNCTION</td><td>Day of month, returns the day of the month, starting with 1 on the first of the month</td></tr>
  <tr><td>DOW</td><td>FUNCTION</td><td>Day of week, returns a number from 0 to 6 starting with Sun day as zero</td></tr>
  <tr><td>DOY</td><td>FUNCTION</td><td>Day of the year, starting with Jan1 as 1</td></tr>
  <tr><td>ENABLE</td><td>COMMAND</td><td>Same as START or OPEN, sets the value of an item to 1.</td></tr>
  <tr><td>END</td><td>COMMAND</td><td>Ends execution of a program, T3000 assumes and end at the end of each program</td></tr>
  <tr><td>FOR</td><td>COMMAND</td><td>Loop control statement, FOR A =1 TO 10 ....PRO GRAM LINES.....NEXT A</td></tr>
  <tr><td>GOSUB</td><td>COMMAND</td><td>Branches to sub routine, executes program till next RE TURN statement, and loops back</td></tr>
  <tr><td>GOTO</td><td>COMMAND</td><td>Unconditionally branches program execution to an other line</td></tr>
  <tr><td>HANGUP</td><td>COMMAND</td><td>Ends a phone call in progress</td></tr>
  <tr><td>IF</td><td>COMMAND</td><td>Logical decision, IF HEAT MODE THEN START OUT1</td></tr>
  <tr><td>IF+</td><td>COMMAND</td><td>Executes the program line only once when the condition goes from FALSE to TRUE</td></tr>
  <tr><td>IF-</td><td>COMMAND</td><td>Opposite of IF+, executes the line only when a condition be comes FALSE</td></tr>
  <tr><td>INT</td><td>FUNCTION</td><td>Returns the integer part of an expression</td></tr>
  <tr><td>INTERVAL</td><td>FUNCTION</td><td>IF IN TER VAL(0:01:00) executes the following programming once every minute</td></tr>
  <tr><td>LET</td><td>COMMAND</td><td>Assignment operator, LET B = 20, has the same effect as B = 20</td></tr>
  <tr><td>LN</td><td>FUNCTION</td><td>Natural logarithm of the argument</td></tr>
  <tr><td>LN-1</td><td>FUNCTION</td><td>In verse logarithm of the argument</td></tr>
  <tr><td>MAX</td><td>FUNCTION</td><td>Maximum of a list of arguments enclosed in brackets following the statement</td></tr>
  <tr><td>MIN</td><td>FUNCTION</td><td>Minimum of a list of arguments enclosed in brackets following the statement</td></tr>
  <tr><td>NEXT</td><td>COMMAND</td><td>Used in conjunction with the FOR statement to increment the loop counter</td></tr>
  <tr><td>ON</td><td>COMMAND</td><td>ON VAR1 GOTO 100 , 200 , 300 , controls program path depending on VAR1</td></tr>
  <tr><td>ON-ALARM</td><td>COMMAND</td><td>Evaluates to TRUE when ever there is an alarm in the system.</td></tr>
  <tr><td>ON-ERROR</td><td>COMMAND</td><td>Used with PHONE, REMOTE- GET, REMOTE- SET, and RUN- SYSTEM</td></tr>
  <tr><td>OPEN</td><td>COMMAND</td><td>Sets an item to 1, OPEN OUT1 is the same as START OUT1</td></tr>
  <tr><td>PHONE</td><td>COMMAND</td><td>Phones a number, allows T3000 to dial with a modem for numeric paging</td></tr>
  <tr><td>POWER -LOSS</td><td>FUNCTION</td><td>Looks for loss of power, 1 the first time the function is evaluated, o afterwards</td></tr>
  <tr><td>PRINT</td><td>COMMAND</td><td>Print strings at a printer connected to the panel</td></tr>
  <tr><td>PRINT- AT</td><td>COMMAND</td><td>Print strings at a printer connected to an other panel on the net work</td></tr>
  <tr><td>REM</td><td>COMMAND</td><td>Remark, used to add comments to a program</td></tr>
  <tr><td>REMOTE- GET</td><td>COMMAND</td><td>10 REMOTE- GET VAR1 = 2IN1, gets a reading from an other site via modem</td></tr>
  <tr><td>REMOTE-SET</td><td>COMMAND</td><td>Sets a variable at a remote site via modem.</td></tr>
  <tr><td>RE TURN</td><td>COMMAND</td><td>Causes program execution to return from a sub routine</td></tr>
  <tr><td>RUN-MACRO</td><td>COMMAND</td><td>Causes a macro command or series of key strokes to be run</td></tr>
  <tr><td>SCANS</td><td>FUNCTION</td><td>The number of scans a panel is per forming in one second</td></tr>
  <tr><td>SET-PRINTER</td><td>COMMAND</td><td>Tells a T3000 system there is a printer at a particular panel</td></tr>
  <tr><td>SQR</td><td>FUNCTION</td><td>Returns the square root of the argument</td></tr>
  <tr><td>START</td><td>COMMAND</td><td>Sets the value of an items to 1, same as OUT1 = 1 or OPEN OUT1</td></tr>
  <tr><td>STATUS</td><td>FUNCTION</td><td>Status of a panel on the net work, 0 = No Comm, 1 =OK, 2 = no program</td></tr>
  <tr><td>STOP</td><td>COMMAND</td><td>Sets the value of an items to 0, same as OUT1 = 0 or CLOSE OUT1</td></tr>
  <tr><td>TBL</td><td>FUNCTION</td><td>Looks up a value in a table</td></tr>
  <tr><td>TIME</td><td>FUNCTION</td><td>Finds the current time</td></tr>
</table>

<table>
  <tr><td>TIME-OFF</td><td>FUNCTION</td><td>Finds the time variable has been false</td></tr>
  <tr><td>TIME-ON</td><td>FUNCTION</td><td>Finds the time variable has been true</td></tr>
  <tr><td>WAIT</td><td>COMMAND</td><td>Pauses program execution</td></tr>
  <tr><td>WR-ON</td><td>FUNCTION</td><td>Finds when a weekly routine is set to come on</td></tr>
  <tr><td>WR-OFF</td><td>FUNCTION</td><td>Finds when a weekly routine is set to go off</td></tr>
  <tr><td>UNACK</td><td>FUNCTION</td><td>Determines if there are unacknowledged alarms in system</td></tr>
  <tr><td>USER-A</td><td>FUNCTION</td><td>Finds the user logged on to the local port</td></tr>
  <tr><td>USER-B</td><td>FUNCTION</td><td>Finds the user logged on to the remote port</td></tr>
</table>
