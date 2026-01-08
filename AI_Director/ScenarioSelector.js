export class ScenarioSelector {
  constructor({ scenarioRegistry }) {
    this.scenarioRegistry = scenarioRegistry;
  }

  selectScenario(mode) {
    return this.scenarioRegistry.getByMode(mode)[0];
  }

  // ⭐ Alias wymagany przez test
  select(mode) {
    return this.selectScenario(mode);
  }
}
