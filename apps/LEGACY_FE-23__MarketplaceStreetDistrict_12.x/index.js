// FE-23__MarketplaceStreetDistrict_12.x/index.js

import { createEngine } from "./core/engine.js";
import { createRegistry } from "./core/registry.js";
import { createStore } from "./state/store.js";
import { createEventBus } from "./state/eventBus.js";
import { createWorkflowEngine } from "./workflows/workflowEngine.js";
import { createAIPipeline } from "./AI/aiOrchestrator.js";
import { createPanels } from "./PANELS/ImmersivePanel.js";
import { createViews } from "./views/MainView.js";
import { createStateLayer } from "./core/state.js";
import moduleConfig from "./module.config.json" assert { type: "json" };

export function bootstrapDistrict(runtimeConfig = {}) {
  const eventBus = createEventBus();
  const store = createStore({ eventBus });
  const registry = createRegistry({ store, eventBus });
  const workflows = createWorkflowEngine({ eventBus, store, registry });
  const ai = createAIPipeline({ eventBus, store, workflows });

  // 🔥 NEW — state layer required by CityEventBridge
  const state = createStateLayer({ store, eventBus });

  // 🔥 NEW — engine receives state layer
  const engine = createEngine({
    eventBus,
    store,
    registry,
    workflows,
    ai,
    state
  });

  const panels = createPanels({ engine, store, eventBus });
  const views = createViews({ engine, store, eventBus, panels });

  return {
    id: moduleConfig.id,
    name: moduleConfig.name,
    route: moduleConfig.route,
    type: moduleConfig.type,
    engine,
    state, // 🔥 NEW
    store,
    eventBus,
    registry,
    workflows,
    ai,
    panels,
    views,
    config: moduleConfig,
    runtimeConfig
  };
}
