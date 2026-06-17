# Meal Prep Revolution Male Squat-Rack 25s Ad

Date: 2026-06-17

Flow:
`https://elevenlabs.io/app/flows/eGW1Gh6iAgp8Nfw7VQ8D`

Source photo:
`source-assets/meal-prep-revolution-male-2026-06-17/two-male-gym-reference.jpg`

Character locks:
- Character A: `character-cards/meal-prep-revolution-photo-character-a-left-dark-haired.json`
- Character B: `character-cards/meal-prep-revolution-photo-character-b-right-blond.json`

## Creative Intent

Two guys are between squat-rack sets, loading plates and catching their breath. Character B is the relatable pressure point: work is busy, budget cuts are making the office tense, and he feels like he is falling behind at work and in his fitness. Character A is not a guru; he is a disciplined friend with one simple systems answer: Meal Prep Revolution removes the recurring decision load of food.

Tone: believable gym-friend conversation, not an announcer spot. The ad should feel like the viewer overheard a useful answer at the rack.

## 25-Second Script

Target runtime: 25 seconds.

Estimated spoken words: 79.

| Time | Speaker | Exact TTS Line |
|---|---|---|
| 0.0-3.7 | Character B | Work's nonstop. Budget cuts, boss on me... I'm barely keeping up. |
| 3.7-6.7 | Character B | How do you stay consistent? You're busier than me. |
| 6.7-9.0 | Character A | Meal Prep Revolution. Best switch I made. |
| 9.0-13.4 | Character A | I pick meals online, check out, and they show up at my door. |
| 13.4-17.5 | Character A | No shopping, cooking, or cleanup. I heat one up and get back to work. |
| 17.5-20.2 | Character A | Clean ingredients, macro-friendly, keeps me on track. |
| 20.2-21.8 | Character B | Send me that link. |
| 21.8-25.0 | Character A VO / CTA | MealPrepRevolution.com. Own your week. |

## Storyboard

1. 0.0-3.7 seconds - Character B medium close-up.
   - He slides a plate off the rack or rests one plate against his thigh.
   - He is winded but conversational, looking toward Character A.
   - Mouth must be clear. No plate crosses face or chin.

2. 3.7-6.7 seconds - Character B tighter shot.
   - He looks from the bar back to Character A.
   - Slight stressed half-smile, not melodramatic.
   - Foreground can include blurred rack upright, but no face obstruction.

3. 6.7-9.0 seconds - Character A reverse shot.
   - Character A grabs a plate calmly or tightens wrist position before the next set.
   - He answers casually, like a friend with a solved system.
   - Keep black tank, dark hair volume, white trainers, premium gym lighting.

4. 9.0-13.4 seconds - Character A close-up.
   - Plate movement happens low in frame. Face and lips stay stable.
   - Delivery is relaxed, not salesy.
   - Add subtle nod on "show up at my door."

5. 13.4-17.5 seconds - Character A reverse angle with rack depth.
   - He sets a plate on the storage peg or steps back from the bar.
   - No shopping, cooking, cleanup should land as the practical relief.
   - Keep body movement small enough for lip sync stability.

6. 17.5-20.2 seconds - Character A clean hero headshot.
   - He finishes the value stack: clean ingredients, macro-friendly, on track.
   - This is the proof line. Calm confidence, no influencer pose.

7. 20.2-21.8 seconds - Character B reaction.
   - He looks impressed and practical, like he is about to pull out his phone.
   - Mouth visible for the short line.

8. 21.8-25.0 seconds - CTA transition.
   - Character A voice continues as VO.
   - Fade from gym shot into Meal Prep Revolution website screenshot once uploaded.
   - Overlay CTA: `MealPrepRevolution.com`
   - Optional small subline: `Pick your meals. Own your week.`

## ElevenLabs Flow Build Notes

Create each line as its own TTS node before video generation.

## First-Generation Draft Rules

The first generation is a wiring and lip-sync proof only. Keep it low-resolution, low-credit, and token-efficient until Jacob approves timing, voices, identity stability, and shot order.

