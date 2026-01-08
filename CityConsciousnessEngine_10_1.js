// CityConsciousnessEngine_10_1
// Łączy stany dzielnic (10.0) w kolektywną świadomość miasta.

import { CityCollectiveConsciousness_10_1 } from "./CityCollectiveConsciousness_10_1.js";
import { CityCoalitionState_10_1 } from "./CityCoalitionState_10_1.js";

import { MarketplaceDistrict_ConsciousnessEngine_10_0 } from "./apps/MarketplaceDistrict/orchestrator/MarketplaceDistrict_ConsciousnessEngine_10_0.js";
import { MarketplaceStreetDistrict_ConsciousnessEngine_10_0 } from "./apps/MarketplaceStreetDistrict/orchestrator/MarketplaceStreetDistrict_ConsciousnessEngine_10_0.js";
import { CreatorDistrict_ConsciousnessEngine_10_0 } from "./apps/CreatorDistrict/orchestrator/CreatorDistrict_ConsciousnessEngine_10_0.js";

export class CityConsciousnessEngine_10_1 {
  constructor() {
    this.collective = new CityCollectiveConsciousness_10_1();
    this.coalitions = new CityCoalitionState_10_1();

    this.districts = {
      MarketplaceDistrict: new MarketplaceDistrict_ConsciousnessEngine_10_0(),
      MarketplaceStreetDistrict: new MarketplaceStreetDistrict_ConsciousnessEngine_10_0(),
      CreatorDistrict: new CreatorDistrict_ConsciousnessEngine_10_0()
    };
  }

  dispatchToDistrict(districtName, event, context = {}) {
    const engine = this.districts[districtName];
    if (!engine) throw new Error("Unknown district: " + districtName);

    const result = engine.handleEvent(event, context);

    // --- BROADCAST DO INNYCH DZIELNIC (KLUCZOWE DLA 10.1) ---
    for (const [otherName, otherEngine] of Object.entries(this.districts)) {
      if (otherName !== districtName) {
        otherEngine.processExternalSignal({
          source: districtName,
          type: result.type,
          weight: 1
        });
      }
    }
    // ---------------------------------------------------------

    const snapshot = {
      emergentState: result.emergentState,
      longTermMemory: result.longTermMemory,
      relations: result.relations,
      coalitionMap: result.coalitionMap,
      archetype: result.archetype
    };

    this.collective.updateDistrictState(districtName, snapshot);
    this.coalitions.updateFromDistrictSnapshot(districtName, snapshot);

    return result;
  }

  snapshot() {
    return {
      collective: this.collective.snapshot(),
      coalitions: this.coalitions.snapshot()
    };
  }
}
