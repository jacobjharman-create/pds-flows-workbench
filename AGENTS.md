# PDS Flows Workbench Agent Rules

This project inherits the global PDS operating standard from `/Users/CoachHarman/.codex/AGENTS.md`.

## Connection Record

Source of truth:
GitHub repo `jacobjharman-create/pds-flows-workbench`.

Editable surface:
Local static site package at `/Users/CoachHarman/Documents/Codex/pds-flows-workbench`.

Generated output:
Static HTML media review board for ElevenLabs Flows previews.

Live destination:
Public sandbox deployment for phone/off-Wi-Fi review.

Manual sink path:
Update local files, commit intentionally, push to GitHub, then deploy.

Publish trigger:
Explicit Jacob approval or direct request to publish/share the current preview.

Disconnect trigger:
When the ElevenLabs Flow canvas is superseded, stale, errored, or replaced by a newer exported preview batch.

Rollback source:
Previous Git commit and prior hosted deployment.

Verification:
Open the hosted URL on desktop and mobile/cellular. Confirm images and MP4 previews load.

## Operating Rules

- Keep this sandbox as a review surface, not the durable prompt/character source.
- The durable PDS Flows memory remains in `/Users/CoachHarman/Documents/Prometheus/workbench/pds-operating-hub/02-creative-production/pds-flows/`.
- Do not store ElevenLabs credentials, API keys, private client data, or signed temporary URLs as source of truth.
- Prefer downloaded preview assets over expiring ElevenLabs signed URLs.
- Use low-resolution draft assets for wiring and lip-sync QA. Upgrade only after approval.

## Update Sandbox Trigger

When Jacob says `update sandbox`, treat it as a complete PDS Flows sandbox publish task.

Required behavior:

1. Rebuild the local sandbox from this source repo.
2. Verify the generated page and assets.
3. Sync the workbench into `/Users/CoachHarman/Documents/Codex/prometheus-design-studios-ai-studio/pds-flows-workbench/`.
4. Commit and push this source repo when files changed.
5. Commit and push the `hostinger-live` sink when files changed.
6. Verify the public page at `https://prometheusdesignstudios.com/pds-flows-workbench/?v=<live_commit>`.
7. Confirm public MP4 files return `206 video/mp4` for phone playback.
8. Confirm public poster/still images and audio beds return valid phone-safe responses when present.
9. Always send Jacob the updated sandbox link after verification.

Default output should remain videos-only unless Jacob explicitly asks for a different review stage.

Stage-first rule:

- The sandbox must lead with the newest media type from the current update.
- Set `review-stage.json` to the current stage (`audio`, `photo`, or `video`) before rebuilding.
- Current-stage review assets must use immutable timestamped filenames, not overwritten stable filenames, so mobile/Hostinger caches cannot show old renders.
- The rendered page should visibly identify latest renders with date/time when there is any risk of confusion.
- If the latest update produced photos/stills, the photo/still board goes first.
- For two-person recumbent-bike dialogue, use the parallel-bike over-the-shoulder reverse-angle template: Camera A over Character B's blurred shoulder toward Character A, Camera B over Character A's blurred shoulder toward Character B, both bikes parallel and facing the same direction.
- In reverse-angle shots, the foreground listener may appear only as blurred shoulder/hair/upper arm/back-of-head; the listener's mouth must not be visible.
- If the latest update produced videos, the video strip goes first.
- If the latest update produced audio beds, include the audio section near the relevant current stage.
- Older videos, stills, or audio can remain below as reference, but Jacob should not have to scroll past stale media to find the newest output.
- Do not leave `review-stage.json` pointing at an older stage after producing new media.

## Absolute Continuity Lock

For the Meal Prep Revolution recumbent-bike shoot, the approved locked references are:

- Character A: `final-character-a-dark-taupe-20260616-220447.webp`
- Character B: `final-character-b-teal-accent-20260616-220447.webp`
- Bike prop plate: `recumbent-bike-3d-prop-plate-20260617-0207.png`

The whole shoot has only these two characters. Every scene must keep the same faces, hair, makeup, body type, age read, ethnicity, outfits, wardrobe colors, accessories, bike model, gym layout, lighting, seat assignments, and bike assignments. Character A is always fixed as Character A on Bike A in the same assigned seat/side. Character B is always fixed as Character B on Bike B in the same assigned seat/side. Do not allow scene-to-scene redesign, wardrobe drift, face drift, hair drift, color drift, seat swaps, bike swaps, side swaps, trading places, repositioning, new characters, background pedestrians, or direct-to-camera presenter energy.

