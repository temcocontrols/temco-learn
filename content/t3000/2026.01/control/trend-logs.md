---
title: "6.9 Trend Logs"
order: 550
---

Monitors are used to collect historical data for any point defined in the system regardless of their nature (either Analog or Digital). A base T3000 system can handle up to 16 separate monitors. The number of monitors avail able is dependent on the amount of memory that your system has. With enough memory the system can easily handle up to 128 monitors. Each of these separate monitors can trend up to 14 points.

![6.9 Trend Logs](../media/images-drex_module_8_9_screen.png)

![](../media/images-drex_module_8_9_custom.png)

<table>
  <tr><td><img src="../media/images-drex_bullet_1.png" alt="1"><strong>Label</strong><img src="../media/images-drex_module_8_9_control_1.png" alt="1. Label">An 8 character descriptor.</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_2.png" alt="2"><strong>Interval</strong><img src="../media/images-drex_module_8_9_control_2.png" alt="2. Interval">The time between samples in hours : minutes : seconds</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_3.png" alt="3"><strong>Status</strong><img src="../media/images-drex_module_8_9_control_3.png" alt="3. Status">“ON” indicates the monitor is running, “OFF” indicates that it is stopped.</td></tr>
</table>

<table>
  <tr><td><img src="../media/images-drex_bullet_4.png" alt="4"><strong>Input</strong><img src="../media/images-drex_module_8_9_control_4.png" alt="4. Input">The name of the points to be included on the monitor. The TAB key is used to move the cursor to this section. The TAB or ESCkey is used to return to the main monitor work screen. Up to 14 points can be monitored here per monitor. Of these 14 pointsonly 5 may be digital, i.e. On/Off or Start/Stop. If more than 5 Digital points are entered onto the monitor than a warningflashes on the screen to indicate that you have entered too many Digital points. If this hap pens the Digital points over 5 will be deleted from the monitor.</td></tr>
</table>

An Ana log Monitor can also be commanded to sample from Control Basic by set ting it to ON or OFF ( i.e. amon1 = ON ). When this occurs the monitor samples all its in puts and restarts the interval time. In using this feature it is best to stop the monitor (s = 0), and control all the sampling from Control Basic.

To access monitor data and view the graph, press the “INS” key while highlighting the desired monitor.

![](../media/images-drex_module_8_9_custom_2.png)

Graph Display work options:

![](../media/images-drex_module_8_9_custom_3.png)
The period of time displayed on a full screen. This time base can
be altered to change the graphs perspective. For example the Time Base can be changed from hours to minutes

![](../media/images-drex_module_8_9_custom_4.png)
The graph can be shifted 1/2 screen left at the cur rent zoom level by clicking on the “<-” symbol at the top of the screen, or use the corresponding keyboard key.

![](../media/images-drex_module_8_9_custom_5.png)
The graph can be shifted 1/2 screen right at the current zoom level by clicking on the “->” symbol at the top of the screen, or use the corresponding keyboard key

![](../media/images-drex_module_8_9_custom_6.png)
While in the graphing mode, you can “Zoom In” on the data to view the data from a closer perspective. The Zoom range must first be set below.

![](../media/images-drex_module_8_9_custom_7.png)
“Zoom Out” resets the monitor back one zoom level. This can only be used af ter Zoom In has been used to re store the graph to its original display mode.
