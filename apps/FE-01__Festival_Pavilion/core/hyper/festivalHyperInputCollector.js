// FE_FESTIVAL_HYPER_INPUT_COLLECTOR — FIXED & SAFE

export function collectHyperInputs(frameInput = {}) {
  return {
    experience: frameInput.experience || { pulse: 0, wave: 0, experienceState: {} },
    scenario: frameInput.scenario || {},
    uiState: frameInput.uiState || {},
    audience: frameInput.audience || { energy: 0 },

    // Najważniejsze — director musi ZAWSZE istnieć
    director: frameInput.director || {
      mood: "Neutral",
      intent: null
    }
  };
}
