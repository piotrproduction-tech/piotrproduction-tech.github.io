#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const TEMPLATE_ROOT = path.join(ROOT, "DistrictTemplate_12.x");
const APPS_ROOT = path.join(ROOT, "apps");

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

const OLD_PATH = params.from; // np. ./apps/MarketPlaceDistrict
const NEW_ID = params.id;     // np. FE-21
const NEW_NAME = params.name; // np. Marketplace

if (!OLD_PATH || !NEW_ID || !NEW_NAME) {
  console.error("❌ Missing required parameters.");
  console.error('Usage: node migrateDistrict.js --from "./apps/OldDistrict" --id "FE-21" --name "Marketplace"');
  process.exit(1);
}

const OLD_DISTRICT = path.isAbsolute(OLD_PATH) ? OLD_PATH : path.join(ROOT, OLD_PATH);
const NEW_DISTRICT = path.join(APPS_ROOT, `${NEW_ID}__${NEW_NAME}_12.x`);

if (!fs.existsSync(OLD_DISTRICT)) {
  console.error("❌ Old district not found:", OLD_DISTRICT);
  process.exit(1);
}

if (!fs.existsSync(TEMPLATE_ROOT)) {
  console.error("❌ DistrictTemplate_12.x not found:", TEMPLATE_ROOT);
  console.error("Run: node createTemplate.js");
  process.exit(1);
}

// --- Helpers ---
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyRecursive(src, dest) {
  const stat = fs.lstatSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    const items = fs.readdirSync(src);
    for (const item of items) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function scanDirectory(dir) {
  const result = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.lstatSync(full);

    if (stat.isDirectory()) {
      result.push(...scanDirectory(full));
    } else {
      result.push(full);
    }
  }

  return result;
}

function classifyFile(filePath) {
  const rel = path.relative(OLD_DISTRICT, filePath).replace(/\\/g, "/");

  if (rel.startsWith("workflows") || rel.includes("workflow")) return { type: "workflow", rel };
  if (rel.startsWith("ai") || rel.includes("ai")) return { type: "ai", rel };
  if (rel.startsWith("views") || rel.includes("view")) return { type: "view", rel };
  if (rel.startsWith("components") || rel.includes("component")) return { type: "component", rel };
  if (rel.startsWith("state") || rel.includes("state")) return { type: "state", rel };
  if (rel.startsWith("core") || rel.includes("engine") || rel.includes("registry")) return { type: "core", rel };
  if (rel.startsWith("utils") || rel.includes("util")) return { type: "util", rel };
  if (rel.startsWith("access") || rel.includes("permission") || rel.includes("role")) return { type: "access", rel };
  if (rel.endsWith("config.json") || rel.includes("config")) return { type: "config", rel };

  return { type: "other", rel };
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
}

// --- Migration report ---
const report = {
  oldDistrict: OLD_DISTRICT,
  newDistrict: NEW_DISTRICT,
  filesScanned: 0,
  classified: {
    core: [],
    workflows: [],
    ai: [],
    views: [],
    components: [],
    state: [],
    utils: [],
    access: [],
    config: [],
    other: []
  },
  notes: []
};

// --- STEP 1: Scan old district ---
console.log("🔍 Scanning old district:", OLD_DISTRICT);
const allFiles = scanDirectory(OLD_DISTRICT);
report.filesScanned = allFiles.length;

allFiles.forEach((file) => {
  const cls = classifyFile(file);
  switch (cls.type) {
    case "core":
      report.classified.core.push(cls.rel);
      break;
    case "workflow":
      report.classified.workflows.push(cls.rel);
      break;
    case "ai":
      report.classified.ai.push(cls.rel);
      break;
    case "view":
      report.classified.views.push(cls.rel);
      break;
    case "component":
      report.classified.components.push(cls.rel);
      break;
    case "state":
      report.classified.state.push(cls.rel);
      break;
    case "util":
      report.classified.utils.push(cls.rel);
      break;
    case "access":
      report.classified.access.push(cls.rel);
      break;
    case "config":
      report.classified.config.push(cls.rel);
      break;
    default:
      report.classified.other.push(cls.rel);
  }
});

