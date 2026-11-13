---
title: "TStat registers, part 2"
order: 30
---

The Modbus register map for the TStat, in address order. Addresses are decimal, and where the map gives a range the register occupies every address in it. This part begins at address 209.0 and ends at 324.0.

| Address | Bytes | Register and description |
|---|---|---|
| 209.0 | 1.0 | LED6 — 8.0 — = — COOLING2 STAGE — 22.0 — = — HEAT3 OR COOL3 |
| 210.0 | 1.0 | LED7 — 9.0 — = — COOLING3 STAGE — 23.0 — = — COOL1, 2, OR 3 |
| 10.0 | = | HEATING1 STAGE — 24.0 — = — HEAT1, 2, OR 3 |
| 11.0 | = | HEATING2 STAGE — 25.0 — = — OCCUPANCY |
| 12.0 | = | HEATING3 STAGE — 26.0 — = — STAGE 1, 2 OR 3 |
| 13.0 | = | COOLING MODE — 27.0 — = — STAGE 2 OR 3 |
| 211.0 | 1.0 | Unoccupied Override Timer, Ort. 0=disabled, >0=number of minutes manual override is allowed |
| 212.0 | 1.0 | OVERRIDE_TIMER_DOWN_COUNT - Number of minutes remaining on the timer when unoccupied override timer is in effect. |
| 213.0 | 1.0 | Temperature sensor filter, FIL, weighted average of stored value to new raw value |
| 214.0 | 1.0 | Heating cooling mode configuration, HC, 0=PID, 1=Keypad, 2=Digital_in1, 3=Digital_in1, 4=Analog_in1, 5=Analog_in2 |
| 215.0 | 2.0 | Internal Temperature Sensor IC - Intenral temp chip, not used in the current hardware |
| 216.0 | 2.0 | Internal Thermistor Sensor - Shows the filtered, calibrated value of the internal thermistor sensor |
| 217.0 | 2.0 | Calibration for the internal thermistor - internally managed offset for the internal temp sensor value |
| 218.0 | 2.0 | Calibration for analog input2 - can write here or write to the analog input and this will be calculated automatically |
| 219.0 | 2.0 | Lookup Table 1 - 0.0V value  Sensor value that corresponds to 0.0V |
| 220.0 | 2.0 | Lookup Table 1 - 0.5V value  Sensor value that corresponds to 0.5V |
| 221.0 | 2.0 | Lookup Table 1 - 1.0V value  Sensor value that corresponds to 1.0V |
| 222.0 | 2.0 | Lookup Table 1 - 1.5V value  Sensor value that corresponds to 1.5V |
| 223.0 | 2.0 | Lookup Table 1 - 2.0V value  Sensor value that corresponds to 2.0V |
| 224.0 | 2.0 | Lookup Table 1 - 2.5V value  Sensor value that corresponds to 2.5V |
| 225.0 | 2.0 | Lookup Table 1 - 3.0V value  Sensor value that corresponds to 3.0V |
| 226.0 | 2.0 | Lookup Table 1 - 3.5V value  Sensor value that corresponds to 3.5V |
| 227.0 | 2.0 | Lookup Table 1 - 4.0V value  Sensor value that corresponds to 4.0V |
| 228.0 | 2.0 | Lookup Table 1 - 4.5V value  Sensor value that corresponds to 4.5V |
| 229.0 | 2.0 | Lookup Table 1 - 5.0V value  Sensor value that corresponds to 5.0V |
| 230.0 | 2.0 | Lookup Table 2 - 0.0V value  Sensor value that corresponds to 0.0V |
| 231.0 | 2.0 | Lookup Table 2 - 0.5V value  Sensor value that corresponds to 0.5V |
| 232.0 | 2.0 | Lookup Table 2 - 1.0V value  Sensor value that corresponds to 1.0V |
| 233.0 | 2.0 | Lookup Table 2 - 1.5V value  Sensor value that corresponds to 1.5V |
| 234.0 | 2.0 | Lookup Table 2 - 2.0V value  Sensor value that corresponds to 2.0V |
| 235.0 | 2.0 | Lookup Table 2 - 2.5V value  Sensor value that corresponds to 2.5V |
| 236.0 | 2.0 | Lookup Table 2 - 3.0V value  Sensor value that corresponds to 3.0V |
| 237.0 | 2.0 | Lookup Table 2 - 3.5V value  Sensor value that corresponds to 3.5V |
| 238.0 | 2.0 | Lookup Table 2 - 4.0V value  Sensor value that corresponds to 4.0V |
| 239.0 | 2.0 | Lookup Table 2 - 4.5V value  Sensor value that corresponds to 4.5V |
| 240.0 | 2.0 | Lookup Table 2 - 5.0V value  Sensor value that corresponds to 5.0V |
| 241.0 | 2.0 | Universal PID input select, 0=none, 1=analog_in1, 2=analog_in2 |
| 242.0 | 2.0 | Universal PID upper deadband |
| 243.0 | 2.0 | Universal PID lower deadband |
| 244.0 | 2.0 | Universal PID pterm |
| 245.0 | 2.0 | Universal PID iterm |
| 246.0 | 2.0 | Universal PID setpoint |
| 247.0 | 1.0 | Output 1 PID Control          0 = PID1, can assign each output to either PID1 or 2, the max or the min of the two PIDS |
| 248.0 | 1.0 | Output 2 PID Control          1 = PID2 |
| 249.0 | 1.0 | Output 3 PID Control          2 = Maximum of PID1 and PID2 |
| 250.0 | 1.0 | Output 4 PID Control          3 = Minimum of PID1 and PID2 |
| 251.0 | 1.0 | Output 5 PID Control |
| 252.0 | 1.0 | Output 6 PID Control |
| 253.0 | 1.0 | Output 7 PID Control |
| 254.0 | 1.0 | PID2 Output table- Coasting |
| 255.0 | 1.0 | PID2 Output table- Cooling1 |
| 256.0 | 1.0 | PID2 Output table- Cooling2 |
| 257.0 | 1.0 | PID2 Output table- Cooling3 |
| 258.0 | 1.0 | PID2 Output - Heating1 |
| 259.0 | 1.0 | PID2 Output - Heating |
| 260.0 | 1.0 | PID2 Output - Heating3 |
| 261.0 | 1.0 | PID2 Valve Output - Coasting |
| 262.0 | 1.0 | Universal PID Valve Output - Cooling1 |
| 263.0 | 1.0 | Universal PID Valve Output - Cooling2 |
| 264.0 | 1.0 | Universal PID Valve Output - Cooling3 |
| 265.0 | 1.0 | Universal PID Valve Output - Heating1 |
| 266.0 | 1.0 | Universal PID Valve Output - Heating2 |
| 267.0 | 1.0 | Universal PID Valve Output - Heating3 |
| 268.0 | 1.0 | Number of Heating Stages in Universal Table-(Maximum # of total heating and cooling states is 6) |
| 269.0 | 1.0 | Number of Cooling Stages in Universal Table-(Maximum # of total heating and cooling states is 6) |
| 270.0 | 1.0 | PID2, the current value of PID number 2 |
| 271.0 | 2.0 | PID1 Units High byte - Upper 2 bytes of the PID1 units in ASCII |
| 272.0 | 2.0 | PID1 Units Low byte - Lower 2 bytes of the PID1 units in ASCII |
| 273.0 | 2.0 | PID2 Units High byte - Upper 2 bytes of the PID2 units in ASCII |
| 274.0 | 2.0 | PID2 Units Low byte - Lower 2 bytes of the PID2 units in ASCII |
| 275.0 | 2.0 | PID2 Unoccupied (OFF) Setpoint |
| 276.0 | 1.0 | Number of Heating Stages in Original Table - (Maximum # of total heating and cooling states is 6) |
| 277.0 | 1.0 | Number of Cooling Stages in Original Table - (Maximum # of total heating and cooling states is 6) |
| 278.0 | 1.0 | PID2 heating or cooling state derived from PID2 register 240, 0=coasting, 1=cooling1, 2=cooling2, 3=cooling3, 4=heating1, 5=heating2, 6=heating3, 14=cooling4, 15=cooling5, 16=cooling6, 17=heating4, 18=heating5, 19=heating6. |
| 279.0 | 1.0 | Valve travel time. The time of the valve travel from one end to another end. The units is second. |
| 280.0 | 1.0 | Determine the output1 mode. Output1 always is ON/OFF mode |
| 281.0 | 1.0 | Determine the output2 mode. Output2 always is ON/OFF mode |
| 282.0 | 1.0 | Determine the output3 mode. Output3 always is ON/OFF mode |
| 283.0 | 1.0 | Determine the output4 mode. 0, ON/OFF mode; 1, floating valve for cooling; 2, lighting control; 3, PWM |
| 284.0 | 1.0 | Determine the output5 mode. 0, ON/OFF mode; 1, floating valve for heating; 2, lighting control; 3, PWM |
| 285.0 | 1.0 | Valve percent. Show the valve opened how much percent. READ ONLY |
| 286.0 | 1.0 | Interlock for output1 |
| 287.0 | 1.0 | Interlock for output2 |
| 288.0 | 1.0 | Interlock for output3 |
| 289.0 | 1.0 | Interlock for output4 |
| 290.0 | 1.0 | Interlock for output5 |
| 291.0 | 1.0 | Interlock for output6 |
| 292.0 | 1.0 | Interlock for output7 |
| 293.0 | 1.0 | Setpoint increment on the display each time the user hits the up/down buttons. Units are 0.1Deg, 10 = 1Deg and so on. |
| 294.0 | 2.0 | Last key pressed counter. Minutes since the used last pressed a key. |
| 295.0 | 1.0 | Freeze protect setpoint. If the ambient temperature less than the setpoint, the heating valve will open some time the Delay to off register set . |
| 296.0 | 1.0 | Delay to open. The heating valve will open if the ambient temp less than the Freeze temp setpoint last the time this register set. The units is second. |
| 297.0 | 1.0 | Delay to close. The duration the heating valve open. The units is minute. |
| 298.0 | 1.0 | Analog input1 function selection. 0, normal; 1, freeze protect sensor input; 2, occupancy sensor input; 3, sweep off mode; 4, clock mode; 5, change over mode. Refer to dI1 on page13.8 = window interlock |
| 299.0 | 1.0 | Analog input2 function selection. 0, normal; 1, freeze protect sensor input; 2, occupancy sensor input; 3, sweep off mode; 4, clock mode; 5, change over mode. Refer to dI1 on page13.8 =window interlcok |
| 300.0 | 1.0 | dI1 – Digital input 1 function. Refer to dI1 description in Table 1: Advanced Menu Items |
| 301.0 | 2.0 | Period timer ON time. |
| 302.0 | 2.0 | Period timer OFF time. |
| 303.0 | 1.0 | Period timer units. 0, second; 1, minute; 2, hour. |
| 304.0 | 1.0 | Keypad encoded value. Last keypress, READ ONLY |
| 305.0 | 1.0 | LED hundred’s digit, , can drive the LEDs manually when the display register 203 is set to manual (5) |
| 306.0 | 1.0 | LED ten’s digit code, can drive the LEDs manually when the display register 203 is set to manual (5) |
| 307.0 | 1.0 | LED one’s digit code, can drive the LEDs manually when the display register 203 is set to manual (5) |
| 308.0 | 1.0 | LED discrete status symbols, can drive the LEDs manually when the display register 203 is set to manual (5) — Register 309 for TStat5E |
| 309.0 | 1.0 | Input auto/ manual enable. Bit0 correspond to analog input1(register 180); bit1 to analog input2(register 181); bit2 to digital input1(register 311),bit3 correspond to itternal sensor(register 216).0, auto mode, the corresponding input value from sensor; 1, manual mode, the corresponding value from serial port. — Input auto/ manual enable. Bit0 correspond to analog input1(register 367); bit1 to analog input2(register 368); bit7 to analog input8(register 374),bit8 correspond to itternal sensor(register 216).0, auto mode, the corresponding input value |
| 310.0 | 1.0 | Output auto/manual enable. Bit 0 to 4 correspond to output1 to output5, bit 5 correspond to output6(register 102), bit 6 correspond to output7(register 103). 0, auto mode; 1, manual mode. — from sensor; 1, manual mode, the corresponding value from serial port. |
| 311.0 | 1.0 | Digital manual input. Write the manual value for digital input when digital input in manual mode. |
| 312.0 | 1.0 | (REV35_0 ) DEADMASTER_AUTO_MANUAL = 0, the default, outputs will not change, stay in whatever mode they were last commanded DEADMASTER_AUTO_MANUAL = 1, the output will be trigger to “AUTO” mode DEADMASTER_AUTO_MANUAL = 2, the outputs will go to manual on or off as defined in register 313. |
| 313.0 | 1.0 | REV 35_0  (relay1-5) output manual value when DEADMASTER_AUTO_MANUAL = 2 register 313, Bit0 is for relay 1, bit1 for relay 2 and so on up to output 5 |
| 314.0 | 2.0 | REV 35_0  (analog output - cooling)deadmaster config value during deadmaster be triggered when DEADMASTER_AUTO_MANUAL = 2 Value Range: 0 to 1000 |
| 315.0 | 2.0 | REV 35_0  (analog output - heating)deadmaster config value during deadmaster be triggered when DEADMASTER_AUTO_MANUAL = 2 Value Range: 0 to 1000 |
| 316.0 | 1.0 | RESERVE |
| 317.0 | 1.0 | Dead master. The Tstat will go to occupied mode automatically if there is no serial communications for a user defined period of time, for example if the register is set to 10 the thermostat will go to ocupied mode if there are no communications for a period of 10 minutes. Set the register to 0 to disable the feature |
| 318.0 | 1.0 | Rouding display. 0 = round the display to the nearest digit; 1 = round the display to the nearest 1/10 unit; 5 = round the display to the nearest 1/2 unit. 2,3,4 reserved. |
| 319.0 | 1.0 | The minimum address which the device can accept, use this to limit addresses to a certain defined band. |
| 320.0 | 1.0 | The maximum device address can be set. The device address should between min and max address, default is 254 |
| 321.0 | 1.0 | Rotation features [Old disabled feature] Output 2 is controlled by which output table in the rotation group. READ ONLY. |
| 322.0 | 1.0 | Rotation feature, [disabled]: output3 |
| 323.0 | 1.0 | Rotation feature, [disabled]: output4 |
| 324.0 | 1.0 | Rotation feature, [disabled]: output5 |
