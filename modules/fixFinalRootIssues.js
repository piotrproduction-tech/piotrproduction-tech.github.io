// modules/fixFinalRootIssues.js
import fs from "fs";
import path from "path";

console.log("=== FINAL ROOT TEST FIXER — START ===");

const ROOT = process.cwd();

// Pliki testów root wymagające naprawy
const ROOT_TESTS = [
  "__tests__/syncEngine.test.js",
  "__tests__/scenarioFlow.integration.test.js",
  "__tests__/scenarioLoad.integration.test.js",
  "__tests__/aiDirector.test.js",
  "AI_Director/__tests__/aiDirectorEngine.integration.test.js"
];

// 1. Poprawa importów default/named
const IMPORT_FIXES = {
  "../SYNC_ENGINE/bridge/SyncBridge.js": "SyncBridge",
  "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js": "HyperOrchestratorEngine",
  "../AI_Director/AIDirectorEngine.js": "AIDirectorEngine",
  "../AI_Director/ScenarioRegistry.js": "ScenarioRegistry"
};

// 2. Zamiana require → import
function convertRequire(content) {
  return content.replace(/const (.*?) = require\("(.*?)"\);/g, (m, v, p) => {
    const fixed = p.endsWith(".js") ? p : p + ".js";
    return `import ${v} from "${fixed}";`;
  });
}

// 3. Poprawa default importów
function fixImports(content) {
  for (const [modulePath, exportName] of Object.entries(IMPORT_FIXES)) {
    const regex = new RegExp(`import\\s+.*?from\\s+["']${modulePath}["']`);
    if (regex.test(content)) {
      content = content.replace(
        regex,
        `import { ${exportName} } from "${modulePath}";`
      );
      console.log("✔ Poprawiono import:", modulePath);
    }
  }
  return content;
}

// 4. Dodanie importu jest
function ensureJest(content) {
  if (!content.includes(`from "@jest/globals"`)) {
    return `import { jest } from "@jest/globals";\n` + content;
  }
  return content;
}

// 5. Przeniesienie importów AI_Director na górę
function fixAIDirectorInlineImports(content) {
  return content.replace(
    /import (.*?) from "(.*?)";/g,
    (match) => match // zostawiamy import
  ).replace(
    /(\s+)import (.*?) from "(.*?)";/g,
    (match) => "" // usuwamy inline importy
  );
}

// 6. Naprawa destrukturyzacji HyperOrchestratorEngine
function fixHyperOrchestratorTest(content) {
  if (content.includes("new HyperOrchestratorEngine(")) {
    return content.replace(
      /new HyperOrchestratorEngine\(\)/g,
      `new HyperOrchestratorEngine({
  directorEngine: {},
  uiAdapter: {},
  scenarioAdapter: {},
  notificationAdapter: {}
})`
    );
  }
  return content;
}

// 7. Naprawa CITY_VISUALIZER (średnik)
function fixCityVisualizer() {
  const filePath = path.join(ROOT, "CITY_VISUALIZER/events/ScenarioEventAdapter.js");
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  // Usuń błędny średnik i dodaj poprawny
  content = content
    .replace(/;\s*handle\(event\)/, "handle(event)") // usuń błędny
    .replace(/\nhandle\(event\)/, "\n\nhandle(event)"); // poprawny odstęp

  fs.writeFileSync(filePath, content);
  console.log("✔ Naprawiono CITY_VISUALIZER — poprawny średnik");
}

// 8. Przetwarzanie testów root
ROOT_TESTS.forEach((testPath) => {
  const full = path.join(ROOT, testPath);
  if (!fs.existsSync(full)) {
    console.log("⏭ Pomijam — brak pliku:", testPath);
    return;
  }

  let content = fs.readFileSync(full, "utf8");

  content = convertRequire(content);
  content = fixImports(content);
  content = ensureJest(content);
  content = fixAIDirectorInlineImports(content);
  content = fixHyperOrchestratorTest(content);

  fs.writeFileSync(full, content);
  console.log("✔ Naprawiono test:", testPath);
});

// 9. Naprawa VISUALIZERA
fixCityVisualizer();

console.log("=== FINAL ROOT TEST FIXER — DONE ===");
