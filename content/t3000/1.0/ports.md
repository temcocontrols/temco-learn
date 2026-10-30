---
title: Ports and wiring
order: 20
description: What each terminal is for, and the two mistakes that account for most commissioning calls.
---
The controller has the same terminals on every model in the family. The numbers are printed beside them; the words below
are what they do.

## The terminals

| Terminal | Name | What it is for |
|---|---|---|
| 1–8 | Universal inputs | A switch, a sensor or a 0–10 V signal; the tool decides which |
| 9–14 | Digital outputs | Relays, 24 V AC or DC, one amp each |
| 15–16 | Analog outputs | 0–10 V, for a damper or a valve |
| 17–18 | Power | 24 V AC, either polarity; the controller does not care |

## Two mistakes worth knowing
**A universal input set to the wrong kind reads plausibly.** A 0–10 V sensor wired into an input the tool believes is a
switch will read "closed" for ever, and nothing complains. Set the kind before wiring, and confirm it in the tool.

**A shared 24 V supply is not shared ground.** Two controllers on one transformer share a path that will carry current the
wrong way when one of them is switched off. Either give each controller its own transformer, or bond the grounds
deliberately — never by accident.

## Prove an input
After wiring, change the input by hand and watch the value in the tool. A reading that moves is the only proof that matters;
a reading that sits still is worth investigating before the panel goes back on.
