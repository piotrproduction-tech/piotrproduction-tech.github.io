/**
 * CITYOF-GATE — TestDirectorEngine
 */

import { TestEvent } from "../models/TestEvent.js";

export class TestDirectorEngine {
  constructor(scenarios = []) {
    this.scenarios = scenarios;
  }

  selectScenario(context) {
    return this.scenarios.find(s => s.name === context.scenarioName) || this.scenarios[0];
  }

  generateSteps(scenario) {
    return scenario.steps || [];
  }

  filterSteps(steps, context) {
    return steps.filter(step => {
      if (step.trigger.type === "always") return true;
      if (step.trigger.type === "state" && context.state === step.trigger.value) return true;
      return false;
    });
  }

  toEvent(step) {
    return {
      type: step.action.event,
      payload: step.action.payload,
      timestamp: Date.now()
    };
  }

  run(context, orchestrator) {
    const scenario = this.selectScenario(context);
    const steps = this.generateSteps(scenario);
    const filtered = this.filterSteps(steps, context);

    const events = filtered.map(step => this.toEvent(step));

    events.forEach(e => orchestrator.dispatch(e));

    return {
      scenario,
      steps: filtered,
      events
    };
  }
}
