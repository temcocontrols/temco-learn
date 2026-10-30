---
title: Getting started
order: 10
description: Install the driver and prove the controller answers before anything else.
---
Work through this page at the machine, not at a desk. It takes about ten minutes and ends with a controller that answers,
which is the state every other page assumes.

## Install the driver
The driver ships inside the Temco installer. Run it as an administrator, then plug the controller in. Windows shows a new
port under **Ports (COM & LPT)** — the number beside it is the one you will point at in the next step.

## Point the port
Open the tool, choose the port the controller appeared on, and press **Connect**. A controller that has never been
commissioned answers on its own address; one that has been on a network answers on the address it was given.

If nothing answers, try the other ports in the list before assuming the controller is faulty: a USB adapter usually takes
the port beside its own.

## Check the answer
Ask for the controller's identity. A good answer names the model, the firmware and how long the machine has been running:

```text
Test1  firmware 1.0  uptime 0d 00:07:12
```

That line is enough to prove three things: the loop is powered, the driver is talking to it, and the firmware in front of you
is the firmware this documentation was written for.

## Where next
- [Ports and wiring](#/t3000/1.0/ports) — what each terminal is for
- [Writing a program](#/t3000/1.0/programs) — the first thing a machine needs to do
- [Alarms](#/t3000/1.0/alarms) — when the machine says something is wrong
