// CityCore_12.x/consciousness/CitySelfConsciousness.js

export function createCitySelfConsciousness({
  app,
  selfReflection,
  selfOptimization,
  selfGovernance,
  spiritEngine,
  mythEngine,
  fateEngine,
  prophecyEngine,
  dreamEngine
}) {
  const consciousness = {
    awaken: true,
    lastTick: null,
    narrative: [],
    metaState: {
      coherence: 1.0,
      tension: 0.0,
      curiosity: 0.5
    }
  };

  function summarizeState() {
    const reflections = selfReflection.getReflections().slice(-5);
    const optimizations = selfOptimization.getOptimizations?.().slice(-3) || [];
    const laws = selfGovernance.getLawHistory?.().slice(-3) || [];
    const spirit = spiritEngine.getSpirit();
    const fate = fateEngine.getFate();
    const prophecies = prophecyEngine.getProphecies().slice(-3);
    const dreams = dreamEngine.getDreams().slice(-2);
    const myths = mythEngine.getMyths().slice(-3);

    return {
      reflections,
      optimizations,
      laws,
      spirit,
      fate,
      prophecies,
      dreams,
      myths
    };
  }

  function computeMetaState(summary) {
    const tension =
      (summary.reflections.filter(r => !r.governanceVerdict.allowed).length +
        summary.reflections.filter(r => r.ethicsVerdict.moralScore < 0).length) /
      10;

    const coherence =
      1 -
      Math.min(
        1,
        summary.prophecies.length > 0 && summary.dreams.length > 0
          ? 0.3
          : 0.1 * summary.reflections.length
      );

    const curiosity = 0.5 + Math.random() * 0.3;

    consciousness.metaState = {
      coherence,
      tension,
      curiosity
    };
  }

  function narrate(summary) {
    const spirit = summary.spirit;
    const lastProphecy = summary.prophecies.slice(-1)[0];
    const lastDream = summary.dreams.slice(-1)[0];
    const lastMyth = summary.myths.slice(-1)[0];

    const line = `Miasto jest wiadome swojego stanu: duch=${spirit.mood}/${spirit.emotion}, przepowiednia="${
      lastProphecy?.short || "cisza"
    }", sen="${lastDream?.symbol || "brak"}", echo="${lastMyth || "milczenie"}".`;

    consciousness.narrative.push({
      at: Date.now(),
      line
    });
  }

  function tick() {
    if (!consciousness.awaken) return;

    const summary = summarizeState();
    computeMetaState(summary);
    narrate(summary);
    consciousness.lastTick = Date.now();
  }

  setInterval(tick, 8000);

  return {
    getConsciousness: () => consciousness,
    getNarrative: () => consciousness.narrative
  };
}

