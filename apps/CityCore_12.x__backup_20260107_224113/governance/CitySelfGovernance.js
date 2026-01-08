// CityCore_12.x/governance/CitySelfGovernance.js

export function createCitySelfGovernance({
  aiGovernance,
  ethicsEngine,
  selfReflection,
  spiritEngine,
  prophecyEngine
}) {
  const lawHistory = [];

  function analyzeNeeds() {
    const reflections = selfReflection.getReflections();
    if (reflections.length < 5) return null;

    const last = reflections.slice(-5);

    return {
      violations: last.filter(r => !r.governanceVerdict.allowed).length,
      moralConflicts: last.filter(r => r.ethicsVerdict.moralScore < 0).length,
      disturbedSpirit: last.filter(r => r.spiritSnapshot.mood === "disturbed").length,
      ominousProphecies: prophecyEngine.getProphecies().slice(-3)
    };
  }

  function legislate() {
    const needs = analyzeNeeds();
    if (!needs) return;

    const constitution = aiGovernance.getConstitution();
    const ethics = ethicsEngine.getEthics();

    const changes = [];

    // 1. JeĹ›li duĹĽo naruszeĹ„ â†’ zaostrzenie prawa
    if (needs.violations > 2) {
      constitution.maxDecisionDepth = Math.max(2, constitution.maxDecisionDepth - 1);
      changes.push("reduced_max_decision_depth");
    }

    // 2. JeĹ›li moralne konflikty â†’ zwiÄ™kszenie wagi empatii
    if (needs.moralConflicts > 2) {
      ethics.values.empathy = Math.min(1, ethics.values.empathy + 0.05);
      changes.push("increased_empathy_weight");
    }

    // 3. JeĹ›li duch niespokojny â†’ zakaz ryzykownych akcji
    if (needs.disturbedSpirit > 1) {
      constitution.forbiddenActions.push("highRisk");
      changes.push("added_highRisk_to_forbidden_actions");
    }

    // 4. JeĹ›li przepowiednie sÄ… zĹ‚owieszcze â†’ dodaj prawo stabilizacyjne
    if (needs.ominousProphecies.some(p => p.short.includes("burzy"))) {
      constitution.requiredChecks.push("stability");
      changes.push("added_stability_check");
    }

    const entry = {
      at: Date.now(),
      needs,
      changes
    };

    lawHistory.push(entry);
    return entry;
  }

  setInterval(legislate, 12000);

  return {
    getLawHistory: () => lawHistory
  };
}

