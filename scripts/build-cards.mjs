// Генератор PNG копинг-карточек.
//
// Использование (из корня репо):
//   node scripts/build-cards.mjs
//
// Читает scripts/cards.config.mjs, фоновые изображения из backgrounds/,
// рендерит public/cards/<slug>.png размером 1200×1600.

import sharp from "sharp";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

import { cards } from "./cards.config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BG_DIR = join(ROOT, "backgrounds");
const OUT_DIR = join(ROOT, "public", "cards");

const W = 1200;
const H = 1600;
const PAD_X = 100;
const PAD_Y = 110;

const COLORS = {
  cream: "#FAF7F1",
  graphite: "#2A2A28",
  graphiteSoft: "#3D3D38",
  graphiteMuted: "#6B6B66",
  sage500: "#88A37D",
  sage700: "#556E4C",
  sage800: "#45593E",
  sage300: "#A6BD9D",
  sage200: "#C7D6C1",
  sage100: "#E3EBE0",
};

// Simple Icons (CC0) paths — viewBox 0 0 24 24
const ICONS = {
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  vk:
    "M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.07 14.27h-1.45c-.55 0-.72-.44-1.7-1.42-.86-.83-1.23-.94-1.44-.94-.3 0-.39.08-.39.49v1.31c0 .35-.11.56-1.04.56-1.53 0-3.23-.93-4.43-2.66-1.79-2.52-2.28-4.41-2.28-4.8 0-.21.08-.4.49-.4h1.45c.37 0 .51.17.65.56.71 2.07 1.91 3.89 2.4 3.89.18 0 .27-.08.27-.55V11.2c-.06-.99-.58-1.07-.58-1.42 0-.16.13-.33.35-.33h2.28c.31 0 .42.16.42.53v2.81c0 .31.13.42.22.42.18 0 .33-.11.66-.45.99-1.11 1.7-2.83 1.7-2.83.09-.21.27-.4.64-.4h1.45c.44 0 .53.22.44.53-.18.84-1.93 3.31-1.93 3.31-.15.24-.21.36 0 .64.15.21.66.65 1 1.04.62.71 1.1 1.31 1.23 1.72.13.42-.09.62-.51.62z",
  instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSvg(card) {
  const titleLineHeight = 92;
  const titleStartY = 320;

  const titleSvg = card.title
    .map(
      (line, i) =>
        `<text x="${PAD_X}" y="${titleStartY + i * titleLineHeight}" font-family="Cormorant Garamond, Georgia, serif" font-size="84" font-weight="500" fill="${COLORS.graphite}" letter-spacing="-1.5">${escapeXml(line)}</text>`,
    )
    .join("\n");

  const titleEndY = titleStartY + card.title.length * titleLineHeight;

  // Декоративная sage-линия под заголовком
  const dividerY = titleEndY + 30;
  const dividerSvg = `<rect x="${PAD_X}" y="${dividerY}" width="80" height="3" fill="${COLORS.sage500}"/>`;

  // Инструкция в тонкой рамке
  const instructionStartY = dividerY + 50;
  const instructionLineH = 36;
  const instructionPadding = 28;
  const instructionBoxHeight =
    card.instruction.length * instructionLineH + instructionPadding * 2 + 24;
  const instructionBoxSvg = `<rect x="${PAD_X}" y="${instructionStartY}" width="${W - 2 * PAD_X}" height="${instructionBoxHeight}" rx="20" ry="20" fill="${COLORS.cream}" fill-opacity="0.65" stroke="${COLORS.sage300}" stroke-width="1.5"/>`;
  const instructionLabel = `<text x="${PAD_X + instructionPadding}" y="${instructionStartY + instructionPadding + 18}" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="${COLORS.sage700}" letter-spacing="2.5">КАК ПОЛЬЗОВАТЬСЯ</text>`;
  const instructionLinesSvg = card.instruction
    .map(
      (line, i) =>
        `<text x="${PAD_X + instructionPadding}" y="${instructionStartY + instructionPadding + 60 + i * instructionLineH}" font-family="Inter, system-ui, sans-serif" font-size="22" font-style="italic" fill="${COLORS.graphiteSoft}">${escapeXml(line)}</text>`,
    )
    .join("\n");

  // Основной текст
  const bodyStartY = instructionStartY + instructionBoxHeight + 60;
  const bodyLineH = 38;
  const bodyLinesSvg = card.body
    .map(
      (line, i) =>
        `<text x="${PAD_X}" y="${bodyStartY + i * bodyLineH}" font-family="Inter, system-ui, sans-serif" font-size="24" fill="${COLORS.graphite}">${escapeXml(line)}</text>`,
    )
    .join("\n");

  const bodyEndY = bodyStartY + (card.body.length - 1) * bodyLineH;

  // Цитата-якорь
  const quoteStartY = Math.max(bodyEndY + 80, 1230);
  const quoteLineH = 52;
  const quoteSvg = card.quote
    .map(
      (line, i) =>
        `<text x="${PAD_X}" y="${quoteStartY + i * quoteLineH}" font-family="Cormorant Garamond, Georgia, serif" font-size="38" font-style="italic" font-weight="500" fill="${COLORS.sage800}">${escapeXml(line)}</text>`,
    )
    .join("\n");

  // Подвал: тонкая линия + соцсети + handle
  const footerY = H - PAD_Y;
  const footerDividerY = footerY - 56;
  const footerDividerSvg = `<rect x="${PAD_X}" y="${footerDividerY}" width="${W - 2 * PAD_X}" height="1" fill="${COLORS.sage300}" fill-opacity="0.7"/>`;

  // Иконки слева
  const iconSize = 28;
  const iconGap = 18;
  const iconY = footerY - 12;
  const icons = ["telegram", "vk", "instagram"];
  const iconsSvg = icons
    .map((name, i) => {
      const x = PAD_X + i * (iconSize + iconGap);
      // viewBox 24 → масштаб iconSize/24
      const scale = iconSize / 24;
      return `<g transform="translate(${x} ${iconY - iconSize}) scale(${scale})"><path d="${ICONS[name]}" fill="${COLORS.sage700}"/></g>`;
    })
    .join("\n");

  // Handle справа
  const handleSvg = `<text x="${W - PAD_X}" y="${iconY - 4}" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="${COLORS.sage700}" text-anchor="end">КРИС, СКАЖИ МНЕ  ·  @kris_tellme</text>`;

  // Eyebrow в самом верху
  const eyebrowSvg = `<text x="${PAD_X}" y="${PAD_Y + 20}" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" fill="${COLORS.sage700}" letter-spacing="3">${escapeXml(card.eyebrow.toUpperCase())}</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${eyebrowSvg}
  ${titleSvg}
  ${dividerSvg}
  ${instructionBoxSvg}
  ${instructionLabel}
  ${instructionLinesSvg}
  ${bodyLinesSvg}
  ${quoteSvg}
  ${footerDividerSvg}
  ${iconsSvg}
  ${handleSvg}
</svg>`;
}

async function buildCard(card) {
  const bgPath = join(BG_DIR, card.background);
  const outPath = join(OUT_DIR, `${card.slug}.png`);

  // 1. Background: resize cover, soft blur, slight desaturate
  const bg = await sharp(bgPath)
    .resize(W, H, { fit: "cover", position: "center" })
    .blur(18)
    .modulate({ saturation: 0.65, brightness: 1.03 })
    .toBuffer();

  // 2. Cream overlay для читаемости текста (полупрозрачный слой).
  // Градиент: чуть плотнее в зоне текста, легче по краям, чтобы текстура фона проступала.
  const creamOverlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
       <defs>
         <radialGradient id="cream" cx="50%" cy="55%" r="75%">
           <stop offset="0%" stop-color="${COLORS.cream}" stop-opacity="0.72"/>
           <stop offset="70%" stop-color="${COLORS.cream}" stop-opacity="0.62"/>
           <stop offset="100%" stop-color="${COLORS.cream}" stop-opacity="0.5"/>
         </radialGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="url(#cream)"/>
     </svg>`,
  );

  // 3. SVG-слой с контентом
  const contentSvg = Buffer.from(buildSvg(card));

  await sharp(bg)
    .composite([
      { input: creamOverlay, blend: "over" },
      { input: contentSvg, blend: "over" },
    ])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outPath);

  const stats = await fs.stat(outPath);
  return { slug: card.slug, size: stats.size, path: outPath };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log(`Building ${cards.length} cards…\n`);
  for (const card of cards) {
    try {
      const result = await buildCard(card);
      console.log(`  ✓ ${result.slug.padEnd(30)}  ${(result.size / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.error(`  ✗ ${card.slug}: ${err.message}`);
      process.exitCode = 1;
    }
  }
  console.log("\nDone. Cards at public/cards/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
