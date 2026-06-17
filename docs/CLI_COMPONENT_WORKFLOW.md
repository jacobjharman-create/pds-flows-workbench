# PDS Flows CLI/API Component Workflow

Use this lane before spending video credits inside ElevenLabs Flows.

## Boundary

- ElevenLabs CLI: use for ElevenAgents, tools, tests, and UI components.
- ElevenLabs API: use for voice discovery, TTS line generation, and music-bed candidates.
- Codex/PDS repo: durable source of truth for character locks, wardrobe locks, camera references, dialogue, prompts, audio files, and sandbox review.
- ElevenLabs Flows: final assembly and lip-sync video rendering surface.

Do not use Flows as the place to chase character design, wardrobe, voice, or music taste. Lock those outside first, then import approved components.

## Commands

```sh
npm run el:status
npm run el:cli -- --help
npm run el:voices -- Jessica
npm run el:tts -- --only=S1,S2
npm run el:music -- --count=3
npm run flow:packet
```

`ELEVENLABS_API_KEY` must be present for API actions. Keep it in the shell, Keychain, or a secret manager. Do not commit it.

## Current Meal Prep Rule

The locked visual references are:

- Character A: `final-character-a-dark-taupe-20260616-220447.webp`
- Character B: `final-character-b-teal-accent-20260616-220447.webp`
- Camera A: `final-camera-a-color-lock-20260616-220447.webp`
- Camera B: `final-camera-b-color-lock-20260616-220447.webp`

The selected music bed is:

- `music-candidate-afro-soul-chant.mp3`

The first video proof should be only:

- S1 from locked Camera A + Character A TTS.
- S2 from locked Camera B + Character B TTS.

Only after S1/S2 prove continuity and lip sync should the full sequence render.

## Flow Import Checklist

1. Generate `npm run flow:packet`.
2. In Flows, confirm each video node uses `Sync Lipsync 2 Pro` for the low-res proof pass.
3. Wire Camera A source to S1/S3/S6/S8.
4. Wire Camera B source to S2/S4/S5/S7.
5. Wire CTA screenshot to the end-card hold.
6. Run only S1/S2 first.
7. Download outputs, update sandbox, review on phone.
8. Render the rest only after the proof pass is approved.
