---
title: "DALARM"
order: 720
---

Purpose:
To program delayed alarms, a condition must exist for a certain amount of time before the alarm is generated. A new alarm will not be created till the condition returns to normal and then returns to alarm at which time the delay timer starts again.

Format:
DALARM expression , num , string

Description: expression is the alarm condition

num is the number of seconds to delay before causing an alarm

string is the alarm message with a length of up to 69 characters.

Example:
10 DALARM FAN1 AND NOT FAN1_ST , 60 ,FAN1 NOT COMING ON

20 DALARM NOT FAN1 AND FAN1_ST , 60 ,FAN1 TURNED ON MANUALLY
