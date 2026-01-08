// CityCore_12.x/multiverse/CityParallelRealities.js

export function createCityParallelRealities({
  app,
  scenarioEngine,
  predictiveAI,
  spiritEngine,
  fateEngine,
  prophecyEngine,
  dreamEngine
}) {
  const realities = {
    worlds: [],
    lastComparison: null
  };

  function cloneState() {
    return {
      at: Date.now(),
      ui: app.render({ name: "Piotr" }),
      spirit: JSON.parse(JSON.stringify(spiritEngine.getSpirit())),
      fate: JSON.parse(JSON.stringify(fateEngine.getFate())),
      prophecy: JSON.parse(JSON.stringify(prophecyEngine.getProphecies().slice(-1)[0])),
      dream: JSON.parse(JSON.stringify(dreamEngine.getDreams().slice(-1)[0])),
      prediction: predictiveAI.predict()
    };
  }

  function createReality(label) {
    const snapshot = cloneState();

    realities.worlds.push({
      label,
      snapshot
    });

    return snapshot;
  }

  function compareRealities(a, b) {
    const worldA = realities.worlds.find(w => w.label === a);
    const worldB = realities.worlds.find(w => w.label === b);

    if (!worldA || !worldB) return null;

    const diff = {
      spirit: compare(worldA.snapshot.spirit, worldB.snapshot.spirit),
      fate: compare(worldA.snapshot.fate, worldB.snapshot.fate),
      prophecy: compare(worldA.snapshot.prophecy, worldB.snapshot.prophecy),
      dream: compare(worldA.snapshot.dream, worldB.snapshot.dream),
      prediction: compare(worldA.snapshot.prediction, worldB.snapshot.prediction)
    };

    realities.lastComparison = diff;
    return diff;
  }

  function compare(a, b) {
    return JSON.stringify(a) === JSON.stringify(b) ? "identical" : "different";
  }

  return {
    createReality,
    compareRealities,
    getRealities: () => realities
  };
}

