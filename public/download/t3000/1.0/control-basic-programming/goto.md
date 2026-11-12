---
title: "GOTO"
order: 800
---

<table>
  <tr><td><strong>GOTO</strong></td></tr>
  <tr><td>Purpose:</td><td>To redirect the program execution.</td></tr>
  <tr><td>Format:</td><td>GOTO line</td></tr>
</table>

Purpose: Redirects program flow, jumps from the current line to another line number.

Format: GOTO linenumber

Description: GOTO statement causes the program to jump to the line referred to by linenumber

Example:

10 GOTO 100

20 REM THIS LINE DOES NOT GET EXECUTED

30 REM LINE 120 JUMPS BACK HERE

40 B = B + 1

50 END

100 REM LINE 10 JUMPS THE PROGRAM TO THIS LINE

110 A = A + 1

120 GOTO 30
