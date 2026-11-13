---
title: "Register notes and model tables"
order: 60
---

The end of the register workbook is prose rather than a map: notes that apply to the registers above, and the table of TStat5 models with what each one displays. It is kept in the order it appears, because the notes refer to each other by register number.

- Number of buttons on the keypad The keypad can have up to six buttons. The setting is not normally adjusted in the field. Care should be taken to coordinate with the settings in register 106, the Heat / Cool changeover parameter 128=0 , two buttons, for adjusting the setpoint. 128=1 , 4 buttons, lower pair for the mode and upper pair for the setpoint. 128=2 , 6 button keypad, with heat cool manual selection. Lower pair for the mode, next pair for the setpoint and upper pair for the heat or cool mode. 128=3 , 6 button keypad, with separate heating and cooling setpoints. Lower pair for the mode, next pair for the cooling setpoint and uppermost pair for the heating setpoint.

- Relay Output Tables (bit0 = relay1, bit1 = relay2, bit2 = relay3, bit3 = relay4, bit4 = relay5)

- Fan0 table is for the off state. Fan1, Fan2, and Fan3 are for the manual states. Fan4 is for the Auto state. These states are controlled by the user.

- The mode of operation (coasting, cooling, heating) is determined by the PID parameter.

- Analog output OFF table, coasting mode

- Bit 0 is read/write and shows the occupancy mode. Bit 0 = 0 means unoccupied. Bit 0 = 1 means occupied.

- Bit 1 is read only and shows the reset state. Bit 1 = 0 means hardware restart. Bit 1 = 1 means software restart.

- Bit 2 is read/write and is the reset prevention bit. Bit 2 = 0 means the tstat will automatically reset after certain registers are changed. Bit 2 = 1 prevents this reset.  Changing this bit from 1 to 0 will trigger a reset.

- Bit 3 is the state of the digital input. Bit 3 = 1 means logic high. Bit 3 = 0 means logic low.

- Bit 4: Reserved, used for some non standard occupancy sensor logic

- Bit5 0=no delay on modbus reply, 1= 10ms delay before send for slower PLC's to switch from TX to RX

- Bit6 0=ID can change, 1= ID can not change

- Bit7, RS485/wireless communications mode: The normal communications method is a bus topology using RS485 which uses a ‘transmit enable’ or TX_EN line on the RS485 hardware whenever transmission from the thermostat to the bus takes place. For wireless devices this is typically taken care of by the radio module itself so it is not needed. Default = 0, When bit7 is 0, the RS485 chip, TX_EN line is used for normal RS485 bus communications. When bit7 is 1, the TX_EN line is not used, allowing the radio module to communicate one-to-one with the Tstat

- LED TABLE — 0.0 — = — NONE — 14.0 — = — HEATING MODE

- Determines what activates — 1.0 — = — RELAY1 — 15.0 — = — FAN OFF

- the LEDs — 2.0 — = — RELAY2 — 16.0 — = — FAN LOW

- Analog Output Tables (bit0,1=analog out1, bit2,3=analog out2, 00=0%, 01=0-100%, 11=100%)

- Interlock for each output, analog and digital output. 0, interlock always ON; 1, DI1 determine the interlock status ; 2, AI1 determine the interlock status, the range of AI1 must be ON/OFF; 3, AI2 determine the interlock status, the range of AI2 must be ON/OFF; 4, TIMER OR, the output OR with the period timer; 5, TIMER AND, the output AND with the period timer.

- Analog Output Tables (bit0,1 =analog out1, bit2,3=analog out2, 00=0%, 01=0-100%, 11=100%)

- Output table in free cooling mode,0 = 0%, 1 = 100%,2 = MIN->100%,3 = MIN\|100%,4 = MIN.Bit7 through 4 correspond to OFF table,bit 3 through 0 correspond to ON table.

- Register list for Tstat5 series Thermostat

- Model — Model Number — Display — AI — DI — AO — DO — DO hardware

- Tstat5A — 2.0 — LED — 1.0 — 0.0 — 2.0 — 3.0 — 3 big relays

- Tstat5B — 1.0 — LED — 1.0 — 0.0 — 0.0 — 5.0 — 2 small + 3 big relays

- Tstat5C — 4.0 — LED — 2.0 — 1.0 — 0.0 — 5.0 — 5 small relays

- Tstat5D — 12.0 — LED — 2.0 — 1.0 — 2.0 — 5.0 — 5 small relays

- Tstat5E — 16.0 — LCD — 8.0 — 0.0 — 2.0 — 5.0 — 5 small relays

- Tstat5F — 17.0 — LED — 2.0 — 0.0 — 0.0 — 5.0 — 2 triac + 3 small relays

