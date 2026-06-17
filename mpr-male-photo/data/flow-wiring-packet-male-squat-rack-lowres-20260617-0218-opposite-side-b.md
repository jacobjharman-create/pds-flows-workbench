# Meal Prep Revolution Male Low-Res Flow Wiring Packet - Opposite-Side B

Flow: https://elevenlabs.io/app/flows/eGW1Gh6iAgp8Nfw7VQ8D
Stage: low_res_tts_still_to_lipsync_wiring_packet_opposite_side_b
Selected audio total: 24.195s

## Critical Geography Lock

- Character A is on the left/near side of the rack, facing right across the rack.
- Character B is on the right/opposite side of the rack, facing left across the rack.
- The bar and rack sit between them as the conversation axis.

## Global Rules

- No premium render yet.
- One TTS node per line.
- One matching low-res lip-sync/video node per line.
- Use exact generated TTS MP3 as the video/lip-sync audio input.
- Use continuity plates as visual references.
- Keep mouth visible and unobstructed.
- Regenerate failed lines only.
- Character B stays on the opposite/right side of the squat rack, facing left across the bar toward Character A.

## Reference Nodes

- REF-CHAR-A-continuity-plate: assets/continuity-plates/character-a-continuity-plate-lowres-20260617.png
- REF-CHAR-B-continuity-plate: assets/continuity-plates/character-b-continuity-plate-lowres-20260617.png
- REF-SQUAT-RACK-world-plate: assets/continuity-plates/squat-rack-world-plate-lowres-20260617.png
- REF-TWO-SIDED-RACK-topmap: assets/continuity-plates/two-sided-rack-blocking-plate-topmap-lowres-20260617-0218.png

## Node Chains

### S1 - VID-01-B-work-stress-rack

Speaker: character_b
TTS node: TTS-01-B-work-is-nonstop
Audio: mpr-male-photo/assets/audio/lowres-wiring/s1-b-work-is-nonstop-20260617-021433.mp3
Duration: 3.715s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s1-b-opposite-side-work-stress-rack-still-lowres-20260617-0218.png
Connection: TTS-01-B-work-is-nonstop.audio -> VID-01-B-work-stress-rack.speech_audio; VID-01-B-work-stress-rack.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s1-b-opposite-side-work-stress-rack-still-lowres-20260617-0218.png

Prompt:
```text
Low-res lip-sync proof. Character B is on the opposite/right side of the squat rack, facing left across the bar toward Character A. Medium close-up through/across the rack, gray shirt, olive shorts, black smartwatch, dirty-blond hair, mouth fully visible, plate low in frame. Use corrected two-sided rack top-map. No bar, plate, hand, or post crossing mouth.
```

### S2 - VID-02-B-asks-how

Speaker: character_b
TTS node: TTS-02-B-how-do-you-stay-consistent
Audio: mpr-male-photo/assets/audio/lowres-wiring/s2-b-how-do-you-stay-consistent-20260617-021346.mp3
Duration: 2.415s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s2-b-opposite-side-asks-how-still-lowres-20260617-0218.png
Connection: TTS-02-B-how-do-you-stay-consistent.audio -> VID-02-B-asks-how.speech_audio; VID-02-B-asks-how.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s2-b-opposite-side-asks-how-still-lowres-20260617-0218.png

Prompt:
```text
Low-res lip-sync proof. Character B remains on the opposite/right side of the squat rack, facing left across the rack toward Character A. Tight head-and-shoulders shot, mouth clear, stressed but practical. Use corrected two-sided rack top-map. No same-side blocking.
```

### S3 - VID-03-A-meal-prep-answer

Speaker: character_a
TTS node: TTS-03-A-best-switch
Audio: mpr-male-photo/assets/audio/lowres-wiring/s3-a-meal-prep-answer-20260617-021433.mp3
Duration: 2.647s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s3-a-meal-prep-answer-still-lowres-20260617.png
Connection: TTS-03-A-best-switch.audio -> VID-03-A-meal-prep-answer.speech_audio; VID-03-A-meal-prep-answer.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s3-a-meal-prep-answer-still-lowres-20260617.png

