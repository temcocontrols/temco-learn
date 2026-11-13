---
title: "TStat registers, part 3"
order: 40
---

The Modbus register map for the TStat, in address order. Addresses are decimal, and where the map gives a range the register occupies every address in it. This part begins at address 325.0 and ends at 444.0.

| Address | Bytes | Register and description |
|---|---|---|
| 325.0 | 1.0 | Rotation time left. Long long time left the rotation will happen. READ ONLY. |
| 326.0 | 1.0 | Show the size of E2 chip. 0 = 24c02, 1 = 24c08/24c16. |
| 327.0 | 1.0 | Assign the timer to be used for which feature. 0 = period timer, 1 = rotation timer, 2 = interlock, 3 = PWM timer. |
| 328.0 | 1.0 | The output1 function, there are three functions for the output1.0 = normal ON/OFF output, 1 = rotation (old disabled feature) 2 = lighting control where one button can be assigned to toggle a relay on & off |
| 329.0 | 1.0 | Rotation Feature: Show which output table is used for output1 when output1 belongs to the rotation group |
| 330.0 | 1.0 | Rotation Feature: Show which output table is used for output1 when output2 belongs to the rotation group |
| 331.0 | 1.0 | Rotation Feature: Show which output table is used for output1 when output3 belongs to the rotation group |
| 332.0 | 1.0 | Rotation Feature: Show which output table is used for output1 when output4 belongs to the rotation group |
| 333.0 | 2.0 | How much time left before output rotation gets retriggered |
| 334.0 | 1.0 | The output2 function setting: 0 = normal ON/OFF output, 1 = rotation, 2 = lighting control. |
| 335.0 | 1.0 | Output3 function setting (see above) |
| 336.0 | 1.0 | Output4 function setting (see above) |
| 337.0 | 1.0 | Output5 function setting (see above) |
| 338.0 | 1.0 | Default occupied setpoint. Works in concert with the "occupied setpoint control register", register 339 |
| 339.0 | 1.0 | Occupied Setpoint Control Register: 0 = normal, setpoint is managed by the serial port and keypad, the stat will remember the last occupied setpoint and use that during the next occupied period. 1 = Default mode, the last occupied setpoint if forgotten and the occupied setpoint gets reset to the default. 2 = trigger an event, when a master controller writes 2 to this register, the default setpoint will be copied to the occupied setpoint after which the Tstat will set the value back to 1 to show the event has been serviced. |
| 340.0 | 1.0 | Enable/disable PIR correspond 1/0 respectively. |
| 341.0 | 1.0 | PWM output range in COAST mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 342.0 | 1.0 | PWM output range in COOLING2 mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 343.0 | 1.0 | PWM output range in COOLING3 mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 344.0 | 1.0 | PWM output range in COOLING1 mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 345.0 | 1.0 | PWM output range in HEATING1 mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 346.0 | 1.0 | PWM output range in HEATING2 mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 347.0 | 1.0 | PWM output range in HEATING3 mode. 0 = CLOSE, 1 = OPEN, 2 = 0-100%, 3 = 50-100%, 4 = 0-50%. MSb 4 bits correspond to output4 and LSB 4 bits correspond to output5 |
| 348.0 | 1.0 | The ON period take how many percentage for output4 |
| 349.0 | 1.0 | The ON period take how many percentage for output5 |
| 350.0 | 1.0 | Free cooling configuration. bit0, free cool enable/disable, 0 = disable, 1= enable. bit1, free cool available decided by local or external master. 0 = local, 1 = NC. bit2, free cool available status, 0 = npt available, 1= available. bit4, show the status if NC is OK when the free cool decided by NC. |
| 351.0 | 1.0 | Analog output OFF table, coasting mode |
| 352.0 | 1.0 | Analog output OFF table, cooling1 mode |
| 353.0 | 1.0 | Analog output OFF table, cooling2 mode |
| 354.0 | 1.0 | Analog output OFF table, cooling3 mode |
| 355.0 | 1.0 | Analog output OFF table, heating1 mode |
| 356.0 | 1.0 | Analog output OFF table, heating2 mode |
| 357.0 | 1.0 | Analog output OFF table, heating3 mode — The following register for Tstat 5E |
| 358.0 | 1.0 | Register lock. All registers except fan speed and manual inputs/outputs register are not writable. 0 = lock,1 = no lock. — Bytes — Description |
| 359.0 | 1.0 | Outside temperature for free cooling,from external sensor or NC. — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = CUSTOMER, 5 = OFF/ON |
| 360.0 | 2.0 | If outside temp be set from NC. The communication with NC must be set in this time,otherwise will set error status and use external sensor. — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = CUSTOMER, 5 = OFF/ON |
| 361.0 | 1.0 | If the outside air temp is lower than the room temperature by this amount, then the free cooling is worthwhile, 350 bit2 = 1.If the OAT is greater than the room temp, then free cooling mode is not worthwhile. , 350 bit2 = 0 — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = N/A, 5 = OFF/ON |
| 362.0 | 1.0 | Free cooling output configuration. Coasting mode — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = N/A, 5 = OFF/ON |
| 363.0 | 1.0 | Free cooling output configuration.Cooling1 mode — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = N/A, 5 = OFF/ON |
| 364.0 | 1.0 | Free cooling output configuration.Cooling2 mode — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = N/A, 5 = OFF/ON |
| 365.0 | 1.0 | Free cooling output configuration.Cooling3 mode — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = N/A, 5 = OFF/ON |
| 366.0 | 1.0 | Free cooling output configuration.Heating1 mode — 1.0 — ANALOG INPUT RANGE. 0 = raw data, 1 = thermistor, 2 = %, 3 = ON/OFF, 4 = N/A, 5 = OFF/ON |
| 367.0 | 1.0 | Free cooling output configuration.Heating2 mode — 2.0 — Analog input1 value |
| 368.0 | 1.0 | Free cooling output configuration.heating3 mode — 2.0 — Analog input2 value |
| 369.0 | 1.0 | Min Air,the units is percent. Set the minimum output for free cooling, the default is 15% — 2.0 — Analog input3 value |
| 370.0 | 1.0 | Outside air temperature in hottest day — 2.0 — Analog input4 value |
| 371.0 | 1.0 | Outside air temperature in coldest day — 2.0 — Analog input5 value |
| 372.0 | 1.0 | Offset in hottest day — 2.0 — Analog input6 value |
| 373.0 | 1.0 | Offset in coldest day — 2.0 — Analog input7 value |
| 374.0 | 2.0 | Store setpoint in two bytes, the resolution is 0.1 — 2.0 — Analog input8 value |
| 375.0 | 1.0 | Crrent setpoint = user setpoint + offset setpoint — 2.0 — Calibration for analog input1 |
| 376.0 | 1.0 | Setpoint offset — 2.0 — Calibration for analog input2 |
| 377.0 | 1.0 | Change over sensor mode, 1 = cooling mode, 0 = heating mode. — 2.0 — Calibration for analog input3 |
| 378.0 | 1.0 | external sensor inuse,0 = not use,1 = in use — 2.0 — Calibration for analog input4 |
| 379.0 | 1.0 | external sensor status,0 = OK,1 = not OK,damaged or short circuit — 2.0 — Calibration for analog input5 |
| 380.0 | 2.0 | day cooling setpoint,work together with heating setpoint in day office mode — 2.0 — Calibration for analog input6 |
| 381.0 | 1.0 | daysetpoint option,0 =office,1 = hotel — 2.0 — Calibration for analog input7 |
| 382.0 | 1.0 | Timer left for output1 ON to OFF delay — 2.0 — Calibration for analog input8 |
| 383.0 | 1.0 | Timer left for output2 ON to OFF delay — 1.0 — The first character on LCD line 1, ASCII code |
| 384.0 | 1.0 | Timer left for output3 ON to OFF delay — 1.0 — The second character on LCD line 1, ASCII code |
| 385.0 | 1.0 | Timer left for output4 ON to OFF delay — 1.0 — The third character on LCD line 1, ASCII code |
| 386.0 | 1.0 | Timer left for output5 ON to OFF delay — 1.0 — The fourth character on LCD line 1, ASCII code |
| 387.0 | 1.0 | Timer left for output1 OFF to ON delay — 1.0 — The fifth character on LCD line 1, ASCII code |
| 388.0 | 1.0 | Timer left for output2 OFF to ON delay — 1.0 — The sixth character on LCD line 1, ASCII code |
| 389.0 | 1.0 | Timer left for output3 OFF to ON delay — 1.0 — The seventh character on LCD line 1, ASCII code |
| 390.0 | 1.0 | Timer left for output4 OFF to ON delay — 1.0 — The eighth character on LCD line 1, ASCII code |
| 391.0 | 1.0 | Timer left for output5 OFF to ON delay — 1.0 — The first character on LCD line 2, ASCII code |
| 392.0 | 1.0 | The second character on LCD line 2, ASCII code |
| 393.0 | 1.0 | The third character on LCD line 2, ASCII code |
| 394.0 | 1.0 | The fourth character on LCD line 2, ASCII code |
| 395.0 | 1.0 | The fifth character on LCD line 2, ASCII code |
| 396.0 | 1.0 | The sixth character on LCD line 2, ASCII code |
| 397.0 | 1.0 | The seventh character on LCD line 2, ASCII code |
| 398.0 | 1.0 | The eighth character on LCD line 2, ASCII code |
| 399.0 | 1.0 | LCD turn off delay, 0 - 255 minutes |
| 400.0 | 1.0 | Select what parameter will display, 0 = nothing, 1 =temperature, 2 = setpoint, 3 through 10 correspond to input 1 through 8, 11 = mode |
| 401.0 | 1.0 | Select what parameter will display, 0 = nothing, 1 =temperature, 2 = setpoint, 3 through 10 correspond to input 1 through 8, 11 = mode |
| 402.0 | 1.0 | DAY icon control register. 0 = AUTO, 1 = turn OFF, 2 = turn ON. |
| 403.0 | 1.0 | NIGHT icon control register. 0 =  AUTO, 1 = turn OFF, 2 = turn ON. |
| 404.0 | 1.0 | Current mode,0 = coasting,1 = heating,2 = cooling |
| 405.0 | 1.0 | Output 1 from ON to OFF time left |
| 406.0 | 1.0 | Output 2 from ON to OFF time left |
| 407.0 | 1.0 | Output 3 from ON to OFF time left |
| 408.0 | 1.0 | Output 4 from ON to OFF time left |
| 409.0 | 1.0 | Output 5 from ON to OFF tilm left |
| 410.0 | 1.0 | Output 1 from OFF to ON time left |
| 411.0 | 1.0 | Output 2 from OFF to ON time left |
| 412.0 | 1.0 | Output 3 from OFF to ON time left |
| 413.0 | 1.0 | Output 4 from OFF to ON time left |
| 414.0 | 1.0 | Output 5 from OFF to ON time left |
| 415.0 | 1.0 | The hottest output air temperature |
| 416.0 | 1.0 | The coldest output air temperature |
| 417.0 | 1.0 | The offset for the hottest temperature |
| 418.0 | 1.0 | The offset for the coldest temperature |
| 419.0 | 1.0 | Crrent setpoint = user setpoint + offset setpoint |
| 420.0 | 1.0 | The current setpoint offset |
| 421.0 | 1.0 | turn off all fan icons |
| 422.0 | 2.0 | normal cooling setpoint(135) + cooling deadband |
| 423.0 | 1.0 | day setpointoption,1 = hotel,0 = office |
| 424.0 | 1.0 | Window interlock delay,the units is minute, from 0 to 255 minutes |
| 425.0 | 2.0 | User name. line 1:characters 1 & 2 |
| 426.0 | 2.0 | User name. line 1:characters 3 & 4 |
| 427.0 | 2.0 | User name. line 1:characters 5 & 6 — User name. line 1:characters 5 & 6 |
| 428.0 | 2.0 | User name. line 1:characters 7 & 8 — User name. line 1:characters 7 & 8 |
| 429.0 | 2.0 | User name. line 2:characters 1 & 2 — User name. line 2:characters 1 & 2 |
| 430.0 | 2.0 | User name. line 2:characters 3 & 4 — User name. line 2:characters 3 & 4 |
| 431.0 | 2.0 | User name. line 2:characters 5 & 6 — User name. line 2:characters 5 & 6 |
| 432.0 | 2.0 | User name. line 2:characters 7 & 8 — User name. line 2:characters 7 & 8 |
| 433.0 | 2.0 | Internal sensor name. line 1:characters 1 & 2 — Internal sensor name. line 1:characters 1 & 2 — Internal sensor name. line 1:characters 1 & 2 — Internal sensor name. line 1:characters 1 & 2 — Internal sensor name. line 1:characters 1 & 2 — Internal sensor name. line 1:characters 1 & 2 |
| 434.0 | 2.0 | Internal sensor name. line 1:characters 3 & 4 — Internal sensor name. line 1:characters 3 & 4 — Internal sensor name. line 1:characters 3 & 4 — Internal sensor name. line 1:characters 3 & 4 — Internal sensor name. line 1:characters 3 & 4 — Internal sensor name. line 1:characters 3 & 4 |
| 435.0 | 2.0 | Internal sensor name. line 1:characters 5 & 6 — Internal sensor name. line 1:characters 5 & 6 — Internal sensor name. line 1:characters 5 & 6 — Internal sensor name. line 1:characters 5 & 6 — Internal sensor name. line 1:characters 5 & 6 — Internal sensor name. line 1:characters 5 & 6 |
| 436.0 | 2.0 | Internal sensor name. line 1:characters 7 & 8 — Internal sensor name. line 1:characters 7 & 8 — Internal sensor name. line 1:characters 7 & 8 — Internal sensor name. line 1:characters 7 & 8 — Internal sensor name. line 1:characters 7 & 8 — Internal sensor name. line 1:characters 7 & 8 |
| 437.0 | 2.0 | Input 1 user name. line 1:characters 1 & 2 — Input 1 user name. line 1:characters 1 & 2 — Input 1 user name. line 1:characters 1 & 2 — Input 1 user name. line 1:characters 1 & 2 — Input 1 user name. line 1:characters 1 & 2 — Input 1 user name. line 1:characters 1 & 2 |
| 438.0 | 2.0 | Input 1 user name. line 1:characters 3 & 4 — Input 1 user name. line 1:characters 3 & 4 — Input 1 user name. line 1:characters 3 & 4 — Input 1 user name. line 1:characters 3 & 4 — Input 1 user name. line 1:characters 3 & 4 — Input 1 user name. line 1:characters 3 & 4 |
| 439.0 | 2.0 | Input 1 user name. line 1:characters 5 & 6 — Input 1 user name. line 1:characters 5 & 6 — Input 1 user name. line 1:characters 5 & 6 — Input 1 user name. line 1:characters 5 & 6 — Input 1 user name. line 1:characters 5 & 6 — Input 1 user name. line 1:characters 5 & 6 |
| 440.0 | 2.0 | Input 1 user name. line 1:characters 7 & 8 — Input 1 user name. line 1:characters 7 & 8 — Input 1 user name. line 1:characters 7 & 8 — Input 1 user name. line 1:characters 7 & 8 — Input 1 user name. line 1:characters 7 & 8 — Input 1 user name. line 1:characters 7 & 8 |
| 441.0 | 2.0 | Input 2 user name. line 1:characters 1 & 2 — Input 2 user name. line 1:characters 1 & 2 — Input 2 user name. line 1:characters 1 & 2 — Input 2 user name. line 1:characters 1 & 2 — Input 2 user name. line 1:characters 1 & 2 — Input 2 user name. line 1:characters 1 & 2 |
| 442.0 | 2.0 | Input 2 user name. line 1:characters 3 & 4 — Input 2 user name. line 1:characters 3 & 4 — Input 2 user name. line 1:characters 3 & 4 — Input 2 user name. line 1:characters 3 & 4 — Input 2 user name. line 1:characters 3 & 4 — Input 2 user name. line 1:characters 3 & 4 |
| 443.0 | 2.0 | Input 2 user name. line 1:characters 5 & 6 — Input 2 user name. line 1:characters 5 & 6 — Input 2 user name. line 1:characters 5 & 6 — Input 2 user name. line 1:characters 5 & 6 — Input 2 user name. line 1:characters 5 & 6 — Input 2 user name. line 1:characters 5 & 6 |
| 444.0 | 2.0 | Input 2 user name. line 1:characters 7 & 8 — Input 2 user name. line 1:characters 7 & 8 — Input 2 user name. line 1:characters 7 & 8 — Input 2 user name. line 1:characters 7 & 8 — Input 2 user name. line 1:characters 7 & 8 — Input 2 user name. line 1:characters 7 & 8 |
