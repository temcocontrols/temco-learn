---
title: "WAIT"
order: 1140
---

WAIT
(T3000 only)

Purpose:
To pause program execution.

<table>
  <tr><td>Format:</td><td>WAIT expression</td></tr>
  <tr><td>Examples:</td><td>10 START OUT2</td></tr>
  <tr><td>20 WAIT 0:10</td></tr>
  <tr><td>30REM WAIT 10 MINUTES AT LINE 20</td></tr>
  <tr><td>40WAIT 00:00:10</td></tr>
  <tr><td>50REM WAIT 10 SECONDS AT LINE 30</td></tr>
  <tr><td>60WAIT 150</td></tr>
  <tr><td>70REM WAIT 1 HOUR AND 30 MINS AT LINE 40</td></tr>
  <tr><td>80WAIT A + B * AVG ( C , D )</td></tr>
  <tr><td>90REM WAIT WHATEVER THE EXPRESSION EVALUATES TO</td></tr>
</table>

Note:

This statement is handy for controlling timing sequences. Other programs in the panel will not be affected, only the program where the statement appears will be suspended.
