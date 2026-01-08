// MarketplaceStreetDistrict — DistrictEmotionModulator_9_1
// Dynamiczne preferencje + adaptacyjne tabu na bazie pulse/mood/rhythm.

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityPulse } from "../../../apps/FE-00__City/pulse/cityPulseEngine.js";
import identityConfig from "../DistrictIdentityConfig_9_0.json";

export class MarketplaceStreetDistrict_EmotionModulator_9_1 {
  constructor() {
    this.basePreferences = { ...identityConfig.preferences };
    this.dynamicPreferences = { ...identityConfig.preferences };
    this.dynamicTaboo = [...identityConfig.taboo];

    this.state = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm,
      pulse: cityPulse.bpm
    };

    cityMood.subscribe(m => { this.state.mood = m; this.recalculate(); });
    cityRhythm.subscribe(r => { this.state.rhythm = r; this.recalculate(); });
    cityPulse.subscribe(bpm => { this.state.pulse = bpm; this.recalculate(); });

    this.recalculate();
  }

  recalculate() {
    const { mood, rhythm, pulse } = this.state;

    this.dynamicPreferences = { ...this.basePreferences };
    this.dynamicTaboo = [...identityConfig.taboo];

    // Przykład: przy wysokim pulsu dzielnica staje się bardziej "hype-driven"
    if (pulse > 120) {
      this.dynamicPreferences.likesBoost = true;
      this.dynamicPreferences.prefersHighIntensity = true;
    }

    // Przy niskim pulsu — bardziej spokojna, mniej agresywna
    if (pulse < 50) {
      this.dynamicPreferences.likesBoost = false;
      this.dynamicPreferences.prefersDeepWork = true;
    }

    // Mood wpływa na tolerancję tabu
    if (mood === "Chaotic") {
      this.dynamicTaboo = this.dynamicTaboo.filter(t => t !== "INVALID_EVENT");
    }

    if (mood === "Celebratory") {
      if (!this.dynamicTaboo.includes("OUT_OF_STOCK")) {
        this.dynamicTaboo.push("OUT_OF_STOCK");
      }
    }

    // Rhythm może modulować preferencje ekonomiczne
    if (rhythm === "EveningMarket") {
      this.dynamicPreferences.prefersHighValueTransactions = true;
    }
  }

  getPreferences() {
    return this.dynamicPreferences;
  }

  getTaboo() {
    return this.dynamicTaboo;
  }
}
