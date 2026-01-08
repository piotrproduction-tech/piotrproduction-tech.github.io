// CityCore_12.x/dream/CityDreamEngine.js

export function createCityDreamEngine({
  scenarioEngine,
  recorder,
  spiritEngine,
  mythEngine
}) {
  const dreams = [];

  function generateDream() {
    const timeline = recorder.getTimeline();
    const last = timeline[timeline.length - 1];

    const spirit = spiritEngine.getSpirit();
    const myths = mythEngine.getMyths();

    // Symboliczne elementy snu
    const symbols = {
      calm: "Ĺ‚agodna mgĹ‚a nad districtami",
      alert: "pulsujÄ…ce czerwone Ĺ›wiatĹ‚o",
      fear: "pÄ™kniÄ™ta ulica prowadzÄ…ca donikÄ…d",
      stress: "wirujÄ…ce workflowy bez koĹ„ca",
      neutral: "szara pustka"
    };

    const scenario = scenarioEngine.simulate([
      { type: "gotoDistrict", district: last?.district },
      { type: "gotoView", view: last?.view },
      { type: "emit", district: last?.district, event: "dream", payload: { spirit: spirit.emotion } }
    ]);

    const dream = {
      at: Date.now(),
      mood: spirit.emotion,
      symbol: symbols[spirit.emotion] || "nieznany znak",
      mythEcho: myths.slice(-1)[0] || "cisza legend",
      scenario,
      narrative: `Miasto Ĺ›ni o ${symbols[spirit.emotion]}, a echo legend mĂłwi: "${myths.slice(-1)[0] || "nic"}".`
    };

    dreams.push(dream);
    return dream;
  }

  // â€žNocny cyklâ€ť â€” co 30 sekund
  setInterval(generateDream, 30000);

  return {
    getDreams: () => dreams
  };
}

