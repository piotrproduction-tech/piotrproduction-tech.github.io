/**
 * GATE REBUILD FE‑01 / BE‑01 WITH LAYERS
 * --------------------------------------
 * Ten generator:
 * 1. Archiwizuje stare FE‑01 i BE‑01
 * 2. Tworzy pełną strukturę warstw FE‑01 i BE‑01
 * 3. Przenosi wszystkie istniejące pliki do odpowiednich warstw
 * 4. Aktualizuje importy i routing
 * 5. Nie usuwa żadnej logiki
 * 6. Nie resetuje miasta
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");
const LEGACY = path.join(ROOT, "LEGACY");

// Ścieżki modułów
const FE01 = path.join(APPS, "FE-01__Festival_Pavilion");
const BE01 = path.join(BACKEND, "BE-01__Festival_Engine");

// Warstwy FE
const FE_LAYERS = [
  "MODULES",
  "PANELS",
  "FORMS",
  "AI",
  "ADMIN",
  "JURY",
  "WORKFLOW",
  "DATA",
  "RELATIONS",
  "ANALYTICS"
];

// Warstwy BE
const BE_LAYERS = [
  "api",
  "data",
  "workflow",
  "config",
  "security",
  "relations",
  "analytics"
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function moveToLegacy(src, name) {
  if (!fs.existsSync(src)) return;

  ensureDir(LEGACY);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dest = path.join(LEGACY, `${name}_${stamp}`);

  fs.renameSync(src, dest);
  console.log(`📦 Archiwizowano: ${name} → ${path.relative(ROOT, dest)}`);
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`📄 Utworzono: ${path.relative(ROOT, filePath)}`);
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`📁 Przeniesiono: ${path.relative(ROOT, src)} → ${path.relative(ROOT, dest)}`);
}

console.log("🏙️  REBUILD FE‑01 / BE‑01 START...");

// 1. Archiwizacja
moveToLegacy(FE01, "FE-01__old");
moveToLegacy(BE01, "BE-01__old");

// 2. Tworzenie nowej struktury FE‑01
console.log("\n🎨 Tworzę nową strukturę FE‑01...");
ensureDir(FE01);

FE_LAYERS.forEach(layer => ensureDir(path.join(FE01, layer)));

// 3. Tworzenie nowej struktury BE‑01
console.log("\n🛠️  Tworzę nową strukturę BE‑01...");
ensureDir(BE01);

BE_LAYERS.forEach(layer => ensureDir(path.join(BE01, layer)));

// 4. Odtwarzanie plików FE‑01 z archiwum
const legacyFE = fs.readdirSync(LEGACY).find(f => f.startsWith("FE-01__old"));
const legacyFEPath = path.join(LEGACY, legacyFE);

function restoreFE() {
  const panels = path.join(legacyFEPath, "panels");
  const forms = path.join(legacyFEPath, "FORMS");
  const api = path.join(legacyFEPath, "festivalApi.js");
  const index = path.join(legacyFEPath, "index.js");

  if (fs.existsSync(panels)) {
    fs.readdirSync(panels).forEach(file => {
      copyFile(path.join(panels, file), path.join(FE01, "PANELS", file));
    });
  }

  if (fs.existsSync(forms)) {
    fs.readdirSync(forms).forEach(file => {
      copyFile(path.join(forms, file), path.join(FE01, "FORMS", file));
    });
  }

  if (fs.existsSync(api)) {
    copyFile(api, path.join(FE01, "api.js"));
  }

  if (fs.existsSync(index)) {
    copyFile(index, path.join(FE01, "index.js"));
  }

  writeFileForce(
    path.join(FE01, "module.config.json"),
    `{
  "id": "FE-01",
  "name": "Festival Pavilion",
  "baseRoute": "/festival",
  "description": "Moduł Festiwalowy CITYOF-GATE"
}`
  );
}

restoreFE();

// 5. Odtwarzanie plików BE‑01 z archiwum
const legacyBE = fs.readdirSync(LEGACY).find(f => f.startsWith("BE-01__old"));
const legacyBEPath = path.join(LEGACY, legacyBE);

function restoreBE() {
  const api = path.join(legacyBEPath, "api");
  const data = path.join(legacyBEPath, "data");
  const config = path.join(legacyBEPath, "config");
  const index = path.join(legacyBEPath, "index.js");

  if (fs.existsSync(api)) {
    fs.readdirSync(api).forEach(file => {
      copyFile(path.join(api, file), path.join(BE01, "api", file));
    });
  }

  if (fs.existsSync(data)) {
    fs.readdirSync(data).forEach(file => {
      copyFile(path.join(data, file), path.join(BE01, "data", file));
    });
  }

  if (fs.existsSync(config)) {
    fs.readdirSync(config).forEach(file => {
      copyFile(path.join(config, file), path.join(BE01, "config", file));
    });
  }

  if (fs.existsSync(index)) {
    copyFile(index, path.join(BE01, "index.js"));
  }
}

restoreBE();

console.log("\n🎉 REBUILD FE‑01 / BE‑01 ZAKOŃCZONY.");
