export function init(engine) {
  console.log("âš–ď¸Ź CityGovernanceEngine: initializingâ€¦");

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

  console.log("âš–ď¸Ź CityGovernanceEngine: ready.");
}

