/**
 * Removes baked-in transparency checkerboard and light matte from character PNGs.
 * Writes files in place when changes are detected.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CHAR_DIR = path.join(process.cwd(), "public", "characters");

function isCheckerOrMatte(r, g, b, a) {
  if (a < 8) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  // Classic gray/white checker export (low chroma, high luma)
  if (chroma <= 18 && min >= 168) return true;
  // Photoshop light gray squares ~192–255
  if (chroma <= 10 && r >= 185 && g >= 185 && b >= 185) return true;
  return false;
}

async function processFile(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  let changed = 0;

  for (let i = 0; i < pixels; i++) {
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const a = data[o + 3];
    if (isCheckerOrMatte(r, g, b, a)) {
      data[o + 3] = 0;
      changed++;
    }
  }

  if (changed < pixels * 0.002) {
    return { file: path.basename(filePath), changed: 0, skipped: true };
  }

  const tmp = `${filePath}.tmp.png`;
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);

  return {
    file: path.basename(filePath),
    changed,
    ratio: (changed / pixels).toFixed(3),
    skipped: false,
  };
}

const files = fs
  .readdirSync(CHAR_DIR)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .map((f) => path.join(CHAR_DIR, f));

const results = [];
for (const file of files) {
  results.push(await processFile(file));
}

for (const r of results) {
  if (r.skipped) continue;
  console.log(`${r.file}: cleared ${r.ratio} of pixels`);
}

const touched = results.filter((r) => !r.skipped).length;
console.log(`Done. Updated ${touched}/${files.length} PNGs.`);
