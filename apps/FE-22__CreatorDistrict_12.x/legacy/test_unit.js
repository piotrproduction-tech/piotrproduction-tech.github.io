/**
 * CITYOF-GATE — Test Unit
 */

import { TestDirectorEngine } from "../engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../orchestrator/TestOrchestrator.js";

const scenario = {
  name: "test_scenario",
  steps: [
    {
      id: "step_1",
      trigger: { type: "always" },
      action: { event: "TEST_EVENT", payload: { value: 1 } }
    }
  ]
};

const engine = new TestDirectorEngine([scenario]);
const orchestrator = new TestOrchestrator();

const result = engine.run({ scenarioName: "test_scenario" }, orchestrator);

console.log("UNIT TEST RESULT:", result);
