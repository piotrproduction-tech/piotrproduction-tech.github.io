export class AIDirectorEventAdapter {
  constructor({ hyperOrchestrator }) {
    this.hyperOrchestrator = hyperOrchestrator;
  }

  toEvent(step, context) {
    return {
      type: "AI_DIRECTOR_SCENARIO_STEP",
      scenarioName: context.scenarioName || step.scenarioName || null,
      stepId: step.id,
      priority: step.priority || 0,
      payload: {
        trigger: step.trigger,
        action: step.action,
        effect: step.effect,
        visual: step.visual,
        meta: {
          mode: context.mode,
          userId: context.userId || null
        }
      }
    };
  }

  dispatch(event) {
    if (!this.hyperOrchestrator || !this.hyperOrchestrator.enqueueEvent) {
      throw new Error("HyperOrchestrator is not configured for AIDirectorEventAdapter");
    }
    this.hyperOrchestrator.enqueueEvent(event);
  }
}
