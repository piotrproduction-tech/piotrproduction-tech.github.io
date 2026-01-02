import { cityMemory } from "../memory/cityMemoryEngine";
import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";

export const cityAI = {
  listeners: [],
  predictions: {
    nextHotDistrict: null,
    nextMood: null,
    nextWeather: null
  },

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.predictions));
  },

  analyze() {
    const trends = cityMemory.trends;

    // Predict next hot district
    const sorted = Object.entries(trends).sort((a, b) => b[1] - a[1]);
    this.predictions.nextHotDistrict = sorted[0]?.[0] || "city";

    // Predict next mood
    if (cityPulse.bpm > 120) this.predictions.nextMood = "Energetic";
    else if (cityPulse.bpm > 80) this.predictions.nextMood = "Creative";
    else this.predictions.nextMood = "Calm";

    // Predict next weather
    if (cityPulse.bpm > 120) this.predictions.nextWeather = "NeonRain";
    else if (cityMood.mood === "Celebratory") this.predictions.nextWeather = "Fireworks";
    else this.predictions.nextWeather = "Clear";

    this.notify();

    // Intelligent reactions
    this.react();
  },

  react() {
    // If festival is trending → broadcast celebration
    if (this.predictions.nextHotDistrict === "festival") {
      cityBroadcast.push("Miasto przewiduje falę festiwalową!");
    }

    // If creator activity is rising → encourage creativity
    if (this.predictions.nextHotDistrict === "creator") {
      cityBroadcast.push("Twórcy przejmują miasto!");
    }

    // If marketplace is heating up → highlight deals
    if (this.predictions.nextHotDistrict === "marketplace") {
      cityBroadcast.push("Marketplace wchodzi w gorącą fazę!");
    }
  }
};

// Auto-run AI every 5 seconds
setInterval(() => cityAI.analyze(), 5000);