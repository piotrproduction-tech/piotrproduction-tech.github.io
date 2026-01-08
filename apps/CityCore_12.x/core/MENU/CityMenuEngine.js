export function init(engine) {
  console.log(" CityMenuEngine: initializing");

  engine.menu = {
    items: [],

    add(item) {
      this.items.push(item);
    },

    get() {
      return this.items;
    }
  };

  console.log(" CityMenuEngine: ready.");
}

