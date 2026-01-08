#!/usr/bin/env node

import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// ESM equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI args
const args = process.argv.slice(2);
const params = {};

args.forEach((arg, i) => {
  if (arg.startsWith("--")) {
    const key = arg.replace("--", "");
    const value = args[i + 1];
    params[key] = value;
  }
});

const DISTRICT_ID = params.id;
const DISTRICT_NAME = params.name;
const DISTRICT_ROUTE = params.route || "/district";
const DISTRICT_TYPE = params.type || "generic";

if (!DISTRICT_ID || !DISTRICT_NAME) {
  console.error("❌ Missing required parameters.");
  console.error('Usage: node generateAllLayers.js --id "FE-21" --name "Marketplace" --route "/marketplace" --type "economy"');
  process.exit(1);
}

// All layers in correct order
const LAYERS = [
  "base",
  "access",
  "core",
  "analytics",
  "ai",
  "panels",
  "forms",
  "components",
  "views",
  "utils",
  "state",
  "workflows",
  "admin"
];

console.log("🚀 Generating ALL layers for:", DISTRICT_NAME);
console.log("📦 District:", DISTRICT_ID);
console.log("📁 Route:", DISTRICT_ROUTE);
console.log("🔧 Type:", DISTRICT_TYPE);
console.log("──────────────────────────────────────────────");

LAYERS.forEach(layer => {
  console.log(`\n▶️  Generating layer: ${layer}`);

  const result = spawnSync("node", [
    path.join(__dirname, "generateLayer.js"),
    "--id", DISTRICT_ID,
    "--name", DISTRICT_NAME,
    "--layer", layer,
    "--route", DISTRICT_ROUTE,
    "--type", DISTRICT_TYPE
  ], { stdio: "inherit" });

  if (result.status !== 0) {
    console.error(`❌ Layer failed: ${layer}`);
    process.exit(1);
  }
});

console.log("\n🎉 ALL layers generated successfully!");
console.log(`🏛️  District ready: apps/${DISTRICT_ID}__${DISTRICT_NAME}_12.x`);
