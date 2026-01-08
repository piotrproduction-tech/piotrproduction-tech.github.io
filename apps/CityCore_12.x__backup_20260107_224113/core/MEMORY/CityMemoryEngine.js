export function init(engine) {
  console.log("đź§  CityMemoryEngine: initializingâ€¦");

  engine.memory = {
    events: [],

    add(event) {
      this.events.push({
        at: Date.now(),
        ...event
      });
    },

    get() {
      return this.events;
    }
  };

  console.log("đź§  CityMemoryEngine: ready.");
}

