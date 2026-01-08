// MarketplaceDistrict — IdentityEngine_9_0
// Łączy PersonalityModel_9_0 z silnikami 6.0 / 7.0 / 8.0

import { MarketplaceDistrict_PersonalityModel_9_0 } from "../models/MarketplaceDistrict_PersonalityModel_9_0.js";
import { MarketplaceDistrict_MarketplaceEngine_6_0 as MarketplaceEngine } from "../engines/MarketplaceDistrict_MarketplaceEngine_6_0.js";
import { MarketplaceDistrict_StreetEngine_7_0 as StreetEngine } from "../engines/MarketplaceDistrict_StreetEngine_7_0.js";
import { MarketplaceDistrict_AIEngine_8_0 as AIEngine } from "../engines/MarketplaceDistrict_AIEngine_8_0.js";

export class MarketplaceDistrict_IdentityEngine_9_0 {
  constructor() {
    this.personality = new MarketplaceDistrict_PersonalityModel_9_0();
    this.marketplace = new MarketplaceEngine();
    this.street = new StreetEngine();
    this.ai = new AIEngine();
  }

  handleEvent(event, context = {}) {
    const snapshot = this.personality.snapshot();
    const base = { event, context, snapshot };

    // Ekonomia
    if (event.type === "marketplace.buy") {
      const { product, quantity } = event.payload;
      const result = this.marketplace.buy(product, quantity);

      if (!result.ok && this.personality.isTaboo(result.reason)) {
        return {
          ...base,
          type: "TABOO_TRIGGERED",
          reason: result.reason
        };
      }

      return {
        ...base,
        type: "MARKETPLACE_TRANSACTION",
        result
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
