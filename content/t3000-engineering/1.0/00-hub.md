---
title: "Building T3000"
order: 10
appliesTo: "internal"
---

T3000 is a C++ application built with MFC, with a web front end in the same process tree and an installer around both. This project is the engineering side of it: how the solution is compiled, how the setup file is produced, how the webview is debugged, and how a change gets into the repository and out to a customer.

It is written for people who work on the product. The screenshots are the source material — the notes around them say what to look for.

## Where to start

- **Building** — from a clean checkout to a working build, and then to the setup file an installer ships.
- **Debugging** — attaching to the webview, which is the part that is not the C++ shell.
- **The repository** — the GitHub workflow, and the release that turns a build into a download.
- **Tools** — TestTool for trend logs and recordings, the Bravo Controls API, and the Airlab bootloader.
