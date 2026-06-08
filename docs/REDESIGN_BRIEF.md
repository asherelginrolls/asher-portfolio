# Redesign Brief

This sits alongside two other docs. Read all three before building.
- `SESSION_1_CONCEPT.md` (repo root) — the committed design concept, the signal-line spine, the
  tech approach, and the component architecture. That work stands. Do not redo it.
- `docs/VOICE_PROFILE.md` — the real voice, with verbatim evidence and portfolio-adapted copy.
- This file — what the refined session prompt left out, new findings, and build guidance.

The concept is settled: **the void, made navigable.** A dark spatial site built on Asher's own voidx
origin metaphor, with a single living signal line as the spine of his career arc (Media → Growth →
Deep-tech Sales → AI Builder). Both the prior Session 1 and a fresh independent pass landed on the
same place, which is a good sign it is the right one.

---

## Gaps the refined session prompt left out

Caught by comparing the polished prompt against Asher's original intent and his source material.

1. **The explorable-space idea is on the table, and was reasoned about, not just dropped.** Asher's
   original ask floated an "OS desktop with folders / explorable room." Session 1 considered and cut
   it, because non-linear navigation buries a career arc that depends on sequence and is the highest
   risk to execute well. That reasoning is sound. Keep the *feeling* of discovery (the line responds,
   the visitor feels they are uncovering the arc) without literal free-roam navigation.

2. **The ambition bar is "15 to 20 levels above the present," not an evolution.** This is a full
   rebuild to an Awwwards bar, not a restyle. The "execute well or fall back" rule protects quality,
   it is not permission to ship a polished version of the same site.

3. **Per-session model guidance.** Design-heavy build sessions belong on the strongest Opus
   (Opus 4.8). Mechanical refactors are fine on Sonnet. Do not skip the concept phase (already done).

4. **Use the brand-strategy / voice docs for context only.** Never copy their phrasing into the site.
   `docs/VOICE_PROFILE.md` is built from primary writing for exactly this reason.

5. **The handoff is push → PR → Vercel link.** Every build session ends with a pushed branch, a PR
   to `main`, and a live Vercel preview link returned to Asher.

6. **`SESSION_PROMPT.md` does not describe the real source of truth.** `lib/data.ts` does. Every
   number and string resolves through it. The prompt also warns R3F does not work here, which is
   correct: all 3D is raw `three.js`, R3F + drei are installed but stay out of the render loop.

---

## New Drive findings (beyond the three local research docs)

Material pulled from Drive that the local research files do not capture and that strengthens either
the voice or the proof.

- **Verbatim voice samples** now formalized in `docs/VOICE_PROFILE.md` (voidx tone-of-voice line,
  the feminism disarm-then-assert opener, the Suicide Squad conceit, the RJ Rolls music-nerd line).
- **The void / x = variable brand thesis**, in his own words, is the root of the whole design
  concept. The dark spatial field is his origin metaphor handed back to him, not an imported trend.
- **RJ Rolls persona** (The Hip-Hop Hour) — a real on-air, conversational, culturally fluent voice.
  Useful if any section ever wants a warmer, first-person register.
- **Kenny Sebastian PR strategy** — evidence of audience research and journalist/influencer mapping,
  the analytical spine behind the growth numbers.
- **Two publishable essays** (feminism, mental health) as writing proof if a "writing" surface is
  ever added. Out of scope for the MVP redesign, logged for later.

---

## Extra proof points (audience-curated, optional, numbers exact)

These are real and underused. They are not on the critical path for a hiring manager at an AI
startup, so weave them in only where they add texture without diluting the four headline numbers
(14x YouTube, $1M pipeline, 107K Instagram, 10+ AI tools). Do not invent or round.

- **Trinity College London, Grade 6 piano, with Distinction** — advanced classical certification.
- **Five languages:** English, French, Hindi, Kannada, Malayalam.
- **Conducted a choir** of 25 to 35 people aged 45 to 70.
- **BitClass:** ₹1 lakh in personal sales and a 15-teacher client book inside a 6-week internship,
  across three departments (client servicing, sales, ops).
- **BIFFES:** VIP guest handling at India's largest international film festival.
- **Ran nine Instagram accounts at once** in 2021 to 2022 (theatre, media, startups, his own brand).
- **TAPP:** 2nd runner-up at Hult Prize SF, invited to present at Google, 20+ farmers linked to
  enterprise buyers.

Best home for these is a small "more" or human-texture surface (a bio line, a footer aside, a hover
detail), never competing with the four headline proofs.

---

## Build guidance (Sessions 2 to 4)

Follow the tech approach and component architecture in `SESSION_1_CONCEPT.md`. In short:

- **Keep:** Next.js 16 App Router, `lib/data.ts` as single source of truth, Lenis, Framer Motion,
  the raw-three.js pattern, reduced-motion + no-WebGL fallbacks, capped DPR, disposal on unmount.
- **Add only if used:** GSAP + ScrollTrigger for scroll-driven line morphs; `three/examples/jsm`
  postprocessing (a restrained UnrealBloomPass) for the luminous glow. Nothing else.
- **Invert the palette** to ink-dominant: deep black field, bone-white type, one luminous accent.
- **Guardrail:** if the signal line cannot reach a genuinely high bar in raw three.js, fall back to
  honest editorial typography on black with the line removed. Restraint is the safe failure mode.
  Never ship a section half-built as the live state.
- **Verify** in the browser preview (console, network, snapshot, screenshots at desktop and mobile),
  confirm every `data.ts` number renders unchanged, then `next build` + lint clean before pushing.
