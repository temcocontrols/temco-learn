---
title: Writing a program
order: 30
description: The shape of a Test1 program, and the one rule that keeps it readable a year later.
---
A program is a list of lines the controller runs top to bottom, ten times a second. That is the whole model: no tasks, no
threads, and no reason to fear it.

## The shape of a program
```text
10  IF IN1 = ON THEN OUT1 = ON
20  IF IN1 = OFF THEN OUT1 = OFF
30  IF AI1 > 22.5 THEN OUT2 = ON
```
Every program worth keeping has three parts: what it reads, what it decides, and what it writes. Put them in that order and
a stranger can read it. Mix them and only the person who wrote it can.

## The rule
**One output is set in one place.** Two lines that both write `OUT1` will, sooner or later, disagree — and the machine will
do something nobody intended at a moment nobody predicted. If two conditions can drive one output, write one line that
decides between them.

## Download and watch
Downloading replaces the running program. The controller keeps running its old program until the download completes, then
switches — so a download is not a gap in control, and a failed one leaves the old program in place.

Watch the first ten seconds after a download. A program that was going to misbehave almost always shows it in the first
scan of the inputs.
