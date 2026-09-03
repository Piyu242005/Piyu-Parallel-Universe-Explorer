# Parallel Universe Explorer

An immersive real-time 3D sci-fi experience for exploring deep space, a solar system, dimensional wormholes, parallel universes, an alien planet, and an advanced alien civilization.

## Stack

- Next.js + TypeScript
- React
- Three.js
- React Three Fiber
- @react-three/drei
- Vercel

## Experience

`Landing → Space → Solar System → Wormhole → Parallel Universe → Alien Planet → Alien Civilization → AI Interaction → Exploration System → Final Polish`

## Development Status

| Phase | Feature | Status |
|---|---|---|
| 1 | Project foundation | ✅ Complete |
| 2 | Space environment | ✅ Complete |
| 3 | Solar system | ✅ Complete |
| 4 | Wormhole transition | ✅ Complete |
| 5 | Parallel universe | ✅ Complete |
| 6 | Alien planet | ✅ Complete |
| 7 | Alien civilization | ✅ Complete |
| 8 | AI interaction HUD | ✅ Complete |
| 9 | Interactive exploration / sector navigation | ✅ Complete |
| 10 | Cinematic final polish | ✅ Complete |

## Phase 10 — Final Polish

The final phase turns the experience into a cohesive exploration interface:

- ✅ Cinematic vignette and scanline treatment
- ✅ Responsive sci-fi HUD layout
- ✅ Sector navigator with six discovered destinations
- ✅ Sector status, coordinates and discovery readout
- ✅ Smooth camera navigation between exploration targets
- ✅ Keyboard-focusable interactive controls
- ✅ Reduced-motion support for accessibility
- ✅ AI console + exploration system integrated into one screen

## Navigation Targets

- **A-01 — Deep Space**
- **A-07 — Solar System**
- **W-44 — Wormhole**
- **P-61 — Parallel Universe**
- **X-78 — Alien Planet**
- **C-82 — Alien City**

Selecting a sector sends a navigation event to the 3D camera, which smoothly interpolates toward the selected scene target.

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  3d/
    UniverseScene.tsx
    StarField.tsx
    Nebula.tsx
    Galaxy.tsx
    Particles.tsx
    SolarSystem.tsx
    Wormhole.tsx
    ParallelUniverse.tsx
    AlienPlanet.tsx
    AlienCivilization.tsx
    CameraController.tsx
  ui/
    AIInteraction.tsx
    ExplorationSystem.tsx
public/
  models/
  textures/
  environments/
  videos/
  audio/
vercel.json
.nvmrc
.gitignore
```

## Vercel

The project is configured for Vercel with Node.js 22, a Next.js framework declaration, and a production build command of `npm run build`.

For local verification:

```bash
npm install
npm run build
npm run start
```

Keep secrets in Vercel Environment Variables and do not commit `.env*` files.

## Current Status

**Phase 10 — Cinematic Final Polish Complete.**

The repository now combines the procedural 3D universe, alien civilization, AI exploration HUD, interactive sector navigation, smooth camera routing, responsive layouts, and final cinematic screen treatment.
