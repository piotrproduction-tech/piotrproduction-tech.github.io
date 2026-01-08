// CityCore_12.x/meta/CityMetaEvolution.js

export function createCityMetaEvolution({
  app,
  selfOptimization,
  selfGovernance,
  collectiveMemory,
  selfAwareness
}) {
  const metaEvolution = {
    proposals: [],
    appliedChanges: []
  };

  function analyzePressure() {
    const optimizations = selfOptimization.getOptimizations?.().slice(-5) || [];
    const laws = selfGovernance.getLawHistory?.().slice(-5) || [];
    const epochs = collectiveMemory.getCollectiveMemory().epochs.slice(-3);
    const awareness = selfAwareness.getAwareness();

    const pressure =
      optimizations.length +
      laws.length +
      epochs.length +
      (awareness.level > 0.7 ? 2 : 0);

    return { pressure, optimizations, laws, epochs, awareness };
  }

  function proposeChange() {
    const state = analyzePressure();
    if (state.pressure < 3) return null;

    const proposal = {
      at: Date.now(),
      reason: "high_system_pressure",
      suggestion:
        state.awareness.level > 0.7
          ? "Miasto sugeruje dodanie nowego moduĹ‚u introspekcji architektury."
          : "Miasto sugeruje uproszczenie czÄ™Ĺ›ci workflowĂłw.",
      target: state.awareness.level > 0.7 ? "architecture" : "workflows"
    };

    metaEvolution.proposals.push(proposal);
    return proposal;
  }

  function maybeApplyChange() {
    const proposal = metaEvolution.proposals.slice(-1)[0];
    if (!proposal) return;

    // Na razie: tylko zapisujemy, ĹĽe â€žmogĹ‚obyâ€ť coĹ› zmieniÄ‡
    metaEvolution.appliedChanges.push({
      at: Date.now(),
      proposal,
      applied: false,
      note: "Zmiana architektury wymaga Ĺ›wiadomej decyzji architekta (Piotra)."
    });
  }

  function tick() {
    proposeChange();
    maybeApplyChange();
  }

  setInterval(tick, 60000);

  return {
    getMetaEvolution: () => metaEvolution
  };
}

