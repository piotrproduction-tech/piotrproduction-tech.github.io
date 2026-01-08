/**
 * CITYOF-GATE — District Generator 1.0
 * Tworzy nową dzielnicę z pełnym modułem testowym i integracją
 */

import fs from "fs";
import path from "path";
import { generateTestModule } from "./test_module_generator.js";

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("📁 Created folder:", dirPath);
  }
}

function writeFileSafe(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Created:", filePath);
  } else {
    console.log("⚠ Skipped (already exists):", filePath);
  }
}

export function generateDistrict(districtName = "NewDistrict") {
  console.log("=== CITYOF-GATE — DISTRICT GENERATOR ===");

  const root = path.join(process.cwd(), "apps", districtName);

  // --- 1. CREATE BASE STRUCTURE ---
  ensureDir(root);
  ensureDir(`${root}/integration`);

  // --- 2. GENERATE TEST MODULE INSIDE DISTRICT ---
  generateTestModule(districtName);

  // --- 3. INTEGRATION FILES ---
  writeFileSafe(
    `${root}/integration/connect_to_city_engine.js`,
    `export function connect${districtName}ToCityEngine(cityEngine, module) {
  return {
    pulse: () => cityEngine.pulse(),
    mood: () => cityEngine.mood(),
    rhythm: () => cityEngine.rhythm(),
    heatmap: () => cityEngine.heatmap(),
    sync: () => cityEngine.sync(module)
  };
}`
  );

  writeFileSafe(
    `${root}/integration/connect_to_ai_director.js`,
    `export function connect${districtName}ToAIDirector(aiDirector, director) {
  aiDirector.registerModule("${districtName}", {
    run: (context, orchestrator) => director.run(context, orchestrator)
  });
  console.log("✔ ${districtName} podłączony do AI Director");
}`
  );

  writeFileSafe(
    `${root}/integration/connect_to_orchestrator.js`,
    `export function connect${districtName}ToOrchestrator(orchestrator, moduleOrchestrator) {
  orchestrator.registerModule("${districtName}", {
    dispatch: (event) => moduleOrchestrator.dispatch(event)
  });
  console.log("✔ ${districtName} podłączony do HyperOrchestratora");
}`
  );

  writeFileSafe(
    `${root}/integration/bootstrap_${districtName}.js`,
    `import { TestDirectorEngine } from "../${districtName}/engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../${districtName}/orchestrator/TestOrchestrator.js";

import { connect${districtName}ToCityEngine } from "./connect_to_city_engine.js";
import { connect${districtName}ToAIDirector } from "./connect_to_ai_director.js";
import { connect${districtName}ToOrchestrator } from "./connect_to_orchestrator.js";

export function bootstrap${districtName}(cityEngine, aiDirector, orchestrator) {
  const director = new TestDirectorEngine([]);
  const moduleOrchestrator = new TestOrchestrator();

  connect${districtName}ToCityEngine(cityEngine, director);
  connect${districtName}ToAIDirector(aiDirector, director);
  connect${districtName}ToOrchestrator(orchestrator, moduleOrchestrator);

  console.log("=== ${districtName} gotowy i podłączony do miasta ===");

  return { director, moduleOrchestrator };
}`
  );

  // --- 4. README ---
  writeFileSafe(
    `${root}/README.md`,
    `# CITYOF-GATE — ${districtName}
Nowa dzielnica wygenerowana automatycznie.

Zawiera:
- pełny moduł testowy
- integrację z City Engine
- integrację z AI Director
- integrację z HyperOrchestrator
- bootstrap dzielnicy

To jest fundament pod przyszłą rozbudowę dzielnicy.
`
  );

  console.log("=== DONE — DISTRICT GENERATED ===");
}

// AUTO-RUN FROM CLI
const districtName = process.argv[2] || "NewDistrict";
generateDistrict(districtName);
