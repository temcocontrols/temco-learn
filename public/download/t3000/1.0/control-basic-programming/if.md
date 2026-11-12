---
title: "IF"
order: 820
---

IF

Purpose:
Logic statement for decision making.

Format:
IF x THEN clause [ELSE clause]

Description: x is any expression

clause is a BASIC statement or sequence of statements (separated by commas) or a line number to branch to

If x is true (non zero), the clause following the THEN is executed. If x is false (zero), the clause after the ELSE is executed.

<table>
  <tr><td>Example:</td><td>10</td><td>IF OUT1 THEN START OUT2</td></tr>
  <tr><td>20</td><td>IF AVG( A , B , C ) &gt; 22.4 THEN 30 ELSE 50</td></tr>
  <tr><td>30 PRINT “AVERAGE IS ABOVE 22.4"</td></tr>
  <tr><td>40 END</td></tr>
  <tr><td>50 PRINT “AVERAGE IS BELOW 22.4"</td></tr>
  <tr><td>60 END</td></tr>
</table>
