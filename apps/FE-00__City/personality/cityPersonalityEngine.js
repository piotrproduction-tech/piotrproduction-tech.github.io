import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityPulse } from "../pulse/cityPulseEngine";

export const cityPersonality = {
  personality: "Neutral",
  listeners: [],

  profiles: {
    Neutral: {
      tone: "neutralny",
      style: "informacyjny",
      emoji: "🏙️",
      broadcastPrefix: "Info:"
    },
    Energetic: {
      tone: "dynamiczny",
      style: "ekscytujący",
      emoji: "⚡",
      broadcastPrefix: "🔥 Boom!"
    },
    Creative: {
      tone: "artystyczny",
      style: "inspirujący",
      emoji: "🎨",
      broadcastPrefix: "✨ Inspiracja:"
    },
    Calm: {
      tone: "spokojny",
      style: "łagodny",
      emoji: "🌙",
      broadcastPrefix: "🌿 Spokój:"
    },
    Chaotic: {
      tone: "dziki",
      style: "nieprzewidywalny",
      emoji: "🌪️",
      broadcastPrefix: "💥 Chaos!"
    },
    Celebratory: {
      tone: "świąteczny",
      style: "radosny",
      emoji: "🎉",
      broadcastPrefix: "🎊 Świętujemy!"
    }
  },

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.personality));
  },

  update() {
    const mood = cityMood.mood;
    const weather = cityWeather.weather;
    const rhythm = cityRhythm.rhythm;
    const bpm = cityPulse.bpm;

    // Determine personality
    if (mood === "Celebratory") this.personality = "Celebratory";
    else if (mood === "Creative") this.personality = "Creative";
    else if (bpm > 120) this.personality = "Energetic";
    else if (weather === "Fog") this.personality = "Chaotic";
    else if (rhythm === "NightCreators") this.personality = "Calm";
    else this.personality = "Neutral";

    this.notify();
  }
};

// Auto-update personality when global systems change
cityMood.subscribe(() => cityPersonality.update());
cityWeather.subscribe(() => cityPersonality.update());
cityRhythm.subscribe(() => cityPersonality.update());
cityPulse.subscribe(() => cityPersonality.update());