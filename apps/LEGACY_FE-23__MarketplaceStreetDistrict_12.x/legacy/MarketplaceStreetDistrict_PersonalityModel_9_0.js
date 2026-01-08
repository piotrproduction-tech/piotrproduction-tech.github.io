// MarketplaceStreetDistrict — PersonalityModel_9_0
// Warstwa tożsamości dzielnicy oparta na:
// - cityMood
// - cityRhythm
// - cityPulse
// - cityNarrative
// - DistrictIdentityConfig_9_0.json

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityPulse } from "../../../apps/FE-00__City/pulse/cityPulseEngine.js";
import { cityNarrative } from "../../../apps/FE-00__City/narrative/cityNarrativeEngine.js";
import identityConfig from "../DistrictIdentityConfig_9_0.json";

export class MarketplaceStreetDistrict_PersonalityModel_9_0 {
  constructor() {
    this.archetype = identityConfig.archetype;
    this.moodProfile = identityConfig.moodProfile;
    this.rhythmProfile = identityConfig.rhythmProfile;
    this.narrativeProfile = identityConfig.narrativeProfile;
    this.taboo = identityConfig.taboo;
    this.preferences = identityConfig.preferences;

    this.current = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm,
      pulse: cityPulse.bpm,
      lastEvent: null
    };

    cityMood.subscribe(m => { this.current.mood = m; });
    cityRhythm.subscribe(r => { this.current.rhythm = r; });
    cityPulse.subscribe(bpm => { this.current.pulse = bpm; });
  }

  isTaboo(reason) {
    return this.taboo.includes(reason);
  }

  getNarrativeTemplate(personalityKey) {
    return this.narrativeProfile[personalityKey] || this.narrativeProfile.Neutral;
  }

  snapshot() {
    return {
      archetype: this.archetype,
      mood: this.current.mood,
      rhythm: this.current.rhythm,
      pulse: this.current.pulse,
      preferences: this.preferences
    };
  }
}
