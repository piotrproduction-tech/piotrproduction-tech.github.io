/**
 * CITYCORE GENERATOR 12.x
 * ------------------------
 * Automatyczna migracja FE‑00__City → CityCore_12.x
 * Wykorzystuje citycore_migration_map.json
 * Nie usuwa źródeł. Nie dotyka innych dzielnic.
 */

import fs from "fs";
import path from "path";

const map = JSON.parse(
  fs.readFileSync("citycore_migration_map.json", "utf8")
);

const SRC = path.resolve(map.sourceRoot);
const DEST = path.resolve(map.targetRoot);

// -----------------------------
// 1. Przygotowanie folderu docelowego
// -----------------------------
function prepareTarget() {
  if (fs.existsSync(DEST)) {
    fs.rmSync(DEST, { recursive: true, force: true });
  }
  fs.mkdirSync(DEST, { recursive: true });
  console.log("📁 Utworzono CityCore_12.x/core");

  // upewniamy się, że istnieje katalog dla index.js
  const cityCoreRoot = path.dirname(map.integration.cityInitFile);
  if (!fs.existsSync(cityCoreRoot)) {
    fs.mkdirSync(cityCoreRoot, { recursive: true });
  }
}

// -----------------------------
// 2. Kopiowanie modułów
// -----------------------------
function copyModules() {
  for (const [srcFolder, destFolder] of Object.entries(map.moduleMap)) {
    const srcPath = path.join(SRC, srcFolder);
    const destPath = path.join(DEST, destFolder);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ Brak folderu źródłowego: ${srcFolder}`);
      continue;
    }

    fs.mkdirSync(destPath, { recursive: true });

    const files = fs.readdirSync(srcPath);

    for (const file of files) {
      const ext = path.extname(file);

      if (map.fileRules.ignoreExtensions.includes(ext)) continue;
      if (map.fileRules.ignoreFiles.includes(file)) continue;

      const srcFile = path.join(srcPath, file);
      const destFile = path.join(destPath, file);

      let content = fs.readFileSync(srcFile, "utf8");

      // -----------------------------
      // 3. Transformacje kodu
      // -----------------------------
      for (const pattern of map.transformRules.removePatterns) {
        const regex = new RegExp(pattern, "g");
        content = content.replace(regex, "");
      }

      // -----------------------------
      // 4. Wstrzyknięcie wrappera init()
      // -----------------------------
      if (map.transformRules.injectInitWrapper) {
        content = `
export function init(engine) {
${content
  .split("\n")
  .map((l) => "  " + l)
  .join("\n")}
}
`;
      }

      fs.writeFileSync(destFile, content, "utf8");
    }

    console.log(`📦 Skopiowano moduł: ${srcFolder} → ${destFolder}`);
  }
}

// -----------------------------
// 5. Tworzenie index.js CityCore
// -----------------------------
function createCityCoreIndex() {
  const indexFile = map.integration.cityInitFile;

  const imports = [];
  const calls = [];

  for (const [srcFolder, destFolder] of Object.entries(map.moduleMap)) {
    const moduleName = destFolder.toUpperCase();
    const importLine = map.integration.cityInitTemplate.importPrefix
      .replace(/__MODULE__/g, moduleName)
      .replace("__module__", moduleName.toLowerCase());

    const callLine = map.integration.cityInitTemplate.callPrefix.replace(
      /__MODULE__/g,
      moduleName
    );

    imports.push(importLine);
    calls.push(callLine);
  }

  const finalContent = `
${imports.join("\n")}

export function initCityCore(engine) {
  console.log("🌆 CityCore_12.x: initializing…");

  ${calls.join("\n  ")}

  console.log("🌆 CityCore_12.x: ready.");
}
`;

  fs.writeFileSync(indexFile, finalContent, "utf8");
  console.log("🧠 Utworzono CityCore_12.x/index.js");
}

// -----------------------------
// 6. Uruchomienie generatora
// -----------------------------
function run() {
  console.log("🚀 CITYCORE GENERATOR 12.x — START");

  prepareTarget();
  copyModules();
  createCityCoreIndex();

  console.log("✅ CITYCORE GENERATOR 12.x — ZAKOŃCZONO");
}

run();
