export default function FestivalHeatmap() {
  return <div>Festival Heatmap (TODO: integracja z City Heatmap)</div>;
}


// FE_FESTIVAL_LIVE_INTEGRATION
import { useFestivalLive } from "../core/useFestivalLive";

useFestivalLive(() => {
  if (typeof load === "function") load();
});



// FE_FESTIVAL_PULSE_MOOD_INTEGRATION
import { useFestivalPulseMoodLive } from "../core/useFestivalPulseMoodLive";

useFestivalPulseMoodLive(
  (bpm) => {
    if (typeof setPulse === "function") setPulse(bpm);
  },
  (mood) => {
    if (typeof setMood === "function") setMood(mood);
  }
);



// FE_FESTIVAL_SIMULATION_INTEGRATION
import { useFestivalSimulationLive } from "../core/useFestivalSimulationLive";

useFestivalSimulationLive(
  (wave) => {
    if (typeof setWave === "function") setWave(wave);
    if (typeof load === "function") load(); // refresh panel
  },
  (pattern) => {
    if (typeof setPattern === "function") setPattern(pattern);
    if (typeof load === "function") load();
  }
);



// FE_FESTIVAL_ECONOMY_INTEGRATION
import { useFestivalEconomyLive } from "../core/useFestivalEconomyLive";

useFestivalEconomyLive((eco) => {
  if (typeof setEconomy === "function") setEconomy(eco);
  if (typeof load === "function") load(); // refresh panel
});



// IMMERSIVE_HEATMAP_UPGRADE
// Heatmap integration with backend, animated cells

import { getFestivalHeatmap } from "../api";

export function useImmersiveHeatmap(setHeat) {
  async function load() {
    try {
      const h = await getFestivalHeatmap();
      setHeat(h || { submissions: [], jury: [], awards: [] });
    } catch (e) {
      console.warn("ImmersiveHeatmap error", e);
    }
  }
  return load;
}
