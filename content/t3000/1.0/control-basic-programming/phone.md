---
title: "PHONE"
order: 970
---

PHONE
(T3000 only)

Purpose:
To make connection with a remote computer using a modem.

Format:
PHONE telephone_number_string

Description: string is a string of characters representing the phone number

Example:
10 IF+ TIME >4:00 THEN 15 ELSE 70 15 PHONE 9-555-1234

20 ON-ERROR 100

30 RUN-MACRO 1

40 WAIT 0:10

50 HANGUP

60 END

70 REM CONNECTION NOT MADE

PHONE
(Mini-Panels only)

Purpose:
To allow the Mini-Panel to call a PC running the T3000 software.

Format:
PHONE string

Description: string is a string of characters representing the phone number

In order for the PHONE statement to work all Mini- Panels on the network must have Version 1.91 or higher. The PHONE statement utilizes output 8 of the Mini- Panel which is connected to the modified modem interface box. The modem must be set to not echo characters (ATEO).

Example:
10 REM VAR31 = 1 WHEN CONNECTED

20 REM E = 1 WHEN ERROR TRYING TO CONNECT 30 REM R = RETRY COUNTER

40 REM VAR32 = TIME TO REMAIN CONNECTED , 0 WHEN NO ALARMS 50 IF E THEN GOTO 130

60 IF VAR31 THEN GOTO 200

70 IF VAR32 = 0:00:00 THEN GOTO 220

80 REM CALLOUT ALARMS

90 PHONE ATDT 555-3075

100 ON-ERROR 120

110 VAR31 = 1 : E = 0 : END 120 E = 1 : END

130 REM ERROR SO TRY AGAIN LATER

140 IF R > 20 THEN R = 0 , E = 0 , VAR32 = 0 , END

150 IF TIME-ON( E ) MOD 0:03:00 < 0:00:05 THEN R = R + 1 , GOTO 80 160 GOTO 220

170 REM ALARM SO INCREASE CONNECT TIME

180 IF VAR32 = 0 THEN VAR32 = VAR32 + 0:01:00 ELSE VAR32 = VAR32 + 0:00:15

190 END

200 REM IS IT TIME TO END CALL

210 IF TIME-ON( VAR31 ) > VAR32 THEN VAR31 = 0 , R = 0 , VAR32 = 0 ,

HANGUP

220 REM ALARM STATEMENTS HERE

230 DALARM VAR31 , 5 , ALARMS FROM BOSTON BUILDING 240 ALARM TEMP > SETP , 2 , TEST ALARM

250 ON-ALARM 180
