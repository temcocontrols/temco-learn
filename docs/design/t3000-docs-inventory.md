# T3000 legacy documentation inventory

**Analysis date:** 2026-11-05
**Source analysed:** `C:\QN\temcocontrols\T3000_Building_Automation_System` (git clone of `temcocontrols/T3000_Building_Automation_System`, branch `Double`, HEAD `cb975bde`)
**Method:** read-only enumeration (recursive file scan, no file opened for writing, nothing added, changed or moved in the legacy tree).

## Purpose

Decide what is worth migrating into the Temco Learn documentation site, and in what order. The goal of this pass is a complete, honest inventory: what documentation actually exists, which files are real content, which are build output or third-party noise, and what is missing.

## Totals

| Kind | Files | Size | Verdict |
|---|---|---|---|
| `.txt` | 7 509 | 182 MB | **not docs** — 7 395 are T3000 sample control programs in `T3000 Output\Debug\ResourceFile` |
| `.html` / `.htm` | 485 | 32 MB | **not docs** — the built T3000Webview UI, same ResourceFile folder |
| `.chm` | **17** | 125.7 MB | real help, but only **5 distinct Temco titles + 4 Microsoft SDK** |
| `.docx` / `.doc` / `.rtf` | 25 | 24 MB | real engineering docs, 19 in `Documentation\` |
| `.md` | 10 | 57 KB | real, small |
| `.pdf` | 7 | 33.1 MB | 3 real manuals + 4 small diagrams |
| `.xls` / `.xlsx` | 4 | 3.5 MB | register / BACnet tables |
| `.vsdx` / `.vsd` | 4 | 0.2 MB | diagrams (only 3 exported to PDF) |
| `.gui` / `.chw` | 3 | 26 MB | compiled help index, ships with the CHMs |

Whole tree, all file types: 8 062 documentation-type files, 401.4 MB.

## A. The actual help system — 3 products, 17 CHM files

| Product | Distinct title | Copies | Where |
|---|---|---|---|
| **T3000** | `T3000_Help.chm` | 4 | `HelpDocs\` 15.7 MB · `T3000InstallShield\` 9.7 · `T3000InstallShield\mfc dll\` 12.8 · `debug&&release  files\` 7.9 |
| **TStat8** | `TStat8_Help.chm` | 2 | `HelpDocs\` 13.7 · `T3000\Tstat8HelpSystem\` 13.7 |
| **Psychrometric** | `Psychrometric Help.chm` | 3 | `HelpDocs\Psychrometry\Psychro Manual\` 13.7 · `Psychrometric Tool\Psychro Tool\…\` 13.7 · `T3000InstallShield\Psychrometry\` 13.7 |
| **PH chart** | `manual_ph_chart.chm` | 3 | `HelpDocs\Psychrometry\PH Manual\` 3.2 · `Psychrometric Tool\PH_Application\…\` 3.2 · `T3000InstallShield\PH_Application\` 3.2 |
| Microsoft HTML Help SDK (ignore) | `htmlhelp.chm` 0.9 · `api.chm` 0.1 · `hhaxref.chm` 0.2 · `htmlref.chm` 0.1 | 4 | `HelpDocs\` |
| Viewer helper (ignore) | `Viewhlp.chm` 0.06 | 1 | `HelpDocs\` |

Support files: `HelpDocs\htmlhelp.lib`, `T3000\T3000help.chw` (8 KB compiled index), and two `.gui` index blobs — `Psychrometric Help.gui` 20.8 MB, `manual_ph_chart.gui` 5.0 MB.

> ⚠️ **There is no `.hhp` / `.hhc` / `.hhk` anywhere in the repository.** The HTML Help Workshop *source* for these CHMs is not in this repo — only the compiled `.chm` survives. Any migration must author fresh pages and treat the CHM/PDF as the reference text, never as a build input.

Full CHM paths (all 17):

```
  7.9 MB  debug&&release  files\T3000_Help.chm
  0.1 MB  HelpDocs\api.chm
  0.2 MB  HelpDocs\hhaxref.chm
  0.9 MB  HelpDocs\htmlhelp.chm
  0.1 MB  HelpDocs\htmlref.chm
  3.2 MB  HelpDocs\Psychrometry\PH Manual\manual_ph_chart.chm
 13.7 MB  HelpDocs\Psychrometry\Psychro Manual\Psychrometric Help.chm
 15.7 MB  HelpDocs\T3000_Help.chm
 13.7 MB  HelpDocs\TStat8_Help.chm
  0.1 MB  HelpDocs\Viewhlp.chm
  3.2 MB  Psychrometric Tool\PH_Application\T3000 Output_VS2015\manual_ph_chart.chm
 13.7 MB  Psychrometric Tool\Psychro Tool\T3000 Output_VS2015\PsychometricHelp.chm
 13.7 MB  T3000\Tstat8HelpSystem\TStat8_Help.chm
 12.8 MB  T3000InstallShield\mfc dll\T3000_Help.chm
  3.2 MB  T3000InstallShield\PH_Application\manual_ph_chart.chm
 13.7 MB  T3000InstallShield\Psychrometry\PsychometricHelp.chm
  9.7 MB  T3000InstallShield\T3000_Help.chm
```

## B. Real manuals as PDF (3)

| Size | Path |
|---|---|
| 16.8 MB | `HelpDocs\T3000SoftwareManualRev3.PDF` |
| 12.4 MB | `HelpDocs\Psychrometry\Psychro Manual\Psychrometric Manual.pdf` |
| 3.0 MB | `HelpDocs\Psychrometry\PH Manual\manual_ph_chart.pdf` |

These three are the only substantial, reader-facing prose that is already in a modern format. They are the primary source material for a T3000 documentation project.

## C. Engineering / process docs — `Documentation\`

**Word: 18 `.docx` + 1 `.doc`.** ★ marks material worth publishing; unmarked material is internal engineering notes.

| KB | File | |
|---|---|---|
| 3,100 | `T3000_WireGuard_Implementation.docx` | ★ |
| 3,097 | `T3000_WireGuard_Implementation_zh-CN.docx` | ★ (Chinese) |
| 2,557 | `How to debug T3000_Webview.docx` | ★ |
| 1,706 | `CompileT3000AndMakeT3000SetupFile.docx` | ★ |
| 1,288 | `HelpFileDocumentation.docx` | ★ how the CHM is written |
| 582 | `TrendLog.docx` | ★ |
| 433 | `How to Update Airlab's bootloader mannually.docx` | ★ |
| 638 | `How to use TestTool Trendlogs（2）.docx` | ★ |
| 324 | `How to use TestTool record data.docx` | ★ |
| 428 | `README.docx` | ★ |
| 283 | `HowToBuildBravocontrolAPI.docx` | ★ |
| 409 | `T3000_Task_List.docx` | internal |
| 517 | `Github-Instructions.docx` | internal |
| 308 | `program debug guide.doc` | internal |
| 305 | `Alex Document .docx` | internal |
| 298 | `HowToMergerNewEditor.docx` | internal |
| 251 | `T3000_InstallShield_Manual_Instruction.docx` | internal |
| 112 | `How to create a new release in github.docx` | internal |
| 306 | `UsingC#ComponentsInT3000.docx` | internal |

