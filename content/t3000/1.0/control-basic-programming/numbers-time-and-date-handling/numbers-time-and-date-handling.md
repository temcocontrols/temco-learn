---
title: "Numbers, Time and Date Handling"
order: 610
---

The following sections list the control basic programming language, it is suited for real time control applications with many advanced features built into the language directly which allows the programmer to create powerful programs with a small number of statements. Along with the description of the statements are some short examples for each.

The list of program statements and commands is listed alphabetically. Each item consists of 3 parts:

1. Purpose . . . . . Explains when the function is used.

2. Format . . . . . Shows how the function is used.

3. Example . . . . Gives a short example program

## 10.4.1 REAL NUMBERS

Real numbers between +/- 3.4*10^38 are recognized. The number can be entered in a number of different formats.

Examples: 0.00000123 , 7.879E-12 , 100

## 10.4.2 DAYS

Each of the 7 weekdays evaluates to a real number as shown below:

SUN = 0 MON = 1 TUE = 2 WED = 3 THU = 4 FRI = 5 SAT = 6

Example:10 IF DOW = 1 THEN OPEN SPRINKLER1

20 IF TIME-ON (SPRINKLER1 ) > 0:05:00 THEN CLOSE SPRINKLER1

This example will open a sprinkler valve on Monday morning at 12:00:00 and turn it off at 12:05:00

## 10.4.3 DATES ( JAN 1 to DEC 31 )

[TBD] Dates can be referred to in programming statements like a real number which allow logic operations on calendar events for certain days of the year, AUG12 and NOV10 can be used in the program statements.

The month abbreviations are:

JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC.

Note that February is allowed to have 29 days as happens during a leap year rather than the usual 28 days.

Example:10 IF DOY = AUG12 THEN STOP FAN

## 10.4.4 TIMES ( 0:0:0 to 23:59:59 )

Times are evaluated to real numbers using the following formula:

time = hour*100 + minutes + seconds / 100

The time of 14:30:30 is returned as a real number of value = 1430.30

If the seconds are not specified, the time is interpreted as hours and minutes only, ie 12:30 returns a value of 1230

EXAMPLE: IF TIME = 13:00:05 THEN START PUMP1

See the
TIME
command for more examples of math using time

## 10.4.7 COMMANDS AND FUNCTIONS

As sown in the previous pages, a Basic program is comprised of Basic commands and functions. The commands and functions operate in conjunction with a mixture of mathematical operators, variables, days, dates, times and real numbers to accomplish a given control sequence.

COMMANDS

Every control basic line must have at least one command. If more than one command is on one line, they must be separated by semicolons.

FUNCTIONS

functions represent values that are dependent on 1 or more other values or some system constant such as time. They can be used in any statement where it calls for an expression.

In this section the Commands and Functions are listed alphabetically. The explanation of each term consists of 3 parts:

1. Purpose . . . . . Explains when the function is used.

2. Format . . . . . Shows how the function is used.

3. Example . . . . Gives a practical application.
