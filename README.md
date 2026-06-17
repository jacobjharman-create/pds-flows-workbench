# PDS Flows Workbench

Hosted sandbox for reviewing ElevenLabs Flows production progress outside local Wi-Fi.

## Current Preview

Client: Meal Prep Revolution  
Flow: Newport Beach recumbent-bike lip-sync commercial  
Mode: draft wiring and lip-sync QA  

## Source Chain

1. Codex/PDS Flows source memory lives in the Prometheus workbench.
2. ElevenLabs Flows is the execution canvas.
3. Preview assets are downloaded into this static sandbox.
4. GitHub stores the review snapshot.
5. Hosting serves the review board for mobile/off-network inspection.

## CLI/API Component Lane

Use `docs/CLI_COMPONENT_WORKFLOW.md` before spending video credits in Flows.

- `npm run el:status` checks the local CLI/API lane.
- `npm run el:install-key` stores an ElevenLabs API key in macOS Keychain as `elevenlabs-api`.
- `npm run el:cli -- --help` uses the official ElevenLabs CLI for agents, tools, tests, and UI components.
- `npm run el:voices`, `npm run el:tts`, and `npm run el:music` use the ElevenLabs API for reusable audio components when `ELEVENLABS_API_KEY` is present.
- `npm run flow:packet` writes a clean import packet for the Flows canvas.

Current rule: lock character look, wardrobe, voices, music, and camera references outside Flows first. Bring only approved components into Flows for lip-sync video generation.

## Review Notes

- Scene video nodes are set to `720p` for draft QA.
- Reference images may remain at their model minimum where ElevenLabs exposes no lower option.
- Final high-resolution generation should happen only after visual, continuity, and lip-sync approval.

## Files

- `index.html` - review dashboard.
- `nodes.json` - extracted node metadata.
- `*.webp`, `*.jpg`, `*.mp4` - downloaded preview assets.
