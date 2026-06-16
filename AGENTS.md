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
