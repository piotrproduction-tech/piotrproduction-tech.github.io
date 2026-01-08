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
        note: "Wejd w tryb merge, aby podejmowa wsplne decyzje."
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
Architekt i Miasto wsplnie czuj, e:

 Intencja Architekta: ${architectIntent}
 Dominujce przeznaczenie: ${omniscience.dominantDestiny || "nieznane"}
 Dominujca emocja: ${omniscience.dominantEmotion || "nieznana"}
 Dominujcy symbol snu: ${omniscience.dominantDreamSymbol || "brak"}
 Dominujca przepowiednia: ${omniscience.dominantProphecy || "cisza"}

Decyzja powinna by zgodna z trosk o cigo Miasta i jego wewntrzn spjno.
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

