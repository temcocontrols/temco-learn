---
title: "TestTool: recording data"
order: 130
appliesTo: "internal"
---

Capturing a session of live point values so that a fault which has already passed can still be looked at.

Download TestTool.exe

Please Update your T3000 software to fix this bugs .

Help->Check for updates ->Update T3000 .

The T3000.exe directory will contain the latest version of TestTool.exe

https://temcocontrols.com/ftp/software/20T3000Update.zip

You can also download it directly from here and extract it to any directory

![](media/testtool-record-data-01.png)

![](media/testtool-record-data-02.png)

Select Function 1. Register Monitor

![](media/testtool-record-data-03.png)

Connect your device

![](media/testtool-record-data-04.png)

Fill in the Modbus ID, register, sampling time, data type that you want to monitor

Click the "+" sign to add a line

Input 1 value = (Reg7484 * 65536 + Reg7485) / 1000

If it is a combination of two registers, please fill in "Register" with something like 7484-7485, or use the register number if it is a single register.

![](media/testtool-record-data-05.png)

Click start to start recording

When the recording ends, an access database is generated in the TestTool.exe directory with the current date. Click Draw Graphic to select the database to draw the image

Select the row that you want to draw

![](media/testtool-record-data-06.png)

You can also open *.mdb directly to see the results

![](media/testtool-record-data-07.png)

![](media/testtool-record-data-08.png)