**PDF: 4 small diagram documents**

- `T3000 Data Flow Chart.pdf` 0.2 MB ★
- `Graphic.pdf` 0.2 MB ★
- `FWUpdate.pdf` 0.1 MB ★
- `PTP_T3000_Client.pdf` 0.2 MB ★

**Visio: 4 source diagrams** (the sources of the three exported PDFs)

- `Graphic.vsdx` 38 KB
- `PTP_T3000_Client.vsdx` 39 KB
- `FWUpdate.vsdx` 37 KB
- `T3000 Data Flow Chart.vsd` 114 KB

**Other assets in `Documentation\`**

- `Bacnet List.xlsx` 3.4 MB ★ (register/object reference table)
- `T3000_easy_prog.prog` (example program)
- `pid.jpg` 112 KB
- `Res\` — 6 `.bmp` (help toolbar icons)

## D. Large Word drafts outside `Documentation\`

| KB | Path | Note |
|---|---|---|
| 7,103 | `debug&&release  files\T3000-BAS.docx` | **the single largest text asset** — likely a full BAS/T3000 manual draft |
| 695 | `Steps To Compile Whole Project\Readme.docx` | build guide |
| 183 | `T3000ProgramMoudle\HowToUseDll.docx` | API guide ★ |
| 183 | `T3000ProgramMoudle\HowToUseT3000 Interpreter DLL.docx` | API guide ★ |

`T3000-BAS.docx` should be inspected first: at 7.1 MB it may contain most of what the vanished CHM source contained, which would change the whole migration effort.

## E. Markdown (10 files, all small)

| KB | Path |
|---|---|
| 26 | `FIRMWARE_UPDATE_FLOW.md` ★ |
| 7 | `Documentation\t3000_openbim_haystack_plan.md` ★ |
| 7 | `Documentation\WireGuard Modbus Register Map.md` ★ |
| 4 | `README_Build.md` |
| 3 | `README.md` |
| 3 | `T3000Controls\Quick Install\README.md` |
| 3 | `Update\README.md` |
| 2 | `Unit_Test\README.md` |
| 1 | `Documentation\README.md` |
| 1 | `Documentation\rebrand.md` |

## F. Register / data tables

| Size | Path |
|---|---|
| 3.4 MB | `Documentation\Bacnet List.xlsx` ★ |
| 42 KB | `debug&&release  files\ModbusBacnetRegistersList.xls` ★ |
| 2.9 MB | `T3000 Output\Debug\ResourceFile\RegistersListDB.mdb` |
| 520 KB | `T3000 Output\Debug\ResourceFile\DeviceDatabase.mdb` |

## G. Noise — deliberately out of scope

- `T3000 Output\Debug\ResourceFile\` (7 876 files, 212.4 MB) — the app's runtime payload, not prose:
  - 7 395 `.txt` **sample PLC control programs** (`DemoPrg.txt` begins `1 REM For more keywords and how to use them, see t3000_help.chm in the installation directory`)
  - 481 `.html` + 611 `.js` + 109 `.css` — the built T3000Webview UI
  - 807 `.png`, 169 `.json`, 25 `.svg`, 24 `.ico`
  - the two `.mdb` databases listed above
- `BacnetExplore\` (21 files) — the **YABE** open-source BACnet stack: `README.txt`, `history.txt`, `MIT_license.txt`, `Treeview_license.txt`, `ZedGraph Calendar SharpPcap License-LGPL.txt`, Inno Setup `license.txt`, Xamarin template notices. Third-party.
- `packages\OpenCover.4.6.519\docs\Usage.rtf` and `License.rtf` — NuGet package documentation.
- `T3000 Output\Debug\README.txt`, `Log_info.txt`, `lease\README.txt` — build logs.

## H. Conclusions and recommended order

1. **The real corpus is small.** Three help titles and roughly 12–15 genuinely publishable Word/PDF documents exist. That is a comfortable first documentation project — nowhere near 8 000 files.
2. **The help source is gone.** No `.hhp` project exists, so the CHMs cannot be rebuilt or exported; their text must be recovered from the PDFs and `T3000-BAS.docx`, or extracted from the compiled CHMs themselves.
3. **Recommended conversion order**, highest reader value first:
   1. `HelpDocs\T3000SoftwareManualRev3.PDF` — the main reference manual
   2. `debug&&release  files\T3000-BAS.docx` — largest single body of prose; inspect its table of contents before anything else
   3. `Documentation\TrendLog.docx`, `How to use TestTool Trendlogs（2）.docx`, `How to use TestTool record data.docx`
   4. `Documentation\T3000_WireGuard_Implementation.docx` + `Documentation\WireGuard Modbus Register Map.md`
   5. the three diagram documents (`Graphic.pdf`, `FWUpdate.pdf`, `T3000 Data Flow Chart.pdf`) and `Bacnet List.xlsx` as reference tables
   6. engineering / process documents (`CompileT3000AndMakeT3000SetupFile.docx`, `How to debug T3000_Webview.docx`, `HelpFileDocumentation.docx`, `HowToBuildBravocontrolAPI.docx`)
   7. the two psychrometric manuals, if that tool is still supported

## Constraints observed

- The legacy repository was **not modified**: no file created, edited, moved or deleted; no build, no `git` write operation.
- Any `.docx` → Markdown conversion must be run on **copies** outside the legacy tree, because the platform's converter writes its output beside the source file.
- The legacy tree cannot be used as a Temco Docs *buildable source*: it has no `package.json` and no `docs/help/registry.json`, so the platform's build steps have nothing to run.

---

# Part II — What temco-platform should create

**Written:** 2026-11-05. **Basis:** the inventory above, plus the help contract read out of the app source
(`T3000\T3000.cpp:700-706` and `T3000\T3000_Help_Map.h`, verified read-only).

The ask was: the platform needs to open **projects** in order to start managing these files. This part answers
*which* projects, *what* goes in each, *what order*, and *what must be decided first*.

## I. What a project is, in this platform

A project is a **product with versions and pages** — not a folder that happens to hold files:

```
content/<project>/site.json          { "title", "section", "summary" }
content/<project>/<version>/*.md     one file per page, `##` headings inside
```

Three consequences worth stating up front, because they change how the file list gets read:

1. **Most of the 8 062 files are not content.** 7 876 are the app's runtime payload under
   `T3000 Output\Debug\ResourceFile\`; 21 are the third-party YABE stack; 13 of the 17 CHMs are duplicate copies.
2. **A file is not a page.** The 16.8 MB `T3000SoftwareManualRev3.PDF` is not "one page" — it is 100+ pages of prose
   that must be reflowed into a version's reading order.
3. **The real corpus is 31 artefacts.** That is the number to plan against, not 8 062.

## J. Recommended project set

| # | Suggested project name | id | Section | Sub names | Existing files | Files | Effort |
|---|---|---|---|---|---|---|---|
| 1 | **T3000 Building Automation System** | `t3000` | documentation | 8 | `T3000_Help.chm` · `T3000SoftwareManualRev3.PDF` · `T3000-BAS.docx` · `Graphic.pdf` · `FWUpdate.pdf` · `T3000 Data Flow Chart.pdf` · `PTP_T3000_Client.pdf` · 3 Markdown | 27 | **XL** |
| 2 | **TStat8 Thermostat** | `tstat8` | documentation | 4 | `TStat8_Help.chm` | 6 | **L** |
| 3 | **Psychrometric Tool** | `psychrometric` | documentation | 3 | `Psychrometric Help.chm` · `Psychrometric Manual.pdf` | 7 | **L** |
| 4 | **PH Chart** | `ph-chart` | documentation | 2 | `manual_ph_chart.chm` · `manual_ph_chart.pdf` | 4 | **M** |
| 5 | **TestTool** | `testtool` | documentation | 2 | `How to use TestTool Trendlogs（2）.docx` · `How to use TestTool record data.docx` | 3 | **S** |
| 6 | **Bravo Controls API** | `bravo-api` | documentation | 3 | `HowToBuildBravocontrolAPI.docx` · `broveControls_API\` sources | 4 | **M** |
| 7 | **Airlab** | `airlab` | documentation | 2 | `How to Update Airlab's bootloader mannually.docx` | 3 | **S** |
| 8 | **BACnet Reference** | `bacnet-reference` | topics | 2 | `Bacnet List.xlsx` | 3 | **M** |
| 9 | **Modbus Registers** | `modbus-registers` | topics | 2 | `ModbusBacnetRegistersList.xls` · `WireGuard Modbus Register Map.md` | 3 | **M** |
| 10 | **Sample Programs** | `sample-programs` | training | 2 | curated subset of 7 395 `*.txt` in `ResourceFile\` | 2 | **L** |

**Create 1–4 now, 8–9 when the tables are wanted, 5–7 and 10 on demand.** Projects 1–4 are the four products that already
have a help file, which is the definition of "this product has documentation". The sub names, and the existing file
behind every new file, are listed in §Y.

## K. Per project: source file → target page

### T3000 — the bulk of the work

| Source (from the inventory) | Target | Note |
|---|---|---|
| `HelpDocs\T3000_Help.chm` (15.7 MB) | ~100 pages, the F1 corpus | Text recovery only — no `.hhp`, so it cannot be rebuilt, only decompiled |
| `HelpDocs\T3000SoftwareManualRev3.PDF` (16.8 MB) | the reference manual | Overlaps the CHM heavily; merge, don't publish both |
| `debug&&release files\T3000-BAS.docx` (7.1 MB) | largest single body of prose | **Inspect its table of contents before anything else** |
| `Documentation\TrendLog.docx` | `trend-logs` page | |
| `How to use TestTool Trendlogs（2）.docx`, `How to use TestTool record data.docx` | `testtool` pages | Decide whether TestTool is a page or its own project |
| `FIRMWARE_UPDATE_FLOW.md` (26 KB) | `firmware-update` page | **Already Markdown** — zero conversion |
| `T3000_WireGuard_Implementation.docx` + `_zh-CN.docx` | `wireguard` page (+ zh variant) | Language decision needed |
| `T3000 Data Flow Chart.pdf`, `Graphic.pdf`, `FWUpdate.pdf`, `PTP_T3000_Client.pdf` | 4 figure pages | **Already PDF** — drop in as figures |
| `HowToUseDll.docx`, `HowToUseT3000 Interpreter DLL.docx` | `programming\dll` pages | |
| `Documentation\rebrand.md`, `t3000_openbim_haystack_plan.md` | inspect | One may be a plan, not a document |

### TStat8, Psychrometric Tool, PH Chart

One CHM each (plus a PDF for two of them). Each is a single-source project: decompile the CHM, split by its own
contents tree, and the page order is handed to you. These are the cheapest complete projects to finish, which is why
they come before `t3000` in the sequence.

## L. Not projects, and why

| Artefact | Files | Verdict |
|---|---|---|
| `T3000 Output\Debug\ResourceFile\*.txt` — sample PLC programs | 7 395 | Not prose. Only worth a **curated** `sample-programs` project, never a bulk import |
| same folder: `.html` `.js` `.css` `.png` | 1 200+ | Built UI of T3000Webview — build output, not documentation |
| `htmlhelp.chm`, `api.chm`, `hhaxref.chm`, `htmlref.chm`, `Viewhlp.chm` | 5 | Microsoft SDK + viewer helper. Third-party |
| `BacnetExplore\*` (YABE) | 21 | Third-party stack, licences only |
| `packages\OpenCover…\*.rtf` | 2 | NuGet package docs |
| `.gui` / `.chw` blobs | 3 (26 MB) | Compiled help index, regenerated with any CHM |
| `RegistersListDB.mdb`, `DeviceDatabase.mdb` | 2 (3.4 MB) | Runtime data — **derive** published tables from them, don't ship them |
| Engineering / process `.docx` (compile, debugging, installshield, C# components, rebrand, task list, GitHub how-to) | 8–9 | Maintainer documentation. Keep out of the reader site unless you want a private section |
| Duplicate CHM copies | 13 of 17 | Collapse to one source per title (see §M) |

## M. The dedupe question, and a product you don't have

**13 of the 17 CHMs are copies** — but the four `T3000_Help.chm` files are **7.9, 9.7, 12.8 and 15.7 MB**. Different
sizes mean different *versions*, not redundant copies. Before collapsing them, compare their contents trees: the
installed one (`T3000InstallShield\`, 9.7 MB) may be older or newer than `HelpDocs\` (15.7 MB), and picking the wrong
one silently loses topics.

**A fifth title exists in the code but not in the repository.** `T3000.cpp` chooses the help file at startup:

```cpp
if (m_special_customer == 1) m_szHelpFile = theApp.m_szAppPath + L"CPR-1000-Help.chm";
else                        m_szHelpFile = theApp.m_szAppPath + L"T3000_Help.chm";
m_szTstatHelpFile = theApp.m_szAppPath + L"HelpDoc//" + L"TStat8_Help.chm";
```

`CPR-1000-Help.chm` is not in the inventory, and `Documentation\rebrand.md` exists — so CPR-1000 is almost certainly the
**same help rebranded for one customer**, not a separate manual. That matters for the platform's data model: model it as
a **brand variant of `t3000`**, not as a fifth project, or you will maintain the same 100 pages twice.

## N. Decisions needed before the first import

| # | Question | Recommendation |
|---|---|---|
| 1 | Is the site public, or internal-only? | Public. It decides whether the 8 engineering `.docx` files ever enter a project |
| 2 | Version naming for migrated content | One version per project — `1.0` — with provenance in front matter. Add versions only when app releases genuinely diverge |
| 3 | Do the docs site versions track app releases? | No. The site carries current content; the **CHM is built per app release** from that content |
| 4 | Bilingual? | `T3000_WireGuard_Implementation_zh-CN.docx` exists and the platform user base is Chinese. Either publish zh as a second project version or record it as out of scope — but decide now, it changes the page count |
| 5 | Brand variants (`CPR-1000`) | One project + a variant field, or a rebrand step at CHM build time |
| 6 | Publish sample programs? | Not initially. Curate 20–40 representative examples later |
| 7 | Where do engineering docs live? | Nowhere in this site. They belong in the app repo's own `docs/` |

Provenance convention, using front matter the compiler already supports:

```markdown
---
title: Trend Logs
order: 30
description: Recording point history and reading it back.
source: legacy:Documentation/TrendLog.docx
---
```

## O. Sequence, with a gate after each phase

| Phase | Work | Output | Gate |
|---|---|---|---|
| **0** | Read `HelpFileDocumentation.docx` (the CHM authoring guide) and the `T3000-BAS.docx` contents tree. Compare the four `T3000_Help.chm` copies | A written topic map: legacy topic → target project/page | Map covers every CHM node, or the gap is listed |
| **1** | **Easy wins.** Create T3000, TStat8, Psychrometric Tool and PH Chart with landing pages; publish the 3 Markdown files + 4 diagram PDFs as T3000 files | First real deploy | `npm run build` on Windows, `npm run guard`, site loads with real pages |
| **2** | Decompile `TStat8_Help.chm`, `Psychrometric Help.chm`, `manual_ph_chart.chm`; split by their own contents trees | Three finished products | Each version reads end-to-end; no orphan topics |
| **3** | `t3000`: merge CHM + `T3000SoftwareManualRev3.PDF` + `T3000-BAS.docx` into one reading order | The main manual | Cross-references resolve; duplicates merged, not doubled |
| **4** | Derive `bacnet` and `modbus` tables from the `.xlsx` / `.xls` / `.mdb` | Two reference projects | Table row counts match the source |
| **5** | CHM packaging: map the **115** context IDs from `T3000_Help_Map.h` into `[MAP]`/`[ALIAS]`, name the output `T3000_Help.chm` | A drop-in replacement for F1 | F1 from 10 representative dialogs opens the intended topic |
| **6** | Optional: Bravo Controls API, Airlab, curated Sample Programs | | |

Phase 1 is deliberately small: it proves converter → catalog → PDF → deploy on real files before the XL work starts.
Phase 5 is the one that decides whether this replaces the old help or merely sits beside it.

## P. Risks

- **The CHM source is gone**, so text can only be *recovered*: decompiling gives HTML, often with absolute paths and
  inline styles that need cleaning. Budget for it; the 16.8 MB PDF is the better primary source.
- **`T3000-BAS.docx` is a draft of unknown state** (7.1 MB, outside `Documentation\`). It could hold most of the CHM's
  prose — or be 80% screenshots. Its contents tree decides phase 3, so read it first.
- **Duplicate CHMs may be different versions**; the largest is not automatically the newest.
- **Screenshots.** The manuals are screenshot-heavy, and the reader has no image pipeline beyond inline `<img>`. Decide
  whether images are re-shot (consistent, expensive) or lifted (fast, inconsistent).
- **`Bacnet List.xlsx` is 3.4 MB.** If it is one wide table it should be *generated* into Markdown at build time, not
  hand-authored.
- **Chinese content** raises encoding, font and line-length questions that the current stylesheet has not been tested
  against.

## Q. The first three things to do

1. Open the four product projects (T3000, TStat8, Psychrometric Tool, PH Chart) with a `1.0` version and a landing page.
2. Publish the seven artefacts that need no conversion: `FIRMWARE_UPDATE_FLOW.md`,
   `WireGuard Modbus Register Map.md`, and the four diagram PDFs plus `t3000_openbim_haystack_plan.md` if it is prose.
3. Read `HelpFileDocumentation.docx` and the `T3000-BAS.docx` contents tree, and write the topic map before converting
   another page.

---

# Part III — Names: projects, versions, pages, help files

One constraint produces every rule below: **a project id is permanent.** It becomes `/<project>/<version>/<page>` in
every shared link, the folder name in `content/`, and the path component of every downloaded PDF and `.chm`. Renaming one
later breaks links already handed to customers.

## R. Naming rules

| Thing | Rule | Example | Why |
|---|---|---|---|
| **Project id** | lowercase, kebab-case, ASCII, ≤ 20 chars, no version, no `docs`/`help` suffix, product not folder | `t3000`, `ph-chart`, `bravo-api` | It is in the URL and in every artefact path |
| **Display title** | the product's own name, Title Case, as printed on the device or window | `T3000`, `TStat8`, `PH Chart` | Shown in tiles, breadcrumbs, download menus |
| **Version id** | the app release string; legacy imports start at `1.0` | `1.0`, `0.9`, `2024.3` | Route-safe, sorts, and matches what support asks about |
| **Page slug** | lowercase kebab-case, **no numeric prefix**, no `.md` in links | `trend-logs.md` → `/t3000/1.0/trend-logs` | The slug *is* the URL; `/05-programs` is worse to paste than `/programs` |
| **Landing page** | `00-index.md`, exactly — the compiler requires it | `content/t3000/1.0/00-index.md` | The only reserved filename |
| **`order`** | multiples of 10 | `10`, `20`, `30` | A page can be inserted later without renumbering the rest |
| **Page title** | sentence case | `Trend logs`, `WireGuard setup` | They render as links in a 30-item tree; Title Case shouts |
| **Section** | one of the six in `sections.json` | `documentation`, `topics` | Drives the masthead |

**Rejected spellings, and why:** `T3000Docs` (mixed case breaks the URL), `t3000-help` (the suffix says nothing —
everything here is help), `psychrometric-tool` (19 chars, and `psychrometric` is unambiguous), `broveControls_API` (the
legacy folder is misspelled — `brove`, not `bravo`; keep the typo out of the id).

### The tree

```
content/
  config.json                     site-wide: repository, editBranch, siteUrl, optional hints
  sections.json                   the six sections
  <project>/
    site.json                     { "title", "section", "summary" }
    1.0/
      00-index.md                 required landing page
      <slug>.md
```

### URLs that follow

```
/t3000/1.0/                            version landing (no file — rendered from the catalog)
/t3000/1.0/trend-logs                  a page
/bacnet-reference/1.0/points-table     a reference page
/pdf/t3000/1.0.pdf                     the committed download
/chm/t3000/1.0.chm                     the committed help file
```

## S. The projects, named

| Suggested project name | id (folder / URL) | Section | Sub names | Existing files (from the inventory) | New files |
|---|---|---|---|---|---|
| **T3000 Building Automation System** | `t3000` | documentation | 8 | `T3000_Help.chm` · `T3000SoftwareManualRev3.PDF` · `T3000-BAS.docx` · `TrendLog.docx` · `FIRMWARE_UPDATE_FLOW.md` · `T3000_WireGuard_Implementation.docx` (+ `_zh-CN`) · `HowToUseDll.docx` · `HowToUseT3000 Interpreter DLL.docx` · `Graphic.pdf` · `FWUpdate.pdf` · `T3000 Data Flow Chart.pdf` · `PTP_T3000_Client.pdf` | 27 |
| **TStat8 Thermostat** | `tstat8` | documentation | 4 | `TStat8_Help.chm` (2 copies) | 6 |
| **Psychrometric Tool** | `psychrometric` | documentation | 3 | `Psychrometric Help.chm` (3) · `Psychrometric Manual.pdf` | 7 |
| **PH Chart** | `ph-chart` | documentation | 2 | `manual_ph_chart.chm` (3) · `manual_ph_chart.pdf` | 4 |
| **TestTool** | `testtool` | documentation | 2 | `How to use TestTool Trendlogs（2）.docx` · `How to use TestTool record data.docx` | 3 |
| **Bravo Controls API** | `bravo-api` | documentation | 3 | `HowToBuildBravocontrolAPI.docx` · `broveControls_API\` | 4 |
| **Airlab** | `airlab` | documentation | 2 | `How to Update Airlab's bootloader mannually.docx` | 3 |
| **BACnet Reference** | `bacnet-reference` | topics | 2 | `Bacnet List.xlsx` | 3 |
| **Modbus Registers** | `modbus-registers` | topics | 2 | `ModbusBacnetRegistersList.xls` · `WireGuard Modbus Register Map.md` | 3 |
| **Sample Programs** | `sample-programs` | training | 2 | curated subset of the 7 395 `*.txt` | 2 |

`cpr-1000` is deliberately absent: it is a brand variant of `t3000` (§M), so it keeps the `t3000` ids and only changes
which help file gets compiled.

## T. Sub names per project

Each project's files are grouped into these sub names. They order the conversion work and the `order:` numbering; they
never appear in a file name or a URL (§V).

| Project | Sub names, in order (files in each) |
|---|---|
| T3000 | Getting started (4) · Screens and points (4) · Control (5) · Monitoring (3) · Communications (5) · Maintenance (3) · Programming (2) · Reference (1) |
| TStat8 | Overview (1) · Points (2) · Control (2) · Scheduling (1) |
| Psychrometric Tool | Overview (1) · Concepts (3) · Calculations (3) |
| PH Chart | Overview (1) · Using (3) |
| TestTool | Overview (1) · Recording (2) |
| Bravo Controls API | Overview (1) · Using (2) · Reference (1) |
| Airlab | Overview (1) · Maintenance (2) |
| BACnet Reference | Overview (1) · Reference (2) |
| Modbus Registers | Overview (1) · Reference (2) |
| Sample Programs | Overview (1) · Examples (1) |

**TStat8's file names are not invented** — `T3000\Tstat_HelpDoc.h` already defines them as context IDs:

| Context ID | Value | Sub name | New file |
|---|---|---|---|
| `IDH_TOPIC_COVER_PAGE_TSTAT` | 6 | Overview | `00-index.md` |
| `IDH_TOPIC_INPUTTABLE_TSTAT` | 24 | Points | `input-table.md` |
| `IDH_TOPIC_OUTPUTTABLE_TSTAT` | 25 | Points | `output-table.md` |
| `IDH_TOPIC_ONE_HEAT_ONE_COOL_SETTING` | 26 | Control | `one-heat-one-cool.md` |
| `IDH_TOPIC_PID_HEAT_COOL_TSTAT` | 31 | Control | `pid-heat-cool.md` |
| `IDH_TOPIC_MANAGING_SCHEDULES_IN_T3000` | 35 | Scheduling | `schedules-in-t3000.md` |

The existing file behind every one of these 62 new files is in §Y.

## U. Help-file names are frozen — including a typo

These filenames are chosen by the applications, not by us. They must be produced *exactly*:

| Filename | The code that requires it |
|---|---|
| `T3000_Help.chm` | `T3000\T3000.cpp:700-706` — normal customers |
| `CPR-1000-Help.chm` | same lines — taken when `m_special_customer == 1` |
| `TStat8_Help.chm` | same lines, loaded from `HelpDoc\` |
| `PsychometricHelp.chm` | `Psychrometric Tool\…\Form1_main.cs:16266` — **"Psychometric", not "Psychrometric"** |
| `manual_ph_chart.chm` | PH Application |

So the rule for new products is `<Product>_Help.chm`, and the rule for the existing ones is *rename nothing*. Two of the
five are already misspelled or inconsistently cased in shipping code; correcting them needs an app change, not a docs
change.

Proposed place to record the contract beside the content it describes (not yet implemented — `site.json` ignores unknown
keys today, so adding it is backward-compatible):

```json
// content/t3000/site.json
{
  "title": "T3000",
  "section": "documentation",
  "summary": "…",
  "help": {
    "file": "T3000_Help.chm",
    "variants": [{ "file": "CPR-1000-Help.chm", "title": "CPR-1000" }]
  }
}
```

## V. A structural limit worth knowing now

The reader's left tree is **flat**: one list per version, no chapters. At ~27 curated pages that is fine — which is why
the `t3000` list above is the CHM's *top level*, with deeper topics becoming `##` headings inside a page. If a version
ever needs more than ~40 pages, the fix is a `group:` front-matter field and chapter headers in the tree — a model
change, not a renaming. Design pages as if grouping will arrive; do not encode chapter numbers into filenames.

## W. Create these four first

```
content/t3000/site.json          {"title":"T3000","section":"documentation","summary":"…"}
content/t3000/1.0/00-index.md
content/tstat8/site.json         {"title":"TStat8","section":"documentation","summary":"…"}
content/tstat8/1.0/00-index.md
content/psychrometric/site.json  {"title":"Psychrometric Tool","section":"documentation","summary":"…"}
content/psychrometric/1.0/00-index.md
content/ph-chart/site.json       {"title":"PH Chart","section":"documentation","summary":"…"}
content/ph-chart/1.0/00-index.md
```

That is the whole platform-side prerequisite for phase 1: four projects with landing pages, after which the seven
artefacts that need no conversion can be published into them.

---

# Part IV — Project names, sub names, file names

One row per file to create. **The URL slug is the file name without `.md`** — `getting-started.md` serves
`/t3000/1.0/getting-started`. All files sit under `content/<project>/<version>/`.

`Work` is one of:

| Value | Meaning |
|---|---|
| `ready` | Already Markdown or a self-contained PDF. Publish as-is, zero conversion |
| `convert` | `.chm` / `.docx` / `.pdf` prose to reflow into Markdown |
| `generate` | Produced from a data file (`.xlsx`, `.xls`, `.mdb`) at build time, not hand-written |
| `write` | A new hub page with no legacy source |

Sub names are for **work planning only** — the reader's tree is flat (§V), so a sub name lives in this table and in the
`order:` numbering, never in a file name or a URL.

## X. Suggested project names

| Suggested project name | id (folder / URL) | Section | Files | Sub names |
|---|---|---|---|---|
| **T3000 Building Automation System** | `t3000` | documentation | 27 | 8 |
| **TStat8 Thermostat** | `tstat8` | documentation | 6 | 4 |
| **Psychrometric Tool** | `psychrometric` | documentation | 7 | 3 |
| **PH Chart** | `ph-chart` | documentation | 4 | 2 |
| **TestTool** | `testtool` | documentation | 3 | 2 |
| **Bravo Controls API** | `bravo-api` | documentation | 4 | 3 |
| **Airlab** | `airlab` | documentation | 3 | 2 |
| **BACnet Reference** | `bacnet-reference` | topics | 3 | 2 |
| **Modbus Registers** | `modbus-registers` | topics | 3 | 2 |
| **Sample Programs** | `sample-programs` | training | 2 | 2 |

`cpr-1000` does not appear: it is a brand variant of T3000 (§M), so it reuses these files and only changes which `.chm`
is compiled.

## Y. Files: existing name → new name

**Existing file name** is the file as it is named in the legacy tree today. **New file name** is what to create under
`content/<project>/<version>/`.

| # | Project | Sub name | Existing file name | New file name | Work |
|---|---|---|---|---|---|
| 1 | T3000 | Getting started | `T3000SoftwareManualRev3.PDF`, `T3000-BAS.docx` | `00-index.md` | convert |
| 2 | T3000 | Getting started | `T3000_Help.chm` | `getting-started.md` | convert |
| 3 | T3000 | Getting started | `T3000SoftwareManualRev3.PDF` | `installation.md` | convert |
| 4 | T3000 | Getting started | `T3000_Help.chm` | `menus-and-work-area.md` | convert |
| 5 | T3000 | Screens and points | `T3000_Help.chm`, `Graphic.pdf` | `graphic-screens.md` | convert |
| 6 | T3000 | Screens and points | `T3000_Help.chm` | `inputs.md` | convert |
| 7 | T3000 | Screens and points | `T3000_Help.chm` | `outputs.md` | convert |
| 8 | T3000 | Screens and points | `T3000_Help.chm` | `variables.md` | convert |
| 9 | T3000 | Control | `T3000_Help.chm` | `programs.md` | convert |
| 10 | T3000 | Control | `T3000_Help.chm` | `pid-loops.md` | convert |
| 11 | T3000 | Control | `T3000_Help.chm`, `T3000-BAS.docx` | `schedules.md` | convert |
| 12 | T3000 | Control | `T3000_Help.chm` | `holidays.md` | convert |
| 13 | T3000 | Control | `T3000_Help.chm` | `annual-routines.md` | convert |
| 14 | T3000 | Monitoring | `TrendLog.docx`, `T3000_Help.chm` | `trend-logs.md` | convert |
| 15 | T3000 | Monitoring | `T3000_Help.chm` | `alarm-log.md` | convert |
| 16 | T3000 | Monitoring | `T3000_Help.chm` | `monitoring.md` | convert |
| 17 | T3000 | Communications | `T3000SoftwareManualRev3.PDF` | `network-navigation.md` | convert |
| 18 | T3000 | Communications | `T3000 Data Flow Chart.pdf` | `data-flow.md` | **ready** |
| 19 | T3000 | Communications | `T3000_Help.chm`, `Bacnet List.xlsx` | `bacnet-client.md` | convert |
| 20 | T3000 | Communications | `ModbusBacnetRegistersList.xls` | `modbus-client.md` | convert |
| 21 | T3000 | Communications | `PTP_T3000_Client.pdf` | `ptp-client.md` | **ready** |
| 22 | T3000 | Maintenance | `FIRMWARE_UPDATE_FLOW.md`, `FWUpdate.pdf` | `firmware-update.md` | **ready** |
| 23 | T3000 | Maintenance | `T3000_WireGuard_Implementation.docx` (+ `_zh-CN`) | `wireguard.md` | convert |
| 24 | T3000 | Maintenance | `T3000-BAS.docx` | `troubleshooting.md` | convert |
| 25 | T3000 | Programming | `HowToUseDll.docx` | `dll-programming.md` | convert |
| 26 | T3000 | Programming | `HowToUseT3000 Interpreter DLL.docx` | `interpreter-dll.md` | convert |
| 27 | T3000 | Reference | `T3000-BAS.docx` | `glossary.md` | convert |
| 28 | TStat8 | Overview | `TStat8_Help.chm` | `00-index.md` | convert |
| 29 | TStat8 | Points | `TStat8_Help.chm` | `input-table.md` | convert |
| 30 | TStat8 | Points | `TStat8_Help.chm` | `output-table.md` | convert |
| 31 | TStat8 | Control | `TStat8_Help.chm` | `one-heat-one-cool.md` | convert |
| 32 | TStat8 | Control | `TStat8_Help.chm` | `pid-heat-cool.md` | convert |
| 33 | TStat8 | Scheduling | `TStat8_Help.chm` | `schedules-in-t3000.md` | convert |
| 34 | Psychrometric Tool | Overview | `Psychrometric Manual.pdf` | `00-index.md` | convert |
| 35 | Psychrometric Tool | Concepts | `Psychrometric Help.chm` | `the-chart.md` | convert |
| 36 | Psychrometric Tool | Concepts | `Psychrometric Help.chm` | `dry-bulb-and-wet-bulb.md` | convert |
| 37 | Psychrometric Tool | Concepts | `Psychrometric Help.chm` | `relative-humidity.md` | convert |
| 38 | Psychrometric Tool | Calculations | `Psychrometric Help.chm` | `heating-and-cooling.md` | convert |
| 39 | Psychrometric Tool | Calculations | `Psychrometric Help.chm` | `humidification.md` | convert |
| 40 | Psychrometric Tool | Calculations | `Psychrometric Manual.pdf` | `worked-examples.md` | convert |
| 41 | PH Chart | Overview | `manual_ph_chart.pdf` | `00-index.md` | convert |
| 42 | PH Chart | Using | `manual_ph_chart.chm` | `the-ph-chart.md` | convert |
| 43 | PH Chart | Using | `manual_ph_chart.chm` | `reading-a-plot.md` | convert |
| 44 | PH Chart | Using | `manual_ph_chart.chm` | `worked-examples.md` | convert |
| 45 | TestTool | Overview | — (no legacy file) | `00-index.md` | write |
| 46 | TestTool | Recording | `How to use TestTool Trendlogs（2）.docx` | `trendlogs.md` | convert |
| 47 | TestTool | Recording | `How to use TestTool record data.docx` | `record-data.md` | convert |
| 48 | Bravo Controls API | Overview | `HowToBuildBravocontrolAPI.docx` | `00-index.md` | convert |
| 49 | Bravo Controls API | Using | `HowToBuildBravocontrolAPI.docx` | `build-and-setup.md` | convert |
| 50 | Bravo Controls API | Using | `broveControls_API\` sources | `authentication.md` | convert |
| 51 | Bravo Controls API | Reference | `broveControls_API\` sources | `endpoints.md` | convert |
| 52 | Airlab | Overview | — (no legacy file) | `00-index.md` | write |
| 53 | Airlab | Maintenance | `How to Update Airlab's bootloader mannually.docx` | `bootloader-update.md` | convert |
| 54 | Airlab | Maintenance | same `.docx` | `recovery.md` | convert |
| 55 | BACnet Reference | Overview | — (no legacy file) | `00-index.md` | write |
| 56 | BACnet Reference | Reference | `Bacnet List.xlsx` | `object-types.md` | generate |
| 57 | BACnet Reference | Reference | `Bacnet List.xlsx` | `points-table.md` | generate |
| 58 | Modbus Registers | Overview | — (no legacy file) | `00-index.md` | write |
| 59 | Modbus Registers | Reference | `ModbusBacnetRegistersList.xls` | `register-map.md` | generate |
| 60 | Modbus Registers | Reference | `WireGuard Modbus Register Map.md` | `wireguard-registers.md` | **ready** |
| 61 | Sample Programs | Overview | — (no legacy file) | `00-index.md` | write |
| 62 | Sample Programs | Examples | `ResourceFile\*.txt` (7 395 files) | `<category>.md` | generate |

Where the existing files live, from the inventory:

| Existing file name | Legacy folder |
|---|---|
| `T3000_Help.chm`, `TStat8_Help.chm`, `Psychrometric Help.chm`, `manual_ph_chart.chm` | `HelpDocs\` (+ 13 duplicate copies elsewhere) |
| `T3000SoftwareManualRev3.PDF`, `Psychrometric Manual.pdf`, `manual_ph_chart.pdf` | `HelpDocs\` and its `Psychrometry\` subfolders |
| `T3000-BAS.docx` | `debug&&release  files\` |
| `TrendLog.docx`, `HowToBuildBravocontrolAPI.docx`, `How to Update Airlab's bootloader mannually.docx`, `Bacnet List.xlsx`, `WireGuard Modbus Register Map.md` | `Documentation\` |
| `HowToUseDll.docx`, `HowToUseT3000 Interpreter DLL.docx` | `T3000ProgramMoudle\` |
| `How to use TestTool Trendlogs（2）.docx`, `How to use TestTool record data.docx` | `Documentation\` |
| `T3000 Data Flow Chart.pdf`, `Graphic.pdf`, `FWUpdate.pdf`, `PTP_T3000_Client.pdf` | `Documentation\` |
| `FIRMWARE_UPDATE_FLOW.md` | repository root |
| `ModbusBacnetRegistersList.xls` | `debug&&release  files\` |
| `*.txt` sample programs | `T3000 Output\Debug\ResourceFile\` |

## Z. Totals

| Project | Files | ready | convert | generate | write |
|---|---|---|---|---|---|
| T3000 | 27 | 3 | 24 | 0 | 0 |
| TStat8 | 6 | 0 | 6 | 0 | 0 |
| Psychrometric Tool | 7 | 0 | 7 | 0 | 0 |
| PH Chart | 4 | 0 | 4 | 0 | 0 |
| TestTool | 3 | 0 | 2 | 0 | 1 |
| Bravo Controls API | 4 | 0 | 4 | 0 | 0 |
| Airlab | 3 | 0 | 2 | 0 | 1 |
| BACnet Reference | 3 | 0 | 0 | 2 | 1 |
| Modbus Registers | 3 | 1 | 0 | 1 | 1 |
| Sample Programs | 2 | 0 | 0 | 1 | 1 |
| **10 projects** | **62** | **4** | **49** | **4** | **5** |

The first deploy can carry **four real files** — `firmware-update.md`, `data-flow.md`, `ptp-client.md`,
`wireguard-registers.md` — plus five hub pages authored by hand, before a single document is converted. Everything else
is reflow work, and T3000 alone is 24 of the 49 conversions.

Not in the table, by design: `cpr-1000` (a variant, §M/§U), the 13 duplicate CHM copies, the 8 engineering `.docx`
files, the Microsoft SDK help files, `BacnetExplore\`, and the 7 395 raw sample programs (only the curated subset above).

---

# Part V — What has been built, and what this plan got wrong

**Written:** 2026-11-12. This part is the record of the work this document planned; the parts above are left as written so the difference is readable.

## What exists now

| # | Project | Plan said | Built | Note |
|---|---|---|---|---|
| 1 | `t3000` | 27 pages | **136** | 129 converted from the CHM/PDF/docx, plus the six in §Y below |
| 2 | `tstat8` | 6 pages | **39** | the CHM's contents tree produced far more topics than the plan guessed |
| 3 | `psychrometric` | 7 pages | **51** | the CHM holds 51 topics, 195 files, 123 images with captions |
| 4 | `ph-chart` | 4 pages | **24** | 25 topics in the CHM; one is its cover, which is not a page |
| 5 | — | — | `temco-platform` (33) | not foreseen here: the platform's own design set became a project |

Projects 5–10 are still unbuilt, deliberately (see "Not projects" above): `testtool`, `bravo-api`, `airlab`, `bacnet-reference`, `modbus-registers`, `sample-programs`.

## Where the plan was wrong

Four findings that change the file mapping, all found by opening the sources:

1. **`T3000-BAS.docx` is not a manual.** It is *Get Started with GitHub* — installing Git and TortoiseGit, SSH keys, merging, compiling in Visual Studio 2010, across 18 headings and 138 images. So §Y rows 1, 11, 24 and 27 have no source: the `00-index.md`, `schedules`, `troubleshooting` and `glossary` targets cannot come from it. The first three were written from other material; the glossary has **no legacy source at all** and was authored from the manual's own vocabulary.
2. **`HowToUseDll.docx` and `HowToUseT3000 Interpreter DLL.docx` are the same document**, byte for byte in their text. §Y rows 25 and 26 are one page, `dll-programming`, not two.
3. **The two CHMs are far larger than planned** — 51 and 25 topics against 7 and 4 — because the plan counted *files* (`Psychrometric Help.chm` = 1) where the reader counts *topics*.
4. **`T3000 Data Flow Chart.pdf` and `PTP_T3000_Client.pdf` are diagrams with almost no text** (751 and 835 characters). They cannot be reflowed; the pages were written from the flowchart's own labels — the scan command bytes, `refresh_net_device`, `Str_T3000_Connect` — and the PDFs ship beside the pages as figures.

## The six pages this plan listed but nobody had written

| Page | Source | How |
|---|---|---|
| `data-flow` | `T3000 Data Flow Chart.pdf` | written from the chart, PDF linked as a figure |
| `ptp-client` | `PTP_T3000_Client.pdf` | written from the chart, PDF linked as a figure |
| `wireguard` | `T3000_WireGuard_Implementation.docx` | the specification, with its three screens extracted |
| `dll-programming` | both `HowToUse*.docx` | the encode/decode API, with its two screenshots |
| `annual-routines` | `T3000\Annual_Routines.cpp` | written; no prose source existed |
| `glossary` | — | written; `T3000-BAS.docx` was the wrong source |

`wireguard` is the one page that has to say what it is: the DOCX calls itself a *proposed framework*, so the page ends with a status note rather than pretending to describe a shipped screen.

---

# Part VI — The second pass, 2026-11-13

Part V closed five projects. This part is what came after re-reading the C++ repository with the measurements from Part V in hand, and it corrects four of the plan's assumptions.

## What the estate actually holds

| Source | Measured | Verdict |
|---|---|---|
| `T3000 Output\Debug\ResourceFile\**\*.txt` | 7 394 of them are **`t3web\logs\`** — webview log files, not sample programs; the only program is `DemoPrg.txt` (already published) | **`sample-programs` is withdrawn** |
| `Documentation\Bacnet List.xlsx` | 3.4 MB, but **3 sheets × 12 rows** (T3-BB 56 channels, T3-LB 26, T3-TB 22) | a page, not a project — folded into `register-maps` |
| The 13 engineering DOCX | **~4 900 words against ~190 screenshots**; `How to debug` is 380 words and 29 images | one project, not five |
| `HelpDocs\T3000SoftwareManualRev3.PDF` | 180 pages, **53 TOC entries**, all of them already published | nothing to mine |
| `T3_Bootloader\FIRMWARE_UPDATE_FLOWCHART.md` | **24 335 characters**, 14 sections | the largest unconverted document in the estate — it became `t3-firmware` |

## The five projects this pass added

| Project | Section | Pages | Built from |
|---|---|---|---|
| `t3000-api` | documentation | **83** | `T3000Webview\docs\t3000` — 100 md, minus 13 status notes and the 12 tagging pages, minus 4 indexed out |
| `t3000-engineering` | documentation (internal) | **15** | the 13 DOCX, 297 screenshots in the order the authors placed them |
| `semantic-tagging` | topics | **13** | the `haystack/` pages moved out of the API set, plus `t3000_openbim_haystack_plan.md` and a hub |
| `t3-firmware` | documentation | **11** | the bootloader flowchart split by its own sections, 2 signing guides, 3 ESP32 protocol documents |
| `register-maps` | topics | **8** | `ModbusRegistersList.xls` (385 register rows + 81 notes), the BACnet matrix, the WireGuard register map |

Two structural notes for whoever reads this next:

1. **The reading tree is still flat, and it is now 135 pages for `t3000` and 83 for `t3000-api`.** §V predicted this at ~40. The `group:` field it proposed is still unimplemented; the version page numbers every page `01…N` in one grid.
2. **`semantic-tagging` was carved out of `t3000-api` deliberately** — the tagging layer is read by the C++ shell, the web front end and the firmware alike, which is what the `topics` section is for. Publishing the same twelve pages in both projects would have been the easier and worse choice.


