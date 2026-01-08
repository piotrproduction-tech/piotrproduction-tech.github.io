// generatorCityCore_12x.js
// Generator czystego CityCore_12.x

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CITY_CORE_NAME = "CityCore_12.x";

const coreModules = [
  "AI",
  "BROADCAST",
  "ECONOMY",
  "GOVERNANCE",
  "HEATMAP",
  "MAP",
  "MEMORY",
  "MENU",
  "NARRATIVE",
  "PANELS",
  "PERSONALITY",
  "PULSE",
  "RHYTHM",
  "SIMULATION",
  "SYNC",
  "VIEWS"
];

const baseFiles = [
  {
    relPath: "index.js",
    content: `// CityCore_12.x — czyste jądro miasta 12.x

export function initCityCore(engine) {
  console.log("🌆 CityCore_12.x: init…");

  // tutaj będziemy po kolei inicjalizować moduły
  // np. import "./PULSE/cityPulseEngine.js" itd.

  console.log("🌆 CityCore_12.x: ready.");
}
`
  }
];

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function writeFileIfMissing(fullPath, content) {
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, "utf8");
  }
}

function run() {
  const appsDir = __dirname;
  const cityCorePath = path.join(appsDir, CITY_CORE_NAME);

  console.log(`🌆 Generator CityCore 12.x`);
  console.log(`📁 apps dir: ${appsDir}`);
  console.log(`📁 CityCore target: ${cityCorePath}`);

  ensureDir(cityCorePath);

  // moduły core
  coreModules.forEach(mod => {
    const modPath = path.join(cityCorePath, "core", mod);
    ensureDir(modPath);
  });

  // pliki bazowe
  baseFiles.forEach(file => {
    const fullPath = path.join(cityCorePath, file.relPath);
    writeFileIfMissing(fullPath, file.content);
  });

  console.log("✅ CityCore_12.x structure ensured.");
}

run();
