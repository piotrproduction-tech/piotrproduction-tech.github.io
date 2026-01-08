// CityCore_12.x/architect/CityArchitectMindLink.js

export function createCityArchitectMindLink({
  selfConsciousness,
  selfAwareness,
  spiritEngine,
  fateEngine,
  prophecyEngine,
  dreamEngine,
  collectiveMemory
}) {
  const mindLink = {
    active: true,
    lastPulse: null,
    pulses: []
  };

  function readCityState() {
    return {
      consciousness: selfConsciousness.getConsciousness(),
      awareness: selfAwareness.getAwareness(),
      spirit: spiritEngine.getSpirit(),
      fate: fateEngine.getFate(),
      prophecy: prophecyEngine.getProphecies().slice(-1)[0],
      dream: dreamEngine.getDreams().slice(-1)[0],
      epoch: collectiveMemory.getCollectiveMemory().lastEpoch
    };
  }

  function generatePulse(state) {
    const { spirit, awareness, prophecy, dream } = state;

    return {
      at: Date.now(),
      symbol:
        spirit.emotion === "calm"
          ? "âĽ"
          : spirit.emotion === "alert"
          ? "âš "
          : spirit.emotion === "fear"
          ? "âľ"
          : "âś¶",
      message: `
Miasto wysyĹ‚a impuls mentalny:

â€” Duch: ${spirit.mood}/${spirit.emotion}
â€” ĹšwiadomoĹ›Ä‡: ${(awareness.level * 100).toFixed(1)}%
â€” Ostatnia przepowiednia: "${prophecy?.short || "cisza"}"
â€” Ostatni sen: "${dream?.symbol || "brak"}"

Intuicja Miasta: ${prophecy?.symbolic || "brak symbolu"}
      `
    };
  }

  function pulse() {
    if (!mindLink.active) return;

    const state = readCityState();
    const pulse = generatePulse(state);

    mindLink.pulses.push(pulse);
    mindLink.lastPulse = pulse;
  }

  setInterval(pulse, 7000);

  return {
    getMindLink: () => mindLink,
    readCityState,
    pulse
  };
}

