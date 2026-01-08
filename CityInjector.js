#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const APPS = path.join(ROOT, "apps");
const CITY = path.join(ROOT, "apps", "FE-00__City");

// --- Helpers ---
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function isDistrict12x(folder) {
  return (
    folder.includes("_12.x") &&
    fs.existsSync(path.join(APPS, folder, "module.config.json"))
  );
}

function loadConfig(folder) {
  const configPath = path.join(APPS, folder, "module.config.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

// --- STEP 1: Scan apps/ for districts 12.x ---
console.log("🔍 Scanning apps/ for districts 12.x...");

const folders = fs.readdirSync(APPS);
const districts = folders.filter(isDistrict12x);

console.log("📦 Found districts:");
districts.forEach((d) => console.log("  -", d));

// --- STEP 2: Remove old/invalid districts ---
console.log("🧹 Cleaning old/invalid districts...");

folders.forEach((folder) => {
  const full = path.join(APPS, folder);

  if (!folder.includes("_12.x")) {
    console.log("  ❌ Removing old district:", folder);
    fs.rmSync(full, { recursive: true, force: true });
  }
});

// --- STEP 3: Generate CityRegistry.js ---
console.log("🏙️ Generating CityRegistry.js...");

const registryLines = districts.map((folder) => {
  const config = loadConfig(folder);
  return `  registerDistrict("${config.id}", "./apps/${folder}");`;
});

const registryContent = `
import { registerDistrict } from "./registryCore.js";

export function loadCityRegistry() {
${registryLines.join("\n")}
}
`;

fs.writeFileSync(path.join(CITY, "CityRegistry.js"), registryContent, "utf8");

// --- STEP 4: Generate CityMap.js ---
console.log("🗺️ Generating CityMap.js...");

const mapLines = districts.map((folder) => {
  const config = loadConfig(folder);
  return `  { id: "${config.id}", name: "${config.name}", route: "${config.route}" },`;
});

const mapContent = `
export const CityMap = [
${mapLines.join("\n")}
];
`;

fs.writeFileSync(path.join(CITY, "CityMap.js"), mapContent, "utf8");

// --- STEP 5: Generate CityPulse.js ---
console.log("💓 Generating CityPulse.js...");

const pulseLines = districts.map((folder) => {
  const config = loadConfig(folder);
  return `  pulse.register("${config.id}");`;
});

const pulseContent = `
import { pulse } from "./pulseCore.js";

export function loadCityPulse() {
${pulseLines.join("\n")}
}
`;

fs.writeFileSync(path.join(CITY, "CityPulse.js"), pulseContent, "utf8");

// --- STEP 6: Generate CityMemory.js ---
console.log("🧠 Generating CityMemory.js...");

const memoryLines = districts.map((folder) => {
  const config = loadConfig(folder);
  return `  memory.register("${config.id}");`;
});

const memoryContent = `
import { memory } from "./memoryCore.js";

export function loadCityMemory() {
${memoryLines.join("\n")}
}
`;

fs.writeFileSync(path.join(CITY, "CityMemory.js"), memoryContent, "utf8");

// --- STEP 7: Generate SuperEngine wiring ---
console.log("⚡ Generating SuperEngine wiring...");

const superLines = districts.map((folder) => {
  const config = loadConfig(folder);
  return `  superEngine.subscribe("${config.id}");`;
});

const superContent = `
import { superEngine } from "./superEngineCore.js";

export function loadSuperEngine() {
${superLines.join("\n")}
}
`;

fs.writeFileSync(path.join(CITY, "SuperEngineWiring.js"), superContent, "utf8");

// --- STEP 8: Generate integration report ---
console.log("📝 Writing CityIntegrationReport.json...");

const report = {
  timestamp: new Date().toISOString(),
  districtsIntegrated: districts,
  registryFile: "CityRegistry.js",
  mapFile: "CityMap.js",
  pulseFile: "CityPulse.js",
  memoryFile: "CityMemory.js",
  superEngineFile: "SuperEngineWiring.js"
};

fs.writeFileSync(
  path.join(CITY, "CityIntegrationReport.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

console.log("🎉 City integration complete!");
console.log("➡️ All districts 12.x are now wired into City.");
