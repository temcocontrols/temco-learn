---
title: "USER[X]"
order: 1130
---

Purpose: Provides information about which user is logged on and through which port.

The function will checks all ports and the various communications ports for logged in users and return the user ID for any matches.

Format: USER[X]

Where X is the port number through which the user has logged in.

0 = nobody logged in

1 = checks users from all ports

2 = Ethernet port

3 = Main RS485 port

4 = Subnet RS485 port

5 = RS232 port (available on the T3-BB model only) [TBD]

6 = GSM port , only applicable if the unit is equipped with a GSM module.

The function returns the user ID from the list of users defined in the user list.

10 REM SEND A PERSONAL MESSAGE TO USER NO. 5

20 IF+ USER[6] = 5 THEN GOSUB 40

30 END

40 PRINT “HELLO TO USER#5 SIGNED IN OVER THE GSM LINK”

50 RETURN
