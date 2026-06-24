# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Structure

This is a monorepo with two apps that share the same core logic:

- **`src/`** — Web app (Vite + React + TypeScript)
- **`mobile/`** — Expo mobile app (Expo Router + React Native + TypeScript)

---

## Web App

### Commands

```bash
npm run dev       # start dev server (Vite, http://localhost:5173)
npm run build     # type-check with tsc then bundle with Vite
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

There are no tests.

### Architecture

Single-page React app. All logic lives in `src/`.

**Data flow:** `useSettings` holds all user-controlled settings as plain React state. `TrainingScreen` reads those settings and passes them into two animation hooks — `useAnimation` (circle offsets) and `useFloatingPosition` (whole-pair float translation). Their outputs feed directly into the render tree; there is no global store.

**`useAnimation(speed, maxDistance, pace)`** — drives the left/right circle offsets with a `requestAnimationFrame` loop. Uses `elapsed * speed * 2π` as the sine argument to produce a 0→maxDistance oscillation. When `pace` is enabled, a weighted random picker (seeded deterministically via `pseudoRandom`) switches among `'both' | 'leftOnly' | 'rightOnly'` modes every 2–5 seconds. Offset transitions lerp at 10%/frame to avoid snapping.

**`useFloatingPosition(enabled)`** — a separate rAF loop that slowly lerps the entire `CirclePair` container toward random screen positions (±22% width, ±18% height). Target refreshes every 3–8 seconds. Uses the same `pseudoRandom` helper (seed = `timestamp * 0.001`).

**`pseudoRandom(seed)`** — deterministic sine-based PRNG used by both animation hooks. Both copies of the function are identical; they live in their respective files.

**Settings panel** (`SettingsPanel`) is toggled open/closed via local state in `TrainingScreen`. It calls `update(patch)` from `useSettings` to merge partial settings.

**No routing, no context, no external state library.** The component tree is shallow: `App → TrainingScreen → { CirclePair, SettingsPanel }`.

---

## Mobile App (`mobile/`)

### Commands

```bash
cd mobile
npm run start     # start Expo dev server
npm run ios       # start with iOS simulator
npm run android   # start with Android emulator
```

### Architecture

Expo Router app (file-based routing). Shares hook and component logic with the web app via `mobile/src/`.

**Routes:**
- `app/index.tsx` — main training screen
- `app/settings.tsx` — settings sheet (form sheet modal, 65%/100% detents)
- `app/tutorial.tsx` — tutorial modal

**State:** `SettingsContext` (React context) wraps the router layout and provides `settings` + `update(patch)` to all screens. Same shape as the web `useSettings` hook.

**Hooks** (`mobile/src/hooks/`) — `useAnimation` and `useFloatingPosition` are direct ports of the web versions; `pseudoRandom` is duplicated identically.

**Components** (`mobile/src/components/`):
- `CirclePair` — renders the two circles using React Native `View`s
- `SimpleSlider` — custom touch-driven slider (no third-party dependency)

**Polyfills** (`mobile/polyfills/dom-exception.js`) — injected as a Metro-level polyfill (before any module code) to provide `DOMException`, `PerformanceEntry`/`Observer`, `structuredClone`, `queueMicrotask`, and `MessageChannel` for Hermes compatibility.

### Known issues

**`Cannot assign to read-only property 'None'`** — React Native 0.81 bug where `Event` phase constants lack `configurable: true`, causing `event-target-shim` (used by `fetch`) to throw on startup. Non-fatal; suppressed via `LogBox.ignoreLogs` in `app/_layout.tsx`. Tracked at [facebook/react-native#54732](https://github.com/facebook/react-native/issues/54732).
