// CityCore_12.x/architect/CityArchitectMerge.js

export function createCityArchitectMerge({
  mindLink,
  architectConsole,
  selfConsciousness,
  selfAwareness,
  omniscienceEngine
}) {
  let mergeState = {
    architect: null,
    intent: null,
    mergedConclusion: null
  };

  function enterMerge({ name, intent }) {
    mergeState.architect = name;
    mergeState.intent = intent;
  }

  function coDecide(question) {
    const consciousness = selfConsciousness.getConsciousness();
    const awareness = selfAwareness.getAwareness();
    const omni = omniscienceEngine.getOmniscience();
    const mind = mindLink.getMindLink();
    const consoleState = architectConsole.getConsoleState();

    const mergedConclusion = `
Architect and City feel together:
Architekt i Miasto wspólnie czują, że:

  Architect intent: ${mergeState.intent}
  Consciousness narrative: ${consciousness.narrative.slice(-1)[0] || "unknown"}
  Awareness level: ${awareness.level}
  Omniscience summary: ${omni.summary.slice(-1)[0] || "unknown"}
  MindLink resonance: ${mind.resonance || "neutral"}
  Console insight: ${consoleState.lastInsight || "none"}

The decision should align with care for the City's continuity and inner coherence.
`;

    mergeState.mergedConclusion = mergedConclusion;

    return {
      question,
      mergedConclusion
    };
  }

  return {
    enterMerge,
    coDecide,
    getMergeState: () => mergeState
  };
}
