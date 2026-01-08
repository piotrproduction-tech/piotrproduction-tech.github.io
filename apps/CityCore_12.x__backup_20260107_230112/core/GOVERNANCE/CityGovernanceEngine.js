export function init(engine) {
  console.log(" CityGovernanceEngine: initializing");

  engine.governance = {
    rules: [],

    add(rule) {
      this.rules.push({
        at: Date.now(),
        rule
      });
    },

    get() {
      return this.rules;
    }
  };

  console.log(" CityGovernanceEngine: ready.");
}

