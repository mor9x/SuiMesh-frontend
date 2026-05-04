# Battlefield 4 — World Online UI Prototype

<div align="center">

[![Live Demo](https://img.shields.io/badge/▶%20LIVE%20DEMO-Play%20Now-e87b00?style=for-the-badge&labelColor=04070c)](https://arisliwind.github.io/World-online-function-building.-Basics/)

**[🎮 Click here to play the demo →](https://arisliwind.github.io/World-online-function-building.-Basics/)**

*A high-fidelity interactive prototype of the Battlefield 4 main menu UI*  
*Built from the [Figma community design](https://www.figma.com/design/medx8flUlSXlySMFy3Z25n/Battlefield-4---Main-Menu-UI-Design--Community-) · Zero dependencies · Open in any browser*

</div>

---

## 📐 Screens

| # | Screen | What You Can Do |
|---|--------|-----------------|
| 1 | **Main Menu** | Navigate 8 modes, view live stats, interact with detail panel |
| 2 | **Registration** | Fill the form — live validation, password strength, submit flow |
| 3 | **World & Identity** | Pick your theatre of war + soldier class |
| 4 | **Invite Friends** | Search & invite up to 3 squadmates, copy invite link |
| 5 | **Open Room** | Configure match settings, manage map rotation, launch room |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#04070c` — deep military black |
| Accent Orange | `#e87b00` — BF4 signature colour |
| Text Primary | `#cce0ed` |
| Text Muted | `#607a8a` |
| Font Headings | Orbitron (Google Fonts) |
| Font Body | Rajdhani (Google Fonts) |

**Visual effects:**
- Military boot sequence on startup (skip with any key)
- Animated canvas background — atmospheric fog + floating dust particles
- CRT scanline overlay + radial vignette
- HUD grid + corner bracket chrome decorations
- Sweep line animation
- Screen slide-in transitions
- Toast notification system

---

## 🗂 File Structure

```
index.html     — Complete single-file SPA (HTML + CSS + JS, zero build step)
PRD.md         — Product requirements document
README.md      — This file
.github/
  workflows/
    deploy.yml — Auto-deploy to GitHub Pages on push to main
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/ArisLiWind/World-online-function-building.-Basics.git
cd World-online-function-building.-Basics
open index.html   # macOS
# or just double-click index.html in any OS
```

No npm install. No build step. No server required.

---

## 📋 Product Requirements

See [PRD.md](./PRD.md) for the full product requirements document (feature specs, design tokens, acceptance criteria).

---

<div align="center">

Made with 🪼 by ArisLiWind

</div>
