---
title: "6.7 Schedules"
order: 530
---

Hot Key: Alt-S

KEYWORD: WR

Usage
：
WR1
,
WR2,WR3...

How to show: when you use one of these items , the label of the item will be shown in the place where you use

Weekly Routines are essentially time clocks with 4 ON/OFF times per day of the week. The week has 9 days to allow for two over rides in addition to the weekly schedule. These are used for holiday schedules, and are are specified by the Annual Routines Menu.

Sample Input work screen:

![6.7 Schedules](../media/images-drex_module_8_7_screen.png)

![](../media/images-drex_module_8_7_custom.png)

Example for program

IF WR1 THEN START OUT1 ELSE STOP OUT1

<table>
  <tr><td><img src="../media/images-drex_bullet_1.png" alt="1"><img src="../media/images-drex_module_8_7_control_1.png" alt="1. Full Label">A unique twenty character descriptor used to identify the item throughout the system. Used for programming, trend logging, reports and so on.</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_2.png" alt="2"><img src="../media/images-drex_module_8_7_control_2.png" alt="2. Auto/Manual">Controls whether the routine is operational or not</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_3.png" alt="3"><img src="../media/images-drex_module_8_7_control_3.png" alt="3. Label">Eight character descriptor, a unique ID used to refer to this particular item throughout the system: programming, trend logs and so on.</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_4.png" alt="4"><img src="../media/images-drex_module_8_7_control_4.png" alt="4. 
Output">The state of the routine (ON/OFF)</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_5.png" alt="5"><img src="../media/images-drex_module_8_7_control_5.png" alt="5. Holiday1">When point entered here is “On”, the day will be the eighth day of the week.</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_6.png" alt="6"><img src="../media/images-drex_module_8_7_control_6.png" alt="6. State1">The state of Holiday1 (ON/OFF).</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_7.png" alt="7"><img src="../media/images-drex_module_8_7_control_7.png" alt="7. Holiday2">When point entered here is “On”, the day will be the ninth day of the week. Note that in the case of both Holidays being on, Holiday1 is regarded.</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_8.png" alt="8"><img src="../media/images-drex_module_8_7_control_8.png" alt="8. State2">The state of Holiday2 (ON/OFF).</td></tr>
</table>

To program the times for an individual routine press the “Ins” key while highlighting the Weekly Routine to be set up. The 9 day week will be displayed with the standard work menu operations. The desired start and stop times are then simply entered in the appropriate fields.

Note: The times in Weekly Routines can be accessed from Control Basic using the WR- ON and WR- OFF functions. This is useful for programs that need to look ahead and see when an event is to start.

The times specified must be in increasing order throughout each day. If no time is in a day column the Weekly Routine will maintain its current value.
