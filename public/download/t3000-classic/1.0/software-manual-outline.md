---
title: "The T3000 Software Manual, chapter by chapter"
order: 20
---

This is the contents of `DosT3SoftwareManual.PDF`, the 117-page manual for the DOS version of the T3000 operator software — the manual itself says "T3000 software is DOS based utilizing version 2.49". The full text could not be recovered from the PDF, so what follows is its structure, chapter by chapter, with the page each chapter starts on.

Use it to find out whether the old manual covers something, then open the PDF at that page. Section names are the manual's own.

## Chapter 1 — T3000 System Description (page 1)

Introduction, and the T3000 highlights: easy to work with, peer-to-peer, user programmable, simple to network, distributed topology, large projects. Then the system description, hardware arrangement for the T3000 and the T3000 Mini-Panel, the panel itself, input and output cards, the mini-panel wiring diagram, and the operating system software — editing tables, alarms, the man-machine interface and Control Basic.

## Chapter 2 — Getting Started (page 14)

Using the keyboard, some common operations, using a mouse, hot keys, and installing and running the T3000 software.

## Chapter 3 — Signing-On and Setting-Up (page 20)

Signing on to the T3000 system, then setting it up: software set-up, the system list, file paths, time and date, the user list, hardware setup, communication, modem configuration, board configuration, and leaving the system.

## Chapter 4 — Miscellaneous (page 24)

The systems list, disconnect, about, and file transfer — read file, send file, delete file, rename file — plus exit (`Alt-X`) and logout (`Alt-L`).

## Chapter 5 — Panel (page 27)

File operations on a panel: load, save, rename, erase; then select panel, print panel and clear panel.

## Chapter 6 — Control (page 30)

The largest chapter, and the one most of the manual's screenshots are in.

- Screens (`Alt-S`) — building a screen in text mode, pop-up window functions, display logic, selection of a point, moving a point, deleting an element, building a screen in graphic mode, dealing with elements on a screen, screens notes
- Programs (`Alt-P`)
- Inputs (`Alt-I`), outputs (`Alt-O`), variables (`Alt-V`)
- Controllers (`Alt-C`), with the controller output calculation discussion
- Weekly routines (`Alt-W`), annual routines (`Alt-A`), arrays (`Alt-Y`)
- An example program

## Chapter 7 — Data (page 53)

Monitors (`Alt-M`), tables (`Alt-T`), the alarm log, and the mechanics of alarm operation.

## Chapter 8 — Configuration (page 60)

Setup (`Alt-U`), the default program, file paths, time and date, operation mode, ID panel, panel names, the user list, custom units, hardware, communication, modem configuration, terminal mode, board configuration, and graphic/text mode.

## Chapter 9 — Programming a Panel (page 65)

## Chapter 10 — Control Basic Programming (page 71)

The original Control Basic reference: the Control Basic editor, a worked example, program flow, the language components, real numbers, days, dates (`JAN 1` to `DEC 31`), times (`0:0` to `23:59:59`), mathematical operators, logic, commands and functions, variables, local variables, points, expressions, and error messages — syntax errors and structural errors.

For the language as it stands today, read the Control Basic Programming pages in the T3000 manual project instead; the commands are the same but the software is not.

## Chapter 11 — Graphics (page 105)

The TIFF graphic file utility, and the graphical user screen editor the technical manual mentions under software specifications.

## What the manual is worth today

The screen-by-screen chapters map onto menus that no longer exist, so the shortcuts (`Alt-S`, `Alt-P`, `Alt-V` …) do not work in the current software. Two things are still worth reading:

- Chapter 10, for the shape of the language and its error messages
- Chapter 1, for how Temco described the product before the panel had a graphical interface
