/**
 * DUŻY KROK — wyrównanie architektury wszystkich istniejących modułów
 *
 * Co robi:
 * - znajduje wszystkie FE-XX w apps/ (oprócz FE-00__City)
 * - znajduje wszystkie BE-XX w backend/
 * - dla każdego modułu:
 *    - dokłada brakujące katalogi warstw
 *    - dokłada brakujące pliki szkieletowe (module.config.json, api.js, index.js, configi)
 * - NICZEGO nie usuwa, NICZEGO nie przenosi, NICZEGO nie nadpisuje istniejących plików
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");

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

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`📄 Utworzono: ${path.relative(ROOT, filePath)}`);
  }
}

function getModulesFE() {
  if (!fs.existsSync(APPS)) return [];
  return fs
    .readdirSync(APPS)
    .filter(
      (name) =>
        name.startsWith("FE-") &&
        fs.statSync(path.join(APPS, name)).isDirectory() &&
        name !== "FE-00__City"
    );
}

function getModulesBE() {
  if (!fs.existsSync(BACKEND)) return [];
  return fs
    .readdirSync(BACKEND)
    .filter(
      (name) =>
        name.startsWith("BE-") &&
        fs.statSync(path.join(BACKEND, name)).isDirectory()
    );
}

function humanizeName(raw) {
  return raw.replace(/_/g, " ");
}

function slugify(raw) {
  return raw.toLowerCase();
}

function rebuildFE(moduleName) {
  const feDir = path.join(APPS, moduleName);
  const [idPart, namePart] = moduleName.split("__");
  const id = idPart; // FE-01, FE-02
  const rawName = namePart || moduleName;
  const humanName = humanizeName(rawName);
  const slug = slugify(rawName);

  console.log(`\n🎨 FE: wyrównuję strukturę modułu ${moduleName}`);

  // Warstwy
  FE_LAYERS.forEach((layer) => {
    ensureDir(path.join(feDir, layer));
  });

  // module.config.json
  const configPath = path.join(feDir, "module.config.json");
  writeFileIfMissing(
    configPath,
    `{
  "id": "${id}",
  "name": "${humanName}",
  "baseRoute": "/${slug}",
  "description": "Moduł ${humanName} w CITYOF-GATE"
}
`
  );

  // api.js — tylko jeśli nie istnieje
  const apiPath = path.join(feDir, "api.js");
  writeFileIfMissing(
    apiPath,
    `// Kontrakt API modułu ${humanName}
// Uzupełnij konkretną logiką backendu dla tego modułu.

export async function getItems() {
  return [];
}

export async function getItemById(id) {
  return null;
}

export async function createItem(payload) {
  return { success: true, id: String(Date.now()) };
}
`
  );

  // index.js — jeśli nie istnieje, tworzymy prosty router
  const indexPath = path.join(feDir, "index.js");
  writeFileIfMissing(
    indexPath,
    `import React from "react";

export const ${id.replace(/-/g, "_")}_Module = {
  config: {
    id: "${id}",
    name: "${humanName}",
    baseRoute": "/${slug}"
  },

  router: (route) => {
    if (route === "/${slug}") {
      return <div>${humanName} – główny panel (do uzupełnienia)</div>;
    }

    return (
      <div>
        <h2>${humanName}</h2>
        <p>Nie znaleziono strony modułu dla ścieżki: {route}</p>
      </div>
    );
  }
};
`
  );
}

function rebuildBE(moduleName) {
  const beDir = path.join(BACKEND, moduleName);
  const [idPart, namePart] = moduleName.split("__");
  const id = idPart; // BE-01, BE-02
  const rawName = (namePart || moduleName).replace(/_Engine$/, "");
  const humanName = humanizeName(rawName);

  console.log(`\n🛠️  BE: wyrównuję strukturę modułu ${moduleName}`);

  // Warstwy
  BE_LAYERS.forEach((layer) => {
    ensureDir(path.join(beDir, layer));
  });

  // index.js — jeśli nie istnieje, tworzymy router
  const indexPath = path.join(beDir, "index.js");
  writeFileIfMissing(
    indexPath,
    `import express from "express";

export const ${id.replace(/-/g, "_")}_Engine = express.Router();

// TODO: dodaj endpointy API dla modułu ${humanName}
// np.
// ${id.replace(/-/g, "_")}_Engine.get("/getItems", (req, res) => {
//   res.json([]);
// });
`
  );

  // config pliki — jeśli nie istnieją, tworzymy puste
  writeFileIfMissing(
    path.join(beDir, "config", "functions.json"),
    `{
  // "functionName": true
}
`
  );

  writeFileIfMissing(
    path.join(beDir, "config", "roles.json"),
    `{
  // "roleName": ["functionName1", "functionName2"]
}
`
  );

  writeFileIfMissing(
    path.join(beDir, "config", "levels.json"),
    `{
  // "levelName": ["roleName1", "roleName2"]
}
`
  );

  writeFileIfMissing(
    path.join(beDir, "config", "certificates.json"),
    `{
  // "certificateName": true
}
`
  );
}

// ENTRY POINT

console.log("🏙️  DUŻY KROK — wyrównanie architektury modułów START...");

const feModules = getModulesFE();
const beModules = getModulesBE();

console.log(`\nZnalezione moduły FE: ${feModules.join(", ") || "(brak)"}`);
console.log(`Znalezione moduły BE: ${beModules.join(", ") || "(brak)"}`);

feModules.forEach(rebuildFE);
beModules.forEach(rebuildBE);

console.log("\n🎉 DUŻY KROK — wyrównanie architektury modułów ZAKOŃCZONE.");
