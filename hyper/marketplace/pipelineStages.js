/**
 * Marketplace Pipeline Stages 5.0
 * Kolejność wykonywania logiki Marketplace w HyperOrchestratorze
 */

export const MarketplacePipelineStages = [
  { name: "evaluatePriority" },
  { name: "runEventEngine" },
  { name: "runWorkflowEngine" },
  { name: "runProgressionEngine" },
  { name: "runSecurityEngine" },
  { name: "runRelationsEngine" },
  { name: "runNarrationEngine" },
  { name: "runStreetSyncEngine" },
  { name: "renderVisualizer" }
];