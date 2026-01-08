/**
 * CITYOF-GATE — Test Visualizer
 */

export function visualizeTestRun(result) {
  console.log("=== TEST VISUALIZER — CITYOF-GATE ===");
  console.log("Scenario:", result.scenario.name);
  console.log("Steps executed:", result.steps.length);

  result.steps.forEach((step, i) => {
    console.log(`  [${i}] Step: ${step.id}`);
    console.log("       Action:", step.action.event);
    console.log("       Payload:", step.action.payload);
  });

  console.log("Events:");
  result.events.forEach((e, i) => {
    console.log(`  [${i}] ${e.type}`, e.payload);
  });

  console.log("=====================================");
}
