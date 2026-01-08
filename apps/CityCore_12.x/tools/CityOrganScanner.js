// apps/CityCore_12.x/tools/CityOrganScanner.js

import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const TARGETS = [
  "apps/CityCore_12.x",
  "apps/FE-12__CityOfGate_12.x",
  "apps/FE-21__MarketplaceDistrict_12.x",
  "apps/FE-22__CreatorDistrict_12.x",
  "apps/FE-23__MarketplaceStreetDistrict_12.x"
];

const CORE_DNA = {
  api: ["init", "tick", "getState", "setState", "getIdentity", "getCapabilities", "getDependencies"],
  meta: ["reflect", "optimize", "govern", "evolve", "dream", "prophecy"],
  hooks: ["onEvent", "onUserAction", "onAIAction"],
  integration: ["onConnect", "onDisconnect", "onInfluence"]
};

function scanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");

  const exports = [];
  const imports = [];
  const has = name => code.includes(name + "(") || code.includes(name + " (");

  const exportMatches = code.matchAll(/export\s+function\s+([A-Za-z0-9_]+)/g);
  for (const m of exportMatches) exports.push(m[1]);

  const importMatches = code.matchAll(/import\s+.*?from\s+["'](.*?)["']/g);
  for (const m of importMatches) imports.push(m[1]);

  const dna = {
    api: CORE_DNA.api.filter(has),
    meta: CORE_DNA.meta.filter(has),
    hooks: CORE_DNA.hooks.filter(has),
    integration: CORE_DNA.integration.filter(has)
  };

  return { exports, imports, dna };
}

function walkDir(rootDir) {
  const results = [];
  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (e.isFile() && full.endsWith(".js")) {
        results.push(full);
      }
    }
  }
  walk(rootDir);
  return results;
}

function scanTarget(targetPath) {
  const abs = path.join(__dirname, "..", "..", "..", targetPath);
  if (!fs.existsSync(abs)) {
    return { target: targetPath, exists: false, files: [] };
  }

  const files = walkDir(abs);
  const summary = files.map(f => {
    const rel = path.relative(abs, f);
    const info = scanFile(f);
    return {
      file: rel,
      exports: info.exports,
      imports: info.imports,
      dna: info.dna
    };
  });

  return {
    target: targetPath,
    exists: true,
    files: summary
  };
}

function main() {
  const report = TARGETS.map(scanTarget);

  const outDir = path.join(__dirname, "reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const jsonPath = path.join(outDir, "CityOrganScanner_report.json");
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");

  const txtPath = path.join(outDir, "CityOrganScanner_report.txt");
  const lines = [];
  for (const t of report) {
    lines.push(`=== ${t.target} ===`);
    if (!t.exists) {
      lines.push("  (missing)");
      continue;
    }
    for (const f of t.files) {
      lines.push(`- ${f.file}`);
      if (f.exports.length) lines.push(`    exports: ${f.exports.join(", ")}`);
      if (f.dna.api.length) lines.push(`    api: ${f.dna.api.join(", ")}`);
      if (f.dna.meta.length) lines.push(`    meta: ${f.dna.meta.join(", ")}`);
      if (f.dna.hooks.length) lines.push(`    hooks: ${f.dna.hooks.join(", ")}`);
      if (f.dna.integration.length) lines.push(`    integration: ${f.dna.integration.join(", ")}`);
    }
    lines.push("");
  }
  fs.writeFileSync(txtPath, lines.join("\n"), "utf8");

  console.log("CityOrganScanner — report generated:");
  console.log(" JSON:", jsonPath);
  console.log(" TXT :", txtPath);
}

main();
