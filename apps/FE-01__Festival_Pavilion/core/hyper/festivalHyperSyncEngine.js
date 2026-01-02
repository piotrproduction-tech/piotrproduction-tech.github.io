// FE_FESTIVAL_HYPER_SYNC_ENGINE

import { computeFestivalScenario } from "../festivalScenarioEngine";
import { computeFestivalVisuals } from "../festivalVisualEngine";
import { computeHyperDecision } from "./festivalHyperDecisionEngine";
import { resolveHyperPriority } from "./festivalHyperPriorityResolver";
import { collectHyperInputs } from "./festivalHyperInputCollector";

// Główna funkcja synchronizująca wszystkie warstwy
export function computeHyperSync(rawInputs) {
  // 1. Zbieramy wejścia z różnych źródeł
  const inputs = collectHyperInputs(rawInputs);

  // 2. Liczymy scenariusz (Warstwa 3)
  const scenario = computeFestivalScenario({
    pulse: inputs.pulse,
    wave: inputs.wave,
    mood: inputs.director && inputs.director.mood,
    audience: inputs.audience,
    narrativePhase: inputs.narrativePhase,
    manual: inputs.manualScene
  });

  // 3. Liczymy wizual (Warstwa 4)
  const visual = computeFestivalVisuals({
    pulse: inputs.pulse,
    wave: inputs.wave,
    energy: inputs.energy,
    overlayIntent: inputs.overlayIntent,
    scenario
  });

  // 4. Priorytety (Warstwa 5 — resolver)
  const priority = resolveHyperPriority({
    energy: inputs.energy,
    scenario,
    operator: inputs.operator,
    director: inputs.director
  });

  // 5. Decyzja końcowa (Warstwa 5 — decision)
  const decision = computeHyperDecision(
    {
      energy: inputs.energy,
      scenario,
      operator: inputs.operator,
      director: inputs.director,
      visual
    },
    priority
  );

  return {
    scenario,
    visual,
    priority,
    decision
  };
}

