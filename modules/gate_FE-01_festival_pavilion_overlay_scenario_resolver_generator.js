const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const SCENARIO = path.join(CORE, "scenario");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// Scenario Resolver
//
function scenarioResolver() {
  const file = path.join(SCENARIO, "festivalScenarioResolver.js");
  const marker = "// FE_FESTIVAL_SCENARIO_RESOLVER";

  const block = `
// FE_FESTIVAL_SCENARIO_RESOLVER

import { ScenarioLibrary, ScenarioSequences } from "./festivalScenarioLibrary";
import { ScenarioState } from "./festivalScenarioState";

// Priorytety scen (im wyżej, tym ważniejsza)
const PRIORITY = {
  director: 100,
  system: 90,
  film: 80,
  music: 70,
  gaming: 60,
  theatre: 50,
  crowd: 40
};

// Wybierz scenę o najwyższym priorytecie
export function resolveScenePriority(sceneNames) {
  if (!sceneNames || sceneNames.length === 0) return null;

  let best = null;
  let bestScore = -Infinity;

  for (const name of sceneNames) {
    const scene = ScenarioLibrary[name];
    if (!scene) continue;

    const score = PRIORITY[scene.type] ?? 0;

    if (score > bestScore) {
      best = name;
      bestScore = score;
    }
  }

  return best;
}

// Rozwiązywanie konfliktów między scenami
export function resolveSceneConflicts(sceneNames) {
  // Jeśli jest tylko jedna scena → nie ma konfliktu
  if (sceneNames.length === 1) return sceneNames[0];

  // Jeśli są sekwencje → sekwencja ma pierwszeństwo
  const sequence = sceneNames.find(name => ScenarioSequences[name]);
  if (sequence) return sequence;

  // Wybierz scenę o najwyższym priorytecie
  return resolveScenePriority(sceneNames);
}

// Wybór sceny z sekwencji
export function resolveSequenceStep(sequenceName) {
  const sequence = ScenarioSequences[sequenceName];
  if (!sequence) return null;

  const index = ScenarioState.history.filter(h => sequence.includes(h.scene)).length;

  return sequence[index] || null;
}

// Główna funkcja resolvera
export function resolveScenario({
  triggers,
  narrativePhase
}) {
  if (!triggers || triggers.length === 0) return null;

  // 1. Rozwiąż konflikty
  const resolved = resolveSceneConflicts(triggers);

  // 2. Jeśli to sekwencja → wybierz krok sekwencji
  if (ScenarioSequences[resolved]) {
    return resolveSequenceStep(resolved);
  }

  // 3. Zwykła scena
  return resolved;
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Scenario Engine
//
function integrateWithScenarioEngine() {
  const file = path.join(CORE, "festivalScenarioEngine.js");
  const marker = "// FE_FESTIVAL_SCENARIO_RESOLVER_INTEGRATION";

  const block = `
// FE_FESTIVAL_SCENARIO_RESOLVER_INTEGRATION
import { resolveScenario } from "./scenario/festivalScenarioResolver";

// Przykład użycia:
// const scene = resolveScenario({ triggers, narrativePhase });
// scene → nazwa sceny do odpalenia
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalScenarioResolver Generator ===");
  ensureDir(CORE);
  ensureDir(SCENARIO);
  scenarioResolver();
  integrateWithScenarioEngine();
  console.log("=== DONE ===");
}

main();
