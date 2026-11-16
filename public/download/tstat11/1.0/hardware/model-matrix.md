---
title: "The Tstat11 IO envelope"
order: 20
---

The firmware decides how many points a model has from its model id, and `MINI_TSTAT11` is id 29. The limits themselves come from the TSTAT10 set — `main/commsub.c` maps both ids onto `TSTAT10_*` — so a Tstat11 has the same envelope as a TSTAT10, and this table is the authoritative answer to "how many inputs does it have".

| Model | Model id | AI | DO | AO | AV | DI | SC |
|---|---|---|---|---|---|---|---|
| T3-BB (Big Brother) | `MINI_BIG_ARM` = 5 | 32 | 12 | 12 | 128 | 0 | 8 |
| T3-LB (Little Brother) | `MINI_SMALL_ARM` = 6 | 16 | 6 | 4 | 128 | 0 | 8 |
| T3-TB (Tiny Brother) | `MINI_NEW_TINY` = 4 | 8 | 8 | 6 | 128 | 0 | 8 |
| T3-Nano | `MINI_TINY_ARM` = 7 | 11 | 6 | 2 | 128 | 0 | 8 |
| VAV controller | `MINI_VAV` = 10 | 6 | 1 | 2 | 5 | 0 | 8 |
| TSTAT10 | `MINI_TSTAT10` = 9 | 13 | 5 | 2 | 128 | 8 | 8 |
| T10P | `MINI_T10P` = 11 | 17 | 5 | 4 | 128 | 8 | 8 |
| **Tstat11** | `MINI_TSTAT11` = 29 | 13 | 5 | 2 | 128 | 8 | 8 |

AI analog input · DO digital output · AO analog output · AV analog variable · DI digital input · SC schedule

## What the columns are

- **AI / DI** — the input tables. A universal input counts in AI; the DI column is the fixed digital inputs some models add.
- **DO / AO** — the output tables. DO is a relay or triac, AO is an analogue signal.
- **AV** — the variable table, 128 on every model in this family, because variables are memory rather than terminals.
- **SC** — schedules, eight on every model.

The Tstat11 row is the one to read: it is the TSTAT10 envelope, and the firmware special-cases the two ids together in six places in `main/flash.c` as well as in `commsub.c`.
