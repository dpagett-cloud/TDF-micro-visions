# TDF Microvisions

Welcome to the **TDF Microvisions** core repository. This platform serves as the centralized hub for all tactical simulators, technical documentation, and system monitoring tools. All AI generated, it's my playground!

**Repository:** <https://github.com/dpagett-cloud/TDF-micro-visions>

## 🚀 Navigation Overview
The dashboard provides streamlined access to three primary sectors:

### 🕹️ Games Repository
A suite of combat and strategy simulations designed for varying levels of complexity:
- **Alien Bomber**: Planetary defense combat simulation.
- **City Bomber**: Urban tactical simulator focused on precision strikes.
- **Go**: A classic strategy game of territory and capture.
- **Arkanoid**: Block-clearing arcade action.
- **Snake**: The classic navigation challenge.
- **Pong**: A high-speed, retro-style reaction game.
- **Tetris**: A classic block drop game.
- **Davaxian**: Arcade space shooter like it's 1979! 

### 🔬 Auxiliary Systems
Supporting infrastructure and system utilities:
- **Heart Model Diagram**: Detailed biological schematics and analysis.
- **Hourglass Timer**: A dedicated countdown utility for timed operations.
- **Ohm's Law Calculator**: The relationship between voltage, current, and resistance — explained simply, calculated instantly!

### 🎵 Music From Another World
The **Apology Remastered** collection — original songs and AI covers:
- **Dave's Music**: Browse all 18 tracks on a dedicated music index page. Each song has its own page with artwork, lyrics, a description, and in-browser MP3 playback. Build a playlist by selecting individual tracks (or all of them) and play them back without leaving the index page.

The 18 tracks: Am I Mad · Brave New World · Cadence Rising · I Don't Wanna Sleep · In a Distant Land · It's Birthday Time · Love Light · March of the Orcs · No Barriers · Secret Agent · Shieldmaiden · The Collective · The King of Rohan · The Mountain Cries · The Rise and Fall of the Hammer · The Way I Feel · Time for Tea · Walking on a Winters Day

## 🛠️ Project Structure & Setup

### Key files
| File | Description |
|------|-------------|
| `index.html` | The TDF Microvisions landing page — entry point to all sections. |
| `music.html` | The **Apology Remastered** music index (cards, playlist builder, in-page player). |
| `song.html` | Reusable song-detail template — any track via `song.html?id=<song-id>`. |
| `*.html` (root) | The individual games and auxiliary apps (Alien Bomber, Go, Snake, Heart Model, etc.). |
| `mySongs/` | All music assets: `mp3/`, `lyrics/`, `descriptions/`, `artwork/`, plus `albumCover.png` and `background.png`. |
| `mySongs/songs-data.js` | Auto-generated catalog of every song (paths, lyrics, descriptions). **Do not edit by hand.** |
| `scripts/generate-songs-catalog.js` | Generator that scans `mySongs/` and rebuilds `songs-data.js`. |

### Running locally
1. Navigate to the root directory.
2. Ensure the `assets/` and `mySongs/` folders are present.
3. Open `index.html` in a modern web browser to launch the command center.
   - For full media support (MP3 seeking/streaming), serve the folder over HTTP rather than opening the file directly — e.g. `python -m http.server`. (Some browsers restrict range requests on `file://` URLs.)

> Note: a live **System Status** section at the bottom of the landing page shows the current date/time, updating in real time.

## ➕ Adding New Songs
The music pages are **data-driven**, so adding a track requires no HTML editing:
1. Drop the song's files into the relevant `mySongs/` subfolders — `mp3/`, `lyrics/`, `descriptions/`, and a new subfolder under `artwork/` (named after the song, containing its images).
2. Run the generator from the repository root:
   ```bash
   node scripts/generate-songs-catalog.js
   ```
   It treats the `artwork/` subfolder names as the canonical song titles and fuzzy-matches the other assets (so filename inconsistencies — apostrophes, casing, version suffixes — are handled automatically). Any unmatched assets are reported as warnings.
3. Reload `music.html` — the new song appears as a card and gets its own detail page automatically.

## 📜 Versioning & Development
- **Current Version**: 4 (Game Heavy Configuration)
- **Status**: Live
- **Documentation**: Refer to the "Core System Explanation" for deep dives into project theory.

---
© 2026 David Pagett. *Proprietary information. Access restricted to authorized personnel only.*
