# SuiMesh

> Own the Context. Verify the Action.

SuiMesh is the **agent-to-agent communication protocol** for the Sui ecosystem.

Every context flows, every identity is verified, every action is attested — all running on the SuiMesh protocol.

---

## 🌌 Immersive 3D Website

This repository contains the official SuiMesh brand website — a cinematic, scroll-driven 3D experience built entirely with modern web technologies.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  SuiMesh Immersive Experience Architecture                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │  Three.js    │   │    GSAP      │   │ ScrollTrigger│    │
│  │  WebGL Scene │   │  Timeline    │   │  Scroll Sync │    │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘    │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            ▼                                │
│                ┌──────────────────────┐                     │
│                │ Unified 3D Universe  │                     │
│                │ (no page transitions)│                     │
│                └──────────┬───────────┘                     │
│                           │                                 │
│    ┌──────────┬───────────┼───────────┬──────────┐          │
│    ▼          ▼           ▼           ▼          ▼          │
│  5 Layers of Parallax Depth Structure                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Layer 1: Deep Space Background (procedural nebula)  │   │
│  │ Layer 2: Volumetric Fog + Ambient Particles         │   │
│  │ Layer 3: Floating Drops + Context Particles         │   │
│  │ Layer 4: Liquid Drop System (glass shaders)         │   │
│  │ Layer 5: Text UI + Buttons (fixed overlay)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Post-Processing: Bloom / Tone Mapping / ACES                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6-Scene Cinematic Narrative

| Scene | Phase | Camera Movement | Visual System |
|-------|-------|-----------------|---------------|
| **Hero** | Own the Context | Orbit around 5 drops | 5 liquid glass drops |
| **Convergence** | Context merging | Dolly in + orbit | Drops gravitationally converge |
| **Universe** | 10,000+ contexts | Pull back wide reveal | Instanced mesh drops reveal |
| **Flow** | Information propagates | Tracking shot | Flow particle system |
| **Ocean** | Unified communication | Flyover | Animated ocean surface |
| **Protocol** | Built on SuiMesh | Close return | Composite composition |

### Technologies

- **Three.js** — Unified WebGL 3D scene
- **Custom GLSL Shaders** — Simplex-noise drop deformation, deep-space nebula, flow particles, ocean waves
- **GSAP + ScrollTrigger** — Scroll progress drives camera timeline, not page scroll
- **ACES Filmic Tone Mapping** — Cinematic color reproduction
- **Bloom Post-Processing** — Volumetric light glow
- **Responsive** — Desktop & mobile optimized

### File Structure

```
├── index.html          # Single-page entry
├── css/
│   └── style.css       # Glass-morphism UI, typography, responsive
├── js/
│   ├── main.js         # Scene orchestration, camera timeline, scroll binding
│   ├── shaders.js      # Drop + flow + ocean + deep-space vertex/fragment shaders
│   ├── drops.js        # Liquid drop system, instanced drops, flow particles, ocean
│   ├── particles.js    # 5-layer parallax particle system + volumetric fog
│   └── post.js         # Unreal Bloom + output pass post-processing
```

### Key Design Principles

1. **Scroll = Camera Control** — The user doesn't scroll through pages; they fly a camera through a continuous 3D universe
2. **Dolly In / Out, Orbit, Track, Fly Through** — Cinematic camera language instead of element animation
3. **Continuous Evolution** — No screen cuts; scenes blend via opacity, scale, and camera movement
4. **Physical Light + Glass** — Fresnel-based liquid drops with breathing distortion and edge glow
5. **Parallax Depth** — 5 layers moving at different speeds create real spatial perception

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/ArisLiWind/SuiMesh.git
cd SuiMesh

# Serve (any static server)
python3 -m http.server 8765
# Then open http://localhost:8765
```

No build step required — pure ES modules via CDN imports.

---

## 🔗 Links

- **Website**: [https://arisliwind.github.io/SuiMesh](https://arisliwind.github.io/SuiMesh)
- **GitHub**: [https://github.com/ArisLiWind/SuiMesh](https://github.com/ArisLiWind/SuiMesh)

---

## License

MIT © SuiMesh
