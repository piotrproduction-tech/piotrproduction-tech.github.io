/**
 * CITYOF-GATE — Test Flow (100 klatek)
 */

import { TestDirectorEngine } from "../engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../orchestrator/TestOrchestrator.js";

const scenario = {
  name: "flow_scenario",
  steps: [
    {
      id: "step_loop",
      trigger: { type: "always" },
      action: { event: "FLOW_EVENT", payload: { tick: 0 } }
    }
  ]
};

const engine = new TestDirectorEngine([scenario]);
const orchestrator = new TestOrchestrator();

for (let i = 0; i < 100; i++) {
  engine.run({ scenarioName: "flow_scenario" }, orchestrator);
}

console.log("FLOW TEST — events executed:", orchestrator.getLog().length);
