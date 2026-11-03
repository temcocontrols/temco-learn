---
title: Points
order: 10
description: The object types this version exposes, and the properties a supervisor reads from each.
---
A point is an object with a type and an instance. This version exposes the types below; anything not listed is not
reachable over BACnet, however visible it is in the tool.

## The types

| Type | Name | What it holds |
|---|---|---|
| 0 | Analog input | A measured value: a temperature, a pressure, a 0–10 V signal |
| 1 | Analog output | A value the supervisor may write, such as a setpoint |
| 3 | Binary input | A switch or a proven state |
| 4 | Binary output | A relay the supervisor may command |
| 19 | Multi-state value | A mode: heating, cooling, off |

## The properties worth reading
- **Present value** — the point itself
- **Status flags** — whether the value is in alarm, overridden, or out of service
- **Reliability** — why a value might be wrong; read it before believing the value

A supervisor that reads present values and ignores status flags will report a fan as running while it is overridden off.
Read the flags first.

## Addressing
The instance number is printed beside the point in the tool and is what the supervisor asks for. Writing a point means
asking for its object identifier and its priority array — and the lowest unused priority wins, which is how a supervisor
overrides a program without deleting it.
