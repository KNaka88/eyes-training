# Eyes Training

A parallel-view stereogram training tool. Two circles oscillate horizontally — relax your gaze as if looking through the screen, and the circles merge into one floating at a perceived depth. Adjust speed, distance, and size to find your comfort zone.

Available as a **web app** and an **Expo mobile app** (iOS/Android).

---

## Web

```bash
npm install
npm run dev       # http://localhost:5173
```

## Mobile

```bash
cd mobile
npm install
npm run start     # scan QR code with Expo Go
```

Supports both portrait and landscape orientation.

### Install on device (Android APK)

```bash
eas login          # one-time login
cd mobile
eas build -p android --profile preview
```

EAS builds in the cloud and provides a download link when done. Download the APK and sideload it onto your Android device.

---

## Settings

| Setting | Description |
|---|---|
| Speed | Oscillation rate (0.05–0.25 rad/frame) |
| Max Distance | Peak offset between the two circles |
| Circle Size | Diameter of each circle |
| Move | Slowly drifts the pair to random screen positions |
| Pace | Randomly freezes one circle to vary the perceived depth |

## How to use

1. Hold the screen at arm's length
2. Relax your gaze and look *through* the screen
3. The two circles will drift together — hold that soft focus as they move
4. Blink slowly if your eyes feel strained; never force it
