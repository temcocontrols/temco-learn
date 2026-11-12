---
title: "END"
order: 770
---

Purpose:
Ends execution of a program. Used to control flow of logic through a given program.

Format:
END

Example
:
100 REM CHECK IF THE BOILERS ARE RUNNING

110 IF NOT BOILER-S THEN END

120 REM ONLY EXECUTE THE NEXT LINES IF THE BOILERS ARE RUNNING

130 START PUMP101

Programming tip:

GOTO statements, END statements and similar jumps in the basic programming language can lead to code which is hard to debug.

Logic with a lot of GOTOS and jumps is referred to as spaghetti code, use these statements sparingly.

The above example can be done with the same logic below without using the END command

BOILER is an output, shows us the boiler is asked to come on.

BOILER-S is an input which shows that the boiler is actually running.

100 IF BOILER THEN START PUMP101 ELSE STOP PUMP101

110 IF NOT BOILER-S THEN STOP PUMP101
