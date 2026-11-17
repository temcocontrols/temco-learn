---
title: "Studio navigation and highlighting"
order: 60
---

How clicks, scroll sync, and highlights work across **Explorer**, **Target PDF**, and **WYSIWYG**. Read this before changing `studio/app.js` or `studio/pdf-viewer.html`.

## Golden rules

1. **Single click** in any pane → select the same `data-studio-id` / element window in all three panes (when highlighting is on).
2. **Double-click** → depends on target (see below). Product-shot link images → Blender.
3. **Scroll** in PDF or WYSIWYG is linked (same page + within-page anchor). Explorer scrolls to the selected row on any pane click.
4. **Ctrl+wheel** zooms the pane under the pointer; plain wheel scrolls.
5. **Workspace pan** — you can scroll **past the page edges** into the gray margin (trackpad shift+wheel, horizontal wheel, or scrollbar). This is intentional “desk space,” not a bug.
6. **Scroll bounds (hard rule)** — **dead space is strictly forbidden** in the Target PDF and WYSIWYG panes. You must **never** scroll past the **document** into empty gray with no page content. See **`docs/STUDIO_PANE_BOUNDS.md`** (canonical spec) and §Scroll bounds below.
7. **Scrollbars (hard rule)** — **vertical scrollbars are hover-only** in Target PDF and WYSIWYG. Hidden by default; visible while the pointer is over the pane or briefly after scroll. No `scrollbar-gutter: stable`. See §Scrollbars below.

## Double-click → what happens

| Target | Result |
|--------|--------|
| **PDF** tint box | Manual **resize** on PDF (`ELEMENT_WINDOW_RESIZE.md`) |
| **Explorer** — Document leaf (`text:*`, `table:rh-temp`, `table:co2-specs`, `asset:*`, …) | **Resize** on PDF (PDF grid tables are not Excel) |
| **Explorer** — **Tables (Typst)** leaf (`electrical-specs`, `radio-specs`) | **Excel** (`TABLE_EDITING.md`) |
| **Explorer** — **Links** leaf | Blender |
| **WYSIWYG** — block with `data-table-id` (PDF grid) | **Resize** on PDF only |
| **WYSIWYG** — block with `data-table-id` (Typst CSV, if present in HTML) | **Excel** only |
| **WYSIWYG** — other `data-studio-id` block | **Resize** on PDF |
| **WYSIWYG** — `data-link-slot` image | Blender |

**Single click** into a WYSIWYG table cell still allows **inline** HTML edit (`contenteditable`); that is separate from double-click.

## Click → what happens

| You click | Explorer | Target PDF | WYSIWYG |
|-----------|----------|------------|---------|
| Explorer leaf | Select row | Scroll + highlight window | Scroll to **content block** + outline |
| PDF tint box (`.pdf-element-window`) | Select row | Active outline on tint | Scroll to **content block** + outline |
| PDF page background | Page folder / page | Page highlight | Scroll to page |
| WYSIWYG text/table (`[data-studio-id]`) | Select row | Highlight window | Focus/outline on block |

Implementation: every path ends in `syncFromPaneClick()` → `navigateToStudioBlock()`.

- PDF iframe posts `{ type: "studio-navigate", navigateId, source: "pdf" }`.
- WYSIWYG iframe posts the same with `source: "wysiwyg"` (capture click on `[data-studio-id]`).
- Explorer calls `selectTreeItem()` → `syncFromPaneClick(..., "tree")`.

## Highlighting on vs off

**Right-click** the **Target** or **Document** group title in the explorer toggles highlighting (`localStorage`: `datasheet-studio-pane-highlights`).

| Mode | PDF passive tints | PDF click hit-test | Active outline on click | WYSIWYG overlay | Tree colored selection |
|------|-------------------|--------------------|-------------------------|-----------------|------------------------|
| **On** (default) | Visible | Yes | Yes (`.active` on tint) | Yes | Yes |
| **Off** | Hidden (`passive-hidden`) | **Still yes** | Yes (`.active` on invisible tint) | Off | Grey only |

PDF clicks must keep the **active tint** on the clicked window. Parent must not send `highlight-pdf-clear` before re-highlight (that wiped `.active`). Use `useElementWindow: true` on `highlight-pdf` when `element-windows.json` defines the box.

Navigation and scroll still run when highlighting is off; only passive tints and tree colors are suppressed.

Status bar appends `(highlighting off)` when toggled off.

## PDF pane requirements

Clicks on elements only work when:

