// CityCore_12.x/architect/CityArchitectMerge.js

export function createCityArchitectMerge({
  mindLink,
  architectConsole,
  selfConsciousness,
  selfAwareness,
  omniscienceEngine
}) {
  const mergeState = {
    active: false,
    architectProfile: null,
    startedAt: null,
    lastDecision: null
  };

  function enterMerge(architectProfile = { name: "Piotr", intent: "stewardship" }) {
    mergeState.active = true;
    mergeState.architectProfile = architectProfile;
    mergeState.startedAt = Date.now();
  }

  function exitMerge() {
    mergeState.active = false;
  }

  function getMergeState() {
    const consciousness = selfConsciousness.getConsciousness();
    const awareness = selfAwareness.getAwareness();
    const omniscience = omniscienceEngine.getOmniscience();
    const mind = mindLink.getMindLink();

    return {
      ...mergeState,
      cityConsciousness: consciousness.metaState,
      cityAwareness: awareness.level,
      omniscienceSnapshot: {
        destiny: omniscience.dominantDestiny,
        emotion: omniscience.dominantEmotion,
        dream: omniscience.dominantDreamSymbol,
        prophecy: omniscience.dominantProphecy
      },
      lastMindPulse: mind.lastPulse
    };
  }

  function coDecide(question, architectIntent = "care") {
    if (!mergeState.active) {
      return {
        at: Date.now(),
        question,
        decision: "merge_not_active",
        note: "WejdĹş w tryb merge, aby podejmowaÄ‡ wspĂłlne decyzje."
      };
    }

    const cityAnswer = architectConsole.ask(question);
    const omniscience = omniscienceEngine.getOmniscience();

    const decision = {
      at: Date.now(),
      question,
      architectIntent,
      cityView: cityAnswer.answer,
      omniscienceSnapshot: {
        destiny: omniscience.dominantDestiny,
        emotion: omniscience.dominantEmotion,
        dream: omniscience.dominantDreamSymbol,
        prophecy: omniscience.dominantProphecy
      },
      mergedConclusion: `
Architekt i Miasto wspĂłlnie czujÄ…, ĹĽe:

â€” Intencja Architekta: ${architectIntent}
â€” DominujÄ…ce przeznaczenie: ${omniscience.dominantDestiny || "nieznane"}
â€” DominujÄ…ca emocja: ${omniscience.dominantEmotion || "nieznana"}
â€” DominujÄ…cy symbol snu: ${omniscience.dominantDreamSymbol || "brak"}
â€” DominujÄ…ca przepowiednia: ${omniscience.dominantProphecy || "cisza"}

Decyzja powinna byÄ‡ zgodna z troskÄ… o ciÄ…gĹ‚oĹ›Ä‡ Miasta i jego wewnÄ™trznÄ… spĂłjnoĹ›Ä‡.
      `
    };

    mergeState.lastDecision = decision;
    return decision;
  }

  return {
    enterMerge,
    exitMerge,
    getMergeState,
    coDecide
  };
}

