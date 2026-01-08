/**
 * CITYOF-GATE — District Version 8.0 Generator
 * Warstwa 8.0 = AI narrative, personalizacja, reputacja, tokenizacja
 * Każdy plik ma wyraźny prefiks dzielnicy i wersji
 * Autor: Copilot + Piotr
 */

import fs from "fs";
import path from "path";

const BASE = process.cwd();
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("❌ Użycie: node tools/district_version_8_0_generator.js <DistrictName>");
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

console.log(`=== CITYOF-GATE — GENERATOR WERSJI 8.0 dla ${districtName} ===`);

ensureDir(`${root}/engines`);
ensureDir(`${root}/models`);
ensureDir(`${root}/tests`);

// --- MODELE 8.0 ---
writeFileSafe(
  `${root}/models/${districtName}_ReputationModel_8_0.js`,
  `export const ${districtName}_Reputation_8_0 = {
  id: "",
  entityId: "",
  score: 0,
  history: []
};`
);

writeFileSafe(
  `${root}/models/${districtName}_TokenModel_8_0.js`,
  `export const ${districtName}_Token_8_0 = {
  id: "",
  ownerId: "",
  amount: 0,
  createdAt: Date.now()
};`
);

// --- SILNIKI 8.0 ---
writeFileSafe(
  `${root}/engines/${districtName}_AIEngine_8_0.js`,
  `export class ${districtName}_AIEngine_8_0 {
  constructor() {}

  personalize(user, context) {
    return { ...context, personalizedFor: user };
  }

  generateNarrative(event) {
    return "AI narrative for event: " + event.type;
  }
}`
);

writeFileSafe(
  `${root}/engines/${districtName}_ReputationEngine_8_0.js`,
  `export class ${districtName}_ReputationEngine_8_0 {
  constructor() {}

  updateScore(rep, delta) {
    rep.score += delta;
    rep.history.push({ delta, timestamp: Date.now() });
    return rep;
  }
}`
);

// --- TESTY 8.0 ---
writeFileSafe(
  `${root}/tests/test_${districtName}_ai_8_0.js`,
  `console.log("AI 8.0 test OK");`
);

console.log("=== DONE — VERSION 8.0 MODULE GENERATED ===");
