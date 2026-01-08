// tools/patch-12x-structure.js
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const TARGET_DIRS = [
  "apps/FE-12__CityOfGate_12.x",
  "apps/CityCore_12.x",
  "apps/DistrictEngine_12.x",
  "apps/FE-21__MarketplaceDistrict_12.x",
  "apps/FE-22__CreatorDistrict_12.x",
  "apps/FE-23__MarketplaceStreetDistrict_12.x",
  "DistrictTemplate_12.x"
];

// FILTR LEGACY — ten sam duch co w legacy-filter.js
function isLegacy(file) {
  return (
    file.includes("LEGACY") ||
    file.includes("backend_2025") ||
    file.includes("apps_2025") ||
    file.includes("node_modules") ||
    file.includes("tests/") ||
    file.includes("scripts/") ||
    file.includes("modules/") ||
    file.includes("GFAL") ||
    file.includes("FE-01__") ||
    file.includes("FE-02__") ||
    file.includes("FE-21__") || // stare FE-21
    file.includes("TEST_DISTRICT") ||
    file.includes("backend/") ||
    file.includes("sync/") ||
    file.includes("tools/cityofgate_city_engine_patcher") ||
    file.includes("tools/test_module_generator") ||
    file.includes("tools/district_generator")
  );
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (isLegacy(full)) continue;

    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (entry.endsWith(".js") || entry.endsWith(".jsx")) {
      files.push(full);
    }
  }
  return files;
}

// tu możesz dopisywać kolejne reguły patchowania 12.x
const FIXES = [
  // przykłady: stare absolutne ścieżki na nowe względne
  { wrong: "/src/ui/Layout.jsx", correct: "./ui/Layout.jsx" },
  { wrong: "/src/eventBus.js", correct: "../../DistrictEngine_12.x/eventBus.js" },
  { wrong: "/src/engine.js", correct: "../../DistrictEngine_12.x/engine.js" },
  { wrong: "/src/index.js", correct: "../../CityCore_12.x/index.js" }
];

function patchFile(file) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const fix of FIXES) {
    if (content.includes(fix.wrong)) {
      content = content.replaceAll(fix.wrong, fix.correct);
      changed = true;
      console.log(`🔧 [12.x] Naprawiono import w: ${file}`);
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
  }
}

function run() {
  console.log("🔍 PATCHER 12.x — struktura i importy…\n");

  let files = [];
  for (const dir of TARGET_DIRS) {
    const full = path.join(ROOT, dir);
    if (fs.existsSync(full)) {
      walk(full, files);
    }
  }

  files.forEach(patchFile);

  console.log("\n✅ Patchowanie 12.x zakończone.");
}

run();
