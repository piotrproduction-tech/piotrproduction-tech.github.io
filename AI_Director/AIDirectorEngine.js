export class AIDirectorEngine {
  constructor({ scenarioSelector, modeManager, strategyEngine, filterEngine, eventAdapter }) {
    this.scenarioSelector = scenarioSelector;
    this.modeManager = modeManager;
    this.strategyEngine = strategyEngine;
    this.filterEngine = filterEngine;
    this.eventAdapter = eventAdapter;
  }

  run(context) {
    const mode = this.modeManager.getMode(context);
    const scenario = this.scenarioSelector.select(mode);
    const steps = this.strategyEngine
      .getStrategyForMode(mode)
      .selectSteps({ scenarios: [scenario], context });

    const filtered = this.filterEngine.filter(steps, context);

    filtered.forEach(step => {
      const event = this.eventAdapter.toEvent(step, context);
      this.eventAdapter.dispatch(event);
    });

    return filtered;
  }

  // ⭐ ALIAS DLA TESTU
  runTick(context) {
    return this.run(context);
  }
}
