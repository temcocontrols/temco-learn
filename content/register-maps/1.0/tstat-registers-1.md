---
title: "TStat registers, part 1"
order: 20
---

The Modbus register map for the TStat, in address order. Addresses are decimal, and where the map gives a range the register occupies every address in it. This part begins at address 0 to 3 and ends at 208.0.

| Address | Bytes | Register and description |
|---|---|---|
| 0 to 3 | 4.0 | Serial Number - 4 byte value. Read-only |
| 4 to 5 | 2.0 | Software Version – 2 byte value. Read-only |
| 6.0 | 1.0 | ADDRESS. Modbus device address |
| 7.0 | 1.0 | Product Model. This is a read-only register that is used by the microcontroller to determine the product |
| 8.0 | 1.0 | Hardware Revision. This is a read-only register that is used by the microcontroller to determine the hardware rev |
| 9.0 | 1.0 | PIC firmware version |
| 10.0 | 1.0 | PLUG_N_PLAY_ADDRESS,  ‘plug n play’ address, used by the network master to resolve address conflicts. See VC code for algorithms |
| 15.0 | 1.0 | Base address selection.0 = Protocol address,1 = PLC address. |
| 16.0 | 1.0 | Firmware Update Register, used to show the status of firmware updates.Writing 143 to register 16 - resets the unit to latest factory defaults.Writing 159 to register 16 - makes the current configuration the new factory default. |
| 17,16,19 |  | Spare |
| 20.0 | 2.0 | Hardware Options Register, starting with LSB: Bit0=Clock present or not, Bit1 = Humidity present or not, Bit2 = C02 Sensor, Bit3=CO sensor, Bit4 = Motion Sensor |
| 21 to 100 |  | Blank, for future use |
| 101.0 | 2.0 | TEMPERATURE reading in DegC or F from the sensor used in the control loop PI1 which is configured in register 111. This can be the internal sensor, external, or an average of the two. Writing a temperature value to this register will calibrate the currently selected sensor by adjusting the associated calibration register. If average is selected then you cannot write to this register. |
| 102.0 | 2.0 | COOLING_VALVE, a number from 0-1000 representing 0% (closed) to 100% (open). When Range = On/Off mode, On=1000, Off=0. |
| 103.0 | 2.0 | HEATING_VALVE, a number from 0-1000 representing 0% (closed) to 100% (open) |
| 104.0 | 2.0 | PID1, current PI calculation for PID number 1 (PID2 is in register 240) |
| 105.0 |  | NOT USED FOR REV 25 |
| 106.0 | 1.0 | COOL_HEAT_MODE, heating or cooling mode. 0=none, 1=cooling, 2=heating. |
| 107.0 | 1.0 | MODE_OPERATION, heating or cooling state: 0-7 = coasting, cooling 1,2,3, heating 1,2,3 |
| 108.0 | 1.0 | DIGITAL_OUTPUT_STATE, bit 0 thru 4 = relay 1 thru 5. |
| 109.0 | 2.0 | CALIBRATION, this is the calibration factor for the internal sensor, normally maintained by the tstat. |
| 110.0 | 2.0 | CALIBRATION_EXTERNAL , this is the calibration factor for the external sensor, normally Maintained by the tstat. |
| 111.0 | 1.0 | TEMP_SELECT, Sensor to be used for the PID calculations, 1= external sensor analog input 1 , 2 = internal thermistor, 3 = average the internal thermistor and analog input1 |
| 112.0 | 1.0 | DAC_OFFSET , Calibration data for the 0-10VDC signal, internal variable maintained by tstat |
| 113.0 | 1.0 | NOT USED FOR REV 25 |
| 114.0 | 1.0 | PTERM , proportional term for PI calculation |
| 115.0 | 1.0 | ITERM , integral term for PI calculation |
| 116.0 | 1.0 | NOT USED FOR REV 25 |
| 117.0 | 1.0 | NOT USED FOR REV 25 |
| 118.0 | 1.0 | SEQUENCE , 0 = internal test sequence, ooutputs slowly cycle on/off or ramp up & down. 1 = normal, operation according to the output tables. |
| 119.0 | 1.0 | COOLING_DEADBAND , offset from setpoint for cooling to begin. Units are 0.1 deg. |
| 120.0 | 1.0 | HEATING_DEADBAND , offset from setpoint for heating to begin. Units are 0.1 deg. |
| 121.0 | 1.0 | DEGC_OR_F, engineering units, Deg C = 0, Deg F = 1 |
| 122.0 | 1.0 | FAN , number of fan speeds. Single speed = 1 up to three speed fan = 3 |
| 123.0 | 1.0 | NIGHT_HEATING_DEADBAND , heating deadband in the night time or OFF mode. Units of 1 deg. |
| 124.0 | 1.0 | NIGHT_COOLING_DEADBAND , cooling deadband for the night (OFF) mode. Units of 1 deg. |
| 125.0 | 1.0 | NIGHT HEAT/COOL SETPOINTS ,  0 = office (absolute setpoints, 1 = Hotel or Residential, deadband type offsets |
| 126.0 | 1.0 | POWERUP_SETPOINT , setpoint on power up |
| 127.0 | 1.0 | POWERUP_MODE, mode of operation on power up. 0 = power off, 1 = power up in on mode, 2 = last value (default), 3 = auto mode. |
| 128.0 | 1.0 | KEYPAD_SELECT , variable to select various keypad arrangements. Refer to PAd description in Table 1: Advanced Menu Items |
| 129.0 | 1.0 | AUTO_ONLY , enables or disables manual mode. 0 = Manual Fan Modes 1-x Allowed (depending on R122 value, 1 = Auto Mode Only, 2 = DDC mode,the user can not change setpoint and fan speed from keypad. |
| 130.0 | 1.0 | NOT USED FOR REV 25 |
| 131.0 | 1.0 | MAX_SETPOINT, Setpoint high, the highest setpoint a user will be able to set from the keypad. |
| 132.0 | 1.0 | MIN_SETPOINT, Setpoint Low, the lowest setpoint a user will be able to set from the keypad. |
| 133.0 | 1.0 | SPECIAL_MENU_LOCK, Special menu lockout via keypad, serial port only, 0=Full Menu, 1=Menu Disabled, 2=Typical small menu system, 3 = The user can adjust the setpoint in menu mode, 4 = Partial menu enabled When the LOC parameter isset to ‘1’ the keypad will be locked out from all menu operations. The normal operation of the keypad is not affected; the fan and setpoint buttons work as usual. When the LOC parameter is set to ‘2’ the keypad will be locked out from partial menu operations allowing maintenance personnel to access some of the less critical menu parameters while maintaining a LOC on functions reserved for the primary administrator. This option allowsaccess to calibration of the internal and external temperature sensor (CAL and CAE) and the override time parameter (ORT). LOC = 3,The user can not do anything from keypad except enter menu mode.In menu mode,the user can set setpoint ,fan speed,calibration and override timer. When the menu system is locked out, the only way to adjust the tstat parameters is through the network port or through the communications jack at the bottom of the tstat. The parameter can be set back to ‘0’ only though the communications ports as well LOC = 4,User can adjust setpoint and fan speed from keypad,and enter menu to operate part of menu,include CAL,pterm,iterm,SOP,cooling deadband,heating deadband,C/F units and factory default. |
| 134.0 | 1.0 | Write 1 to register 134 - resets the unit to latest factory defaults. (same as writing Writing 143 to register 16) |
| 135.0 | 1.0 | COOLING_SETPOINT, current pid setpoint - limits are set by the max and min setpoints |
| 136.0 |  | Heating setpoint,current heating setpoint - limits are set by the max and min setpoints |
| 137.0 | 1.0 | FAN_SPEED, current operating fan speed |
| 138.0 | 1.0 | FAN0_OPERATION_TABLE_COAST |
| 139.0 | 1.0 | FAN0_OPERATION_TABLE_COOL1 |
| 140.0 | 1.0 | FAN0_OPERATION_TABLE_COOL2 |
| 141.0 | 1.0 | FAN0_OPERATION_TABLE_COOL3 |
| 142.0 | 1.0 | FAN0_OPERATION_TABLE_HEAT1 |
| 143.0 | 1.0 | FAN0_OPERATION_TABLE_HEAT2 |
| 144.0 | 1.0 | FAN0_OPERATION_TABLE_HEAT3 |
| 145.0 | 1.0 | FAN1_OPERATION_TABLE_COAST |
| 146.0 | 1.0 | FAN1_OPERATION_TABLE_COOL1 |
| 147.0 | 1.0 | FAN1_OPERATION_TABLE_COOL2 |
| 148.0 | 1.0 | FAN1_OPERATION_TABLE_COOL3 |
| 149.0 | 1.0 | FAN1_OPERATION_TABLE_HEAT1 |
| 150.0 | 1.0 | FAN1_OPERATION_TABLE_HEAT2 |
| 151.0 | 1.0 | FAN1_OPERATION_TABLE_HEAT3 |
| 152.0 | 1.0 | FAN2_OPERATION_TABLE_COAST |
| 153.0 | 1.0 | FAN2_OPERATION_TABLE_COOL1 |
| 154.0 | 1.0 | FAN2_OPERATION_TABLE_COOL2 |
| 155.0 | 1.0 | FAN2_OPERATION_TABLE_COOL3 |
| 156.0 | 1.0 | FAN2_OPERATION_TABLE_HEAT1 |
| 157.0 | 1.0 | FAN2_OPERATION_TABLE_HEAT2 |
| 158.0 | 1.0 | FAN2_OPERATION_TABLE_HEAT3 |
| 159.0 | 1.0 | FAN3_OPERATION_TABLE_COAST |
| 160.0 | 1.0 | FAN3_OPERATION_TABLE_COOL1 |
| 161.0 | 1.0 | FAN3_OPERATION_TABLE_COOL2 |
| 162.0 | 1.0 | FAN3_OPERATION_TABLE_COOL3 |
| 163.0 | 1.0 | FAN3_OPERATION_TABLE_HEAT1 |
| 164 | 1.0 | FAN3_OPERATION_TABLE_HEAT2 |
| 165.0 | 1.0 | FAN3_OPERATION_TABLE_HEAT3 |
| 166.0 | 1.0 | FANAUT_OPERATION_TABLE_COAST |
| 167.0 | 1.0 | FANAUT_OPERATION_TABLE_COOL1 |
| 168.0 | 1.0 | FANAUT_OPERATION_TABLE_COOL2 |
| 169.0 | 1.0 | FANAUT_OPERATION_TABLE_COOL3 |
| 170.0 | 1.0 | FANAUT_OPERATION_TABLE_HEAT1 |
| 171.0 | 1.0 | FANAUT_OPERATION_TABLE_HEAT2 |
| 172.0 | 1.0 | FANAUT_OPERATION_TABLE_HEAT3 |
| 173.0 | 1.0 | VALVE_OPER_TABLE_COAST, Analog output state for each of the 7 modes of operation |
| 174.0 | 1.0 | VALVE_OPER_TABLE_COOLING1 |
| 175.0 | 1.0 | VALVE_OPER_TABLE_COOLING2 |
| 176.0 | 1.0 | VALVE_OPER_TABLE_COOLING3 |
| 177.0 | 1.0 | VALVE_OPER_TABLE_HEATING1 |
| 178.0 | 1.0 | VALVE_OPER_TABLE_HEATING2 |
| 179.0 | 1.0 | VALVE_OPER_TABLE_HEATING3 |
| 180.0 | 2.0 | Analog Input 1, Filtered and calibrated value for analog input 1 |
| 181.0 | 2.0 | Analog Input 2, Filtered and calibrated value for analog input 2 |
| 182.0 | 1.0 | Night heating setpoint |
| 183.0 | 1.0 | Night cooling setpoint |
| 184.0 | 1.0 | Info Byte, this register contains info about the state of the tstat. |
| 185.0 | 1.0 | Bau - Baudrate, 0=9600, 1=19.2kbaud |
| 186.0 | 1.0 | Ou1 - Output1 Scale - 0=On/Off, 1=0-10V, 2=0-5V, 3=2-10V, 4= 10-0V |
| 187.0 | 1.0 | Ou2 - Output2 Scale - 0=On/Off, 1=0-10V, 2=0-5V, 3=2-10V, 4= 10-0V |
| 188.0 | 1.0 | AI1 – Analog input 1 range 0=10-bit raw data, 1=10K thermistor, 2=0-100%, 3=on/off, 4=custom |
| 189.0 | 1.0 | AI2 – Analog input 2 range 0=10-bit raw data, 1=10K thermistor, 2=0-100%, 3=on/off, 4=custom |
| 190.0 | 1.0 | dI1 – Digital input 1 range 0 = ON/OFF. |
| 191.0 | 1.0 | OUTPUT1_DELAY_OFF_TO_ON – delay time for output1 going from OFF to ON (sec) |
| 192.0 | 1.0 | OUTPUT2_DELAY_OFF_TO_ON – delay time for output2 going from OFF to ON (sec) |
| 193.0 | 1.0 | OUTPUT3_DELAY_OFF_TO_ON – delay time for output3 going from OFF to ON (sec) |
| 194.0 | 1.0 | OUTPUT4_DELAY_OFF_TO_ON – delay time for output4 going from OFF to ON (sec) |
| 195.0 | 1.0 | OUTPUT5_DELAY_OFF_TO_ON – delay time for output5 going from OFF to ON (sec) |
| 196.0 | 1.0 | OUTPUT1_DELAY_ON_TO_OFF – delay time for output1 going from OFF to ON (sec) |
| 197.0 | 1.0 | OUTPUT2_DELAY_ON_TO_OFF – delay time for output2 going from OFF to ON (sec) |
| 198.0 | 1.0 | OUTPUT3_DELAY_ON_TO_OFF – delay time for output3 going from OFF to ON (sec) |
| 199.0 | 1.0 | OUTPUT4_DELAY_ON_TO_OFF – delay time for output4 going from OFF to ON (sec) |
| 200.0 | 1.0 | OUTPUT5_DELAY_ON_TO_OFF – delay time for output5 going from OFF to ON (sec) |
| 201.0 | 1.0 | MODBUS_CYCLING_DELAY – delay time (in minutes) for switching out of heating or cooling and then back in. |
| 202.0 | 1.0 | MODBUS_CHANGOVER_DELAY – delay time (in minutes) for switching from cooling into heating or vice versa. |
| 203.0 | 1.0 | dIS – Display. This sets the display to either room temperature or setpoint. 0 = room temp, 1 = setpoint, 2 = Blank Display,3 = PID2 value,4 = PID2 setpoint, 5 = set segment code by manually, 6 = Display sleep |
| 204.0 | 1.0 | LED1 (top left to bottom right) — 3.0 — = — RELAY3 — 17.0 — = — FAN MED |
| 205.0 | 1.0 | LED2 — 4.0 — = — RELAY4 — 18.0 — = — FAN HI |
| 206.0 | 1.0 | LED3 — 5.0 — = — RELAY5 — 19.0 — = — FAN AUTO |
| 207.0 | 1.0 | LED4 — 6.0 — = — COASTING STAGE — 20.0 — = — HEAT1 OR COOL1 |
| 208.0 | 1.0 | LED5 — 7.0 — = — COOLING1 STAGE — 21.0 — = — HEAT2 OR COOL2 |
