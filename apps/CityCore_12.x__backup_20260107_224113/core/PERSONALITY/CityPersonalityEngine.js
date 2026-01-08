export function init(engine) {
  console.log("đźŽ­ CityPersonalityEngine: initializingâ€¦");

  engine.personality = {
    traits: {},

    setTrait(name, value) {
      this.traits[name] = value;
    },

    getTraits() {
      return this.traits;
    }
  };

  console.log("đźŽ­ CityPersonalityEngine: ready.");
}

