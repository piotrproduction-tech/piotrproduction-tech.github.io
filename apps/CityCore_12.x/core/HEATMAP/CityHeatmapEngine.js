export function init(engine) {
  console.log(" CityHeatmapEngine: initializing");

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

  console.log(" CityHeatmapEngine: ready.");
}

