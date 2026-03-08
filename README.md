# Room Designer
[![Vercel Preview Deployment](https://github.com/nataki/room-designer/actions/workflows/preview.yaml/badge.svg)](https://github.com/nataki/room-designer/actions/workflows/preview.yaml)

A 3D room designer built with React and Three.js. Visualize and configure room dimensions and furniture layouts in an interactive 3D viewport.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Three.js** via `@react-three/fiber` + `@react-three/drei` — 3D rendering
- **Zustand** — State management
- **Tailwind CSS 4** — Styling

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint-fix` | Run ESLint with auto-fix |
| `npm run format` | Format with Prettier |

## Project Structure

```
src/
  components/
    scene/          # 3D scene components
      RoomScene       # Root Three.js canvas and scene setup
      RoomMesh        # Room geometry (walls, floor, ceiling)
      CameraRig       # Camera controls and view management
      FurnitureItem   # Per-instance furniture renderer (type-branched)
    ui/             # 2D overlay components
      Toolbar         # Top-level action bar
      FurniturePalette  # Furniture item picker
  store/
    roomStore       # Room dimension state
    furnitureStore  # Furniture instances and selection state
    uiStore         # Camera view and UI state
```