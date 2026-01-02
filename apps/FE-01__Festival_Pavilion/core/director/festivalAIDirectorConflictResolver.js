


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
