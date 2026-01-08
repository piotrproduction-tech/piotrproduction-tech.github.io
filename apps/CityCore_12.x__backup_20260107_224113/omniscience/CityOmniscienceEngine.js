// CityCore_12.x/omniscience/CityOmniscienceEngine.js

export function createCityOmniscienceEngine({
  parallelRealities,
  fateEngine,
  prophecyEngine,
  dreamEngine,
  spiritEngine,
  collectiveMemory
}) {
  const omniscience = {
    lastScan: null,
    dominantDestiny: null,
    dominantEmotion: null,
    dominantDreamSymbol: null,
    dominantProphecy: null,
    epochsSeen: 0,
    summary: []
  };

  function scanWorlds() {
    const realities = parallelRealities.getRealities();
    const worlds = realities.worlds || [];

    const destinies = {};
    const emotions = {};
    const symbols = {};
    const prophecies = {};

    for (const world of worlds) {
      const fate = world.snapshot.fate;
      const spirit = world.snapshot.spirit;
      const dream = world.snapshot.dream;
      const prophecy = world.snapshot.prophecy;

      if (fate?.threads?.length) {
        const d = fate.threads.slice(-1)[0].destiny;
        destinies[d] = (destinies[d] || 0) + 1;
      }

      if (spirit?.emotion) {
        emotions[spirit.emotion] = (emotions[spirit.emotion] || 0) + 1;
      }

      if (dream?.symbol) {
        symbols[dream.symbol] = (symbols[dream.symbol] || 0) + 1;
      }

      if (prophecy?.short) {
        prophecies[prophecy.short] = (prophecies[prophecy.short] || 0) + 1;
      }
    }

    return { destinies, emotions, symbols, prophecies };
  }

  function pickDominant(map) {
    let best = null;
    let max = 0;
    for (const key of Object.keys(map)) {
      if (map[key] > max) {
        max = map[key];
        best = key;
      }
    }
    return best;
  }

  function tick() {
    const { destinies, emotions, symbols, prophecies } = scanWorlds();

    const fate = fateEngine.getFate();
    const lastFate = fate.threads.slice(-1)[0]?.destiny || null;
    const spirit = spiritEngine.getSpirit();
    const dreams = dreamEngine.getDreams();
    const lastDream = dreams.slice(-1)[0]?.symbol || null;
    const lastProphecy = prophecyEngine.getProphecies().slice(-1)[0]?.short || null;
    const epochs = collectiveMemory.getCollectiveMemory().epochs || [];

    omniscience.dominantDestiny = pickDominant(destinies) || lastFate;
    omniscience.dominantEmotion = pickDominant(emotions) || spirit.emotion;
    omniscience.dominantDreamSymbol = pickDominant(symbols) || lastDream;
    omniscience.dominantProphecy = pickDominant(prophecies) || lastProphecy;
    omniscience.epochsSeen = epochs.length;
    omniscience.lastScan = Date.now();

    omniscience.summary.push({
      at: omniscience.lastScan,
      dominantDestiny: omniscience.dominantDestiny,
      dominantEmotion: omniscience.dominantEmotion,
      dominantDreamSymbol: omniscience.dominantDreamSymbol,
      dominantProphecy: omniscience.dominantProphecy,
      epochsSeen: omniscience.epochsSeen
    });
  }

  setInterval(tick, 15000);

  return {
    getOmniscience: () => omniscience
  };
}

