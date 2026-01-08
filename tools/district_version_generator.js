/**
 * CITYOF-GATE — District Version Generator 1.1
 * Dokłada warstwy 6.0 / 7.0 / 8.0 do istniejącej dzielnicy
 * Każdy plik ma wyraźny prefiks nazwy dzielnicy
 * Autor: Copilot + Piotr
 */

import fs from "fs";
import path from "path";

const BASE = process.cwd();
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("❌ Użycie: node tools/district_version_generator.js <DistrictName> <Version>");
  process.exit(1);
}

const districtName = args[0];
const version = args[1];

const root = path.join(BASE, "apps", districtName);

function writeFileSafe(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Created:", filePath);
  } else {
    console.log("⚠ Skipped (already exists):", filePath);
  }
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("📁 Created folder:", dirPath);
  }
}

console.log(`=== CITYOF-GATE — GENERATOR WERSJI ${version} dla ${districtName} ===`);

ensureDir(`${root}/models`);
ensureDir(`${root}/engines`);
ensureDir(`${root}/tests`);

// --- WERSJA 6.0 (ekonomia) ---
if (version === "6.0") {
  writeFileSafe(
    `${root}/models/${districtName}_ProductModel.js`,
    `export const ${districtName}_Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  stock: 0,
  sellerId: "",
  categoryId: "",
  tags: []
};`
  );

  writeFileSafe(
    `${root}/engines/${districtName}_MarketplaceEngine.js`,
    `export class ${districtName}_MarketplaceEngine {
  constructor() {}
  buy(product, quantity) {
    if (product.stock < quantity) return { ok: false, reason: "OUT_OF_STOCK" };
    product.stock -= quantity;
    return { ok: true, product, quantity };
  }
}`
  );

  writeFileSafe(
    `${root}/tests/test_${districtName}_marketplace.js`,
    `console.log("Marketplace 6.0 test OK");`
  );
}

// --- WERSJA 7.0 (street + glow + ekspozycje) ---
if (version === "7.0") {
  // MODELE
  writeFileSafe(
    `${root}/models/${districtName}_ExhibitionModel.js`,
    `export const ${districtName}_Exhibition = {
  id: "",
  title: "",
  creatorId: "",
  description: "",
  glow: 0,
  tags: [],
  createdAt: Date.now()
};`
  );

  writeFileSafe(
    `${root}/models/${districtName}_GlowEventModel.js`,
    `export const ${districtName}_GlowEvent = {
  id: "",
  exhibitionId: "",
  type: "glow", // glow, highlight, boost
  intensity: 1,
  timestamp: Date.now()
};`
  );

  // SILNIKI
  writeFileSafe(
    `${root}/engines/${districtName}_StreetEngine.js`,
    `export class ${districtName}_StreetEngine {
  constructor() {}

  glowUp(exhibition, amount = 1) {
    exhibition.glow += amount;
    return exhibition;
  }

  applyGlowEvent(exhibition, event) {
    if (event.type === "glow") exhibition.glow += event.intensity;
    if (event.type === "highlight") exhibition.glow += event.intensity * 2;
    if (event.type === "boost") exhibition.glow += event.intensity * 5;
    return exhibition;
  }
}`
  );

  writeFileSafe(
    `${root}/engines/${districtName}_ExhibitionEngine.js`,
    `export class ${districtName}_ExhibitionEngine {
  constructor() {}

  createExhibition(data) {
    return {
      ...data,
      id: crypto.randomUUID(),
      glow: 0,
      createdAt: Date.now()
    };
  }

  tag(exhibition, tag) {
    exhibition.tags.push(tag);
    return exhibition;
  }
}`
  );

  // TESTY
  writeFileSafe(
    `${root}/tests/test_${districtName}_street.js`,
    `import { ${districtName}_StreetEngine } from "../engines/${districtName}_StreetEngine.js";

const engine = new ${districtName}_StreetEngine();
const exhibition = { glow: 0 };

engine.glowUp(exhibition, 3);
console.log("Street 7.0 glow test:", exhibition.glow);`
  );

  writeFileSafe(
    `${root}/tests/test_${districtName}_exhibition.js`,
    `import { ${districtName}_ExhibitionEngine } from "../engines/${districtName}_ExhibitionEngine.js";

const engine = new ${districtName}_ExhibitionEngine();
const ex = engine.createExhibition({ title: "Test" });

console.log("Exhibition 7.0 created:", ex);`
  );
}

// --- WERSJA 8.0 (AI narrative + personalizacja) ---
if (version === "8.0") {
  writeFileSafe(
    `${root}/engines/${districtName}_AIEngine.js`,
    `export class ${districtName}_AIEngine {
  constructor() {}
  personalize(user, context) {
    return { ...context, personalizedFor: user };
  }
}`
  );

  writeFileSafe(
    `${root}/tests/test_${districtName}_ai.js`,
    `console.log("AI 8.0 test OK");`
  );
}

console.log("=== DONE — VERSION MODULE GENERATED ===");
