---
title: "FOR"
order: 780
---

Purpose:
Looping control. Used in conjunction with NEXT.

Format:
FOR a = x TO y [STEP z]

Description: a is a variable to be used as a counter

x is an expression that is the initial value of the counter y is an expression that is the maximum of the counter z is an expression to be used as an increment

If x is greater than y, when z is positive, or if x is less than y, when z is negative, execution jumps to the statement following the NEXT. Otherwise the lines following the FOR statement are executed until the NEXT statement is en countered. Then the counter is incremented by z. If you do not specify a value for z it is assumed to be 1. If the counter is now greater than y execution continues with the statement following the NEXT. If the counter is equal or less than y,

execution branches back to the statement following the FOR statement. If the value of z is negative, the test is re versed. The counter is decremented, and the loop is executed until the counter is less than y. FOR NEXT loops can be nested up to 10 levels.

Example 1: OUT1 will slowly ramp up to CON1

10 FOR A = 0 TO CON1 STEP .1 20 OUT1 = A

30 WAIT .1

40 NEXT A

Example 2: Check the status of all panels 10 FOR A = 1 TO 12

20 IF STATUS( A ) < > 1 THEN GOSUB 100 30 NEXT A

40 END

50 REM ACTION TO BE TAKEN WHEN BAD PANEL

60 RETURN
