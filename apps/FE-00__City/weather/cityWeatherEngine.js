import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityHeatmap } from "../heatmap/cityHeatmapEngine";

export const cityWeather = {
  weather: "Clear",
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.weather));
  },

  update() {
    const bpm = cityPulse.bpm;
    const mood = cityMood.mood;

    // Determine weather based on pulse + mood
    if (bpm > 120) this.weather = "NeonRain";
    else if (bpm > 80) this.weather = "Sparks";
    else if (mood === "Creative") this.weather = "Aurora";
    else if (mood === "Celebratory") this.weather = "Fireworks";
    else if (mood === "Chaotic") this.weather = "Fog";
    else this.weather = "Clear";

    this.notify();
  }
};

// Auto-update when pulse or mood changes
cityPulse.subscribe(() => cityWeather.update());
cityMood.subscribe(() => cityWeather.update());