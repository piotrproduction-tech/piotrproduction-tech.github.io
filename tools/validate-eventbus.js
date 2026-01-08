// tools/validate-eventbus.js
import fs from "fs";
import path from "path";
import { isLegacy } from "./legacy-filter.js";

const ROOT = process.cwd();

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (file.endsWith(".js") || file.endsWith(".jsx")) files.push(full);
  }
  return files;
}

function validate() {
  console.log("🔍 VALIDATOR EVENTBUS 12.x…\n");

  const files = walk(ROOT);
  const errors = [];

  for (const file of files) {
    if (isLegacy(file)) continue;

    const content = fs.readFileSync(file, "utf8");

    if (content.includes("from \"../core/eventBus.js\"")) {
      errors.push(`❌ ${file}\n    → Importuje eventBus z FE zamiast z DistrictEngine`);
    }

    if (
      content.includes("from \"./eventBus.js\"") &&
      !file.includes("DistrictEngine_12.x")
    ) {
      errors.push(`❌ ${file}\n    → Importuje eventBus lokalnie, a nie z DistrictEngine`);
    }
  }

  if (errors.length === 0) {
    console.log("✅ Wszystkie importy eventBus są poprawne.");
  } else {
    console.log("\n🚨 PROBLEMY:\n");
    console.log(errors.join("\n\n"));
  }
}

validate();
