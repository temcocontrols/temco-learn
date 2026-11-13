---
title: "Annual routines"
order: 660
---

A weekly schedule repeats every seven days, which covers a shop that opens at nine every morning. It does not cover the two weeks in August when it does not open at all. An annual routine is the second calendar: a list of dates that are the same every year, applied on top of the weekly schedules.

It is also where the year's holidays live, which is why the screen is behind the **Holidays** command in the Control menu (`Alt - H`).

## What a marked day means

A day marked in the annual routine is treated as an exception. On that date the panel follows the holiday behaviour instead of the weekly schedule — the same behaviour the panel would use on a day it was told to stay closed.

Two kinds of date are worth keeping apart when you plan a year:

| Kind | Example | Where it belongs |
|---|---|---|
| The same date every year | 1 January, 25 December | an annual routine |
| A date that moves every year | Easter, a maintenance shutdown | an annual routine, edited when the year changes |
| The same day every week | Sunday | a weekly schedule |

A moving holiday is the case that catches people out: it is an annual routine, but it has to be adjusted each year because the panel stores dates, not rules.

## The screen

The annual routine for a panel is a calendar of the whole year, not a list you type into. A day is marked by clicking it in the twelve-month view; the same click removes the mark.

- **Add/Not Add** — the context menu on a day, which is how a single date is set or cleared without a dialog.
- **Clear All** — clears the panel's calendar in one step, before a year is planned from scratch.
- **Edit Calendar Day** — the same edit, opened from a BACnet device's own screen rather than from T3000's calendar.
- **Add Log** — records the date in the panel's table.
- **Write & Read back** — sends the calendar to the panel and reads it back, which is the way to confirm what the panel actually holds.

## Leap years

The calendar holds 366 days, so 29 February exists whether or not the current year has one. A panel set up in a leap year keeps the date; in a year without 29 February it is simply never reached. Nothing has to be re-entered, and nothing shifts by a day.

## Reading the calendar back

A calendar that was written but never read back is a calendar you are guessing about. **Write & Read back** is the button that turns the screen into evidence: if the marks come back the way they were set, the panel has them; if they do not, the write did not land and the panel will run its schedules as though nothing was marked.

That matters most before a long holiday, which is exactly when nobody is on site to notice.

## Related

- [Schedules](control/schedules.md) — the weekly calendar this one overrides.
- [Holidays](control/holidays.md) — the screens in the control chapter.

A TStat8 has its own annual routine table, set from its tree the same way: right-click the `AR1` log and add the dates.
