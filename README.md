# Battlefield 4 — World Online UI Prototype

<div align="center">

[![Live Demo](https://img.shields.io/badge/▶%20LIVE%20DEMO-Play%20Now-e87b00?style=for-the-badge&labelColor=04070c)](https://htmlpreview.github.io/?https://github.com/ArisLiWind/World-online-function-building.-Basics/blob/main/index.html)
![Version](https://img.shields.io/badge/version-3.0.0-0099d4?style=for-the-badge&labelColor=04070c)
![Screens](https://img.shields.io/badge/screens-7-1fca5c?style=for-the-badge&labelColor=04070c)

**[🎮 Click here to play the demo →](https://htmlpreview.github.io/?https://github.com/ArisLiWind/World-online-function-building.-Basics/blob/main/index.html)**

*A high-fidelity interactive prototype of the Battlefield 4 main menu UI*  
*Built from the [Figma community design](https://www.figma.com/design/medx8flUlSXlySMFy3Z25n/Battlefield-4---Main-Menu-UI-Design--Community-) · Zero dependencies · Open in any browser*

</div>

---

## 🆕 v3.0 — Major Update (May 4–5, 2026)

| New Feature | Description |
|---|---|
| 🔫 **Armory Screen** | Full weapon loadout builder — 4 classes × primary/secondary, animated stat bars, 5 attachment slots |
| 🖥️ **Server Browser** | Live server list with 15+ servers, real-time player counts, mode/region/slot filters, server detail panel |
| 🗺️ **Faction Territory Control** | Animated USMC vs PLA territory bar in main menu — fluctuates dynamically every 5 seconds |
| ⌨️ **Keyboard Navigation** | Press `1–7` to jump to any screen · `Esc` returns to main menu |
| 🔟 **10 Nav Items** | Added Armory (#09) and Server Browser (#10) to main menu nav list |

---

## 📐 Screens (7 Total)

| # | Screen | What You Can Do |
|---|--------|-----------------|
| 1 | **Main Menu** | Navigate 10 modes, faction territory bar, live stats, interactive detail panel |
| 2 | **Registration** | Fill the form — live validation, password strength, submit flow |
| 3 | **World & Identity** | Pick your theatre of war + soldier class |
| 4 | **Invite Friends** | Search & invite up to 3 squadmates, copy invite link |
| 5 | **Open Room** | Configure match settings, manage map rotation, launch room |
| 6 | **Armory** ⭐ NEW | Select weapons per class, view animated combat stats & attachments |
| 7 | **Server Browser** ⭐ NEW | Browse 15+ live servers, filter by mode/region/slots, join or spectate |

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
- Military boot sequence on startup (skip with any key / click)
- Animated canvas background — atmospheric fog + floating dust particles
- CRT scanline overlay + radial vignette
- HUD grid + corner bracket chrome decorations
- Sweep line animation
- Animated stat bars with cubic-bezier easing
- Faction territory control with live fluctuation
- Screen slide-in transitions
- Toast notification system

---

## 🔫 Armory — Weapon Roster

| Class | Primary Weapons | Secondary |
|-------|----------------|-----------|
| **Assault** | M416 · AEK-971 · AK-12 · M16A4 · FAMAS · CZ-805 | P226 · M9 · .44 Magnum |
| **Engineer** | SCAR-H SV · ACE 52 CQB · M4 · PDW-R | MP7 · UMP-45 |
| **Support** | M249 · PKP Pecheneg · QBB-95-1 · AWS | SPAS-12 · P226 |
| **Recon** | M40A5 · SV98 · Scout Elite · SR-2 | ACE 23 · M416 |

Each weapon shows: **Damage · Range · Accuracy · Fire Rate · Stability** + 5 attachment slots.

---

## 🖥️ Server Browser — Features

- **15 servers** across AS-SHA · AS-SGP · NA-NYC · EU-FRA · SA-SAO
- Filter by **Game Mode**, **Region**, **Open/Full Slots**
- Free-text server name search
- **Refresh** button — simulates live player count fluctuation
- Selected server detail panel: map preview, ping, mode, player count, server rules
- **Join Server** → queue simulation with toast feedback

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Main Menu |
| `2` | Register |
| `3` | World & Identity |
| `4` | Invite Friends |
| `5` | Open Room |
| `6` | Armory |
| `7` | Server Browser |
| `Esc` | Return to Main Menu |

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
# or just double-click index.html
```

No npm install. No build step. No server required.

---

## 📋 Changelog

### v3.0.0 — 2026-05-04
- ✅ Added **Armory** screen (Screen 6) — weapon loadout with animated stat bars
- ✅ Added **Server Browser** screen (Screen 7) — 15 live servers, full filter system
- ✅ Added **Faction Territory Control** bar in main menu detail panel
- ✅ Added **Keyboard shortcuts** (keys 1–7 + Esc)
- ✅ Added **10th nav item** (Server Browser) to main menu
- ✅ Updated all screen tab bars to include Armory + Servers
- ✅ Clock updated to sync across all 7 screens

### v2.0.0 — 2026-05-04
- Initial 5-screen prototype (Main Menu, Register, World, Invite, Room)

---

<div align="center">

Made with 🪼 by ArisLiWind

</div>
