export function init(engine) {
  console.log(" CityPanelsEngine: initializing");

  engine.panels = {
    panels: [],

    register(panel) {
      this.panels.push(panel);
    },

    get() {
      return this.panels;
    }
  };

  console.log(" CityPanelsEngine: ready.");
}

