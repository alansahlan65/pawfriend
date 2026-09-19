# Animation implementation plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Fix the journey color reveal | HIGH | DONE |
| 002 | Make keyboard navigation instant | HIGH | DONE |
| 003 | Complete the reduced-motion path | MEDIUM | DONE |
| 004 | Fix mobile-menu physicality | HIGH | DONE |
| 005 | Make the shortlist drawer interruptible | MEDIUM | DONE |
| 006 | Gate hover motion to fine pointers | MEDIUM | DONE |

## Execution order

1. Plan 002, because input modality is shared by later menu and drawer work.
2. Plans 004 and 005, because they define the final state classes.
3. Plans 001 and 006, because the journey fix and hover query overlap.
4. Plan 003 last, so reduced-motion overrides target the completed interaction states.

Plans 001 and 006 should land together. Plan 003 depends on plans 004 and 005.