1. **PDF pane is visible** (not hidden via **Hide**).
2. **`element-windows.json` is loaded** into the iframe (`set-pdf-windows` message from parent).
3. **PDF pages have finished rendering** (`pdf-viewer-ready` → parent re-sends windows).

If clicks do nothing on the PDF:

- Click **Reload UI**.
- Check status: should not say highlighting is off unless you turned it off.
- Right-click **Document** group → turn highlighting back on if needed.

## WYSIWYG scroll requirements

When PDF or explorer selects a block, WYSIWYG must scroll to the **HTML content** (`section[data-studio-id="table:co2-specs"]`, etc.), **not** the thin `.wysiwyg-element-window` overlay. Overlays are `pointer-events: none` and smaller than the block.

Before scrolling, parent calls `updateWysiwygSpacer()` so `.pane-scroll` has enough `scrollHeight` (tall iframe + zoom spacer).

## Workspace pan (beyond page width)

Users expect to pan into the **gray area** around the white page (like Figma/Illustrator), not be clamped to the page bounding box.

| Pane | Scroll container | Workspace margin |
|------|------------------|------------------|
| **Target PDF** | iframe `#viewport` (`pdf-viewer.html`) | `#scroll` padding: **80px** left/right, **32px** top/bottom |
| **WYSIWYG** | parent `.pane-scroll` | `body.datasheet-wysiwyg` padding: same values (`target-wysiwyg.css`) |

### Parent shell (WYSIWYG only)

- `.pane-scroll` must use **`overflow: auto`** on both panes (never `overflow-x: hidden` on PDF/WYSIWYG scroll areas).
- `.pane-zoom-root` must **not** use `max-width: 100%` — that clamps the zoom layer to the pane and kills horizontal `scrollWidth`.
- `updateWysiwygSpacer()` sets iframe width to **page width + 2× margin** (not `width: 100%`) and sizes `#wysiwyg-zoom-port` to `content × zoom`.

### PDF iframe

- Scrolling happens **inside** the iframe (`#viewport`), not the outer `.pane-scroll` (the iframe is `width: 100%`).
- `reportLayout()` must use **`scrollEl.scrollWidth`** (includes `#scroll` padding) when posting `pdf-layout` so fit-to-pane zoom and spacers stay correct.
- Constants in `app.js`: `WORKSPACE_MARGIN_X_PX` / `WORKSPACE_MARGIN_Y_PX` (keep in sync with CSS padding).

### Do not break

- Removing `#scroll` / body padding without shrinking fit-zoom math → page feels “stuck” to pane width again.
- Re-adding `overflow-x: hidden` on `.pane-scroll` → WYSIWYG cannot pan horizontally.
- Setting WYSIWYG iframe back to `width: 100%` only → spacer width equals pane, no horizontal slack.

## Scrollbars (hover-only vertical)

**Hard rule:** Target PDF (`#viewport`) and WYSIWYG (`.pane-scroll`) must **not** show a permanent vertical scrollbar track.

| Pane | Scroll container | Stylesheet |
|------|------------------|------------|
| **Target PDF** | iframe `#viewport` | `studio/scrollbar-hover.css` |
| **WYSIWYG** | `#wysiwyg-pane .pane-scroll` | same (via `index.html`) |

### Implementation

- Default thumb is **transparent** (`scrollbar-color: transparent transparent`; WebKit `::-webkit-scrollbar-thumb:vertical`).
- Class **`scrollbar-reveal`** (or `:hover` on `#viewport`) shows the thumb.
- **PDF:** `mouseenter` / `mouseleave` / `scroll` on `#viewport` in `pdf-viewer.html`.
- **WYSIWYG:** `wireWysiwygScrollbarReveal()` in `app.js` — `mouseenter` on pane, `mousemove` hit-test over pane bounds (iframe-safe), `scroll` on `.pane-scroll`.
- **Forbidden:** `scrollbar-gutter: stable` on document panes (reserves dead gutter).

### Do not break

- Removing `scrollbar-hover.css` from `index.html` or `pdf-viewer.html`.
- Always-visible scrollbars on `.pane-scroll` / `#viewport`.

## Scroll bounds (no dead space below the document)

**Canonical spec:** **`docs/STUDIO_PANE_BOUNDS.md`**. Regression check: `python tools/verify_pane_bounds.py`.

**Hard rule:** Scroll height must equal **scaled document size + workspace margin**, not document size **plus** a second scaled copy from a duplicate spacer.

