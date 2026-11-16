---
title: "The manuals that came before"
order: 10
---

Temco's T3000 documentation did not start with this site. It started with two printed manuals that shipped with the DOS-era T3000 software, and with a folder of support documents that were never in print at all. Those originals still live in the source repository under `T3000_CrossPlatform/Documentation`, and this project is what became of them.

## What is here, and how much to trust it

| Document | Pages | Treatment |
| --- | --- | --- |
| T3000 Installation and Technical Manual | 50 | Converted in full — the pages in this project are the manual, reflowed |
| T3000 Software Manual | 117 | Outline only — the text could not be recovered cleanly, see [why](software-manual-text-defect.md) |
| Flashing a Raspberry Pi Compute Module | 11 | Converted in full |
| Backing up a Raspberry Pi Compute Module | 4 | Converted in full |
| T3-BB top and bottom schematics | 2 sheets | Described, with the sheets linked in the source repository |

Everything converted here was taken from the PDFs word for word. Nothing was rewritten from memory, and where a figure could not be carried across, the caption is still in place so you can see what was there and go back to the PDF for it.

## Why these are kept

The technical manual answers questions the current product documentation does not: how the T3000 panel is physically assembled, what the DAQ, connector and netcards do, how the MINI 64 and MINI 16 were wired, and how a panel is addressed on a network. The Raspberry Pi documents describe how a Compute Module is flashed and how a configured image is backed up and shrunk — still the procedure for the T3 Router.

The manuals describe hardware that Temco no longer ships, so read them as history. For anything current, read the T3000 manual project on this site instead.

## Contents

1. [The T3000 Software Manual, chapter by chapter](software-manual-outline.md)
2. [Why the software manual is an outline and not pages](software-manual-text-defect.md)
3. [Hardware installation](hardware-installation.md)
4. [Software installation](software-installation.md)
5. [Networking controllers](networking.md)
6. [Appendices](appendix.md)
7. [Flashing a Raspberry Pi Compute Module](rpi-compute-module-flashing.md)
8. [Backing up a Raspberry Pi Compute Module](rpi-compute-module-backup.md)
9. [The T3-BB board schematics](board-schematics.md)

## Where the originals are

The PDFs are in the [T3000_CrossPlatform repository](https://github.com/temcocontrols/T3000_CrossPlatform/tree/master/Documentation/HelpDocs), in `Documentation/HelpDocs`:

- `DosT3SoftwareManual.PDF` — byte-identical to `T3SoftwareManual.PDF`, 4.6 MB
- `DosT3TechnicalManual.PDF` — byte-identical to `T3TechnicalManual.PDF`, 1.1 MB
- `WindowsVersionSoftwareManualRev3.PDF` — 217 pages, Rev 7.3, April 2016; a different edition from the 180-page manual that is already published
- `RPi_Compute_Module_Instructions.pdf` and `Backup and Compress Raspberry Pi Compute Module.pdf`

The schematics are in `Documentation/Schematics`, and the Control Basic grammar is in `Documentation/Grammar Definitions`.
