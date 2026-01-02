import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityMemory } from "../memory/cityMemoryEngine";
import { cityAI } from "../ai/cityAIEngine";

export const citySimulation = {
  tick: 0,
  listeners: [],
  lastSimulatedEvent: null,

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  simulate() {
    this.tick++;

    const pulse = cityPulse.bpm;
    const mood = cityMood.mood;
    const weather = cityWeather.weather;
    const rhythm = cityRhythm.rhythm;
    const ai = cityAI.predictions;

    // Wybór dzielnicy na podstawie AI
    const district = ai.nextHotDistrict || "city";

    // Intensywność aktywności
    const intensity =
      (pulse > 120 ? 3 : pulse > 80 ? 2 : 1) +
      (mood === "Creative" ? 1 : 0) +
      (weather === "NeonRain" ? 1 : 0);

    // Typy aktywności symulowanych
    const activityTypes = {
      marketplace: ["marketplace.trade", "marketplace.offer", "marketplace.view"],
      creator: ["creator.publish", "creator.like", "creator.share"],
      street: ["street.signal", "street.discovery", "street.movement"],
      festival: ["festival.entry", "festival.vote", "festival.reward"],
      community: ["community.chat", "community.join", "community.react"]
    };

    const possible = activityTypes[district] || activityTypes["community"];
    const eventType = possible[Math.floor(Math.random() * possible.length)];

    const event = {
      type: eventType,
      payload: {
        userId: "sim_user_" + Math.floor(Math.random() * 50),
        intensity,
        district
      }
    };

    this.lastSimulatedEvent = event;

    // Zapis do pamięci miasta
    cityMemory.record(event);

    this.notify();
  }
};

// Auto-symulacja co 4 sekundy
setInterval(() => citySimulation.simulate(), 4000);