---
title: "CALL"
order: 690
---

[TBD] This statement not implemented yet

CALL

Purpose: To call a program with a list of arguments to be used in that program. Used in conjunction with DECLARE

Format: CALL program = [ arg1 , arg2 ...]

Description: program is the particular program to call, ie PRG1 or PRG2 for example.

= arg1, arg2 are arguments to be passed to the program

Note:
Arguments may be any point, local variable, or expression and the '=' sign is necessary before the list of args.

Up to 40 arguments may be listed.

Programs can be nested up to 10 levels using CALL and DECLARE.

Example:
10 CALL PRG1 = SATZ1 , 21 , SF1 , CON1 , 18.5 , 22.8 , VALVE1

The values of each of the arguments get passed to PRG1. PRG1 uses them and may change the values if the arguments are not constants.
