# PDS Flows Import Packet

Client: Meal Prep Revolution
Flow: https://elevenlabs.io/app/flows/FmHLp335MCn04VGz1Ndz
Video model: Sync Lipsync 2 Pro
Proof model only: Veed Lipsync
Fallback model: Creatify Aurora

## Locked Import Assets

- characterA: final-character-a-dark-taupe-20260616-220447.webp
- characterB: final-character-b-teal-accent-20260616-220447.webp
- cameraA: final-camera-a-color-lock-20260616-220447.webp
- cameraB: final-camera-b-color-lock-20260616-220447.webp
- ctaVisual: meal-prep-revolution-final-cta-screenshot-20260616-img.jpg
- musicBed: music-candidate-afro-soul-chant.mp3

## Asset Check

- OK characterA: final-character-a-dark-taupe-20260616-220447.webp
- OK characterB: final-character-b-teal-accent-20260616-220447.webp
- OK cameraA: final-camera-a-color-lock-20260616-220447.webp
- OK cameraB: final-camera-b-color-lock-20260616-220447.webp
- OK ctaVisual: meal-prep-revolution-final-cta-screenshot-20260616-img.jpg
- OK musicBed: music-candidate-afro-soul-chant.mp3
- OK 1 camera: final-camera-a-color-lock-20260616-220447.webp
- OK 1 audio: s1-tts-char-a-okay-seriously-0-audio.mp3
- OK 2 camera: final-camera-b-color-lock-20260616-220447.webp
- OK 2 audio: s2-tts-char-b-honestly-meal-prep-revolution-0-audio.mp3
- OK 3 camera: final-camera-a-color-lock-20260616-220447.webp
- OK 3 audio: s3-tts-char-a-wait-really-0-audio.mp3
- OK 4 camera: final-camera-b-color-lock-20260616-220447.webp
- OK 4 audio: s4-tts-char-b-yep-i-pick-my-meals-0-audio.mp3
- OK 5 camera: final-camera-b-color-lock-20260616-220447.webp
- OK 5 audio: s5-tts-char-b-they-cook-everything-0-audio.mp3
- OK 6 camera: final-camera-a-color-lock-20260616-220447.webp
- OK 6 audio: s6-tts-char-a-that-sounds-way-too-easy-0-audio.mp3
- OK 7 camera: final-camera-b-color-lock-20260616-220447.webp
- OK 7 audio: s7-tts-char-b-it-is-my-family-loves-it-0-audio.mp3
- OK 8 camera: final-camera-a-color-lock-20260616-220447.webp
- OK 8 audio: s8-tts-char-a-okay-i-need-that-today-0-audio.mp3
- OK 9 camera: meal-prep-revolution-final-cta-screenshot-20260616-img.jpg
- OK 9 audio: s9-tts-char-b-go-to-mealpreprevolution-com-0-audio.mp3

## Flows Assembly Rule

Import only approved locked images, approved audio, and scene prompts. Do not let Flows redesign either character. Do not render old direct-to-camera nodes. Run S1 and S2 only first as the proof pass, then update sandbox before full sequence generation.

## Scene Node Prompts

### S1 - CAM A - Okay, seriously...

Speaker: Character A
Camera/source: final-camera-a-color-lock-20260616-220447.webp
Audio: s1-tts-char-a-okay-seriously-0-audio.mp3
Dialogue: "Okay, seriously... you look amazing. What's your secret?"

```text
Use the locked Camera A reference exactly: final-camera-a-color-lock-20260616-220447.webp. Character A is the only active speaker. Character A keeps the exact same face, brunette ponytail, darker mocha/taupe high-end logo-free athleisure, makeup, body type, and assigned bike/seat/side. Character B appears only as a blurred blonde shoulder/hair foreground shape; Character B's face and mouth are not visible. Both recumbent bikes remain side-by-side, parallel, facing the same direction. Character A turns naturally toward Character B, not toward the camera. Dialogue: "Okay, seriously... you look amazing. What's your secret?" Natural curious friend energy. Gentle pedaling, subtle shoulder rhythm, tiny below-face hand gesture if needed. Face, eyes, and mouth fully visible. Hands never cover mouth, chin, cheeks, jawline, or face tracking area. Locked camera. No zoom. No pan. No direct-to-camera presenter energy. Perfect lip sync is the priority.
```

### S2 - CAM B - Honestly? Meal Prep Revolution.

Speaker: Character B
Camera/source: final-camera-b-color-lock-20260616-220447.webp
Audio: s2-tts-char-b-honestly-meal-prep-revolution-0-audio.mp3
Dialogue: "Honestly? Meal Prep Revolution."

```text
Use the locked Camera B reference exactly: final-camera-b-color-lock-20260616-220447.webp. Character B is the only active speaker. Character B keeps the exact same face, blonde beach-wave hair, sand/taupe high-end logo-free athleisure with muted teal accent, makeup, body type, and assigned bike/seat/side. Character A appears only as a blurred brunette shoulder/ponytail foreground shape; Character A's face and mouth are not visible. Both recumbent bikes remain side-by-side, parallel, facing the same direction. Character B turns naturally toward Character A, not toward the camera. Dialogue: "Honestly? Meal Prep Revolution." Relaxed warm secret-sharing delivery. Gentle pedaling, subtle shoulder rhythm, tiny below-face hand gesture if needed. Face, eyes, and mouth fully visible. Hands never cover mouth, chin, cheeks, jawline, or face tracking area. Locked camera. No zoom. No pan. Perfect lip sync is the priority.
```

