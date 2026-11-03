---
title: Alarms and how to clear them
order: 40
description: What an alarm means, where the log is, and when clearing one is the wrong thing to do.
---
An alarm is a sentence the controller writes when a value crosses a limit it was given. It is not a diagnosis, and it is
not a fault: it is a fact with a time beside it.

## The log
The controller keeps the last 100 alarms in order. Each entry holds the time, the alarm, and whether it has since cleared.
The log survives a power cycle, which is what makes it useful on a Monday morning.

## Clearing an alarm
An alarm clears itself when the value returns inside its limit. Pressing **Clear** does not fix anything — it hides the
entry from the active list and leaves it in the log, so the next person sees a machine that is quiet rather than one that
was fixed.

Clear an alarm when you have dealt with the cause and want the machine to look like it. Investigate first; the log entry is
the only record you will have.

## The three that come up most
| Alarm | What it usually is |
|---|---|
| Sensor open | A wire off, or a sensor that has failed open — check at the terminal, not in the tool |
| Over temperature | A fan that has stopped, or a filter nobody has changed |
| Program stopped | The controller restarted; look at the log for what happened before it did |
