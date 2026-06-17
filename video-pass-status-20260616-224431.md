# Video Pass Status

Date: 2026-06-16 22:44 PT

## Current State

- Dialogue script is locked for S1-S8 plus CTA voiceover.
- First-pass video model selected: `Sync Lipsync 2 Pro`.
- `Sync Lipsync 2 Pro` is the selected model for the next pass, but the visible ElevenLabs video nodes still need to be switched from `OmniHuman 1.5` before rendering. A browser-side switch attempt did not persist after the Flow re-rendered.
- Full render packet saved in `video-render-plan-20260616-224431.json`.
- No dialogue video generation was intentionally run in this pass.

## Why No Render Was Run Yet

The live ElevenLabs Flow still needs the approved source frames wired into the dialogue video nodes before rendering:

- Camera A source: `final-camera-a-color-lock-20260616-220447.webp`
- Camera B source: `final-camera-b-color-lock-20260616-220447.webp`
- CTA screenshot source: `meal-prep-revolution-final-cta-screenshot-20260616-img.jpg`

The existing Flow dialogue nodes were originally connected to older direct portrait references. Rendering against those would risk producing the wrong direct-to-camera look and would waste credits.

The visible Flow also still shows the dialogue video nodes as `OmniHuman 1.5`; change them to `Sync Lipsync 2 Pro` after the locked source frames are connected.

## Render Gate

Run video generation only after:

- S1, S3, S6, and S8 are wired to the locked Camera A still.
- S2, S4, S5, and S7 are wired to the locked Camera B still.
- CTA uses the website screenshot hold with Character B voiceover.
- Old portrait references are not used for the dialogue video pass.
- Dialogue video nodes are visibly set to `Sync Lipsync 2 Pro`, not `OmniHuman 1.5`.

## Model Rule

Use `Sync Lipsync 2 Pro` for the first client-reviewable low-res video pass. Use `Veed Lipsync` only for throwaway mouth-timing proof. Escalate to `Creatify Aurora` only if more UGC-style expression is needed after lip sync is stable.