console.log("📊 Classification summary:");
Object.entries(report.classified).forEach(([key, arr]) => {
  console.log(`  - ${key}: ${arr.length}`);
});

// --- STEP 2: Create new district from template ---
console.log("📦 Creating new district from template:", NEW_DISTRICT);
if (fs.existsSync(NEW_DISTRICT)) {
  console.log("⚠️ New district already exists, will merge into:", NEW_DISTRICT);
} else {
  ensureDir(NEW_DISTRICT);
  copyRecursive(TEMPLATE_ROOT, NEW_DISTRICT);
}

// --- STEP 3: Inject config ---
console.log("🧩 Injecting module.config.json");
const newConfigPath = path.join(NEW_DISTRICT, "module.config.json");
let newConfig = {
  id: NEW_ID,
  name: NEW_NAME,
  route: "/district",
  type: "generic",
  version: "12.x",
  description: `Migrated district ${NEW_NAME} from ${OLD_DISTRICT}`,
  tags: ["migrated", "legacy"]
};

if (fs.existsSync(newConfigPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(newConfigPath, "utf8"));
    newConfig = {
      ...existing,
      id: NEW_ID,
      name: NEW_NAME,
      description: newConfig.description,
      tags: Array.from(new Set([...(existing.tags || []), "migrated"]))
    };
  } catch {
    // ignore parse errors, use default
  }
}

writeFile(newConfigPath, JSON.stringify(newConfig, null, 2));

// --- STEP 4: Inject core logic (if any) ---
console.log("🧠 Injecting core logic (if found)");
report.classified.core.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);

  // heurystyka: jeśli plik zawiera "engine" → core/engine.legacy.js
  // jeśli "registry" → core/registry.legacy.js
  // reszta → core/legacy/<nazwa>
  let target;
  if (base.toLowerCase().includes("engine")) {
    target = path.join(NEW_DISTRICT, "core", "engine.legacy.js");
  } else if (base.toLowerCase().includes("registry")) {
    target = path.join(NEW_DISTRICT, "core", "registry.legacy.js");
  } else {
    target = path.join(NEW_DISTRICT, "core", "legacy", base);
  }

  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 5: Inject workflows ---
console.log("🔄 Injecting workflows (legacy)");
report.classified.workflows.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "workflows", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 6: Inject AI logic ---
console.log("🧬 Injecting AI logic (legacy)");
report.classified.ai.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "AI", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 7: Inject views ---
console.log("🖼️ Injecting views (legacy)");
report.classified.views.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "views", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 8: Inject components ---
console.log("🧩 Injecting components (legacy)");
report.classified.components.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "components", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 9: Inject state ---
console.log("🧠 Injecting state (legacy)");
report.classified.state.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "state", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 10: Inject utils ---
console.log("🧰 Injecting utils (legacy)");
report.classified.utils.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "utils", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 11: Inject access ---
console.log("🔐 Injecting access (legacy)");
report.classified.access.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "access", "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 12: Other files ---
console.log("📦 Injecting other files (legacy)");
report.classified.other.forEach((rel) => {
  const src = path.join(OLD_DISTRICT, rel);
  const base = path.basename(rel);
  const target = path.join(NEW_DISTRICT, "legacy", base);
  ensureDir(path.dirname(target));
  fs.copyFileSync(src, target);
});

// --- STEP 13: Write migration report ---
const reportPath = path.join(NEW_DISTRICT, "MigrationReport_12x.json");
writeFile(reportPath, JSON.stringify(report, null, 2));

console.log("📝 Migration report written to:", reportPath);
console.log("🎉 Migration to 12.x (structure + legacy injection) completed.");
console.log("➡️ Next step: manually wire legacy modules into engine/registry/workflows as needed.");
