// MarketplaceStreetDistrict — DistrictIdentityEngine_9_1
// Nakładka na IdentityEngine_9_0 z modulatorami 9.1.

import { MarketplaceStreetDistrict_IdentityEngine_9_0 } from "./MarketplaceStreetDistrict_IdentityEngine_9_0.js";
import { MarketplaceStreetDistrict_EmotionModulator_9_1 } from "../models/MarketplaceStreetDistrict_EmotionModulator_9_1.js";
import { MarketplaceStreetDistrict_BehaviorProfile_9_1 } from "../models/MarketplaceStreetDistrict_BehaviorProfile_9_1.js";
import { MarketplaceStreetDistrict_Memory_9_1 } from "../models/MarketplaceStreetDistrict_Memory_9_1.js";
import { MarketplaceStreetDistrict_NarrativeModulator_9_1 } from "../models/MarketplaceStreetDistrict_NarrativeModulator_9_1.js";

export class MarketplaceStreetDistrict_IdentityEngine_9_1 {
  constructor() {
    this.baseEngine = new MarketplaceStreetDistrict_IdentityEngine_9_0();
    this.emotion = new MarketplaceStreetDistrict_EmotionModulator_9_1();
    this.profile = new MarketplaceStreetDistrict_BehaviorProfile_9_1();
    this.memory = new MarketplaceStreetDistrict_Memory_9_1();
    this.narrativeMod = new MarketplaceStreetDistrict_NarrativeModulator_9_1();
  }

  handleEvent(event, context = {}) {
    const result = this.baseEngine.handleEvent(event, context);

    const prefs = this.emotion.getPreferences();
    const taboo = this.emotion.getTaboo();
    const profile = this.profile.getProfile();

    // Jeśli wynik to TABOO, ale tabu zostało złagodzone — możemy zareagować inaczej
    if (result.type === "TABOO_TRIGGERED" && !taboo.includes(result.reason)) {
      result.type = "TABOO_SOFTENED";
    }

    // Jeśli to AI_NARRATIVE — modulujemy tekst
    if (result.type === "AI_NARRATIVE" && result.narrative) {
      result.narrative = this.narrativeMod.modulate(result.narrative, event, profile);
    }

    // Możemy też dodać meta-informacje o profilu i preferencjach
    result.behaviorProfile = profile;
    result.preferences = prefs;

    this.memory.record(event, result);

    return result;
  }
}
