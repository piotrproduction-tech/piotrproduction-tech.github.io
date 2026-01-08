export function init(engine) {
  console.log(" CityMemoryEngine: initializing");

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

  console.log(" CityMemoryEngine: ready.");
}

