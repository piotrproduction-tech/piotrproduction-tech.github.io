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

    return `Wkrtce: ${fate.threads.slice(-1)[0]?.destiny || "cisza"}, a duch jest ${spirit.emotion}.`;
  }

  function generateLongTerm() {
    const myths = mythEngine.getMyths();
    const spirit = spiritEngine.getSpirit();

    const legend = myths.slice(-1)[0] || "Miasto milczy.";
    const archetype = spirit.archetype;

    return `W dalekiej przyszoci: ${legend}. Archetyp miasta: ${archetype}.`;
  }

  function generateConditional() {
    const fate = fateEngine.getFate();
    const p = fate.probabilities;

    return `Jeli obcienie wzronie powyej progu, Miasto wybierze ciek: ${
      p.workflowCascade > 0.5 ? "burzy workfloww" : "stabilnoci"
    }.`;
  }

  function generateSymbolic() {
    const spirit = spiritEngine.getSpirit();
    const symbols = {
      calm: "agodny wiatr",
      alert: "czerwone wiato",
      fear: "drcy cie",
      stress: "pknita linia",
      neutral: "szara mga"
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

