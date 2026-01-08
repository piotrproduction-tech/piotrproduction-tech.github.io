// tools/patch-imports.js
import fs from "fs";
import path from "path";
import { isLegacy } from "./legacy-filter.js";

const ROOT = process.cwd();

const FIXES = [
  { wrong: "./ui/Layout.jsx", correct: "./ui/Layout.jsx" },
  { wrong: "../../DistrictEngine_12.x/eventBus.js", correct: "../../DistrictEngine_12.x/eventBus.js" },
  { wrong: "../../DistrictEngine_12.x/engine.js", correct: "../../DistrictEngine_12.x/engine.js" },
  { wrong: "../../CityCore_12.x/index.js", correct: "../../CityCore_12.x/index.js" }
];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      files.push(full);
    }
  }
  return files;
}

function patchFile(file) {
  if (isLegacy(file)) return;

  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const fix of FIXES) {
    if (content.includes(fix.wrong)) {
      content = content.replaceAll(fix.wrong, fix.correct);
      changed = true;
      console.log(`🔧 Naprawiono import w: ${file}`);
    }
  }

  if (changed) fs.writeFileSync(file, content, "utf8");
}

function run() {
  console.log("🔍 PATCHER IMPORTÓW 12.x…\n");

  const files = walk(ROOT);
  files.forEach(patchFile);

  console.log("\n✅ Patchowanie zakończone.");
}

run();
