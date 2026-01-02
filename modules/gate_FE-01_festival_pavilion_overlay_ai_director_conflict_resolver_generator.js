const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const DIRECTOR = path.join(CORE, "director");

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
// 1. Conflict Resolver core
//
function conflictResolverCore() {
  const file = path.join(DIRECTOR, "festivalAIDirectorConflictResolver.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_CONFLICT_RESOLVER";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_CONFLICT_RESOLVER

// Każde źródło (orchestrator, autotuner, scenario, visual) zgłasza propozycję decyzji.
// ConflictResolver wybiera najlepszą na podstawie priorytetów i kontekstu.

export function resolveDirectorConflict({
  orchestratorDecision,
  autoTunerDecision,
  scenarioDecision,
  visualDecision,
  context
}) {
  const candidates = [];

  if (orchestratorDecision) {
    candidates.push({
      source: "orchestrator",
      priority: 5,
      weight: 1.2,
      decision: orchestratorDecision
    });
  }

  if (autoTunerDecision) {
    candidates.push({
      source: "autoTuner",
      priority: 3,
      weight: 1.0,
      decision: autoTunerDecision
    });
  }

  if (scenarioDecision) {
    candidates.push({
      source: "scenario",
      priority: 4,
      weight: 1.1,
      decision: scenarioDecision
    });
  }

  if (visualDecision) {
    candidates.push({
      source: "visual",
      priority: 2,
      weight: 0.9,
      decision: visualDecision
    });
  }

  if (!candidates.length) return null;

  const { pulse, trustLevel, narrativePhase } = context || {};

  return candidates
    .map((c) => {
      let score = c.priority * c.weight;

      if (trustLevel === "low" && c.source === "orchestrator") {
        score -= 1.5;
      }

      if (narrativePhase === "awards" && c.source === "visual") {
        score += 1.0;
      }

      if (pulse > 120 && c.source === "autoTuner") {
        score += 0.5;
      }

      return { ...c, score };
    })
    .sort((a, b) => b.score - a.score)[0].decision;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z HyperOrchestrator
//
function integrateWithHyperOrchestrator() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_CONFLICT_RESOLVER_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_CONFLICT_RESOLVER_INTEGRATION
import { resolveDirectorConflict } from "./director/festivalAIDirectorConflictResolver";

// Przykład użycia:
// const finalDecision = resolveDirectorConflict({
//   orchestratorDecision,
//   autoTunerDecision,
//   scenarioDecision,
//   visualDecision,
//   context: { pulse, trustLevel, narrativePhase }
// });
// state.directorDecision = finalDecision;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorConflictResolver Generator ===");
  ensureDir(CORE);
  ensureDir(DIRECTOR);
  conflictResolverCore();
  integrateWithHyperOrchestrator();
  console.log("=== DONE ===");
}

main();
