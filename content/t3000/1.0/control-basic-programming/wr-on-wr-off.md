---
title: "WR-ON / WR-OFF"
order: 1150
---

[TBD] change this to SCH-ON and SCH-OFF

WR-ON

Purpose:
To find when a schedule (weekly routine) is set to come on.

Format:
WR-ON( expression1 , expression2 )

Description:
expression1 = schedule number (1-16)

expression2 = which on event in the day (1-4)

Example:
10 VAR1 = WR-ON( 1 , 1 )

WR-OFF

Purpose:
To find when a weekly routine is set to go off.

Format:
WR-OFF( expression1 , expression2 )

Description:
expression1 = routine number (1-16) expression2 = which time off (1-4)

Example:
10 VAR1 = WR-OFF( 1 , 1 )
