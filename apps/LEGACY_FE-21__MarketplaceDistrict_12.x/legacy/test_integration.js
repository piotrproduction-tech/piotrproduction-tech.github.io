/**
 * CITYOF-GATE — Test Integration
 */

import { TestDirectorEngine } from "../engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../orchestrator/TestOrchestrator.js";

const scenario = {
  name: "integration_scenario",
  steps: [
    {
      id: "step_A",
      trigger: { type: "always" },
      action: { event: "INTEGRATION_EVENT", payload: { ok: true } }
    }
  ]
};

const engine = new TestDirectorEngine([scenario]);
const orchestrator = new TestOrchestrator();

engine.run({ scenarioName: "integration_scenario" }, orchestrator);

console.log("INTEGRATION TEST LOG:", orchestrator.getLog());
