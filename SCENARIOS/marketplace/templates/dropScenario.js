/**
 * Drop Scenario Template 5.0
 */

export const dropScenario = {
  name: "Marketplace Drop Scenario",
  steps: [
    { action: "loadCreators" },
    { action: "loadItems" },
    { action: "prepareDrop" },
    { action: "triggerDrop" },
    { action: "syncStreet" },
    { action: "renderVisualizer" }
  ]
};