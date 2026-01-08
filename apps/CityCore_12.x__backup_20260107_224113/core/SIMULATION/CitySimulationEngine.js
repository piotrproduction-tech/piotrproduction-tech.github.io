export function init(engine) {
  console.log("đź§Ş CitySimulationEngine: initializingâ€¦");

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

  console.log("đź§Ş CitySimulationEngine: ready.");
}

