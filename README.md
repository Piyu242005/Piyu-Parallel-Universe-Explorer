# Parallel Universe Explorer

An immersive 3D sci-fi web experience for exploring galaxies, wormholes, alien worlds, and fictional parallel universes.

## Technology

- Next.js + TypeScript
- React
- Three.js
- React Three Fiber
- @react-three/drei
- Vercel

## Experience Roadmap

`Landing → Space → Solar System → Wormhole → Parallel Universe → Alien Planet → Alien Civilization`

## Development Phases

1. Project foundation — ✅ Complete
2. Space environment — ✅ Complete
3. Cinematic landing scene — 🔲 Next
4. Solar system — 🔲 Planned
5. Wormhole transition — 🔲 Planned
6. Parallel universes — 🔲 Planned
7. Alien planet — 🔲 Planned
8. Alien civilization — 🔲 Planned
9. Interactive exploration — 🔲 Planned
10. Cinematic effects — 🔲 Planned
11. Audio and video — 🔲 Planned
12. Performance optimization — 🔲 Planned
13. Mobile experience — 🔲 Planned
14. Deployment — 🔲 Planned

## Phase 2 — Space Environment

Implemented as a real-time React Three Fiber scene:

- ✅ `UniverseScene` — main 3D scene and renderer
- ✅ `StarField` — 7,000 procedurally distributed stars
- ✅ `Nebula` — procedural colored nebula particle cloud
- ✅ `Particles` — 900 independently floating ambient particles
- ✅ `Galaxy` — procedural distant spiral galaxy
- ✅ `CameraController` — smooth cinematic camera motion
- ✅ Space background — black renderer clear color + atmospheric fog
- ✅ Home page integration — scene renders at full viewport

## Vercel Development Requirements

The repository is prepared for Vercel deployment:

- ✅ Next.js framework detected/configured
- ✅ Node.js 22 requirement defined in `package.json`
- ✅ `.nvmrc` pins Node.js 22 for local development
- ✅ `vercel.json` declares the Next.js framework
- ✅ `.gitignore` excludes `.next`, `.vercel`, dependencies, logs, and environment files
- ✅ Production build command: `npm run build`
- ✅ Start command: `npm run start`
- ⚠️ Keep secrets in Vercel Environment Variables; never commit `.env*` files
- ⚠️ Use a committed package-lock/pnpm-lock/yarn.lock for reproducible dependency installs before production hardening

### Local Vercel-ready checks

```bash
npm install
npm run build
npm run start
```

After connecting the repository to Vercel, pushes to `main` can be used for production deployments and other branches can generate preview deployments.

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
    CameraController.tsx
public/
  models/
  textures/
  environments/
  videos/
  audio/
lib/
data/
styles/
vercel.json
.nvmrc
.gitignore
```

## Current Status

**Phase 2 — Space Environment Complete**

The project now has a functional procedural 3D universe foundation and is prepared for Vercel deployment. The next phase is the cinematic landing experience.
