#!/usr/bin/env node

/**
 * Generator District Engine 12.x
 *
 * Użycie:
 *   node scripts/generateDistrict.js --id FE-21 --name "Marketplace Street" --type economy --target apps/FE-21_MarketplaceStreet
 *
 * Założenie:
 *   - istnieje katalog DistrictTemplate_12.x/ w root projektu
 *   - w tym katalogu jest module.config.json (szablon)
 */

const fs = require("fs");
const path = require("path");

// ---- Helpers ----

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];
    if (!key || !value) continue;
    if (key.startsWith("--")) {
      result[key.replace(/^--/, "")] = value;
    }
  }
  return result;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Brak katalogu źródłowego: ${src}`);
  }
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    ensureDir(dest);
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      copyRecursive(srcPath, destPath);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  for (const [from, to] of Object.entries(replacements)) {
    const regex = new RegExp(from, "g");
    content = content.replace(regex, to);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

function walkFiles(dir, cb) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stats = fs.statSync(full);
    if (stats.isDirectory()) {
      walkFiles(full, cb);
    } else {
      cb(full);
    }
  }
}

// ---- Main ----

(async function main() {
  const args = parseArgs();

  const moduleId = args.id;          // np. FE-21
  const name = args.name;            // np. "Marketplace Street"
  const type = args.type || "creative";
  const target = args.target;        // np. apps/FE-21_MarketplaceStreet

  if (!moduleId || !name || !target) {
    console.error("Użycie: node scripts/generateDistrict.js --id FE-21 --name \"Marketplace Street\" --type economy --target apps/FE-21_MarketplaceStreet");
    process.exit(1);
  }

  const root = process.cwd();
  const templateDir = path.join(root, "DistrictTemplate_12.x");
  const targetDir = path.join(root, target);

  console.log(`\n[Generator 12.x] Tworzenie modułu dzielnicy: ${moduleId} - ${name}`);
  console.log(`[Generator 12.x] Szablon: ${templateDir}`);
  console.log(`[Generator 12.x] Cel:     ${targetDir}\n`);

  // 1. Kopiowanie szablonu
  copyRecursive(templateDir, targetDir);

  // 2. Wczytanie module.config.json i podmiana pól
  const configPath = path.join(targetDir, "module.config.json");
  if (!fs.existsSync(configPath)) {
    console.error(`Brak module.config.json w ${configPath}`);
    process.exit(1);
  }

  const rawConfig = fs.readFileSync(configPath, "utf8");
  let config;
  try {
    config = JSON.parse(rawConfig);
  } catch (e) {
    console.error("Nie można sparsować module.config.json:", e);
    process.exit(1);
  }

  config.moduleId = moduleId;
  config.name = name;
  config.type = type;

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");

  // 3. Podmiana identyfikatorów w plikach
  const replacements = {
    "FE-XX": moduleId,
    "District Name": name
  };

  walkFiles(targetDir, (filePath) => {
    if (filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".json")) {
      replaceInFile(filePath, replacements);
    }
  });

  console.log("[Generator 12.x] Zakończono generowanie modułu.");
  console.log(`[Generator 12.x] Moduł: ${moduleId} - ${name}`);
  console.log(`[Generator 12.x] Ścieżka: ${targetDir}\n`);
})();
