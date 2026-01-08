export function init(engine) {
  console.log("đź‘ď¸Ź CityViewsEngine: initializingâ€¦");

  engine.views = {
    views: [],

    register(view) {
      this.views.push(view);
    },

    get() {
      return this.views;
    }
  };

  console.log("đź‘ď¸Ź CityViewsEngine: ready.");
}

