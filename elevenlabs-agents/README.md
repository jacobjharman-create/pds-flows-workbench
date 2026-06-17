# ElevenLabs Agents Lane

The official `@elevenlabs/cli` manages ElevenAgents as code. It does not currently control the ElevenLabs Flows canvas.

Use this folder for agent configs only after an API key is available in the shell:

```sh
npx @elevenlabs/cli agents init elevenlabs-agents
npx @elevenlabs/cli auth login
npx @elevenlabs/cli agents add "PDS Flows Production Assistant" --template assistant
npx @elevenlabs/cli agents push --dry-run
```

Agent job:

- Remember PDS Flows production rules.
- Enforce one active speaker per scene.
- Reject character, wardrobe, seat, bike, and camera continuity drift.
- Produce concise Flow node prompts from `component-build-manifest.json` and `video-render-plan-20260616-224431.json`.

Do not store API keys in this folder.
