/**
 * CITYOF-GATE — District Version 7.0 Generator
 * Dokłada warstwę 7.0 (street + glow + ekspozycje)
 * Każdy plik ma wyraźny prefiks nazwy dzielnicy
 * Autor: Copilot + Piotr
 */

import fs from "fs";
import path from "path";

const BASE = process.cwd();
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("❌ Użycie: node tools/district_version_7_0_generator.js <DistrictName>");
  process.exit(1);
}

const districtName = args[0];
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

console.log(`=== CITYOF-GATE — GENERATOR WERSJI 7.0 dla ${districtName} ===`);

ensureDir(`${root}/models`);
ensureDir(`${root}/engines`);
ensureDir(`${root}/tests`);

// --- MODELE 7.0 ---
writeFileSafe(
  `${root}/models/${districtName}_ExhibitionModel_7_0.js`,
  `export const ${districtName}_Exhibition_7_0 = {
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
  `${root}/models/${districtName}_GlowEventModel_7_0.js`,
  `export const ${districtName}_GlowEvent_7_0 = {
  id: "",
  exhibitionId: "",
  type: "glow", // glow, highlight, boost
  intensity: 1,
  timestamp: Date.now()
};`
);

// --- SILNIKI 7.0 ---
writeFileSafe(
  `${root}/engines/${districtName}_StreetEngine_7_0.js`,
  `export class ${districtName}_StreetEngine_7_0 {
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
  `${root}/engines/${districtName}_ExhibitionEngine_7_0.js`,
  `export class ${districtName}_ExhibitionEngine_7_0 {
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

// --- TESTY 7.0 ---
writeFileSafe(
  `${root}/tests/test_${districtName}_street_7_0.js`,
  `import { ${districtName}_StreetEngine_7_0 } from "../engines/${districtName}_StreetEngine_7_0.js";

const engine = new ${districtName}_StreetEngine_7_0();
const exhibition = { glow: 0 };

engine.glowUp(exhibition, 3);
console.log("Street 7.0 glow test:", exhibition.glow);`
);

writeFileSafe(
  `${root}/tests/test_${districtName}_exhibition_7_0.js`,
  `import { ${districtName}_ExhibitionEngine_7_0 } from "../engines/${districtName}_ExhibitionEngine_7_0.js";

const engine = new ${districtName}_ExhibitionEngine_7_0();
const ex = engine.createExhibition({ title: "Test" });

console.log("Exhibition 7.0 created:", ex);`
);

console.log("=== DONE — VERSION 7.0 MODULE GENERATED ===");
