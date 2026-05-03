# Battlefield 4 — World Online UI Prototype

> A high-fidelity HTML/CSS/JS prototype of the Battlefield 4 main menu UI, rebuilt from the [Figma community design](https://www.figma.com/design/medx8flUlSXlySMFy3Z25n/Battlefield-4---Main-Menu-UI-Design--Community-?node-id=202-3277) for educational purposes.

---

## 🎮 Live Preview

Open `index.html` directly in any modern browser — no build step, no dependencies, no server required.

---

## 📐 Screens Included

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Main Menu** | Full BF4-style nav with Multiplayer, Campaign, Co-Op, Soldier, World, Invite, Room, Register. Interactive detail panel with mode sub-options and live stats. |
| 2 | **Registration** | Create a new soldier profile — name, soldier tag, email, password, region. |
| 3 | **World & Identity** | Select your theatre of war (Shanghai, Kunlun, Singapore, South China Sea, Azerbaijan, Hainan) and define your soldier class (Assault, Engineer, Support, Recon) with callsign. |
| 4 | **Invite Friends** | Browse online friends list, invite up to 3 squadmates, view live squad slots, copy squad join link. |
| 5 | **Open Room** | Configure room name, player cap, region, visibility, game mode, ticket count, vehicle delays and gameplay toggles. Live player lobby with ping indicators, map rotation navigator. |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#04070c` — deep military black |
| Accent Orange | `#e87b00` — BF4 signature colour |
| Text Primary | `#cce0ed` |
| Text Muted | `#607a8a` |
| Line / Border | `rgba(140,190,220,0.09)` |
| Font Headings | Orbitron (Google Fonts) |
| Font Body | Rajdhani (Google Fonts) |

**Visual effects:**
- Animated canvas background — atmospheric fog layers + floating particle dust
- CRT scanline overlay
- Radial vignette
- Subtle HUD grid
- Corner bracket chrome decorations
- Loading bar on mount
- Screen slide-in transitions

---

## 🗂 File Structure

```
index.html          — All 5 screens, CSS, JS in one self-contained file
README.md           — This file
```

---

## ✨ Interactive Features

- **Main Menu nav** — click each item to update the detail panel (title, description, sub-mode cards, stats)
- **Tab bar** — navigates between all 5 screens
- **Footer CTA buttons** — chain screens in logical order (Register → World → Squad → Room)
- **Registration form** — full input fields, region select, terms checkbox toggle
- **World cards** — single-select highlight with status indicators (Active / Contested / Hostile)
- **Role cards** — single-select class picker (Assault, Engineer, Support, Recon)
- **Friend list** — searchable, invite to squad, slot fills dynamically, remove from squad
- **Squad link** — copy-to-clipboard style display
- **Game mode toggles** — exclusive select
- **Ticket / delay sliders** — real-time value display
- **Map rotation** — prev / next arrows cycle through 10 BF4 maps
- **Launch Room button** — animated state feedback
- **Live player count** — fluctuates every 4 seconds
- **News ticker** — cycles through 4 update messages
- **Real-time clock** — updates every second across all screens

---

## 🔗 References

- Figma Source: [Battlefield 4 — Main Menu UI Design (Community)](https://www.figma.com/design/medx8flUlSXlySMFy3Z25n/Battlefield-4---Main-Menu-UI-Design--Community-?node-id=202-3277)
- Original game: Battlefield 4 © EA DICE — this is a fan recreation for educational / portfolio use only.

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/ArisLiWind/World-online-function-building.-Basics.git
cd World-online-function-building.-Basics

# Open
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

No npm, no bundler, no framework. Pure HTML + CSS + Canvas JS.
