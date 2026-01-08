// modules/fixMissingImports.js
import fs from "fs";
import path from "path";

console.log("=== FIX MISSING IMPORTS — START ===");

const ROOT = process.cwd();

const FIXES = [
  {
    file: "__tests__/scenarioLoad.integration.test.js",
    importLine: `import { HyperOrchestratorEngine } from "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";`
  },
  {
    file: "__tests__/scenarioFlow.integration.test.js",
    importLine: `import { HyperOrchestratorEngine } from "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";`
  },
  {
    file: "__tests__/syncEngine.test.js",
    importLine: `import { SyncBridge } from "../SYNC_ENGINE/bridge/SyncBridge.js";`
  },
  {
    file: "__tests__/aiDirector.test.js",
    importLine: `import { AIDirectorEngine } from "../AI_Director/AIDirectorEngine.js";`
  },
  {
    file: "AI_Director/__tests__/aiDirectorEngine.integration.test.js",
    importLine: `import { ScenarioRegistry } from "../ScenarioRegistry.js";`
  }
];

FIXES.forEach(({ file, importLine }) => {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    console.log("⏭ Pomijam — brak pliku:", file);
    return;
  }

  let content = fs.readFileSync(full, "utf8");

  if (!content.includes(importLine)) {
    content = importLine + "\n" + content;
    fs.writeFileSync(full, content);
    console.log("✔ Dodano brakujący import →", file);
  } else {
    console.log("⏭ Import już istnieje →", file);
  }
});

console.log("=== FIX MISSING IMPORTS — DONE ===");
