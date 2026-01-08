export function init(engine) {
  console.log("đź“‹ CityMenuEngine: initializingâ€¦");

  engine.menu = {
    items: [],

    add(item) {
      this.items.push(item);
    },

    get() {
      return this.items;
    }
  };

  console.log("đź“‹ CityMenuEngine: ready.");
}

