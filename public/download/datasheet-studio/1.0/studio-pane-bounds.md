---
title: "Studio pane bounds — zero dead space (hard rule)"
order: 180
---

**Applies to:** **Target PDF** pane and **WYSIWYG** pane only (the two document panes right of the explorer). The explorer sidebar is excluded.

## Hard rule

**Dead space is strictly forbidden** in either document pane:

1. **No scroll past the document** — at maximum scroll (bottom / right), the user must still see page content or the intentional workspace margin (**80px** horizontal, **32px** vertical). A full viewport of empty gray (`#3a3a3a` PDF, `#909090` WYSIWYG) with no white page sheet is always a **bug**.
2. **No duplicate scroll range** — the scroll container’s `scrollHeight` / `scrollWidth` must match **`#zoom-port` / `#wysiwyg-zoom-port`** plus scroll padding within **3px**. Extra slack is dead space.
3. **Port size = content × zoom** — zoom-port dimensions are `ceil(contentSize × zoom)` only. No sibling spacers, no second scaled copy of the document in the layout tree.
4. **No collapsed WYSIWYG iframe** — WYSIWYG iframe height must stay explicit (content height in px). Never leave `height: auto` after layout settles.
5. **Workspace margin is the only “gray beyond page”** — panning into margin beside/below the last page is allowed; panning into void **past** margin is not.

Agents changing `studio/app.js`, `studio/pdf-viewer.html`, `studio/pane-bounds.js`, or WYSIWYG preview layout **must** run `python tools/verify_pane_bounds.py` before finishing.

## Architecture

| Pane | Scroll container | Port wrapper | Content size source |
|------|------------------|--------------|---------------------|
| **Target PDF** | iframe `#viewport` | `#zoom-port` | `#scroll` `scrollWidth` × `scrollHeight` (includes padding) |
| **WYSIWYG** | `#wysiwyg-pane .pane-scroll` | `#wysiwyg-zoom-port` | iframe `772×contentH` → scaled by outer `transform` |

Shared constants and clamp helpers: **`studio/pane-bounds.js`** (`studioPaneBounds`).

## Implementation checklist (required)

- [x] `#zoom-port` / `#wysiwyg-zoom-port` sized in `reportLayout()` / `updateWysiwygSpacer()`
- [x] `transform: scale(zoom)` on inner root only (`#zoom-root`, `#wysiwyg-zoom-root`)
- [x] **No** `#zoom-spacer`, `#wysiwyg-zoom-spacer`, or inner `wysiwyg-spacer` height doubling
- [x] `clampViewportScroll()` (PDF) and `clampWysiwygPaneScroll()` (parent) call `studioPaneBounds.enforceScrollBounds()`
- [x] `bindPaneScrollGuard()` on both panes — continuous scroll/resize audit + repair hook
- [x] WYSIWYG iframe width = `WYSIWYG_CANVAS_W` (612 + 2×80), not `width: 100%`
- [x] PDF iframe `#pdf-target` = `width:100%; height:100%` (HTML default 300px leaves shell dead space)
- [x] Auto-fit zoom uses **page width** (612pt WYSIWYG, 612×1.25 PDF bitmap), not canvas+margin — page fills pane; margin pan-only
- [x] PDF `#scroll` padding = WYSIWYG `body.datasheet-wysiwyg` padding = **32px 80px**
- [x] Inner WYSIWYG preview **must not** CSS-scale `.wysiwyg-scroll` (outer pane owns zoom)

## Regression guardrails

| Guard | Location |
|-------|----------|
| Runtime clamp + audit | `studio/pane-bounds.js` → `enforceScrollBounds()`, `auditPortSize()` |
| Continuous scroll guard | `studio/pane-bounds.js` → `bindPaneScrollGuard()` |
| WYSIWYG shell | `studio/app.js` → `auditWysiwygPaneBounds()`, `bindWysiwygPaneBoundsGuard()` |
| PDF iframe | `studio/pdf-viewer.html` → `clampViewportScroll()`, `bindPaneScrollGuard()` |
| Static source checks | `python tools/verify_pane_bounds.py` (runs on `studio.ps1` launch) |
| Agent notes | `docs/AGENT_FIX_LOG.md` |

Run before merge or after navigation/zoom changes:

```bash
python tools/verify_pane_bounds.py
```

## Verification (manual)

1. Open `current-sensor-cs` (3 pages). Reload UI.
2. **PDF:** scroll to bottom of page 3 — footer visible; wheel does not reveal a full screen of empty gray.
3. **WYSIWYG:** same — last `.pdf-page` visible at max scroll.
4. **Horizontal:** pan into left/right gray margin beside the page; stop at margin edge.
5. **Apply & Refresh** — bounds unchanged (no runaway zoom, no collapsed WYSIWYG).
6. Browser console must **not** show `[Studio pane bounds]` warnings during normal use.

## Related

- `docs/STUDIO_NAVIGATION.md` — click/sync/highlighting
- `docs/STUDIO.md` — auto-fit split (no dead space **between** panes)
