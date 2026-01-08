// MarketplaceDistrict — DistrictBehaviorProfile_9_1
// Profile zachowań: Strategic / Aggressive / Calm / HypeDriven / CreatorFriendly / FestivalMode

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";

export class MarketplaceDistrict_BehaviorProfile_9_1 {
  constructor() {
    this.currentProfile = "Strategic";

    this.state = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm
    };

    cityMood.subscribe(m => { this.state.mood = m; this.updateProfile(); });
    cityRhythm.subscribe(r => { this.state.rhythm = r; this.updateProfile(); });

    this.updateProfile();
  }

  updateProfile() {
    const { mood, rhythm } = this.state;

    if (mood === "Celebratory") {
      this.currentProfile = "FestivalMode";
    } else if (mood === "Chaotic") {
      this.currentProfile = "HypeDriven";
    } else if (mood === "Creative") {
      this.currentProfile = "CreatorFriendly";
    } else if (rhythm === "EveningMarket") {
      this.currentProfile = "Aggressive";
    } else if (rhythm === "MorningFlow") {
      this.currentProfile = "Calm";
    } else {
      this.currentProfile = "Strategic";
    }
  }

  getProfile() {
    return this.currentProfile;
  }
}
