// CityCore_12.x/myth/CityMythEngine.js

export function createCityMythEngine({ app, recorder, anomalyDetector }) {
  const myths = [];
  const spirit = {
    mood: "neutral",
    omens: [],
    legends: []
  };

  function generateLegend(event) {
    return `W czasach, gdy ${event.district} drĹĽaĹ‚ pod ciÄ™ĹĽarem ${event.type}, Miasto przemĂłwiĹ‚o gĹ‚osem kodu.`;
  }

  function generateOmen(anomaly) {
    return `Znak niepokoju: obciÄ…ĹĽenie wzrosĹ‚o do ${anomaly.status.ai.toFixed(2)}, a Miasto zadrĹĽaĹ‚o.`;
  }

  function updateSpirit() {
    const timeline = recorder.getTimeline();
    const last = timeline[timeline.length - 1];

    if (!last) return;

    // NastrĂłj ducha miasta
    if (last.ai?.error) spirit.mood = "disturbed";
    else if (last.workflow?.slow) spirit.mood = "tense";
    else spirit.mood = "calm";
  }

  function observe() {
    updateSpirit();

    // Anomalie â†’ Omeny
    const anomalies = anomalyDetector.alerts;
    if (anomalies.length > 0) {
      const last = anomalies[anomalies.length - 1];
      const omen = generateOmen(last);
      spirit.omens.push(omen);
      myths.push(omen);
    }

    // Zdarzenia â†’ Legendy
    const timeline = recorder.getTimeline();
    if (timeline.length > 1) {
      const last = timeline[timeline.length - 1];
      const legend = generateLegend(last);
      spirit.legends.push(legend);
      myths.push(legend);
    }
  }

  setInterval(observe, 2000);

  function getSpirit() {
    return spirit;
  }

  function getMyths() {
    return myths;
  }

  return {
    getSpirit,
    getMyths
  };
}

