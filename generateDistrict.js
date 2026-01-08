#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- ESM equivalents ---
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

if (!params.name || !params.id || !params.route) {
  console.error("❌ Missing required parameters.");
  console.error('Usage: node generateDistrict.js --name "Marketplace" --id "FE-21" --route "/marketplace" --type "economy"');
  process.exit(1);
}

const DISTRICT_NAME = params.name;
const DISTRICT_ID = params.id;
const DISTRICT_ROUTE = params.route;
const DISTRICT_TYPE = params.type || "generic";

// --- Paths ---
const ROOT_DIR = __dirname;
const TEMPLATE_DIR = path.join(ROOT_DIR, "DistrictTemplate_12.x");
const OUTPUT_DIR = path.join(ROOT_DIR, "apps", `${DISTRICT_ID}__${DISTRICT_NAME}_12.x`);

// --- Validate template ---
if (!fs.existsSync(TEMPLATE_DIR)) {
  console.error("❌ Template directory not found:", TEMPLATE_DIR);
  process.exit(1);
}

console.log("ℹ️ MERGE MODE enabled — existing files will be preserved.");

// --- Recursive merge copy ---
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

// --- Run ---
console.log("🚀 Updating district:", DISTRICT_NAME);
console.log("📁 Template:", TEMPLATE_DIR);
console.log("📁 Target:", OUTPUT_DIR);

mergeRecursive(TEMPLATE_DIR, OUTPUT_DIR);

console.log("✅ District updated successfully!");
console.log(`📦 Updated: apps/${DISTRICT_ID}__${DISTRICT_NAME}_12.x`);
