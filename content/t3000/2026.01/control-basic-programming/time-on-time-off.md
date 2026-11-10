---
title: "TIME-ON, TIME-OFF"
order: 1100
---

Purpose:
Used in programs to trigger events based on the duration of time an item has been on or off.

Use only with items which are binary such as ON-OFF and START-STOP for the range.

Can be used with outputs, inputs, variables, schedules

TIME-ON

Purpose:
Returns the length of time that an item has been on

Format:
TIME-ON( item )

Example:
10 REM START OUT2 10 MINUTES AFTER OUT1 IS ON

20 IF TIME-ON( OUT1 ) > 0:10 THEN START OUT2

TIME-OFF

Purpose:
Returns the length of time that an item has been off

Format:
TIME-OFF( item )

Example:
10 START OUT1 FOR 20 MINUTES, THEN STOP FOR 20 MINUTES, REPEATING

20 IF TIME-OFF( OUT1 ) > 0:20 THEN START OUT1

30 IF TIME-ON( OUT1 ) > 0:20 THEN STOP OUT1
