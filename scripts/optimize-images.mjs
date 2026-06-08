/**
 * Resizes oversized gallery and hero images in-place.
 * Originals recoverable via `git checkout public/images src/assets`.
 * Safe to re-run: files already within size threshold are skipped.
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const GALLERY_DIRS = [
    join(ROOT, 'public/images/colorado'),
    join(ROOT, 'public/images/louisiana'),
    join(ROOT, 'public/images/favorites/co'),
    join(ROOT, 'public/images/favorites/louisiana'),
];

const HERO_PATH   = join(ROOT, 'src/assets/hero_background.png');
const GALLERY_MAX = 1400;  // px — plenty for a 600px tall strip
const HERO_MAX    = 1800;  // px — wider for full-width hero
const SKIP_BELOW  = 400_000; // bytes — don't touch files already < 400 KB
const JPEG_Q      = 82;

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);

async function optimizeFile(filePath, maxWidth) {
    const { size } = await stat(filePath);
    if (size < SKIP_BELOW) {
        console.log(`  skip  ${basename(filePath)} (${(size / 1024).toFixed(0)} KB — already small)`);
        return;
    }

    const ext     = extname(filePath).toLowerCase();
    const isPng   = ext === '.png';
    const tmpPath = filePath + '.tmp';

    try {
        // .rotate() with no args reads EXIF orientation and applies it before processing,
        // then strips the tag — this prevents sideways images after metadata is removed.
        const pipeline = sharp(filePath).rotate().resize({ width: maxWidth, withoutEnlargement: true });

        if (isPng) {
            // Keep PNG only if it has transparency; otherwise convert to JPEG
            const meta = await sharp(filePath).metadata();
            if (meta.hasAlpha) {
                await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(tmpPath);
            } else {
                await pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true }).toFile(tmpPath);
            }
        } else {
            await pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true }).toFile(tmpPath);
        }

        const { size: newSize } = await stat(tmpPath);
        const pct = (100 - (newSize / size) * 100).toFixed(0);
        console.log(`  ✓  ${basename(filePath)}: ${(size / 1024 / 1024).toFixed(1)} MB → ${(newSize / 1024).toFixed(0)} KB  (−${pct}%)`);
        await rename(tmpPath, filePath);
    } catch (err) {
        // Clean up tmp on error
        try { await rename(tmpPath, tmpPath + '.err'); } catch {}
        console.error(`  ✗  ${basename(filePath)}: ${err.message}`);
    }
}

async function optimizeDir(dir, maxWidth) {
    let files;
    try { files = await readdir(dir); } catch { return; }

    for (const file of files) {
        if (!EXTS.has(extname(file))) continue;
        await optimizeFile(join(dir, file), maxWidth);
    }
}

console.log('=== Image optimization ===\n');

console.log('Hero:');
await optimizeFile(HERO_PATH, HERO_MAX);

for (const dir of GALLERY_DIRS) {
    console.log(`\nGallery: ${dir.replace(ROOT, '.')}`);
    await optimizeDir(dir, GALLERY_MAX);
}

console.log('\nDone.');
