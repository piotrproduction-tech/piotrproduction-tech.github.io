import { cityPulse } from "../PULSE/CityPulseEngine.js";

export function init(engine) {
  console.log(" CityRhythmEngine: initializing");

  engine.rhythm = cityRhythm;

  console.log(" CityRhythmEngine: ready.");
}

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

    if (bpm > 120) this.rhythm = "NightCreators";
    else if (bpm > 80) this.rhythm = "EveningMarket";
    else if (bpm > 50) this.rhythm = "MiddayActivity";
    else this.rhythm = "MorningFlow";

    this.notify();
  }
};

cityPulse.subscribe(() => cityRhythm.update());

