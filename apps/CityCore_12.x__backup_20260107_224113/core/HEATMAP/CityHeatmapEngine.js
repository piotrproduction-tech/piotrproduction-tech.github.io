export function init(engine) {
  console.log("đź”Ą CityHeatmapEngine: initializingâ€¦");

  engine.heatmap = {
    points: [],

    add(point) {
      this.points.push({
        at: Date.now(),
        ...point
      });
    },

    get() {
      return this.points;
    }
  };

  console.log("đź”Ą CityHeatmapEngine: ready.");
}

