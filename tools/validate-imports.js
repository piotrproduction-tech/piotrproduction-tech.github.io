// tools/validate-imports.js
import fs from "fs";
import path from "path";
import { isLegacy } from "./legacy-filter.js";

const ROOT = process.cwd();

const VALID_ROOTS = [
  "apps/FE-12__CityOfGate_12.x",
  "apps/DistrictEngine_12.x",
  "apps/CityCore_12.x",
  "tools/"
];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (file.endsWith(".js") || file.endsWith(".jsx")) files.push(full);
  }
  return files;
}

function resolveImport(importPath, fromFile) {
  const base = path.dirname(fromFile);
  const resolved = path.resolve(base, importPath);

  if (fs.existsSync(resolved)) return resolved;
  if (fs.existsSync(resolved + ".js")) return resolved + ".js";
  if (fs.existsSync(resolved + ".jsx")) return resolved + ".jsx";

  return null;
}

function validate() {
  console.log("🔍 VALIDATOR IMPORTÓW 12.x — skanuję repo…\n");

  const files = walk(ROOT);
  const errors = [];

  for (const file of files) {
    if (isLegacy(file)) continue;

    const content = fs.readFileSync(file, "utf8");
    const importLines = content.match(/import .* from ["'][^"']+["']/g) || [];

    for (const line of importLines) {
      const match = line.match(/from ["']([^"']+)["']/);
      if (!match) continue;

      const importPath = match[1];
      if (!importPath.startsWith(".")) continue;

      const resolved = resolveImport(importPath, file);

      if (!resolved) {
        errors.push(`❌ ${file}\n    → Import nie istnieje: ${importPath}`);
        continue;
      }

      if (
        resolved.includes("./ui/Layout.jsx") &&
        !resolved.includes("apps/FE-12__CityOfGate_12.x")
      ) {
        errors.push(`❌ ${file}\n    → Import wskazuje na ZŁY Layout.jsx: ${resolved}`);
      }

      if (!VALID_ROOTS.some(root => resolved.includes(root))) {
        errors.push(`⚠️ ${file}\n    → Import spoza dozwolonych katalogów: ${resolved}`);
      }
    }
  }

  if (errors.length === 0) {
    console.log("✅ Wszystkie importy w 12.x są poprawne.");
  } else {
    console.log("\n🚨 ZNALEZIONO PROBLEMY:\n");
    console.log(errors.join("\n\n"));
  }
}

validate();
