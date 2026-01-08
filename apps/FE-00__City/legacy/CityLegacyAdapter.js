/**
 * CITY LEGACY ADAPTER
 * --------------------
 * Adapter łączący stare FE‑00__City z District Engine 12.x.
 * Pozwala uruchomić stare miasto bez migracji, ale z pełną integracją eventów.
 */

import { citySync } from "./sync/citySyncEngine";
import { cityMemory } from "./memory/cityMemoryEngine";
import { cityPulse } from "./pulse/cityPulseEngine";
import { cityMood } from "./mood/cityMoodEngine";
import { cityWeather } from "./weather/cityWeatherEngine";
import { cityRhythm } from "./rhythm/cityRhythmEngine";
import { cityHeatmap } from "./heatmap/cityHeatmapEngine";
import { cityAI } from "./ai/cityAIEngine";
import { cityReputation } from "./reputation/cityReputationEngine";
import { cityBroadcast } from "./broadcast/cityBroadcastEngine";
import { cityEmergence } from "./emergence/cityEmergenceEngine";
import { cityGovernance } from "./governance/cityGovernanceEngine";
import { cityEconomy } from "./economy/cityEconomyEngine";
import { cityNarrative } from "./narrative/cityNarrativeEngine";

// District Engine 12.x
import { districtSyncAdapters } from "../DistrictEngine_12.x/sync/districtSyncAdapters";
import { registerDistrictAdapter } from "../DistrictEngine_12.x/sync/districtSyncAdapters";
import { districtEventBus } from "../DistrictEngine_12.x/core/districtEventBus";

/* -------------------------------------------------------
   1. Legacy → District Engine 12.x
------------------------------------------------------- */

citySync.subscribe(event => {
  // Przekazujemy każdy event do District Engine
  districtEventBus.emit(event);

  // Dodatkowo: legacy systems mogą reagować normalnie
});

/* -------------------------------------------------------
   2. District Engine 12.x → Legacy
------------------------------------------------------- */

registerDistrictAdapter("FE-00__City_Legacy", event => {
  // Przekazujemy eventy z District Engine do starego City
  citySync.broadcast(event);
});

/* -------------------------------------------------------
   3. Synchronizacja stanów (Pulse, Mood, Weather, Rhythm)
------------------------------------------------------- */

districtEventBus.on("pulse.update", e => cityPulse.trigger(e));
districtEventBus.on("mood.update", e => cityMood.update(e));
districtEventBus.on("weather.update", e => cityWeather.update(e));
districtEventBus.on("rhythm.update", e => cityRhythm.update(e));

/* -------------------------------------------------------
   4. Synchronizacja pamięci i AI
------------------------------------------------------- */

districtEventBus.on("event.record", e => cityMemory.record(e));
districtEventBus.on("ai.update", e => cityAI.update(e));

/* -------------------------------------------------------
   5. Heatmap, Reputation, Governance, Economy, Narrative
------------------------------------------------------- */

districtEventBus.on("heatmap.update", e => cityHeatmap.update(e));
districtEventBus.on("reputation.update", e => cityReputation.addReputation(
  e.userId, e.amount, e.reason, e.sourceEvent
));
districtEventBus.on("governance.update", e => cityGovernance.update(e));
districtEventBus.on("economy.update", e => cityEconomy.update(e));
districtEventBus.on("narrative.update", e => cityNarrative.generateStory(e));

/* -------------------------------------------------------
   6. Broadcast
------------------------------------------------------- */

districtEventBus.on("broadcast", msg => cityBroadcast.push(msg));

/* -------------------------------------------------------
   7. Emergence
------------------------------------------------------- */

districtEventBus.on("emergence.pattern", p => cityEmergence.addPattern(p));

/* -------------------------------------------------------
   8. Log
------------------------------------------------------- */

console.log("🔗 CityLegacyAdapter: Legacy FE‑00__City połączone z District Engine 12.x");
