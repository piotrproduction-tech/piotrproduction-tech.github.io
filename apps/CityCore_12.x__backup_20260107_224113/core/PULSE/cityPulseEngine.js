export function init(engine) {
  console.log("đź’“ CityPulseEngine: initializingâ€¦");

  engine.pulse = cityPulse;

  console.log("đź’“ CityPulseEngine: ready.");
}

export const cityPulse = {
  bpm: 30,
  lastEvent: null,
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.bpm));
  },

  trigger(event) {
    this.lastEvent = event;

    this.bpm = Math.min(180, this.bpm + 10);
    this.notify();

    setTimeout(() => {
      this.bpm = Math.max(30, this.bpm - 5);
      this.notify();
    }, 2000);
  }
};

