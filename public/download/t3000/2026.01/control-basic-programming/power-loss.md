---
title: "POWER-LOSS"
order: 980
---

Purpose: To allow a program to perform some logic determine if there was a power loss to the panel. The function returns 1 the

first time after a power loss, otherwise it returns 0.

Format:
POWER-LOSS

Example:
10 IF POWER-LOSS THEN GOSUB 30 20 END

30 REM INITIALIZATION ROUTINE

40 RETURN
