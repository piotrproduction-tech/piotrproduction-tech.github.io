// FE_FESTIVAL_HYPER_DECISION_ENGINE

// Podejmowanie decyzji na podstawie zwycięzcy priorytetów
export function computeHyperDecision(inputs, priority) {
  const safeInputs = {
    energy: inputs.energy || {},
    scenario: inputs.scenario || {},
    operator: inputs.operator || {},
    director: inputs.director || {},
    visual: inputs.visual || {}
  };

  const winner = (priority && priority.winner) || "default";

  // Domyślne wartości
  let finalOverlay =
    (safeInputs.visual.overlay && safeInputs.visual.overlay.mode) || "RISING";
  let finalScene =
    safeInputs.scenario.activeScene || null;

  // Mapowanie zwycięzcy na overlay / scenę
  switch (winner) {
    case "operator":
      if (safeInputs.operator.overlay) {
        finalOverlay = safeInputs.operator.overlay;
      } else {
        finalOverlay = "FOCUS";
      }
      break;

    case "director":
      if (safeInputs.director.overlay) {
        finalOverlay = safeInputs.director.overlay;
      } else if (safeInputs.director.intent === "highlight") {
        finalOverlay = "CINEMATIC";
      }
      break;

    case "energy":
      if (safeInputs.energy.overlay) {
        finalOverlay = safeInputs.energy.overlay;
      } else {
        finalOverlay = "CHAOS";
      }
      break;

    case "scene":
      if (safeInputs.scenario.overlay) {
        finalOverlay = safeInputs.scenario.overlay;
      }
      // scena już jest w finalScene
      break;

    case "default":
    default:
      // zostawiamy to, co przyszło z VisualEngine (RISING / inne)
      break;
  }

  return {
    finalScene,
    finalOverlay,
    finalDirectorIntent: (safeInputs.director && safeInputs.director.intent) || null,
    source: winner
  };
}

