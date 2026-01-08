/**
 * CITYOF-GATE — TestOrchestrator
 */

export class TestOrchestrator {
  constructor() {
    this.log = [];
  }

  dispatch(event) {
    this.log.push({
      event,
      executedAt: Date.now()
    });
  }

  getLog() {
    return this.log;
  }
}
