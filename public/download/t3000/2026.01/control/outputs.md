---
title: "6.4 Outputs"
order: 450
---

Hot Key: Alt-O

KEYWORD: OUT

Usage
： 10 OCCUPIED THEN START OUT1 ELSE STOP OUT1

Outputs are the control points which send a signal from the T3000 out to the field devices like fans, pumps, dampers and valves. Outputs maybe either digital with two states such as with a fan or pump which can be on or off. Or they can be analog with continuously variable state such as with a damper motor that modulates from 0 to 100%. Each T3 controller can has a certain number of on board outputs, in the case of the BB there are 24 outputs which can be expanded up to a maximum of 64 outputs by adding expansion modules. Generally the system designer will try to keep all the control points for a particular machine or equipment room on the same controller. If
there are more than 64 outputs in a project such as a large mechanical room with several chillers, pumps and valves working together, it is a simple matter to add another T3 controller and share a few variables over the network to create a seamless solution.

See the section titled
Expansion Points
for how to add expansion i/o to the controller.

<table>
  <tr><td>TYPE OF MINIPANEL</td><td>INNER INPUTS</td><td>INNER DIGITE OUTPUTS</td><td>INNER ANALOG OUTPUTS</td><td>OUTER INPUTS</td><td>OUTER OUTPUTS</td></tr>
  <tr><td>MP24</td><td>32</td><td>12</td><td>12</td><td>32</td><td>40</td></tr>
  <tr><td>MP10</td><td>16</td><td>6</td><td>4</td><td>48</td><td>54</td></tr>
  <tr><td>MP8</td><td>8</td><td>6</td><td>2</td><td>56</td><td>56</td></tr>
</table>

Sample Output work screen:

![6.4 Outputs](media/images-drex_module_8_4_screen.png)

<table>
  <tr><td><img src="media/images-drex_bullet_1.png" alt="1"><strong>FULL LABEL</strong>A unique twenty character descriptor used to identify the item throughout the system. Used for programming, trend logging, reports and so on. A 20 character descriptor which is usually used to associate a given point with the physical location.</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_2.png" alt="2"><strong>Auto/Manual</strong>Use the auto/manual feature to temporarily take control of the input in manual mode, this is useful for commissioning and debugging. For example, if you want to see how the rest of the system will respond when the outdoor air temperature hits 0C, 32F, it is possible to simulate this condition. First move the cursor to the input which is set up to measure the outside air temperature for the building, then set the A/M field to manual and finally move over to the Value field to enter in the simulated temperature of 0C. When the testing is complete you must set the auto/manual field back to auto and the input will return to showing the actual outdoor temperature. The auto/manual field has only two states: Auto and Manual. Hitting the enter key with the cursor in this field will cycle the mode from auto to manual and back. When in auto the out put will accept commands from Control Basic. When in manual the output will remain at a fixed value. To change from auto to manual or vice versa simply highlight thefield and press ENTER.</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_3.png" alt="3"><strong>Value</strong><img src="media/images-drex_module_8_4_control_3.png" alt="3. Value">The current value of the inputs. If the auto/manual field is in auto this will show the true real time data from the inputs. When the auto/manual setting is set to manual the value will stay fixed at whatever was last measured or written by the user. This field contains the value of the output point which may be digital or analog depending on the range selected. To toggle a digital value highlight the field and press ENTER. To change an analog value highlight the field and press ENTER followed by the new value and ENTER. Note that it is only practical to change an input value when the point is in manual.</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_4.png" alt="4"><strong>Units</strong><img src="media/images-drex_module_8_4_control_4.png" alt="4. Units">The engineering units for the inputs, this field is fixed when you set the Range field.</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_5.png" alt="5"><strong>Label</strong>Eight character descriptor, a unique ID used to refer to this particular item throughout the system: programming, trend logs and so on.</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_6.png" alt="6"><strong>Range</strong>The following analog ranges are available:1. 0 to 10 Volts 2. 0 to 100 % Open 3. 0 to 20 psi (actual output is 0-10 Volts)4. 0 to 100 % 5. 0 to 20 mA (actual output is 0-10 Volts)6. Unused The following digital output ranges are available (select 1 for Off/On, or 12 for On/Off):1/12 Off/On 2/13 Close/Open 3/14 Stop/Start 4/15 Dis/Enable5/16 Norm/Alarm 6/17 Norm/High 7/18 Norm/Low 8/19 No/Yes9/20 Cool/Heat 10/21 Un/Occupied 11/22 Low/HighSelect the range according to the following convention: the state on the right side of the slash (/) is has a value of 0 Vdc, and on the right side of the slash the value is 13 V dc (0 Vdc/13 V dc). Only when the output is 13 V dc the LED will turn onAs a recommendation: use normally closed relays if the equipment need to be operational in case of a power failure. Then select digital output 12 (On/Off). When the equipment is commanded to turn off, the volt age will be 13 V dc , opening the electrical circuit, thus turning the equipment off.Ranges 23 thru 30 are Custom Digital Ranges<img src="media/images-drex_module_8_4_custom.png" alt=""></td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_7.png" alt="7"><strong>Status</strong><img src="media/images-drex_module_8_4_control_7.png" alt="7. Status"></td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_8.png" alt="8"><strong>HOA Switch</strong><img src="media/images-drex_module_8_4_control_8.png" alt="8. HOA Switch"></td></tr>
</table>
