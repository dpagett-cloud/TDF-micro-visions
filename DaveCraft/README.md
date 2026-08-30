# DaveCraft — Game Manual

DaveCraft is an infinite, Minecraft-style 3D voxel sandbox that runs entirely in one HTML file in a modern browser (Chrome or Firefox). The world is procedurally generated from a seed, streams in around you as you walk, and never ends in any direction. Mine, craft, build, fight mobs by night, and light up the dark.

- **File:** `davecraft.html` (everything — code, textures, sounds — lives in this one file)
- **Requires:** A modern browser (Chrome or Firefox) and an internet connection on first load (Three.js loads from a CDN)
- **No install, no build tools, no accounts**

---

## 1. Getting Started

### Launching the game
1. Double-click `davecraft.html`, or serve the folder and open it in a browser (e.g. `npx http-server` then visit the printed URL).
2. Wait a moment while the spawn area generates.
3. Click anywhere to lock the mouse and start playing.

The first time you load the page you'll see the **instructions overlay**. Click to dismiss it and capture the mouse. Press `Esc` at any time to release the mouse without pausing.

### First-day survival guide (quick start)
1. **Punch a tree** — hold left-click on a tree trunk until it breaks and collect the Wood Log.
2. Press **E**, put the log in the 2×2 crafting grid → craft **Planks**.
3. Craft **Sticks** (2 planks stacked), then a **Crafting Table** (4 planks in a square).
4. Place the table, right-click it, and craft a **Wooden Pickaxe** (3 planks + 2 sticks).
5. Mine **stone** for a **Stone Pickaxe**, then hunt **coal** and **iron**.
6. Before nightfall: craft **torches** (coal on stick) and a **sword**. Night brings zombies and creepers.

---

## 2. Controls

