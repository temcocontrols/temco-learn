---
title: "HANGUP"
order: 810
---

HANGUP [TBD]

Purpose:
To end a phone call over the dialup modem.

Format:
HANGUP

Example:
10 PHONE 555-1234

20 PRINT “MESSAGE”

30 WAIT 0:02 : WAIT FOR PRINT LINE TO BE DONE

40 HANGUP