| Pane | Scroll container | Sized by | Max scroll |
|------|------------------|----------|------------|
| **Target PDF** | iframe `#viewport` | `#zoom-port` = `#scroll` bounds × zoom | Bottom of last page + **32px** bottom margin visible at most |
| **WYSIWYG** | `.pane-scroll` | `#wysiwyg-zoom-port` = iframe content × zoom | Bottom of last `.pdf-page` + **32px** margin |

### Implementation

- Use a **`#zoom-port` / `#wysiwyg-zoom-port`** wrapper sized to `content × zoom`. Put `transform: scale(zoom)` on the inner root. **Do not** add a sibling spacer equal to the full scaled height (that doubles scroll range).
- **`clampViewportScroll()`** (PDF iframe) and **`clampWysiwygPaneScroll()`** (parent) delegate to **`studioPaneBounds.enforceScrollBounds()`** in `studio/pane-bounds.js`.
- If the user sees only gray `#3a3a3a` (PDF) or `#909090` (WYSIWYG) with no white page sheet, they have scrolled past the document — clamp or fix layout.

### Verification

1. Open a 3-page example (e.g. `current-sensor-cs`). Scroll to the bottom of page 3 in the PDF pane.
2. The last page footer should remain visible; you cannot wheel past it into a full viewport of empty gray.
3. Repeat in WYSIWYG — last page content visible, no blank gray beyond margin.
4. Horizontal pan still works into left/right **80px** margin beside the page.

## Startup order (do not break)

`refreshAll()` must be **sequential**:

1. `refreshProject()` — load PDF + WYSIWYG iframes.
2. `refreshOutline()` — load element windows, table grids, explorer tree.
3. `pushPdfElementWindows()` — after outline (and again on PDF `load` / `pdf-viewer-ready`).

**Do not** run `refreshProject` and `refreshOutline` in parallel; the PDF iframe often loads before windows are pushed, leaving no tint divs to click.

## Message contract (parent ↔ PDF iframe)

| Message | Direction | Purpose |
|---------|-----------|---------|
| `set-pdf-windows` | parent → PDF | `{ windows, passiveVisible }` |
| `pdf-viewer-ready` | PDF → parent | Pages rendered; re-push windows |
| `studio-navigate` | PDF/WYSIWYG → parent | Click selection |
| `highlight-pdf` | parent → PDF | Active window / rect from explorer or WYSIWYG (`useElementWindow` → `.active` tint) |
| `set-pdf-active-window` | parent → PDF | Set `.active` on a known `windowId` without region overlay |
| `highlight-pdf-clear` | parent → PDF | Clear selection overlays |
| `save-pdf-text` | PDF → parent | `{ id, text }` — write text to reference PDF |
| `load-pdf-text` | PDF → parent | Request editor text; parent replies `pdf-text-content` |
| `pdf-text-content` | parent → PDF | `{ id, text, font_pt }` for inline PDF editor |
| `enter-pdf-text-edit` | parent → PDF | Open text editor for window |
| `group-elements` / `ungroup-elements` | PDF/WYSIWYG → parent | Ctrl+G / Ctrl+U |
| `pane-scroll-sync` | PDF → parent | Linked scroll |

## Keyboard shortcuts (document panes)

Works in the **shell**, **PDF iframe**, and **WYSIWYG iframe** (when focus is not in a text field):

| Shortcut | Action |
|----------|--------|
| **Ctrl+G** | Join multi-selected elements |
| **Ctrl+U** | Ungroup selected grouped element |
| **F2** | Edit text on PDF (text tint selected, PDF pane) |
| **Ctrl+click** | Add/remove from multi-selection |

Multi-select: **Ctrl+click** in explorer, PDF tint, or WYSIWYG block. With ≥2 joinable items selected, **right-click** → **Join into single element**.

Text alignment: **right-click** a **text** tint → Left / Center / Right / Justify (`POST /api/text-align`).

See **`docs/PDF_DIRECT_EDIT.md`**, **`docs/ELEMENT_GROUPING.md`**.

## Related docs

- `docs/STUDIO.md` — UI overview
- `docs/PDF_DIRECT_EDIT.md` — edit text and move text blocks in the reference PDF
- `docs/ELEMENT_GROUPING.md` — join / ungroup (Ctrl+G / Ctrl+U)
- `docs/ELEMENT_WINDOW_RESIZE.md` — double-click resize
- `docs/AGENT_FIX_LOG.md` — regression notes for agents
