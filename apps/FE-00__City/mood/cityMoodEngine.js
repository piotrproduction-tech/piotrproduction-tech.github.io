export const cityMood = {
  mood: "Calm",
  lastEvent: null,
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.mood));
  },

  update(event) {
    this.lastEvent = event;

    const prefix = event.type.split(".")[0];

    if (prefix === "creator") this.mood = "Creative";
    else if (prefix === "marketplace") this.mood = "Energetic";
    else if (prefix === "street") this.mood = "Chaotic";
    else if (prefix === "festival") this.mood = "Celebratory";
    else if (prefix === "community") this.mood = "Focused";
    else this.mood = "Calm";

    this.notify();

    // decay back to Calm
    setTimeout(() => {
      this.mood = "Calm";
      this.notify();
    }, 5000);
  }
};