Draft settings:
- Use the lowest practical video resolution available in the selected ElevenLabs/Flow path, preferably `720p` or lower.
- Use the cheapest acceptable lip-sync/video model for timing proof before moving up the model ladder.
- Generate one short line at a time, not the full ad as one long clip.
- Use close-up or medium close-up headshots with small plate/rack movement only.
- Do not upscale, extend, interpolate, color-grade, or final-master any draft shot.
- Do not render premium/professional final scenes until the low-res pass proves mouth timing, character identity, wardrobe, and shot continuity.
- If a line fails, regenerate only that line's node, not the whole sequence.
- Keep prompts short by referencing the character locks and shared prompt base instead of restating the entire visual spec in every node.

Draft model ladder:
1. Lowest-cost lip-sync/wiring proof available in Flow.
2. Mid-tier 720p pass only after line timing and mouth visibility are correct.
3. Premium/professional final render only after Jacob approves the full low-res assembly.

TTS node naming:
- `TTS-01-B-work-is-nonstop`
- `TTS-02-B-how-do-you-stay-consistent`
- `TTS-03-A-best-switch`
- `TTS-04-A-pick-meals-online`
- `TTS-05-A-no-shopping`
- `TTS-06-A-clean-ingredients`
- `TTS-07-B-send-link`
- `TTS-08-A-cta-vo`

Voice assignments:
- Character A: `Roger - Laid-Back, Casual, Resonant`
- Character B: `Callum - Husky Trickster`

Lip-sync priority:
1. Generate or select the TTS for a single line.
2. Use that exact audio file as the source for the matching lip-sync/video node.
3. Keep the talking character in close-up or medium close-up with the full mouth visible.
4. Do not animate both characters speaking in the same shot.
5. No overlapping dialogue. Leave 150-250 ms handles between lines for edits.
6. Keep plates, hands, bar, and rack uprights below or beside the mouth line.
7. Listener can be blurred foreground shoulder/back-of-head only. Listener mouth should not be visible.
8. If lip sync drifts, prioritize a calmer headshot over more dramatic gym motion.

Video node naming:
- `VID-01-B-work-stress-rack`
- `VID-02-B-asks-how`
- `VID-03-A-meal-prep-answer`
- `VID-04-A-online-checkout`
- `VID-05-A-no-shopping-cleanup`
- `VID-06-A-macros-track`
- `VID-07-B-link-reaction`
- `VID-08-CTA-site-fade`

## Per-Shot Prompt Base

Photorealistic commercial gym conversation at a premium dark squat rack, warm overhead strip lights, black rack uprights, mirrored gym depth, rubber flooring, shallow depth of field, cinematic 85mm close-up, natural skin texture, realistic mouth movement, believable between-set breathing, no influencer pose, no direct-to-camera sales energy.

Character A lock:
Same dark wavy hair volume, tan skin, clean jawline, black sleeveless tank, black shorts, white crew socks, white trainers, lean muscular build, premium dark gym lighting.

Character B lock:
Same short curly dirty-blond hair, light stubble, loose charcoal gray T-shirt, olive shorts, black smartwatch, white crew socks, white trainers, strong sturdy build, premium dark gym lighting.

Negative for all video nodes:
No changed faces, no outfit drift, no swapped characters, no new gym people, no sunglasses, no hats, no added tattoos, no beard changes, no exaggerated acting, no plate or hand blocking the mouth, no bar crossing the lips, no direct-to-camera spokesperson posture, no unreadable mouth, no fast head turns during speech, no warped hands, no floating weights, no impossible rack geometry.

## CTA Screenshot Placeholder

The CTA scene needs the Meal Prep Revolution website screenshot once Jacob uploads it.

Until then, build the CTA node as a placeholder:
- Background: clean dark gym freeze-frame or blurred rack shot.
- Text: `MealPrepRevolution.com`
- Subline: `Pick your meals. Own your week.`
- Voice: Character A voiceover.

## Compliance Note

Avoid the precise claim "saved me 20 hours a week" unless Meal Prep Revolution can substantiate it. The current script says "No shopping, cooking, or cleanup" and "keeps me on track," which preserves the benefit without creating a hard quantified claim.
