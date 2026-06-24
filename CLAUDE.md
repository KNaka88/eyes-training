# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite, http://localhost:5173)
npm run build     # type-check with tsc then bundle with Vite
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

There are no tests.

## Architecture

Single-page React app (Vite + TypeScript). All logic lives in `src/`.

**Data flow:** `useSettings` holds all user-controlled settings as plain React state. `TrainingScreen` reads those settings and passes them into two animation hooks — `useAnimation` (circle offsets) and `useFloatingPosition` (whole-pair float translation). Their outputs feed directly into the render tree; there is no global store.

**`useAnimation(speed, maxDistance, pace)`** — drives the left/right circle offsets with a `requestAnimationFrame` loop. Uses `elapsed * speed * 2π` as the sine argument to produce a 0→maxDistance oscillation. When `pace` is enabled, a weighted random picker (seeded deterministically via `pseudoRandom`) switches among `'both' | 'leftOnly' | 'rightOnly'` modes every 2–5 seconds. Offset transitions lerp at 10%/frame to avoid snapping.

**`useFloatingPosition(enabled)`** — a separate rAF loop that slowly lerps the entire `CirclePair` container toward random screen positions (±22% width, ±18% height). Target refreshes every 3–8 seconds. Uses the same `pseudoRandom` helper (seed = `timestamp * 0.001`).

**`pseudoRandom(seed)`** — deterministic sine-based PRNG used by both animation hooks. Both copies of the function are identical; they live in their respective files.

**Settings panel** (`SettingsPanel`) is toggled open/closed via local state in `TrainingScreen`. It calls `update(patch)` from `useSettings` to merge partial settings.

**No routing, no context, no external state library.** The component tree is shallow: `App → TrainingScreen → { CirclePair, SettingsPanel }`.
