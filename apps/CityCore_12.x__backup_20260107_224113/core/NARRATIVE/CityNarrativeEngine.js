export function init(engine) {
  console.log("đź“– CityNarrativeEngine: initializingâ€¦");

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

  console.log("đź“– CityNarrativeEngine: ready.");
}

