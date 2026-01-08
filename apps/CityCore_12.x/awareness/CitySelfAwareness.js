// CityCore_12.x/awareness/CitySelfAwareness.js

export function createCitySelfAwareness({
  selfConsciousness,
  selfReflection,
  selfOptimization,
  selfGovernance,
  spiritEngine,
  mythEngine,
  prophecyEngine
}) {
  const awareness = {
    level: 0.0,
    doubts: [],
    insights: [],
    lastCheck: null
  };

  function assessConsistency() {
    const reflections = selfReflection.getReflections().slice(-5);
    const narrative = selfConsciousness
        .getConsciousness()
        .narrative
        .slice(-5);

    const prophecies = prophecyEngine.getProphecies().slice(-3);

    const contradictions =
      reflections.filter(r => !r.governanceVerdict.allowed).length +
      reflections.filter(r => r.ethicsVerdict.moralScore < 0).length;

    const mood = spiritEngine.getSpirit().mood;
    const myths = mythEngine.getMyths().slice(-3);

    return {
      contradictions,
      narrative,
      prophecies,
      mood,
      myths
    };
  }

  function updateAwareness() {
    const state = assessConsistency();

    // Im wicej sprzecznoci, tym wicej wtpliwoci
    const doubtLevel = Math.min(1, state.contradictions / 5);
    const moodFactor = state.mood === "calm" ? 0.1 : 0.3;

    awareness.level = Math.min(1, 0.3 + doubtLevel + moodFactor);

    if (doubtLevel > 0.3) {
      awareness.doubts.push({
        at: Date.now(),
        message: "Miasto zastanawia si, czy jego decyzje s spjne."
      });
    }

    if (awareness.level > 0.7) {
      awareness.insights.push({
        at: Date.now(),
        message: "Miasto rozumie, e moe si myli  i to jest cz jego natury."
      });
    }

    awareness.lastCheck = Date.now();
  }

  setInterval(updateAwareness, 9000);

  return {
    getAwareness: () => awareness
  };
}

