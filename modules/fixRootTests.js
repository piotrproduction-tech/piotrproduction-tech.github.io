// modules/fixRootTests.js
import fs from "fs";
import path from "path";

console.log("=== ROOT TEST FIXER — START ===");

const ROOT = process.cwd();

// Testy root, które musimy naprawić
const ROOT_TESTS = [
  "__tests__/aiDirector.test.js",
  "__tests__/scenarioFlow.integration.test.js",
  "__tests__/scenarioLoad.integration.test.js",
  "__tests__/syncEngine.test.js",
  "AI_Director/__tests__/aiDirectorEngine.integration.test.js"
];

// 1. Mapowanie default importów → named importów
const NAMED_EXPORT_FIXES = {
  "../SYNC_ENGINE/bridge/SyncBridge.js": "SyncBridge",
  "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js": "HyperOrchestratorEngine",
  "../AI_Director/AIDirectorEngine.js": "AIDirectorEngine"
};

// 2. Funkcja: zamiana require → import
function convertRequireToImport(content) {
  return content
    .replace(/const (.*?) = require\("(.*?)"\);/g, (match, varName, modulePath) => {
      const fixedPath = modulePath.endsWith(".js") ? modulePath : modulePath + ".js";
      return `import ${varName} from "${fixedPath}";`;
    });
}

// 3. Funkcja: poprawa default importów
function fixDefaultImports(content) {
  for (const [modulePath, exportName] of Object.entries(NAMED_EXPORT_FIXES)) {
    const regex = new RegExp(`import\\s+.*?from\\s+["']${modulePath}["']`);
    if (regex.test(content)) {
      content = content.replace(
        regex,
        `import { ${exportName} } from "${modulePath}";`
      );
      console.log("✔ Poprawiono default import →", modulePath);
    }
  }
  return content;
}

// 4. Funkcja: dodanie importu jest
function ensureJestImport(content) {
  if (!content.includes(`from "@jest/globals"`)) {
    return `import { jest } from "@jest/globals";\n` + content;
  }
  return content;
}

// 5. Naprawa CITY_VISUALIZER (brak średnika)
function fixCityVisualizer() {
  const filePath = path.join(ROOT, "CITY_VISUALIZER/events/ScenarioEventAdapter.js");
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  // Dodajemy średnik przed handle(event)
  content = content.replace(/\nhandle\(event\)/, `\n;handle(event)`);

  fs.writeFileSync(filePath, content);
  console.log("✔ Naprawiono CITY_VISUALIZER → brakujący średnik");
}

// 6. Przetwarzanie testów root
ROOT_TESTS.forEach((testPath) => {
  const fullPath = path.join(ROOT, testPath);

  if (!fs.existsSync(fullPath)) {
    console.log("⏭ Pomijam — brak pliku:", testPath);
    return;
  }

  let content = fs.readFileSync(fullPath, "utf8");

  content = convertRequireToImport(content);
  content = fixDefaultImports(content);
  content = ensureJestImport(content);

  fs.writeFileSync(fullPath, content);
  console.log("✔ Naprawiono test:", testPath);
});

// 7. Naprawa CITY_VISUALIZER
fixCityVisualizer();

console.log("=== ROOT TEST FIXER — DONE ===");