- Tstat5G — 18.0 — LED — 2.0 — 0.0 — 2.0 — 5.0 — 2 triac + 3 small relays

- Tstat5H — 19.0 — LCD — 8.0 — 0.0 — 7.0 — 0.0 — 0.0

- Inputs/Outputs register for Tstat5 series Thermostat

- 5A — 5B — 5C — 5D — 5E — 5F — 5G — 5H

- OUT1 — 108.0 — 108.0 — 108.0 — 108.0 — 108.0 — 108.0 — 108.0 — 102.0

- OUT2 — 108.1 — 108.1 — 108.1 — 108.1 — 108.1 — 108.1 — 108.1 — 103.0

- OUT3 — 108.2 — 108.2 — 108.2 — 108.2 — 108.2 — 108.2 — 108.2 — 387.0

- OUT4 — 108.3 — 108.3 — 108.3 — 108.3 — 348.0 — 348.0 — 388.0

- OUT5 — 108.4 — 108.4 — 108.4 — 108.4 — 349.0 — 349.0 — 389.0

- OUT6 — 102.0 — 102.0 — 102.0 — 102.0 — 390.0

- OUT7 — 103.0 — 103.0 — 103.0 — 103.0 — 391.0

- IN1 — 101.0 — 101.0 — 101.0 — 101.0 — 367.0 — 101.0 — 101.0 — 349.0

- IN2 — 180.0 — 180.0 — 180.0 — 180.0 — 368.0 — 180.0 — 180.0 — 350.0

- IN3 — 181.0 — 181.0 — 369.0 — 181.0 — 181.0 — 351.0

- IN4 — 311.0 — 311.0 — 370.0 — 311.0 — 311.0 — 352.0

- IN5 — 371.0 — 353.0

- IN6 — 372.0 — 354.0

- IN7 — 373.0 — 355.0

- IN8 — 374.0 — 356.0

- Inputs/Outputs Range Setting Registers

- 5A — 5B — 5C — 5D — 5E — 5F — 5G — 5H

- OUT1 — 280.0 — 280.0 — 280.0 — 280.0 — 280.0 — 280.0 — 280.0

- OUT2 — 281.0 — 281.0 — 281.0 — 281.0 — 281.0 — 281.0 — 281.0

- OUT3 — 282.0 — 282.0 — 282.0 — 282.0 — 282.0 — 282.0 — 282.0

- OUT4 — 283.0 — 283.0 — 283.0 — 283.0 — 283.0 — 283.0

- OUT5 — 284.0 — 284.0 — 284.0 — 284.0 — 284.0 — 284.0

- OUT6 — 186.0 — 186.0 — 186.0 — 186.0

- OUT7 — 187.0 — 187.0 — 187.0 — 187.0

- IN1 — 121.0 — 121.0 — 121.0 — 121.0 — 359.0 — 121.0 — 121.0 — 341.0

- IN2 — 188.0 — 188.0 — 188.0 — 188.0 — 360.0 — 188.0 — 188.0 — 342.0

- IN3 — 189.0 — 189.0 — 361.0 — 189.0 — 189.0 — 343.0

- IN4 — 190.0 — 190.0 — 362.0 — 190.0 — 190.0 — 344.0

- IN5 — 363.0 — 345.0

- IN6 — 364.0 — 346.0

- IN7 — 365.0 — 347.0

- IN8 — 366.0 — 348.0

- Inputs/Outputs AUTO/MANUAL Registers

- 5A — 5B — 5C — 5D — 5E — 5F — 5G — 5H

- OUT1 — 310.0 — 310.0 — 310.0 — 310.0 — 310.0 — 310.0 — 310.0

- OUT2 — 310.1 — 310.1 — 310.1 — 310.1 — 310.1 — 310.1 — 310.1

- OUT3 — 310.2 — 310.2 — 310.2 — 310.2 — 310.2 — 310.2 — 310.2

- OUT4 — 310.3 — 310.3 — 310.3 — 310.3 — 310.3 — 310.3

- OUT5 — 310.4 — 310.4 — 310.4 — 310.4 — 310.4 — 310.4

- OUT6 — 310.5 — 310.5 — 310.5 — 310.5

- OUT7 — 310.6 — 310.6 — 310.6 — 310.6

- IN1 — 309.0 — 309.0 — 309.0 — 309.0 — 309.0 — 309.0 — 309.0

- IN2 — 309.1 — 309.1 — 309.1 — 309.1 — 309.1 — 309.1 — 309.1

- IN3 — 309.2 — 309.2 — 309.2 — 309.2 — 309.2

- IN4

- IN5

- IN6

- IN7

- IN8