### S3 - CAM A - Wait, really?

Speaker: Character A
Camera/source: final-camera-a-color-lock-20260616-220447.webp
Audio: s3-tts-char-a-wait-really-0-audio.mp3
Dialogue: "Wait, really?"

```text
Use the locked Camera A reference exactly: final-camera-a-color-lock-20260616-220447.webp. Character A is the only active speaker and remains on the same assigned bike/seat/side. Character B is only blurred foreground shoulder/hair with no visible mouth. Dialogue: "Wait, really?" Cute surprised reaction, natural half-smile, eyes on Character B, not the camera. Gentle pedaling and subtle shoulder movement only. Tiny below-face hand movement is allowed only if it stays away from the mouth and jawline. Face and mouth fully visible. Locked camera. Perfect lip sync is the priority.
```

### S4 - CAM B - Yep. I pick my meals...

Speaker: Character B
Camera/source: final-camera-b-color-lock-20260616-220447.webp
Audio: s4-tts-char-b-yep-i-pick-my-meals-0-audio.mp3
Dialogue: "Yep. I pick my meals in a couple taps."

```text
Use the locked Camera B reference exactly: final-camera-b-color-lock-20260616-220447.webp. Character B is the only active speaker and remains on the same assigned bike/seat/side. Character A is only blurred foreground shoulder/ponytail with no visible mouth. Dialogue: "Yep. I pick my meals in a couple taps." Calm organized friend-to-friend delivery, not an ad read. Gentle pedaling, slight natural nod, tiny below-face hand gesture if needed. Face and mouth fully visible. Hands never cross the face. Locked camera. Perfect lip sync is the priority.
```

### S5 - CAM B - They cook everything...

Speaker: Character B
Camera/source: final-camera-b-color-lock-20260616-220447.webp
Audio: s5-tts-char-b-they-cook-everything-0-audio.mp3
Dialogue: "They cook everything, and I choose pickup or delivery."

```text
Use the locked Camera B reference exactly: final-camera-b-color-lock-20260616-220447.webp. Character B is the only active speaker and remains on the same assigned bike/seat/side. Character A is only blurred foreground shoulder/ponytail with no visible mouth. Dialogue: "They cook everything, and I choose pickup or delivery." Clear helpful explanation, relaxed and conversational. Gentle pedaling, subtle shoulder rhythm, tiny below-face hand gesture only if it does not affect face tracking. Face and mouth fully visible. Locked camera. Perfect lip sync is the priority.
```

### S6 - CAM A - That sounds way too easy.

Speaker: Character A
Camera/source: final-camera-a-color-lock-20260616-220447.webp
Audio: s6-tts-char-a-that-sounds-way-too-easy-0-audio.mp3
Dialogue: "That sounds way too easy."

```text
Use the locked Camera A reference exactly: final-camera-a-color-lock-20260616-220447.webp. Character A is the only active speaker and remains on the same assigned bike/seat/side. Character B is only blurred foreground shoulder/hair with no visible mouth. Dialogue: "That sounds way too easy." Playful impressed reaction, natural smile, eyes toward Character B. Gentle pedaling and subtle shoulder movement only. Face and mouth fully visible. Hands stay below face line. Locked camera. Perfect lip sync is the priority.
```

### S7 - CAM B - It is. My family loves it...

Speaker: Character B
Camera/source: final-camera-b-color-lock-20260616-220447.webp
Audio: s7-tts-char-b-it-is-my-family-loves-it-0-audio.mp3
Dialogue: "It is. My family loves it, and I got my weekends back."

```text
Use the locked Camera B reference exactly: final-camera-b-color-lock-20260616-220447.webp. Character B is the only active speaker and remains on the same assigned bike/seat/side. Character A is only blurred foreground shoulder/ponytail with no visible mouth. Dialogue: "It is. My family loves it, and I got my weekends back." Warm genuine mom energy, softly proud and relatable, not salesy. Gentle pedaling, subtle shoulder rhythm, tiny below-face hand gesture if needed. Face and mouth fully visible. Locked camera. Perfect lip sync is the priority.
```

### S8 - CAM A - Okay, I need that today.

Speaker: Character A
Camera/source: final-camera-a-color-lock-20260616-220447.webp
Audio: s8-tts-char-a-okay-i-need-that-today-0-audio.mp3
Dialogue: "Okay, I need that today."

```text
Use the locked Camera A reference exactly: final-camera-a-color-lock-20260616-220447.webp. Character A is the only active speaker and remains seated on the same assigned bike/seat/side. Character B is only blurred foreground shoulder/hair with no visible mouth. Dialogue: "Okay, I need that today." Bright convinced reaction, still natural and conversational, eyes toward Character B. Gentle pedaling and subtle shoulder movement only. Face and mouth fully visible. Hands stay below face line. Locked camera. Perfect lip sync is the priority.
```

### END CARD CTA - Website screenshot hold with Character B VO

Speaker: Character B voiceover
Camera/source: meal-prep-revolution-final-cta-screenshot-20260616-img.jpg
Audio: s9-tts-char-b-go-to-mealpreprevolution-com-0-audio.mp3
Dialogue: "Go to MealPrepRevolution dot com and order today."

```text
Use the Meal Prep Revolution website screenshot as the visual hold. Do not show a talking bike CTA shot. Keep screenshot graphics unchanged. No added logo, no rewritten text, no new layout, no fake UI. Place Character B CTA audio over the static/near-static screenshot hold: "Go to MealPrepRevolution dot com and order today."
```
