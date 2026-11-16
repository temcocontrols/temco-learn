---
title: "Read me first (agents)"
order: 30
---

This folder is **Datasheet Studio** — a PDF + WYSIWYG editor bundled inside the main **WooIntegration2** CRM project (or checked out as `datasheet/` under the repo root).

**If you were told to read the docs here, start with this page, then follow the reading order below.**

---

## What this folder is (30 seconds)

| Piece | What it does |
|-------|----------------|
| **Studio UI** (`studio/`) | Browser app: PDF on the left, editable HTML on the right, element explorer |
| **Python server** (`tools/studio_server.py`) | REST API, PDF edits (PyMuPDF), layout codegen |
| **Examples** (`examples/`) | Per-product data: reference PDF, box geometry, WYSIWYG HTML |
| **Typst + Blender** (optional) | Separate **compile** path for products built from source — **not required for most CRM work** |

The **reference PDF** is layout authority. WYSIWYG must match it visually.

**Not an MSI.** Runs as a local service (Python HTTP + browser), like the CRM static server and Order API.

**No runtime AI.** Detection and onboarding are rule-based Python scripts.

---

## Do you need Typst or Blender?

**For WooIntegration2 / Parts / Bravo catalog datasheet editing: NO.**

| Your task | Read | Typst | Blender |
|-----------|------|-------|---------|
| Fix Studio UI, PDF pane, WYSIWYG | **`AGENTS.md`**, **`docs/STUDIO.md`** | No | No |
| Edit `current-sensor-cs` or other PDF-only examples | **`AGENTS.md`** | No | No |
| Wire CRM “Edit datasheet”, Postgres, Parts tab | **`AGENTS.md`** § CRM + WooIntegration2 root **`AGENTS.md`** | No | No |
| Rebuild `solar-lora-sensor` from `datasheet.typ` | **`docs/EDITING_WORKFLOW.md`** | Yes | Often |
| Update 3D product-shot graphics | **`docs/LINKED_GRAPHICS.md`** | No | Yes |

Typst and Blender live in **sibling repos** (`D:\XDrive\typst`, `D:\XDrive\blender`). Do not assume they are installed unless the user asks for a Typst/Blender rebuild.

---

## Reading order

### 1 — Always (every agent)

1. **`../AGENTS.md`** — architecture, key files, hard rules, API cheat sheet, past bugs
2. **[`STUDIO.md`](STUDIO.md)** — panes, zoom, navigation, operator workflow

### 2 — When touching layout or WYSIWYG

3. **[`WYSIWYG_MATCH_RULES.md`](WYSIWYG_MATCH_RULES.md)** — mandatory visual match rules
4. **[`STUDIO_PANE_BOUNDS.md`](STUDIO_PANE_BOUNDS.md)** — no dead gray scroll space (hard rule)
5. **`AGENT_FIX_LOG.md`** — do not repeat known bugs

### 3 — When editing PDFs or moving boxes

6. **[`PDF_DIRECT_EDIT.md`](PDF_DIRECT_EDIT.md)** — F2 text edit, move writes to PDF
7. **[`ELEMENT_WINDOW_RESIZE.md`](ELEMENT_WINDOW_RESIZE.md)** — resize/move element windows

### 4 — CRM / master app context

8. **WooIntegration2 root `AGENTS.md`** — one level up from this folder (`../AGENTS.md` when you are in `datasheet/`; Order API, PostgreSQL, CRM startup)
9. **[`DATA_HOME.md`](DATA_HOME.md)** — all working files stay in this folder; never write to hardware repos

### 5 — Only if asked for Typst/Blender compile

10. **[`EDITING_WORKFLOW.md`](EDITING_WORKFLOW.md)**
11. **[`LINKED_GRAPHICS.md`](LINKED_GRAPHICS.md)**
12. **[`TABLE_EDITING.md`](TABLE_EDITING.md)**

---

## Quick start (standalone Studio)

From this folder (adjust path if nested under WooIntegration2):

```powershell
cd datasheet   # or D:\XDrive\datasheet
.\tools\studio.ps1 -Example current-sensor-cs
```

Opens **http://127.0.0.1:8792/**. Primary dev example: **`current-sensor-cs`** (Temco current-sensor brochure PDF).

After changing **`tools/studio_server.py`** or generated CSS: **restart the server** and **Reload UI**.

---

## Relationship to WooIntegration2

| WooIntegration2 | Datasheet folder |
|-----------------|------------------|
| CRM Explorer (`:5500`), Order API (`:3000`) | Studio UI + Python PDF engine |
| PostgreSQL `project` schema | JSON manifests today; Postgres merge planned |
| `assets/bravo-datasheets/` — mirrored catalog PDFs | Working editor for those PDFs (integration in progress) |
| Node / Express | Python / PyMuPDF for PDF mutations |

**Two AGENTS files:** read **WooIntegration2 root `AGENTS.md`** for CRM and database rules; read **`datasheet/AGENTS.md`** for Studio rules. CRM agents doing datasheet work still follow WooIntegration2 **PostgreSQL-only** and **no SQLite** policies.

---

## Primary example paths

| Example | Use | Reference PDF |
|---------|-----|---------------|
| **`current-sensor-cs`** | CRM / Bravo-style PDF editing | `examples/current-sensor-cs/reference/CS_single-phase.pdf` |
| **`solar-lora-sensor`** | Typst + Blender full pipeline | `examples/solar-lora-sensor/reference/SolarPoweredSensor.pdf` |

---

## Verify before claiming “done”

```powershell
python tools/verify_pane_bounds.py
python tools/verify_onboard_match.py --example current-sensor-cs   # when layout changed
```

Reload Studio in the browser. Confirm PDF, WYSIWYG, and explorer stay in sync for the blocks you changed.

Log non-obvious fixes in **`docs/AGENT_FIX_LOG.md`**.

---

## Full doc index

See **`../AGENTS.md`** → Documentation index, or browse **`docs/`** for topic-specific specs (onboarding, tables, grouping, studio vars, etc.).
