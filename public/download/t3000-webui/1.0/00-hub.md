---
title: "What the new UI is"
order: 5
---

The T3000 that ships today draws its screens in MFC. This is the replacement: the same job done in a browser, with the C++ application hosting a web front end instead of painting controls itself.

It is two things at once, and the pages here cover both:

- **The web front end** — the Modbus Register Tool and the HVAC Drawer, plus the screens that have already moved (inputs, trend logs, Haystack, the assistant).
- **The unified Designer** — one editor at `/t3000/designer/…` serving four kinds of document: an HVAC schematic, an LVGL 9.5 screen, an LVGL flow, and the LCD simulator.

## Status

The new UI is in beta and the Designer is being built in five phases. Some of what follows is design rather than shipped behaviour, and the pages say which: `interfaces.md` opens by calling itself a proposed API, and `risks.md` keeps the open questions and the rollback. Read a page's own status line before trusting it as a description of the product.

## Reading order

| # | Where | What it answers |
|---|---|---|
| 1 | **Design Hub** | the entry point — what a designer document is, who uses it, and how the hub lists them |
| 2 | **Designer: design** | the decisions: one editor, four document types, the areas each one fills |
| 3 | **Designer: interfaces** | the contracts — `DocumentAdapter`, region and tab specs, commands, viewport, status |
| 4 | **Designer: change map** | every file added, touched or deliberately left alone, per phase |
| 5 | **Designer: theme and CSS** | Fluent UI and T3000 tokens, and the bridge from EEZ's variables |
| 6 | **Page by page** | what changes on each screen, including all 43 routes and the shell's five areas |
| 7 | **Phases P1–P5** | the order it is built in: shell and HVAC, LVGL, HVAC host mode, route consolidation, optional unification |
| 8 | **LVGL SVG renderer** | the measured primitive inventory, the scene contract, and the WASM bridge |
| 9 | **EEZ Studio** | the design studio the LCD screens are made in, with a six-part user manual |
| 10 | **Releases** | the beta announcement and the changelog |

## Where the other half of the story is

- **T3000 API & Protocol** documents what the front end talks to: the REST and WebSocket API, the webview message set, and the data structures behind every point.
- **T3000** is the application these screens sit inside, including the classic MFC screens they replace.
