export function init(engine) {
  console.log(" CityPersonalityEngine: initializing");

  engine.personality = {
    traits: {},

    setTrait(name, value) {
      this.traits[name] = value;
    },

    getTraits() {
      return this.traits;
    }
  };

  console.log(" CityPersonalityEngine: ready.");
}

