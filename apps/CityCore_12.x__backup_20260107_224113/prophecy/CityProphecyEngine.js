// CityCore_12.x/prophecy/CityProphecyEngine.js

export function createCityProphecyEngine({
  fateEngine,
  spiritEngine,
  mythEngine,
  recorder
}) {
  const prophecies = [];

  function generateShortTerm() {
    const fate = fateEngine.getFate();
    const spirit = spiritEngine.getSpirit();

    return `WkrĂłtce: ${fate.threads.slice(-1)[0]?.destiny || "cisza"}, a duch jest ${spirit.emotion}.`;
  }

  function generateLongTerm() {
    const myths = mythEngine.getMyths();
    const spirit = spiritEngine.getSpirit();

    const legend = myths.slice(-1)[0] || "Miasto milczy.";
    const archetype = spirit.archetype;

    return `W dalekiej przyszĹ‚oĹ›ci: ${legend}. Archetyp miasta: ${archetype}.`;
  }

  function generateConditional() {
    const fate = fateEngine.getFate();
    const p = fate.probabilities;

    return `JeĹ›li obciÄ…ĹĽenie wzroĹ›nie powyĹĽej progu, Miasto wybierze Ĺ›cieĹĽkÄ™: ${
      p.workflowCascade > 0.5 ? "burzy workflowĂłw" : "stabilnoĹ›ci"
    }.`;
  }

  function generateSymbolic() {
    const spirit = spiritEngine.getSpirit();
    const symbols = {
      calm: "Ĺ‚agodny wiatr",
      alert: "czerwone Ĺ›wiatĹ‚o",
      fear: "drĹĽÄ…cy cieĹ„",
      stress: "pÄ™kniÄ™ta linia",
      neutral: "szara mgĹ‚a"
    };

    return `Znak na niebie: ${symbols[spirit.emotion] || "nieznany symbol"}.`;
  }

  function tick() {
    const prophecy = {
      at: Date.now(),
      short: generateShortTerm(),
      long: generateLongTerm(),
      conditional: generateConditional(),
      symbolic: generateSymbolic()
    };

    prophecies.push(prophecy);
  }

  setInterval(tick, 6000);

  return {
    getProphecies: () => prophecies
  };
}

