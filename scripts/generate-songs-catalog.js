/**
 * generate-songs-catalog.js
 *
 * Builds ../mySongs/songs-data.js from the on-disk mySongs/ folder structure.
 *
 * Why this exists: the asset filenames across mySongs/ subfolders are
 * inconsistent (apostrophes, casing, trailing spaces, version suffixes like
 * "V1", underscores like "Am I Mad_.mp3"). Rather than hand-maintain a list,
 * we treat the artwork/ folder names as the canonical song titles and
 * fuzzy-match the mp3/description/lyrics files to each song.
 *
 * Usage:
 *   node scripts/generate-songs-catalog.js
 *
 * Adding a new song: drop its files into the relevant subfolders, re-run this
 * script, and the music pages pick it up automatically. No HTML editing needed.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'mySongs');
const OUT = path.join(ROOT, 'songs-data.js');

/** Normalize a name for fuzzy comparison: lowercase, strip punctuation/spaces. */
function normalize(s) {
    return s
        .toLowerCase()
        .replace(/['’`]/g, '')      // apostrophes (straight + curly)
        .replace(/[^a-z0-9]/g, ''); // everything non-alphanumeric
}

/** Recursively list files (relative paths from base) in a directory. */
function listFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...listFiles(full));
        } else {
            out.push(full);
        }
    }
    return out;
}

/** Read a text file safely, returning '' on error. */
function readText(file) {
    try {
        return fs.readFileSync(file, 'utf8');
    } catch {
        return '';
    }
}

/** Turn a title into a URL-safe id. */
function slugify(title) {
    return title
        .toLowerCase()
        .replace(/['’`]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// --- Discover the canonical song list from artwork folder names ---
const artworkDir = path.join(ROOT, 'artwork');
const songTitles = fs.existsSync(artworkDir)
    ? fs.readdirSync(artworkDir, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .map(d => d.name)
    : [];

// --- Index the loose asset files by their normalized base name ---
const files = {
    mp3: listFiles(path.join(ROOT, 'mp3')),
    descriptions: listFiles(path.join(ROOT, 'descriptions')),
    lyrics: listFiles(path.join(ROOT, 'lyrics')),
};

/**
 * Find the best-matching file for a song among candidates.
 * Exact normalized match wins; otherwise we accept a candidate whose
 * normalized name *contains* the song's normalized name (handles "V1",
 * trailing "_", etc.). Resolves ambiguity by picking the shortest name.
 */
function findAsset(candidates, title) {
    const want = normalize(title);
    if (!want) return null;
    // 1. exact
    let best = null;
    let bestLen = Infinity;
    for (const f of candidates) {
        const base = normalize(path.basename(f, path.extname(f)));
        if (base === want && base.length < bestLen) {
            best = f; bestLen = base.length;
        }
    }
    if (best) return best;
    // 2. contains (song name is a prefix/substring of the file name)
    for (const f of candidates) {
        const base = normalize(path.basename(f, path.extname(f)));
        if (base.includes(want) && base.length < bestLen) {
            best = f; bestLen = base.length;
        }
    }
    return best;
}

// --- Build the catalog ---
const catalog = songTitles.map(title => {
    const artFolder = path.join(artworkDir, title);
    const artwork = listFiles(artFolder)
        .filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f))
        .sort();

    const mp3 = findAsset(files.mp3, title);
    const desc = findAsset(files.descriptions, title);
    const lyr  = findAsset(files.lyrics, title);

    return {
        id: slugify(title),
        title,
        description: desc ? readText(desc).trim() : '',
        lyrics: lyr ? readText(lyr).trim() : '',
        mp3: mp3 ? toPosix(path.relative(path.join(ROOT, '..'), mp3)) : '',
        artwork: artwork.map(a => toPosix(path.relative(path.join(ROOT, '..'), a))),
    };
});

function toPosix(p) {
    return p.split(path.sep).join('/');
}

// --- Emit ---
const banner = `/*
 * songs-data.js  — AUTO-GENERATED. Do not edit by hand.
 * Regenerate with:  node scripts/generate-songs-catalog.js
 * Songs: ${catalog.length}
 */`;

const payload = `${banner}
window.SONGS = ${JSON.stringify(catalog, null, 2)};
`;

fs.writeFileSync(OUT, payload, 'utf8');

// --- Report any misses so the user can fix filenames ---
const warnings = [];
for (const s of catalog) {
    const missing = [];
    if (!s.mp3) missing.push('mp3');
    if (!s.description) missing.push('description');
    if (!s.lyrics) missing.push('lyrics');
    if (s.artwork.length === 0) missing.push('artwork');
    if (missing.length) warnings.push(`  - ${s.title}: missing ${missing.join(', ')}`);
}

console.log(`Wrote ${path.relative(process.cwd(), OUT)} with ${catalog.length} songs.`);
if (warnings.length) {
    console.log('\nWarnings (assets that could not be matched):');
    console.log(warnings.join('\n'));
} else {
    console.log('All songs matched all asset types.');
}
