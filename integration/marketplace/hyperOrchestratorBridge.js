import { 
  CityBrainEngine, 
  CityMemoryEngine, 
  CityTrendEngine, 
  CityPredictionEngine, 
  CityMoodEngine, 
  CityLoadBalancer 
} from "../city/cityIntelligenceEngines.js";

import { 
  CityWatchdogEngine, 
  CitySnapshotEngine, 
  CityAnomalyDetector, 
  CityRecoveryEngine 
} from "../city/cityResilienceEngines.js";

/**
 * Marketplace HyperOrchestrator Bridge 5.0
 *
 * Tick świata Marketplace + tick miasta CITYOF‑GATE
 */

import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
import { MarketplaceTimeEngine } from "../../world/marketplace/timeEngine.js";
import { MarketplaceWeatherEngine } from "../../world/marketplace/weatherEngine.js";
import { MarketplaceRandomnessEngine } from "../../world/marketplace/randomnessEngine.js";
import { MarketplaceSyncScheduler } from "../../scheduler/marketplace/syncScheduler.js";

export const MarketplaceHyperOrchestratorBridge = {
  init(initialState = {}) {
    const state = MarketplaceWorldStateEngine.createEmptyState(initialState);
    return {
      state,
      lastTick: null
    };
  },

  tick(context) {
    const now = Date.now();
    const state = context.state;

    // 1. Stabilizacja świata
    MarketplaceWorldStateEngine.stabilize(state);

    // 2. Czas
    const timePhase = MarketplaceTimeEngine.getDayPhase(now);

    // 3. Pogoda
    const weather = MarketplaceWeatherEngine.generateWeather({
      time: timePhase,
      seed: MarketplaceRandomnessEngine.random()
    });
    state.weather = weather;

    // 4. Scheduler
    const scheduled = MarketplaceSyncScheduler.runScheduledTasks({
      now,
      context
    });

    // 5. Watchdog miasta
    state.city = CityWatchdogEngine.tick(
      state.city || {},
      CitySnapshotEngine,
      CityAnomalyDetector,
      CityRecoveryEngine
    );

    // 6. City Brain — TERAZ Z PRZEKAZANIEM ŚWIATA
    state.city = CityBrainEngine.tick(
      state.city || {},
      CitySnapshotEngine,
      CityMemoryEngine,
      CityTrendEngine,
      CityPredictionEngine,
      CityMoodEngine,
      CityLoadBalancer,
      state // ← KLUCZOWE! świat Marketplace jako input
    );

    // 6.5. Meta‑integracja → przeniesienie do miasta (bezpieczne)
    if (state.reputation) state.city.userReputation = state.reputation;
    if (state.tokens) state.city.tokenBalance = state.tokens;
    if (state.role) state.city.userRole = state.role;
    if (state.directive) state.city.globalDirective = state.directive;

    // 7. Zapis ostatniego ticka
    context.lastTick = now;

    // 8. Raport ticka
    return {
      timestamp: now,
      timePhase,
      weather,
      scheduled,
      city: state.city,
      world: state
    };
  }
};
