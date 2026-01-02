import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityHeatmap } from "../heatmap/cityHeatmapEngine";

export const cityRhythm = {
  rhythm: "MorningFlow",
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.rhythm));
  },

  update() {
    const bpm = cityPulse.bpm;
    const mood = cityMood.mood;

    // Determine rhythm based on pulse + mood
    if (mood === "Celebratory") {
      this.rhythm = "FestivalMode";
    } else if (bpm > 120) {
      this.rhythm = "NightCreators";
    } else if (bpm > 80) {
      this.rhythm = "EveningMarket";
    } else if (bpm > 50) {
      this.rhythm = "MiddayActivity";
    } else {
      this.rhythm = "MorningFlow";
    }

    this.notify();
  }
};

// Auto-update when pulse or mood changes
cityPulse.subscribe(() => cityRhythm.update());
cityMood.subscribe(() => cityRhythm.update());