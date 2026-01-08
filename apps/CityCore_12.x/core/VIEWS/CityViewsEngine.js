export function init(engine) {
  console.log(" CityViewsEngine: initializing");

  engine.views = {
    views: [],

    register(view) {
      this.views.push(view);
    },

    get() {
      return this.views;
    }
  };

  console.log(" CityViewsEngine: ready.");
}