Prompt:
```text
Low-res lip-sync proof. Character A reverse shot at fixed squat rack, calm friend answer while setting up next set, mouth fully visible, plate movement below chest. Reference Character A plate and squat-rack world plate.
```

### S4 - VID-04-A-online-checkout

Speaker: character_a
TTS node: TTS-04-A-pick-meals-online
Audio: mpr-male-photo/assets/audio/lowres-wiring/s4-a-pick-meals-online-20260617-021346.mp3
Duration: 3.483s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s4-a-online-checkout-still-lowres-20260617.png
Connection: TTS-04-A-pick-meals-online.audio -> VID-04-A-online-checkout.speech_audio; VID-04-A-online-checkout.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s4-a-online-checkout-still-lowres-20260617.png

Prompt:
```text
Low-res lip-sync proof. Character A close-up, relaxed delivery, subtle nod on 'show up at my door', black tank and hair unchanged, mouth unobstructed. Reference Character A plate and squat-rack world plate.
```

### S5 - VID-05-A-no-shopping-cleanup

Speaker: character_a
TTS node: TTS-05-A-no-shopping
Audio: mpr-male-photo/assets/audio/lowres-wiring/s5-a-no-shopping-cleanup-20260617-021246.mp3
Duration: 4.272s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s5-a-no-shopping-cleanup-still-lowres-20260617.png
Connection: TTS-05-A-no-shopping.audio -> VID-05-A-no-shopping-cleanup.speech_audio; VID-05-A-no-shopping-cleanup.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s5-a-no-shopping-cleanup-still-lowres-20260617.png

Prompt:
```text
Low-res lip-sync proof. Character A rack-depth reverse angle, practical relief line, hands and plate remain below mouth line, no salesy posture. Reference Character A plate, squat-rack world plate, and two-shot blocking plate.
```

### S6 - VID-06-A-macros-track

Speaker: character_a
TTS node: TTS-06-A-clean-ingredients
Audio: mpr-male-photo/assets/audio/lowres-wiring/s6-a-clean-ingredients-20260617-021246.mp3
Duration: 3.251s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s6-a-macros-track-still-lowres-20260617.png
Connection: TTS-06-A-clean-ingredients.audio -> VID-06-A-macros-track.speech_audio; VID-06-A-macros-track.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s6-a-macros-track-still-lowres-20260617.png

Prompt:
```text
Low-res lip-sync proof. Character A clean hero headshot, confident but natural, mouth fully visible, minimal movement for accurate lip sync. Reference Character A plate and squat-rack world plate.
```

### S7 - VID-07-B-link-reaction

Speaker: character_b
TTS node: TTS-07-B-send-link
Audio: mpr-male-photo/assets/audio/lowres-wiring/s7-b-send-link-20260617-021246.mp3
Duration: 1.068s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s7-b-opposite-side-link-reaction-still-lowres-20260617-0218.png
Connection: TTS-07-B-send-link.audio -> VID-07-B-link-reaction.speech_audio; VID-07-B-link-reaction.source_image -> mpr-male-photo/assets/scene-stills/lowres-wiring/s7-b-opposite-side-link-reaction-still-lowres-20260617-0218.png

Prompt:
```text
Low-res lip-sync proof. Character B remains on the opposite/right side of the squat rack, facing left across the rack toward Character A. Reaction shot, mouth clear, optional hand below chin. Use corrected two-sided rack top-map. No same-side blocking.
```

### S8 - VID-08-CTA-site-fade

Speaker: character_a_vo
TTS node: TTS-08-A-cta-vo
Audio: mpr-male-photo/assets/audio/lowres-wiring/s8-a-cta-vo-20260617-021346.mp3
Duration: 3.344s
Still input: mpr-male-photo/assets/scene-stills/lowres-wiring/s8-cta-placeholder-still-lowres-20260617.png
Connection: TTS-08-A-cta-vo.audio -> VID-08-CTA-site-fade.voiceover_audio; VID-08-CTA-site-fade.visual -> CTA placeholder until website screenshot is uploaded

Prompt:
```text
Low-res CTA proof. Character A voiceover over blurred dark squat-rack freeze frame until website screenshot is uploaded. Overlay MealPrepRevolution.com and subline Pick your meals. Own your week. No lip-sync required for this node.
```
