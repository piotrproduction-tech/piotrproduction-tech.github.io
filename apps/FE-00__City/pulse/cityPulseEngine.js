export const cityPulse = {
  bpm: 30, // base pulse
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

    // Increase pulse on activity
    this.bpm = Math.min(180, this.bpm + 10);

    this.notify();

    // Decay back to baseline
    setTimeout(() => {
      this.bpm = Math.max(30, this.bpm - 5);
      this.notify();
    }, 2000);
  }
};