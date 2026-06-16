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

## Review Notes

- Scene video nodes are set to `720p` for draft QA.
- Reference images may remain at their model minimum where ElevenLabs exposes no lower option.
- Final high-resolution generation should happen only after visual, continuity, and lip-sync approval.

## Files

- `index.html` - review dashboard.
- `nodes.json` - extracted node metadata.
- `*.webp`, `*.jpg`, `*.mp4` - downloaded preview assets.
