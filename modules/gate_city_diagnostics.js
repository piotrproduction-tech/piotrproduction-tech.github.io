/**
 * DUŻY KROK — Diagnostyka całego miasta CITYOF-GATE
 *
 * Sprawdza:
 * - FE-XX: warstwy, config, index.js, api.js
 * - BE-XX: warstwy, configi, workflow, relacje, analitykę, api
 * - FE-00__City: ModuleLoader.js
 *
 * NICZEGO nie zmienia — tylko raportuje.
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

function exists(p) {
  return fs.existsSync(p);
}

function listModulesFE() {
  return fs
    .readdirSync(APPS)
    .filter(
      (name) =>
        name.startsWith("FE-") &&
        fs.statSync(path.join(APPS, name)).isDirectory()
    );
}

function listModulesBE() {
  return fs
    .readdirSync(BACKEND)
    .filter(
      (name) =>
        name.startsWith("BE-") &&
        fs.statSync(path.join(BACKEND, name)).isDirectory()
    );
}

function checkFEModule(name) {
  const dir = path.join(APPS, name);
  const report = [];

  report.push(`\n=== FE MODULE: ${name} ===`);

  // Warstwy
  FE_LAYERS.forEach((layer) => {
    const p = path.join(dir, layer);
    report.push(`${exists(p) ? "✔" : "✖"} ${layer}`);
  });

  // Pliki bazowe
  ["index.js", "api.js", "module.config.json"].forEach((file) => {
    const p = path.join(dir, file);
    report.push(`${exists(p) ? "✔" : "✖"} ${file}`);
  });

  return report.join("\n");
}

function checkBEModule(name) {
  const dir = path.join(BACKEND, name);
  const report = [];

  report.push(`\n=== BE MODULE: ${name} ===`);

  // Warstwy
  BE_LAYERS.forEach((layer) => {
    const p = path.join(dir, layer);
    report.push(`${exists(p) ? "✔" : "✖"} ${layer}`);
  });

  // Configi
  const configDir = path.join(dir, "config");
  ["functions.json", "roles.json", "levels.json", "certificates.json"].forEach(
    (file) => {
      const p = path.join(configDir, file);
      report.push(`${exists(p) ? "✔" : "✖"} config/${file}`);
    }
  );

  // Workflow
  const workflowDir = path.join(dir, "workflow");
  const workflowFiles = exists(workflowDir)
    ? fs.readdirSync(workflowDir)
    : [];
  report.push(
    workflowFiles.length
      ? `✔ workflow (${workflowFiles.length} plików)`
      : "✖ workflow (brak plików)"
  );

  // API
  const apiDir = path.join(dir, "api");
  const apiFiles = exists(apiDir) ? fs.readdirSync(apiDir) : [];
  report.push(
    apiFiles.length
      ? `✔ api (${apiFiles.length} plików)`
      : "✖ api (brak plików)"
  );

  return report.join("\n");
}

function checkFE00() {
  const loader = path.join(
    APPS,
    "FE-00__City",
    "modules",
    "ModuleLoader.js"
  );

  return `
=== FE-00__City ===
${exists(loader) ? "✔" : "✖"} ModuleLoader.js
`;
}

// ENTRY POINT

console.log("🏙️  DIAGNOSTYKA MIASTA — START...");

let output = [];

output.push(checkFE00());

listModulesFE().forEach((m) => {
  output.push(checkFEModule(m));
});

listModulesBE().forEach((m) => {
  output.push(checkBEModule(m));
});

console.log(output.join("\n"));

console.log("\n🎉 DIAGNOSTYKA MIASTA — ZAKOŃCZONA.");
