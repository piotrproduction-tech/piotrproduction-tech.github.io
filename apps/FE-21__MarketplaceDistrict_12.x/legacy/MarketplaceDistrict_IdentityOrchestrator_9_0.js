// MarketplaceDistrict — IdentityOrchestrator_9_0
// Pierwszy prawdziwy "mózg" dzielnicy — łączy eventy, silniki i osobowość.

import { MarketplaceDistrict_IdentityEngine_9_0 } from "./MarketplaceDistrict_IdentityEngine_9_0.js";
import { cityNarrative } from "../../../apps/FE-00__City/narrative/cityNarrativeEngine.js";

export class MarketplaceDistrict_IdentityOrchestrator_9_0 {
  constructor() {
    this.engine = new MarketplaceDistrict_IdentityEngine_9_0();
    this.log = [];
  }

  dispatch(event, context = {}) {
    const result = this.engine.handleEvent(event, context);

    // Jeśli to AI_NARRATIVE — wpinamy się w cityNarrative
    if (result.type === "AI_NARRATIVE") {
      cityNarrative.generateStory({
        type: event.type,
        district: "MarketplaceDistrict",
        payload: event.payload || {}
      });
    }

    this.log.push({
      event,
      result,
      at: Date.now()
    });

    return result;
  }

  getLog() {
    return this.log;
  }
}
