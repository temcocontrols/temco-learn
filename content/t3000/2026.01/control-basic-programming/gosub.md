---
title: "GOSUB"
order: 790
---

Purpose:
To call a subroutine. Used in conjunction with RETURN.

Format:
GOSUB line

Description: line is the line number

EXAMPLE

10 GOSUB 100

20 REM THIS LINE GETS EXECUTED AFTER LINE 120

30 END

100 REM SUBROUTINE GOES HERE

110 A = A + 1

120 RETURN
