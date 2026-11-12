---
title: "IF+ , IF-"
order: 830
---

<table>
  <tr><td><strong>IF+</strong></td></tr>
  <tr><td>Purpose:</td><td>To detect occurrence of event.</td></tr>
  <tr><td>Format:</td><td>IF+ x THEN clause [ELSE clause]</td></tr>
</table>

Description: x is any expression

clause is a BASIC statement or sequence of statements (separated by commas), or a line number to branch to

If x is true, and on the previous check it was false, the clause following the THEN is executed. Otherwise the clause after the ELSE is executed.

<table>
  <tr><td>Example:</td><td>10</td><td>IF+ CHILLER THEN GOSUB 40</td></tr>
  <tr><td>20</td><td>IF+ TIME &gt; 12:00 THEN GOSUB 60</td></tr>
  <tr><td>30 END</td></tr>
  <tr><td>40</td><td>PRINT “THE CHILLER HAS JUST COME ON”</td></tr>
  <tr><td>50 RETURN</td></tr>
  <tr><td>60</td><td>REM RING LUNCH BELL</td></tr>
  <tr><td>70</td><td>START BELL</td></tr>
  <tr><td>80</td><td>WAIT 00:00:05</td></tr>
  <tr><td>90</td><td>STOP BELL</td></tr>
  <tr><td>100 RETURN</td></tr>
</table>

<table>
  <tr><td><strong>IF-</strong></td></tr>
  <tr><td>Purpose:</td><td>To detect occurrence of event.</td></tr>
  <tr><td>Format:</td><td>IF- x THEN clause [ELSE clause]</td></tr>
</table>

Description: x is any expression

clause is a BASIC statement or sequence of statements (separated by commas), or a line number to branch to

If x is False, and on the previous check it was true the clause following the THEN is executed. Otherwise the clause after the ELSE is executed.

Example:
10 IF- CHILLER THEN GOSUB 30 20 END

30 PRINT “THE CHILLER HAS JUST GONE OFF”

40 RETURN
