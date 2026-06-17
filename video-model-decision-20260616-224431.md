# Meal Prep Revolution Video Model Decision

Date: 2026-06-16 22:44 PT

## Selected First-Pass Model

Use `Sync Lipsync 2 Pro` for the low-resolution dialogue video pass.

Reason:

- ElevenLabs model picker lists it as `661/s`.
- It is described in the picker as studio-grade lip sync for live-action, animation, and AI content.
- It is much cheaper than `OmniHuman 1.5` at `1,267/s`.
- It is also cheaper than `Creatify Aurora` at `848/s`, `Sync 3` at `1,053/s`, `Veed Fabric` at `1,212/s`, and `HeyGen Avatar 4` at `1,212/s`.
- It should preserve the locked source stills better than a more expressive avatar model because this pass prioritizes perfect lip sync and continuity over acting.

## Model Ladder

1. `Veed Lipsync` at `41/s`: throwaway mouth-timing proof only.
2. `Sync Lipsync 2 Pro` at `661/s`: default low-res production pass.
3. `Creatify Aurora` at `848/s`: backup if Sync is too stiff and we need more UGC-style expression.
4. `OmniHuman 1.5` at `1,267/s`: only if body expression becomes more important after the mouth sync is approved.

## Render Rule

Do not use higher resolution or more expensive models until:

- Character A and Character B keep the exact locked faces and outfits.
- The bikes stay side-by-side and parallel.
- Neither woman switches seats, bikes, sides, or positions.
- The active speaker's mouth stays fully visible.
- Lip sync is clean in every dialogue scene.

## CTA Rule

Do not render the CTA as Character B talking from the bike for final. Use the supplied Meal Prep Revolution website screenshot as the visual hold and place Character B's CTA voiceover over that screenshot.