| Input | Action |
|---|---|
| **Click** | Lock the mouse / dismiss overlay |
| **Mouse** | Look around |
| **W A S D** | Move (relative to where you're facing) |
| **Space** | Jump (also swims upward in water) |
| **Shift** or **Ctrl** | Sprint (1.5× walking speed) |
| **Left click (hold)** | Mine the targeted block / attack a mob |
| **Right click** | Place the selected block / open a crafting table |
| **1 – 9** | Select a hotbar slot directly |
| **Mouse wheel** | Cycle hotbar slots |
| **E** | Open/close inventory (with 2×2 crafting) |
| **P** | Pause menu (options, save/load) |
| **Esc** | Release the mouse / close an open screen |

---

## 3. The World

### Infinite terrain
- The world is divided into **chunks** of 16 × 16 blocks, 96 blocks tall, generated on demand from the world seed.
- **Sea level is y = 48.** Snow appears on terrain above roughly y = 78.
- Terrain streams in up to **8 chunks (128 blocks)** around you and unloads behind you; fog hides the edge. Walk 1,000+ blocks in any direction and new terrain keeps generating — there are no boundaries.
- The same seed always produces the same world, so any place you leave and return to will look the same (plus your edits, which are remembered for the session).

### Biomes
| Biome | What you'll find |
|---|---|
| **Plains** | Gentle grassland, scattered oak trees, passive animals |
| **Forest** | Dense oaks — great for wood |
| **Rainforest (jungle)** | Very dense, tall jungle trees with huge canopies |
| **Desert** | Hot and dry — sand, no trees |
| **Beach** | Sand around sea level |
| **Ocean** | Water down to a sand/dirt floor (you can walk on the seabed) |
| **Rocky Highlands** | Stone terrain, steep ground |
| **Snowy Mountains** | High peaks with snow; rises steeply above the treeline |

Biomes blend smoothly into each other; **rivers** wind across the world as sand-lined water channels, and lakes and oceans connect visually.

### Caves and ores
- A connected **cave system** of winding spaghetti tunnels and larger caverns is carved by 3D noise; caves get denser the deeper you go and occasionally open at the surface as natural entrances.
- Caves are **never flooded** — only open sky (oceans, lakes, rivers) fills with water.
- **Ores** generate in stone (deterministic from the seed) and are often exposed on cave walls:
  - **Coal** — common, veins of 3–8, at most depths.
  - **Iron** — less common, veins of 2–6, more frequent the deeper you dig.
- **Bedrock** (indestructible) forms the bottom of the world with a ragged 1–3 block floor.

---

## 4. Blocks Reference

| Block | Hardness | Best tool | Drops |
|---|---|---|---|
| Grass | 0.7 | Shovel | Dirt |
| Dirt | 0.6 | Shovel | Dirt |
| Stone | 2.2 | Pickaxe | Cobblestone |
| Cobblestone | 2.4 | Pickaxe | Cobblestone |
| Coal Ore | 3.0 | Pickaxe | 1–2 Coal |
| Iron Ore | 3.2 | **Stone pickaxe+** | 1 Iron |
| Sand | 0.6 | Shovel | Sand |
| Wood Log | 1.6 | Axe | Wood Log |
| Planks | 1.4 | Axe | Planks |
| Leaves | 0.3 | any | nothing (8% chance of a Stick) |
| Snow | 0.5 | Shovel | Snow |
| Crafting Table | 1.4 | Axe | Crafting Table |
| Torch | ~instant | any | Torch |
| Water | — | — | not minable, no collision |
| Bedrock | ∞ | — | **indestructible** |

Notes:
- **Stone and ores require a pickaxe** to mine at a reasonable speed; **iron ore effectively needs a stone pickaxe or better** (bare hands or wood are painfully slow).
- Mining shows a **cracking animation** on the block so you can see progress; the correct tool is visibly faster.
- Broken blocks drop as **floating, spinning item cubes** that fly to you when you get close and go into your inventory.
- You cannot place a block **inside yourself**, and torches can only be placed on **top faces** of solid blocks.

### Mining speed details
Mining time ≈ `hardness ÷ tool multiplier × 0.45 s`, where the multiplier applies when the tool type matches the block: **wood 2×, stone 4×, iron 6×** (1× with the wrong or no tool). Wrong-tool penalty extra ×3.5 on pickaxe blocks (and ×4 more on iron ore without a stone pick).

---

## 5. Items and Tools

Non-placeable items: **Coal, Iron, Stick, Raw Meat, Feather** — materials for crafting (meat is a future food item; feathers come from chickens).

| Tool | Crafted from | Damage | Durability | Notes |
|---|---|---|---|---|
| Wooden Pickaxe | 3 planks + 2 sticks | 2 | 60 | 2× mining on stone-family |
| Stone Pickaxe | 3 cobble + 2 sticks | 3 | 132 | 4× mining; can mine iron |
| Iron Pickaxe | 3 iron + 2 sticks | 4 | 250 | 6× mining |
| Wooden Sword | 2 planks + 1 stick | 4 | 60 | |
| Stone Sword | 2 cobble + 1 stick | 5 | 132 | |
| Iron Sword | 2 iron + 1 stick | 6 | 250 | strongest weapon |
| Wooden Axe | 3 planks + 2 sticks | 3 | 60 | 2× on wood/planks |
| Wooden Shovel | 1 plank + 2 sticks | 2 | 60 | 2× on dirt/sand/grass/snow |

Tools lose 1 durability per block mined or mob hit and **break when it runs out** (a small durability bar shows on the item). Iron tools last much longer — iron is always worth gathering.

---

## 6. Crafting

Two crafting tiers:
- **2×2 grid** — built into your inventory screen (press **E**).
- **3×3 grid** — right-click a placed **Crafting Table**.

Arrange ingredients in the grid; the **result slot** shows a live preview. Click the result to craft (ingredients are consumed). Recipes can sit **anywhere** in the grid — only the shape matters.

### Recipes available in the 2×2 grid

| Recipe | Layout | Result |
|---|---|---|
| Planks | `L` | 4 Planks |
| Sticks | `P` / `P` (2 planks stacked) | 4 Sticks |
| Crafting Table | `P P` / `P P` (2×2 square) | 1 Crafting Table |
| Torches | `C` / `S` (coal on stick) | 4 Torches |

### Recipes requiring the 3×3 crafting table

| Recipe | Layout (rows top→bottom) | Result |
|---|---|---|
| Wooden Pickaxe | `PPP` / `_S_` / `_S_` | 1 |
| Stone Pickaxe | `KKK` / `_S_` / `_S_` | 1 |
| Iron Pickaxe | `III` / `_S_` / `_S_` | 1 |
| Wooden Sword | `P` / `P` / `S` | 1 |
| Stone Sword | `K` / `K` / `S` | 1 |
| Iron Sword | `I` / `I` / `S` | 1 |
| Wooden Axe | `PP` / `PS` / `_S` | 1 |
| Wooden Shovel | `P` / `S` / `S` | 1 |

Key: `P` Planks, `K` Cobblestone, `I` Iron, `S` Stick, `L` Wood Log, `C` Coal, `_` empty.

---

## 7. Inventory

- **36 slots total**: 9 hotbar + 27 storage. Items stack to **64**.
- Press **E** to open. The mouse is released while the screen is open.
- **Left-click** a stack to pick it up / place it / swap with another.
- **Right-click** to pick up **half** a stack, or place **one item** at a time.
- Closing the screen returns anything left in the crafting grid (and anything held on your cursor) to your inventory.
- Mined blocks and mob drops stack into existing piles first, then empty slots. If your inventory is full, drops stay in the world.
- The **hotbar** is always visible; the selected slot is highlighted and the item's name flashes when you switch.

---

## 8. Health, Damage and Death

- You have **10 hearts (20 HP)** shown above the hotbar.
- **Fall damage** from drops of more than ~3 blocks (water breaks your fall — no damage).
- **Hostile mobs** damage you on contact; **creepers** explode for up to 14 damage at point-blank (scaling with distance) and destroy nearby non-bedrock blocks, which drop as items.
- Health **slowly regenerates** when you haven't been hurt for 8 seconds (1 HP per 3 s).
- On death: a red **"You died!"** screen — click to respawn at your spawn point with full health. **Your inventory is kept.**

---

## 9. Mobs

### Passive animals
Cows, pigs, sheep and chickens spawn on grass in plains, forest and rainforest. They wander, pause, walk on; when hit they flee briefly. Killed animals burst into particles and drop **raw meat** (or **feathers** from chickens). All mobs are blocky, procedurally textured, walk with a leg-swing animation, have gravity and collision, and can hop up one-block steps.

### Hostile mobs (night / darkness)
| Mob | Behaviour |
|---|---|
| **Zombie** | Chases you within 24 blocks, walks directly at you with one-block step-up, deals 3 damage on touch (1 s cooldown), knocks you back |
| **Creeper** | Approaches, and within 3 blocks starts a 1.5 s hissing, flashing fuse — then **explodes**, damaging you and destroying terrain. Back away to reset the fuse! |

**Spawn rules:** hostiles spawn where the *effective light level* is below 7 — at night on the surface, or during the day in unlit caves. **Torch-lit areas are safe.** At dawn, hostile mobs exposed to daylight burn away; ones sheltered in darkness survive.

Mob management: total mobs are capped for performance, mobs never spawn inside blocks or water, and they despawn when you get far away or their chunk unloads.

---

## 10. Lighting

- **Sky light** — open sky is fully lit; light spreads down and sideways into overhangs and cave mouths with falloff, so deep caves fade to black.
- **Block light** — **torches emit light level 14**, spreading outward and losing one level per block.
- Each surface's brightness is the max of the two; sky light **fades with time of day**, so the surface dims at night while torch light stays constant — caves are dark even at noon.
- Placing or breaking blocks (especially torches) recomputes lighting in the affected area.
- **Tip:** the default darkness underground at night can be genuinely dark. Use the **Gamma** slider (pause menu, P) to brighten shadows globally.

---

## 11. Day / Night

- A full cycle is **10 minutes** by default (configurable, see below): sunrise → noon → sunset colours → dark night with a visible moon.
- The sun and moon travel across the sky; sky and fog colours shift through sunrise/sunset oranges.
- Night is when hostile mobs appear on the surface. Dawn clears them.

---

## 12. Pause Menu and Options (press **P**)

| Option | Effect |
|---|---|
| **Resume** | Unpause and re-lock the mouse |
| **Difficulty: Easy / Normal / Hard** | Mob numbers — hostile cap 4 / 10 / 18, passive cap 8 / 10 / 14 |
| **Gamma slider (0.6 – 2.2)** | Brightens dark areas (great for caves/night). 1.0 = default |
| **Day length slider (1 – 30 min)** | Real-time length of a full day/night cycle |
| **Save game** | Stores your position, health, inventory, time of day and **every block you've changed** in browser localStorage |
| **Load game** | Restores that save exactly — even after closing and reopening the page |

The game freezes completely while paused. **Settings save automatically** and persist between sessions; the world **save** only happens when you click Save (make it a habit before closing the tab).

---

## 13. HUD

- **Crosshair** — centre of the screen.
- **Wireframe outline** — the block you're targeting.
- **Hotbar** — 9 slots with icons and stack counts.
- **Hearts** — health bar above the hotbar.
- **Held item** — bottom-right first-person view of the selected item/tool; bobs as you walk, sways as you turn, swings when you mine or attack.
- **Debug text (top-left)** — FPS, current chunk, coordinates, mob/drop counts.

---

## 14. Atmosphere, Particles and Sound

- Block-breaking **particles** coloured to match the block; hit flashes and red bursts on mobs; explosion smoke and sparks; torch embers flicker above lit torches.
- All sound effects are **synthesised at runtime** (Web Audio): block break/place crunches, footsteps, pickup pops, hurt sounds, zombie groans, creeper hiss, animal noises.

---

## 15. Troubleshooting

| Problem | Fix |
|---|---|
| Blank/blue world, only UI visible | Hard-refresh (**Ctrl+F5**) — an old cached build may be running. If it persists, check the **tab title**: errors are reported there (e.g. `ERR:` or `CONSOLE:`). Send that text for a quick diagnosis. |
| Page won't load / black screen | An internet connection is needed the first time so Three.js can load from its CDN. |
| Stuck inside terrain after loading a save | You'll automatically rise out. If not, save your game, reload the page, and Load again. |
| Game feels too dark | Pause (P) → raise **Gamma**. |
| Too many/few monsters | Pause (P) → set **Difficulty**. |
| Save gone | Saves live in the browser's localStorage for that exact address (`http://...` vs `file://` are different storages) — load the game from the same address you saved from. |

### Hidden testing options (URL hash)
- `davecraft.html#tp=X,Z` — teleport to world coordinates
- `#ty=Y` — set your Y (height) after teleporting
- `#t=0.5` — start at a time of day (0 = midnight, 0.5 = noon)
- `#test=1` — start with a small kit (logs, cobble, coal, sticks, planks)

---

## 16. Technical Notes

- **One file**, no build step: HTML + CSS + vanilla JavaScript, Three.js from a CDN.
- All textures are generated at runtime as 16×16 pixel-art canvases packed into a single atlas (nearest-neighbour filtering for crisp pixels).
- Voxel lighting (sky + torch flood-fill) is baked into chunk meshes as vertex attributes; a shader uniform scales sky light with time of day.
- Chunk data lives in typed arrays; chunk generation and meshing are budgeted per frame so the game never freezes while streaming.
- Terrain is a pure function of `(seed, chunkX, chunkZ)` — any chunk can be regenerated identically on demand. Player edits are stored as an override map and reapplied after generation (ready for localStorage/IndexedDB persistence, which the Save option uses).
- World seed is fixed at `1337` (top of the file, `WORLD_SEED`) — change it for a whole new world.

Have fun — and watch your step after sundown. 🌙
