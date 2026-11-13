---
title: "Semantic tagging on Temco hardware"
order: 10
---

T3000 does not have to learn a second name for a point. A point keeps the name it was given, and carries tags beside it: what it measures, what it belongs to, and which equipment it is part of. Those tags are what makes a flat point list readable by a machine — by our own assistant, by Claude or Copilot through MCP, and by a fault-detection rule that has to know which sensor it is looking at.

This is a subject that crosses products: the tags are stored on the controller, served by the web front end, and consumed by anything that speaks MCP.

## The order to read it in

1. **How tagging works now** — the current implementation, and the shape of the data.
2. **Auto-tagging** — the rules that fill tags in from a point's own name.
3. **The MCP server** — how an assistant asks for the semantic model and gets it back.
4. **The legacy design** — the single-table version, kept for the controllers still on it.
5. **The assistant and the rules** — the local model, its API, the chat screen, and the FDD engine that reads the same tags.

## The plan

The last chapter is the strategic plan this work is being built against: OpenBIM (IFC through Bonsai and thatOpen) together with Haystack, across the C++ front end, the web front end and the firmware.
