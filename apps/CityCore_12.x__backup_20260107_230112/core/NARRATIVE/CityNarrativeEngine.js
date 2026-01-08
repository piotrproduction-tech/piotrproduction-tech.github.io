export function init(engine) {
  console.log(" CityNarrativeEngine: initializing");

  engine.narrative = {
    entries: [],

    add(entry) {
      this.entries.push({
        at: Date.now(),
        entry
      });
    },

    get() {
      return this.entries;
    }
  };

  console.log(" CityNarrativeEngine: ready.");
}

