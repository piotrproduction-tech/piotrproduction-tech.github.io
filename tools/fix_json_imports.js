/**
 * CITYOF-GATE — JSON Import Fixer
 *
 * Usuwa `assert { type: "json" }` ze wszystkich importów JSON
 * w całym projekcie (warstwy 9.1, 9.2, 10.0, 10.1 i inne).
 *
 * Uruchom:
 *    node tools/fix_json_imports.js
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full, callback);
    } else {
      callback(full);
    }
  }
}

function fixFile(filePath) {
  if (!filePath.endsWith(".js")) return;

  let content = fs.readFileSync(filePath, "utf8");

  // Szukamy importów JSON z assert
  const regex = /import\s+([^;]+?)\s+from\s+["'](.+?\.json)["']\s+assert\s+\{[^}]+\};?/g;

  if (!regex.test(content)) return;

  const fixed = content.replace(regex, (match, bindings, jsonPath) => {
    return `import ${bindings} from "${jsonPath}";`;
  });

  fs.writeFileSync(filePath, fixed, "utf8");
  console.log("✔ fixed:", filePath);
}

console.log("🔧 Fixing JSON imports...");
walk(ROOT, fixFile);
console.log("✨ Done. All JSON imports cleaned.");
