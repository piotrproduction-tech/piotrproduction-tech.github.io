// tools/validate-duplicates.js
import fs from "fs";
import path from "path";
import { isLegacy } from "./legacy-filter.js";

const ROOT = process.cwd();

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function validate() {
  console.log("🔍 VALIDATOR DUPLIKATÓW 12.x…\n");

  const files = walk(ROOT).filter(f => !isLegacy(f));
  const map = {};

  for (const file of files) {
    const name = path.basename(file);
    if (!map[name]) map[name] = [];
    map[name].push(file);
  }

  const duplicates = Object.entries(map).filter(([_, paths]) => paths.length > 1);

  if (duplicates.length === 0) {
    console.log("✅ Brak duplikatów plików w 12.x.");
    return;
  }

  console.log("❌ Znaleziono duplikaty:\n");

  duplicates.forEach(([name, paths]) => {
    console.log(`📄 ${name}`);
    paths.forEach(p => console.log("   → " + p));
    console.log("");
  });
}

validate();
