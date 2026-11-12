---
title: "ON"
order: 900
---

Purpose:
Selectable GOTO or GOSUB.

Format:
ON n GOTO line [, line...]

ON n GOSUB line [, line...]

Description:
n is an expression rounded to an integer line is a line number in the program

The value of n determines which line number in the list the program uses for branching. For ex am ple, if n is 3, the third line number in the list is the point to which the program branches.

If the value of n is illegal for the given list, no branch occurs.

<table>
  <tr><td>Example:</td><td>10</td><td>VAR1 = AVG ( IN1 , IN2 , IN3 , IN4 ) - 20</td></tr>
  <tr><td>20</td><td>ON VAR1 GOSUB 100 , 200 , 300 , 400 , 500</td></tr>
  <tr><td>30 END</td></tr>
  <tr><td>100</td><td>REM THE AVERAGE IS 21 : RETURN</td></tr>
  <tr><td>200</td><td>REM THE AVERAGE IS 22 : RETURN</td></tr>
  <tr><td>300</td><td>REM THE AVERAGE IS 23 : RETURN</td></tr>
  <tr><td>400</td><td>REM THE AVERAGE IS 24 : RETURN</td></tr>
  <tr><td>500</td><td>REM THE AVERAGE IS 25 : RETURN</td></tr>
</table>
