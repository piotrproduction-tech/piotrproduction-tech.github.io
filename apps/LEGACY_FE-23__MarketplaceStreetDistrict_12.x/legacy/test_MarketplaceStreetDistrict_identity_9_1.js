// MarketplaceStreetDistrict — test_identity_9_1.js
// Testy zachowań adaptacyjnych 9.1.

import { MarketplaceStreetDistrict_IdentityEngine_9_1 } from "../orchestrator/MarketplaceStreetDistrict_IdentityEngine_9_1.js";

describe("MarketplaceStreetDistrict Identity 9.1", () => {
  test("modulates narrative with behavior profile", () => {
    const engine = new MarketplaceStreetDistrict_IdentityEngine_9_1();

    const event = {
      type: "creator.upload",
      payload: { id: "c1" }
    };

    const result = engine.handleEvent(event);

    expect(result.type).toBe("AI_NARRATIVE");
    expect(result.narrative).toMatch(/PULSE/);
    expect(result.behaviorProfile).toBeDefined();
  });

  test("can soften taboo based on emotional state", () => {
    const engine = new MarketplaceStreetDistrict_IdentityEngine_9_1();

    const product = { id: "p1", stock: 0 };
    const event = {
      type: "marketplace.buy",
      payload: { product, quantity: 1 }
    };

    const result = engine.handleEvent(event);

    expect(["TABOO_TRIGGERED", "TABOO_SOFTENED"]).toContain(result.type);
  });
});
