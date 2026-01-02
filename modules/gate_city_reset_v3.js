/**
 * CITY RESET v3 — ARCHITEKTURA, NIE LOGIKA
 * ----------------------------------------
 * Ten reset:
 * 1. Archiwizuje stare pliki root i śmieci
 * 2. Zachowuje wszystkie moduły FE/BE
 * 3. Zachowuje FE‑00__City i FE‑01/BE‑01
 * 4. Zachowuje generatory, backend, tools, scripts
 * 5. Odtwarza czystą strukturę miasta
 * 6. NICZEGO nie usuwa z logiki 1–52
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const LEGACY = path.join(ROOT, "LEGACY");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function moveToLegacy(filePath) {
  if (!fs.existsSync(filePath)) return;

  ensureDir(LEGACY);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const name = path.basename(filePath);
  const dest = path.join(LEGACY, `${name}_cityreset_${stamp}`);

  fs.renameSync(filePath, dest);
  console.log(`📦 Archiwizowano: ${name}`);
}

console.log("🏙️  CITY RESET v3 — START");

// 1. Archiwizacja śmieci root
const ROOT_TRASH = [
  "index.html",
  "index.js",
  "main.js",
  "loader.js",
  "api.js",
  "diagnostics.js",
  "styles.css",
  "style.css",
  "app.js",
  "old_modules",
  "old_backend",
  "old_city",
  "dist",
  "build"
];

ROOT_TRASH.forEach(item => {
  const p = path.join(ROOT, item);
  moveToLegacy(p);
});

// 2. Archiwizacja starych katalogów, które nie należą do architektury
const ALLOWED = [
  "apps",
  "backend",
  "modules",
  "assets",
  "tools",
  "scripts",
  "styles",
  "LEGACY",
  "README.md"
];

fs.readdirSync(ROOT).forEach(item => {
  if (!ALLOWED.includes(item)) {
    moveToLegacy(path.join(ROOT, item));
  }
});

// 3. Odtworzenie struktury miasta
console.log("\n🏗️  Odtwarzam strukturę miasta...");

[
  "apps",
  "backend",
  "modules",
  "assets",
  "tools",
  "scripts",
  "styles",
  "LEGACY"
].forEach(dir => ensureDir(path.join(ROOT, dir)));

console.log("\n🎉 CITY RESET v3 — ZAKOŃCZONY");
console.log("Miasto jest czyste, architektura odtworzona, logika zachowana.");
