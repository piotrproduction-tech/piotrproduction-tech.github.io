#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CLI args ---
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
const LAYER = params.layer;
const DISTRICT_ROUTE = params.route || "/district";
const DISTRICT_TYPE = params.type || "generic";

if (!DISTRICT_ID || !DISTRICT_NAME || !LAYER) {
  console.error("❌ Missing required parameters.");
  console.error('Usage: node generateLayer.js --id "FE-21" --name "Marketplace" --layer "access"');
  process.exit(1);
}

// --- Paths ---
const ROOT_DIR = __dirname;
const TEMPLATE_ROOT = path.join(ROOT_DIR, "DistrictTemplate_12.x");
const DISTRICT_ROOT = path.join(ROOT_DIR, "apps", `${DISTRICT_ID}__${DISTRICT_NAME}_12.x`);

// --- Ensure district root exists ---
if (!fs.existsSync(DISTRICT_ROOT)) {
  console.error("❌ District folder not found:", DISTRICT_ROOT);
  console.error("Upewnij się, że istnieje apps/FE-XX__Name_12.x");
  process.exit(1);
}

// --- Layer → template subfolder map ---
const LAYER_MAP = {
  access: "access",
  core: "core",
  analytics: "ANALYTICS",
  ai: "AI",
  panels: "PANELS",
  forms: "FORMS",
  components: "components",
  views: "views",
  utils: "utils",
  state: "state",
  workflows: "workflows",
  admin: "ADMIN",
  base: "." // index.js + module.config.json
};

const templateSub = LAYER_MAP[LAYER];

if (!templateSub) {
  console.error("❌ Unknown layer:", LAYER);
  console.error("Available layers:", Object.keys(LAYER_MAP).join(", "));
  process.exit(1);
}

const TEMPLATE_DIR = path.join(TEMPLATE_ROOT, templateSub);
const TARGET_DIR = LAYER === "base" ? DISTRICT_ROOT : path.join(DISTRICT_ROOT, templateSub);

// --- Ensure district root exists ---
if (!fs.existsSync(DISTRICT_ROOT)) {
  console.log("📁 District folder not found — creating:", DISTRICT_ROOT);
  fs.mkdirSync(DISTRICT_ROOT, { recursive: true });
}


console.log("ℹ️ MERGE MODE — existing files will be preserved.");
console.log("🚀 Layer:", LAYER);
console.log("📁 Template:", TEMPLATE_DIR);
console.log("📁 Target:", TARGET_DIR);

// --- Recursive MERGE copy ---
function mergeRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const items = fs.readdirSync(src);

  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      mergeRecursive(srcPath, destPath);
    } else {
      if (fs.existsSync(destPath)) {
        console.log("⏭️ Skipping existing file:", destPath);
        return;
      }

      let content = fs.readFileSync(srcPath, "utf8");

      content = content
        .replace(/DISTRICT_NAME/g, DISTRICT_NAME)
        .replace(/FE-XX/g, DISTRICT_ID)
        .replace(/\/district/g, DISTRICT_ROUTE)
        .replace(/DISTRICT_TYPE/g, DISTRICT_TYPE);

      fs.writeFileSync(destPath, content, "utf8");
      console.log("➕ Added:", destPath);
    }
  });
}

mergeRecursive(TEMPLATE_DIR, TARGET_DIR);

console.log("✅ Layer merged successfully.");
console.log(`📦 apps/${DISTRICT_ID}__${DISTRICT_NAME}_12.x (${LAYER})`);
