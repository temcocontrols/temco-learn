---
title: "Panel Configuration"
order: 570
---

## 7.1.1 Set your device IP address

![Panel Configuration](media/images-drex_module_9_screen.png)

## 7.1.3 TIME & DATE

The time and date is set through this selection. This is the only time in the entire system. It is sent to all panels and also sets the internal clock in the personal computer.

You are first prompted to reset the time in hours: minutes: seconds - i.e. 14:32:34.

Next, you are prompted to reset the date by month-day-year - i.e. 10-29-95.

## 7.1.4 Device information

![](media/images-drex_module_9_custom.png)

## 7.1.5 PANEL ID

![](media/images-drex_module_9_custom_2.png)

## 7.2 USER LIST

![](media/images-drex_module_9_custom_3.png)

![](media/images-drex_module_9_custom_4.png)

User List provides the means for system security and individual access to the system. Each user has to Sign- On with his name and give his pass word to gain access to the system. There is space to allow for 10 different users and passwords (8 for the Mini-Panel).

User List setup fields

a) Name . . . . . .
An eight character name of the user. First step for gaining system access when Signing-On.

b) Access level . . . . The system has 4 different access levels as follows:

![](media/images-drex_module_9_custom_5.png)

c) Default panel . . .
The default panel the user will see once log-in the system.

d) Default screen . .
The screen, the above user, first sees when signing on to the system. If the “Default screen” field is 0, then the default Work Menu is displayed after signing on. If the “Default screen” field is nonzero, that screen becomes the Main Menu for that particular operator. This can be either a text or graphic based display.

e) Password . . . .
An eight character name of the user. Second step for gaining
system access when Signing- On. If all is correct, then that user is logged on to the system according to the above parameters.

When entering your “Password” the characters entered are not echoed to the screen. The system first asks you to “Type new Pass word” and then to “Retype new Pass word”. If both passwords are the same then you will be allowed to exit the User List. The password will then have entered and retyped again correctly before you will be granted access to leave the User List. Ensure that the letters entered are CAPITAL letters.

## 8.3 Dyndns config

![](media/images-drex_module_9_custom_6.png)

## 8.4 Device Serial Port Configuration

![](media/images-drex_module_9_custom_7.png)

the description of these comports :

COM0:For the common UART ,Baud rate is 9600 or 19200

COM1:For the communication of zigbee

COM2:For the high speed UART ,Baud rate is less than 961200. If you want to use MSTP, you must select the COM port .

<table>
  <tr><td><img src="media/images-drex_bullet_1.png" alt="1"><strong>IP Address</strong><img src="media/images-drex_module_9_control_1.png" alt="1. IP Address">&lt;TODO&gt;: Insert description text here...</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_2.png" alt="2"><strong>Subnet Mask</strong><img src="media/images-drex_module_9_control_2.png" alt="2. Subnet Mask">&lt;TODO&gt;: Insert description text here...</td></tr>
</table>

<table>
  <tr><td><img src="media/images-drex_bullet_3.png" alt="3"><strong>Gateway Address</strong><img src="media/images-drex_module_9_control_3.png" alt="3. Gateway Address">&lt;TODO&gt;: Insert description text here...</td></tr>
</table>
