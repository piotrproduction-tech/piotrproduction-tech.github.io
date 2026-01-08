export function init(engine) {
  console.log(" CitySimulationEngine: initializing");

  engine.simulation = {
    events: [],

    simulate(event) {
      const e = { at: Date.now(), event };
      this.events.push(e);
      return e;
    },

    get() {
      return this.events;
    }
  };

  console.log(" CitySimulationEngine: ready.");
}