Allowed variation is limited to the actual conversation: lip movement, natural eye contact between the two women, continuous visible pedaling by both women unless the shot explicitly shows a dismount, subtle shoulder/body rhythm, relaxed breath shifts, tiny natural hand gestures below the face line, and tiny crop differences inside the locked Camera A and Camera B templates. Small expressive body language is allowed only when it never blocks the mouth, never crosses the face, never disrupts face tracking, and never causes lip-sync drift. Perfect lip sync is the priority over acting.

Bike-motion continuity is mandatory. In every recumbent-bike shot, both women must keep pedaling on their assigned bikes unless the scene direction explicitly says one or both women are dismounting. Do not accept a shot where one woman pedals and the other freezes, poses, or sits still.

## Recumbent Bike Prop Lock

Bike A and Bike B are locked hero props. They must be the same exact sleek 2026 premium recumbent bike model in every frame: identical black satin aerodynamic frame, reclined black seat/backrest, compact rider-facing touchscreen console, small stabilizing bar under or near the console only if mechanically plausible, side/base handles beside the seat, vented flywheel housing, crank/pedal placement, foot straps, rail/base construction, and mechanical proportions. The front cockpit should feel open with room for natural hand movement; do not place large upright-style handlebars or a bulky handlebar tower in front of the riders. The bikes must make logical mechanical sense, face the same direction, stay parallel, stay fixed in place, and never change style from scene to scene or camera angle to camera angle. Each rider's left foot and right foot must stay on the correct left/right pedals of her own assigned bike with no crossed legs, no foot crossing the bike centerline, no foot on the opposite-side pedal, and no left/right pedal confusion. Do not accept old-looking 1990s equipment, mismatched bikes, disconnected pedals, impossible crank paths, crossed feet, reversed feet, broken flywheel geometry, changing consoles, changing handle shapes, changing seat shapes, bulky front handlebars, or any bike design drift.

## Video Model Ladder

For the Meal Prep Revolution low-res video pass, use this model ladder unless Jacob overrides it:

- `Veed Lipsync` at `41/s`: throwaway mouth-timing proof only.
- `Sync Lipsync 2 Pro` at `661/s`: default low-res production pass.
- `Creatify Aurora` at `848/s`: backup when more UGC-style expression is needed after lip sync is stable.
- `OmniHuman 1.5` at `1,267/s`: only after continuity and lip sync are approved and body performance becomes worth the extra cost.

Do not upscale or switch to a more expensive model until the 720p/lower-res pass proves mouth sync, fixed character identity, fixed outfits, fixed seat/bike assignment, and locked Camera A/B continuity.

## Music Bed Rule

When Jacob asks for music beds, background music, ad beds, or soundtrack options:

- Start with real downloadable/referenceable music candidates from reputable libraries before generating custom music.
- Use the best approved prior candidate as the taste anchor and compare new options against it.
- Publish a small focused batch to the sandbox as phone-safe MP3 files, not expiring player URLs or local blobs.
- Keep the current audio review page narrow: anchor track, new candidates, and any relevant foley reference only.
- Cite each candidate source in `audio-beds.json` so licensing/source context stays visible.
- Only generate custom music after the reference direction is clear enough to prompt tightly.

## CLI/API Component Build Rule

When Jacob asks to use the ElevenLabs CLI, API, agents, TTS, music, or any token-efficient prebuild path for PDS Flows:

- Treat `component-build-manifest.json`, `production-locks.json`, and the latest `video-render-plan-*.json` as the source of truth before touching the Flows canvas.
- Use the official `@elevenlabs/cli` only for supported ElevenAgents-as-code, tools, tests, and UI component work.
- Use `scripts/elevenlabs-components.mjs` for API-supported voice discovery, TTS generation, and music candidate generation.
- Use `npm run flow:packet` to create a compact import packet before wiring or rendering in Flows.
- Keep Flows as the final assembly and lip-sync rendering surface; do not use it as the primary place to experiment with character design, wardrobe, music taste, or script structure.
- Never store ElevenLabs API keys in this repo. Use environment variables, Keychain, or the approved secret path.
- Before spending video credits, confirm the locked Camera A/B stills, selected TTS files, selected music bed, source-image wiring, low-res model, and two-shot proof plan.
