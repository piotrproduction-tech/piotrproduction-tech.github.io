// modules/fixFinalModuleIssues.js
import fs from "fs";
import path from "path";

console.log("=== FINAL MODULE FIXER — START ===");

const ROOT = process.cwd();

// Helper: ensure export exists
function ensureNamedExport(filePath, exportName) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  // Jeśli klasa istnieje, ale nie jest eksportowana
  const classRegex = new RegExp(`class\\s+${exportName}`);
  const exportRegex = new RegExp(`export\\s+\\{\\s*${exportName}\\s*\\}`);

  if (classRegex.test(content) && !exportRegex.test(content)) {
    content += `\nexport { ${exportName} };\n`;
    fs.writeFileSync(filePath, content);
    console.log("✔ Dodano eksport:", exportName, "→", filePath);
  }
}

// 1) SyncBridge
ensureNamedExport(
  path.join(ROOT, "SYNC_ENGINE/bridge/SyncBridge.js"),
  "SyncBridge"
);

// 2) ScenarioRegistry
ensureNamedExport(
  path.join(ROOT, "AI_Director/ScenarioRegistry.js"),
  "ScenarioRegistry"
);

// 3) AIDirectorEngine
ensureNamedExport(
  path.join(ROOT, "AI_Director/AIDirectorEngine.js"),
  "AIDirectorEngine"
);

// 4) HyperOrchestratorEngine — ensure handleEvent exists
{
  const file = path.join(
    ROOT,
    "apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js"
  );

  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    if (!content.includes("handleEvent(")) {
      content = content.replace(
        /constructor\s*\([\s\S]*?\)\s*\{/,
        match =>
          match +
          `\n\n  handleEvent(event) {\n    if (this.directorEngine?.evaluate) {\n      return this.directorEngine.evaluate(event);\n    }\n    return null;\n  }\n`
      );

      fs.writeFileSync(file, content);
      console.log("✔ Dodano handleEvent() → HyperOrchestratorEngine");
    }
  }
}

// 5) CITY_VISUALIZER — fix semicolon
{
  const file = path.join(
    ROOT,
    "CITY_VISUALIZER/events/ScenarioEventAdapter.js"
  );

  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // Usuń błędne średniki
    content = content.replace(/;\s*handle\(event\)/g, "handle(event)");

    // Upewnij się, że poprzednia metoda kończy się średnikiem
    content = content.replace(/}\s*\nhandle\(event\)/g, "};\n\nhandle(event)");

    fs.writeFileSync(file, content);
    console.log("✔ Naprawiono CITY_VISUALIZER składnię");
  }
}

console.log("=== FINAL MODULE FIXER — DONE ===");
