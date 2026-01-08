export function init(engine) {
  console.log("đź–Ľď¸Ź CityPanelsEngine: initializingâ€¦");

  engine.panels = {
    panels: [],

    register(panel) {
      this.panels.push(panel);
    },

    get() {
      return this.panels;
    }
  };

  console.log("đź–Ľď¸Ź CityPanelsEngine: ready.");
}

