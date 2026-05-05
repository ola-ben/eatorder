/* eslint-disable no-console */
// One-shot script: generate PWA-ready PNG icons from public/icon.svg.
// Run: node scripts/generate-pwa-icons.js
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const sourceSvg = resolve(root, "public", "icon.svg");
const outDir = resolve(root, "public");

mkdirSync(outDir, { recursive: true });

const svgBuffer = readFileSync(sourceSvg);

const targets = [
  { name: "pwa-192x192.png", size: 192 },
  { name: "pwa-512x512.png", size: 512 },
  // Maskable icons need ~10% safe-area padding so launchers can crop them.
  { name: "pwa-maskable-512x512.png", size: 512, maskable: true },
  { name: "apple-touch-icon.png", size: 180 },
];

async function build({ name, size, maskable }) {
  let pipeline = sharp(svgBuffer, { density: 384 }).resize(size, size, {
    fit: "contain",
    background: maskable
      ? { r: 239, g: 68, b: 68, alpha: 1 } // brand red bg for maskable
      : { r: 0, g: 0, b: 0, alpha: 0 }, // transparent
  });

  if (maskable) {
    // Add 10% inset by composing the icon at 80% size on the brand bg.
    const inner = await sharp(svgBuffer, { density: 384 })
      .resize(Math.round(size * 0.8), Math.round(size * 0.8), {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    pipeline = sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 239, g: 68, b: 68, alpha: 1 },
      },
    }).composite([{ input: inner, gravity: "center" }]);
  }

  const outPath = resolve(outDir, name);
  await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
  const stat = await sharp(outPath).metadata();
  writeFileSync(outPath, await sharp(outPath).png().toBuffer());
  console.log(`✓ ${name} (${stat.width}×${stat.height})`);
}

for (const target of targets) {
  await build(target);
}
console.log("\nDone. Icons written to public/.");
