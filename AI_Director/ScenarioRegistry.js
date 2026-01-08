export class ScenarioRegistry {
  constructor() {
    this.scenariosByMode = new Map();
  }

  register(mode, scenario) {
    if (!this.scenariosByMode.has(mode)) {
      this.scenariosByMode.set(mode, []);
    }
    this.scenariosByMode.get(mode).push(scenario);
  }

  getByMode(mode) {
    return this.scenariosByMode.get(mode) || [];
  }
}
