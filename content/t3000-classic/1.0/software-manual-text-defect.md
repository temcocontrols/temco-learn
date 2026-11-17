---
title: "Why the software manual is an outline and not pages"
order: 30
---

`DosT3SoftwareManual.PDF` is a 117-page manual whose text layer is unusable. Every word of more than one syllable was typeset with a space inside it — sometimes two. This is in the PDF itself, not in one extractor: `pypdf` and PyMuPDF produce the same text, and both describe roughly 38,000 words against a document that reads as about 25,000.

A paragraph from page 6, exactly as it extracts:

```
The T3000 sys tem is a com plete En ergy Man age ment and Con trol Sys tem (EMCS) which is
used to con trol the in door en vi ron ment of com mer cial, in sti tu tional and resi den tial build ings.
The T3000 meas ures the physi cal con di tions in the build ing such as tem pera ture, hu mid ity,
pres sure, cur rent, volt age, and status.
```

Putting that in front of a reader would be worse than not publishing it, and repairing it automatically is not safe: merging fragments by guessing which ones belong together would silently change measurements, point names and numbers in a technical manual. A repair that is right most of the time is not good enough for a document people wire panels from.

So the manual was not converted. Instead:

- [Its structure is here](software-manual-outline.md), chapter by chapter, with page numbers — enough to find what you need in the PDF
- The PDF is linked from the [opening page](00-hub.md), unmodified
- Where the same material exists in a readable form, this site links to that instead

## What *was* converted

The 50-page Installation and Technical Manual from the same folder extracts cleanly, so it was converted in full:

- [Hardware installation](hardware-installation.md)
- [Software installation](software-installation.md)
- [Networking controllers](networking.md)
- [Appendices](appendix.md)

The two Raspberry Pi Compute Module documents also extract cleanly and were converted:

- [Flashing a Raspberry Pi Compute Module](rpi-compute-module-flashing.md)
- [Backing up a Raspberry Pi Compute Module](rpi-compute-module-backup.md)

## The one character that had to be fixed

The technical manual prints bullets in a font whose character does not map to Unicode; it extracts as `ü` (U+00FC), 116 times. Those became `-`. The extraction also broke words across lines with a hyphen (`in -` / `put`), which was rejoined. Nothing else was altered: the sentences, the numbers, the point counts and the part numbers are the manual's.

## If the software manual ever needs to be readable

The 217-page `WindowsVersionSoftwareManualRev3.PDF` sits beside it in the repository, is a different typesetting, and may not have the same defect. It was not converted here because it is a later edition of the same material that is already published as the current T3000 manual, and adding 217 pages of a third edition would duplicate more than it would add. It is worth a pass if anyone needs the 2016 wording specifically.
