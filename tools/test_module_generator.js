/**
 * CITYOF-GATE — Test Module Generator 1.1
 * Tworzy kompletny moduł testowy (Blueprint District)
 * Autor: Copilot + Piotr
 */

import fs from "fs";
import path from "path";

const BASE = process.cwd();

// --- Pobieranie nazwy modułu z argumentu CLI ---
const args = process.argv.slice(2);
if (!args[0]) {
  console.error("❌ ERROR: Missing module name.\nUżycie: node tools/test_module_generator.js <ModuleName>");
  process.exit(1);
}
const moduleName = args[0];

function writeFileSafe(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Created:", filePath);
  } else {
    console.log("⚠ Skipped (already exists):", filePath);
  }
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("📁 Created folder:", dirPath);
  }
}

export function generateTestModule() {
  console.log("=== CITYOF-GATE — GENERATOR TEST MODULE ===");

  // --- poprawiona ścieżka ---
  const root = path.join(BASE, "apps", moduleName);

  // --- 1. STRUCTURE ---
  const dirs = [
    `${root}/models`,
    `${root}/engines`,
    `${root}/orchestrator`,
    `${root}/visualizer`,
    `${root}/tests`
  ];

  dirs.forEach(ensureDir);

  // --- 2. MODELS ---
  writeFileSafe(
    `${root}/models/TestScenario.js`,
    `/**
 * CITYOF-GATE — TestScenario Model
 */

export const TestScenario = {
  name: "",
  description: "",
  steps: []
};
`
  );

  writeFileSafe(
    `${root}/models/TestStep.js`,
    `/**
 * CITYOF-GATE — TestStep Model
 */

export const TestStep = {
  id: "",
  trigger: { type: "", value: null },
  action: { event: "", payload: {} },
  effect: { stateChange: {}, reputationChange: 0, tokenChange: 0 },
  visual: { overlay: "", highlight: "", message: "" },
  priority: 0,
  duration: 0
};
`
  );

  writeFileSafe(
    `${root}/models/TestEvent.js`,
    `/**
 * CITYOF-GATE — TestEvent Model
 */

export const TestEvent = {
  type: "",
  payload: {},
  timestamp: 0
};
`
  );

  // --- 3. ENGINE ---
  writeFileSafe(
    `${root}/engines/TestDirectorEngine.js`,
    `/**
 * CITYOF-GATE — TestDirectorEngine
 */

import { TestEvent } from "../models/TestEvent.js";

export class TestDirectorEngine {
  constructor(scenarios = []) {
    this.scenarios = scenarios;
  }

  selectScenario(context) {
    return this.scenarios.find(s => s.name === context.scenarioName) || this.scenarios[0];
  }

  generateSteps(scenario) {
    return scenario.steps || [];
  }

  filterSteps(steps, context) {
    return steps.filter(step => {
      if (step.trigger.type === "always") return true;
      if (step.trigger.type === "state" && context.state === step.trigger.value) return true;
      return false;
    });
  }

  toEvent(step) {
    return {
      type: step.action.event,
      payload: step.action.payload,
      timestamp: Date.now()
    };
  }

  run(context, orchestrator) {
    const scenario = this.selectScenario(context);
    const steps = this.generateSteps(scenario);
    const filtered = this.filterSteps(steps, context);

    const events = filtered.map(step => this.toEvent(step));

    events.forEach(e => orchestrator.dispatch(e));

    return {
      scenario,
      steps: filtered,
      events
    };
  }
}
`
  );

  // --- 4. ORCHESTRATOR ---
  writeFileSafe(
    `${root}/orchestrator/TestOrchestrator.js`,
    `/**
 * CITYOF-GATE — TestOrchestrator
 */

export class TestOrchestrator {
  constructor() {
    this.log = [];
  }

  dispatch(event) {
    this.log.push({
      event,
      executedAt: Date.now()
    });
  }

  getLog() {
    return this.log;
  }
}
`
  );

  // --- 5. VISUALIZER ---
  writeFileSafe(
    `${root}/visualizer/test_visualizer.js`,
    `/**
 * CITYOF-GATE — Test Visualizer
 */

export function visualizeTestRun(result) {
  console.log("=== TEST VISUALIZER — CITYOF-GATE ===");
  console.log("Scenario:", result.scenario.name);
  console.log("Steps executed:", result.steps.length);

  result.steps.forEach((step, i) => {
    console.log(\`  [\${i}] Step: \${step.id}\`);
    console.log("       Action:", step.action.event);
    console.log("       Payload:", step.action.payload);
  });

  console.log("Events:");
  result.events.forEach((e, i) => {
    console.log(\`  [\${i}] \${e.type}\`, e.payload);
  });

  console.log("=====================================");
}
`
  );

  // --- 6. TESTS ---
  writeFileSafe(
    `${root}/tests/test_unit.js`,
    `/**
 * CITYOF-GATE — Test Unit
 */

import { TestDirectorEngine } from "../engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../orchestrator/TestOrchestrator.js";

const scenario = {
  name: "test_scenario",
  steps: [
    {
      id: "step_1",
      trigger: { type: "always" },
      action: { event: "TEST_EVENT", payload: { value: 1 } }
    }
  ]
};

const engine = new TestDirectorEngine([scenario]);
const orchestrator = new TestOrchestrator();

const result = engine.run({ scenarioName: "test_scenario" }, orchestrator);

console.log("UNIT TEST RESULT:", result);
`
  );

  writeFileSafe(
    `${root}/tests/test_integration.js`,
    `/**
 * CITYOF-GATE — Test Integration
 */

import { TestDirectorEngine } from "../engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../orchestrator/TestOrchestrator.js";

const scenario = {
  name: "integration_scenario",
  steps: [
    {
      id: "step_A",
      trigger: { type: "always" },
      action: { event: "INTEGRATION_EVENT", payload: { ok: true } }
    }
  ]
};

const engine = new TestDirectorEngine([scenario]);
const orchestrator = new TestOrchestrator();

engine.run({ scenarioName: "integration_scenario" }, orchestrator);

console.log("INTEGRATION TEST LOG:", orchestrator.getLog());
`
  );

  writeFileSafe(
    `${root}/tests/test_flow.js`,
    `/**
 * CITYOF-GATE — Test Flow (100 klatek)
 */

import { TestDirectorEngine } from "../engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../orchestrator/TestOrchestrator.js";

const scenario = {
  name: "flow_scenario",
  steps: [
    {
      id: "step_loop",
      trigger: { type: "always" },
      action: { event: "FLOW_EVENT", payload: { tick: 0 } }
    }
  ]
};

const engine = new TestDirectorEngine([scenario]);
const orchestrator = new TestOrchestrator();

for (let i = 0; i < 100; i++) {
  engine.run({ scenarioName: "flow_scenario" }, orchestrator);
}

console.log("FLOW TEST — events executed:", orchestrator.getLog().length);
`
  );

  // --- 7. README ---
  writeFileSafe(
    `${root}/README.md`,
    `# CITYOF-GATE — ${moduleName}
Blueprint Test Module (DNA miasta)

Ten moduł zawiera:
- modele testowe
- testowy AI Director
- testowy HyperOrchestrator
- testowy visualizer
- testy jednostkowe i integracyjne

To jest wzorzec, który będzie powielany w każdej dzielnicy CITYOF-GATE.
`
  );

  console.log("=== DONE — TEST MODULE GENERATED ===");
}

// --- uruchomienie generatora ---
generateTestModule();
