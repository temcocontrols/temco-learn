---
title: "TIME"
order: 1110
---

Purpose: The TIME statement enables programs to use time in the calculations in an easy to read format. TIME returns the time as a number with hours as the thousands and hundreds digits, minutes are the ones and tens digits. Seconds are stored after the decimal place in the first and second decimals.

Note: If the seconds are not specified, the time will be interpreted as hours:minutes and the seconds are assumed as zero.

12:30:05=1250.05

12:30 = 1230

Times are evaluated to real numbers using the following formula:

time = hour*100 + minutes + seconds / 100

The time of 14:30:30 is returned as a real number of value = 1430.30

EXAMPLE: 10 IF TIME = 13:00:05 THEN START PUMP1

20 IF+ PUMP1 THEN VAR6 = TIME

30 REM VAR6 CONTAINS THE TIME THAT PUMP1 STARTED
