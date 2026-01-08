// CreatorDistrict — IdentityOrchestrator_9_0
// Pierwszy prawdziwy "mózg" dzielnicy — łączy eventy, silniki i osobowość.

import { CreatorDistrict_IdentityEngine_9_0 } from "./CreatorDistrict_IdentityEngine_9_0.js";
import { cityNarrative } from "../../../apps/FE-00__City/narrative/cityNarrativeEngine.js";

export class CreatorDistrict_IdentityOrchestrator_9_0 {
  constructor() {
    this.engine = new CreatorDistrict_IdentityEngine_9_0();
    this.log = [];
  }

  dispatch(event, context = {}) {
    const result = this.engine.handleEvent(event, context);

    // Jeśli to AI_NARRATIVE — wpinamy się w cityNarrative
    if (result.type === "AI_NARRATIVE") {
      cityNarrative.generateStory({
        type: event.type,
        district: "CreatorDistrict",
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
