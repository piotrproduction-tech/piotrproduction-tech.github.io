// CreatorDistrict — IdentityEngine_9_0
// Łączy PersonalityModel_9_0 z silnikami 7.0 / 8.0
// (CreatorDistrict nie posiada warstwy 6.0 — zaczyna się od 7.0)

import { CreatorDistrict_PersonalityModel_9_0 } from "../models/CreatorDistrict_PersonalityModel_9_0.js";

import { CreatorDistrict_StreetEngine_7_0 as StreetEngine } from "../engines/CreatorDistrict_StreetEngine_7_0.js";
import { CreatorDistrict_AIEngine_8_0 as AIEngine } from "../engines/CreatorDistrict_AIEngine_8_0.js";

export class CreatorDistrict_IdentityEngine_9_0 {
  constructor() {
    this.personality = new CreatorDistrict_PersonalityModel_9_0();
    this.street = new StreetEngine();
    this.ai = new AIEngine();
  }

  handleEvent(event, context = {}) {
    const snapshot = this.personality.snapshot();
    const base = { event, context, snapshot };

    // Ekonomia — CreatorDistrict nie obsługuje warstwy 6.0
    if (event.type === "marketplace.buy") {
      return {
        ...base,
        type: "IGNORED_EVENT",
        reason: "CreatorDistrict does not handle marketplace.buy"
      };
    }

    // Street / Glow
    if (event.type.startsWith("street.glow")) {
      const exhibition = event.payload.exhibition;
      const updated = this.street.applyGlowEvent(exhibition, {
        type: event.subtype || "glow",
        intensity: event.payload.intensity || 1
      });

      return {
        ...base,
        type: "STREET_GLOW_UPDATE",
        exhibition: updated
      };
    }

    // AI narracja
    const narrative = this.ai.generateNarrative(event);
    return {
      ...base,
      type: "AI_NARRATIVE",
      narrative
    };
  }
}
