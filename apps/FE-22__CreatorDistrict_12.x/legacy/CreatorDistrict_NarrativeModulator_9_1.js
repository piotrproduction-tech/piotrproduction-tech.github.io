// CreatorDistrict — DistrictNarrativeModulator_9_1
// Moduluje narrację na podstawie mood / rhythm / pulse / profilu zachowań.

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityPulse } from "../../../apps/FE-00__City/pulse/cityPulseEngine.js";
import identityConfig from "../DistrictIdentityConfig_9_0.json";

export class CreatorDistrict_NarrativeModulator_9_1 {
  constructor() {
    this.state = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm,
      pulse: cityPulse.bpm
    };

    this.templates = identityConfig.narrativeProfile;

    cityMood.subscribe(m => { this.state.mood = m; });
    cityRhythm.subscribe(r => { this.state.rhythm = r; });
    cityPulse.subscribe(bpm => { this.state.pulse = bpm; });
  }

  modulate(baseText, event, profile) {
    const { mood, rhythm, pulse } = this.state;

    let prefix = "";
    if (profile === "Aggressive") {
      prefix = "🚀 Intensywny ruch: ";
    } else if (profile === "Calm") {
      prefix = "🌿 Spokojny przepływ: ";
    } else if (profile === "HypeDriven") {
      prefix = "🔥 Hype rośnie: ";
    } else if (profile === "CreatorFriendly") {
      prefix = "🎨 Twórcza fala: ";
    } else if (profile === "FestivalMode") {
      prefix = "🎉 Tryb festiwalowy: ";
    }

    const pulseTag =
      pulse > 120 ? "[HIGH PULSE]" :
      pulse > 80 ? "[MID PULSE]" :
      "[LOW PULSE]";

    const moodTag = "[" + mood.toUpperCase() + "]";
    const rhythmTag = "[" + rhythm + "]";

    return `${prefix}${baseText} ${moodTag} ${rhythmTag} ${pulseTag}`;
  }
}
