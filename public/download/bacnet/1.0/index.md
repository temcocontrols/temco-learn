---
title: BACnet at a glance
order: 0
description: What a BACnet controller exposes, and how a supervisor finds it.
---
A Temco controller speaks BACnet so that a building supervisor can read it without knowing anything about Temco tools. This
version documents the object model and the addresses; the wiring is [Test1's](#/t3000/1.0/index) business.

## What a supervisor sees
Every point the controller holds is an object with an instance number. A supervisor reads a point by asking for its object
identifier, which is the type and the number together — one 16-bit word, and the only addressing a BACnet device needs.

## Finding it
A controller answers a **Who-Is** with an **I-Am**, which carries its device instance and its address. That is the whole
discovery mechanism: no scan, no port number, no host name.

## Where to go next
- [Points](#/bacnet/1.0/points) — the object types this version exposes, and what each one is for
