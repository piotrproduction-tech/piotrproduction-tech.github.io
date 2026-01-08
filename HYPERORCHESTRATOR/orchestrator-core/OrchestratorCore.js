/**
 * OrchestratorCore
 * Central brain of HyperOrchestrator.
 */

class OrchestratorCore {
    constructor({ priorityEngine, eventRouter, stateManager, scheduler }) {
        this.priorityEngine = priorityEngine;
        this.eventRouter = eventRouter;
        this.stateManager = stateManager;
        this.scheduler = scheduler;
    }

    init() {
        this.scheduler.start();
        this.stateManager.initialize();
    }

    dispatch(event) {
        const priority = this.priorityEngine.evaluate(event);
        this.eventRouter.route(event, priority);
    }

    updateState(partialState) {
        this.stateManager.update(partialState);
    }
}

module.exports = OrchestratorCore;
