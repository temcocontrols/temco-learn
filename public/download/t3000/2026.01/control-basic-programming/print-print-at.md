---
title: "PRINT, PRINT-AT"
order: 990
---

PRINT
(T3000 only)

Purpose:
To print strings on a printer

Format:
PRINT string [;]

Description: string is the string to be printed

If a semi colon is included at the end of the PRINT statement no CR/LF (Carriage return / Line feed) will be done, otherwise a CR/LF is done.

Example:

10 IF+ FIRE THEN GOSUB 100

20 END

100 REM FIRE INSTRUCTIONS

110 PRINT “THE FOLLOWING PROCEDURE SHOULD NOW BE

CARRIED OUT:"

120 PRINT “1. ....... etc.”

130 RETURN

Note:
The PRINT-AT statement must be used before using PRINT.

Keywords recognized in PRINT statement:

- DATE
prints the date and time

- TIME
prints the date and time

- USER-A prints the name of user logged on at port A (local)

- USER-B prints the name of user logged on at port A (remote)

- BEEP
causes the printer to beep

- POINT/LOCAL VARIABLE VALUES

prints values from -999,999.9 to 999,999.9

Remember to use the print statement in conjunction with the PRINT- AT statement to specify which panel to print at. If you do not use the PRINT-AT statement, it will not print.

Be careful when the IF+, IF-, and INTER VAL statements are used with PRINT. Make sure that the same item is not printed repeatedly.

Examples:
10 PRINT-AT 2 , 5 10 PRINT-AT 2 , 5

20 IF+ USER-A THEN PRINT USER-A ; “HAS SIGNED ON AT PORT A ON” ; DATE

30 IF+ VALUE > MAXIMUM THEN GOSUB 100

40 IF INTERVAL( 01:00 ) THEN PRINT “BUILDING LOW IS: ; L : ” TIME:" ; TIME

50 END

100 PRINT “VALUE IS” ; VALUE ; “ AT ” ; DATE ; BEEP ; BEEP ; BEEP ; BEEP

110 PRINT “MESSAGE”

120 PRINT “MESSAGE”

130 RETURN

PRINT-AT [TBD]

Purpose:
To select which panel(s) will receive the print message(s).
<table>
  <tr><td>Format:</td><td>PRINT-AT panel [panel panel] or PRINT-AT ALL</td></tr>
  <tr><td>Examples:</td><td>10 PRINT-AT ALL</td></tr>
  <tr><td>20</td><td>PRINT “THIS IS PRINTED AT ALL PANELS IN SYSTEM.”</td></tr>
  <tr><td>30</td><td>PRINT-AT 2</td></tr>
  <tr><td>40</td><td>PRINT “THIS IS PRINTED AT PANEL 2 ONLY.”</td></tr>
  <tr><td>50</td><td>PRINT-AT 1 3</td></tr>
  <tr><td>60</td><td>PRINT “THIS IS PRINTED AT PANELS 1 AND 3.”</td></tr>
  <tr><td>70</td><td>PRINT-AT 1 5 8</td></tr>
  <tr><td>80</td><td>PRINT “THIS IS PRINTED AT PANELS 1, 5 AND 8.”</td></tr>
  <tr><td>Note:</td><td>Commas are not needed to separate panel numbers</td></tr>
</table>
