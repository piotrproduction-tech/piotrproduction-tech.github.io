// MarketplaceStreetDistrict — test_identity_9_0.js
// Sprawdza, czy warstwa 9.0 reaguje zgodnie z osobowością dzielnicy.

import { MarketplaceStreetDistrict_IdentityOrchestrator_9_0 } from "../orchestrator/MarketplaceStreetDistrict_IdentityOrchestrator_9_0.js";

describe("MarketplaceStreetDistrict Identity 9.0", () => {
  test("handles marketplace.buy with taboo OUT_OF_STOCK", () => {
    const orchestrator = new MarketplaceStreetDistrict_IdentityOrchestrator_9_0();

    const product = { id: "p1", stock: 0 };
    const event = {
      type: "marketplace.buy",
      payload: { product, quantity: 1 }
    };

    const result = orchestrator.dispatch(event);

    expect(result.type).toBe("TABOO_TRIGGERED");
    expect(result.reason).toBe("OUT_OF_STOCK");
  });

  test("handles street.glow event with glow update", () => {
    const orchestrator = new MarketplaceStreetDistrict_IdentityOrchestrator_9_0();

    const exhibition = { id: "e1", glow: 0 };
    const event = {
      type: "street.glow",
      subtype: "boost",
      payload: { exhibition, intensity: 2 }
    };

    const result = orchestrator.dispatch(event);

    expect(result.type).toBe("STREET_GLOW_UPDATE");
    expect(result.exhibition.glow).toBeGreaterThan(0);
  });

  test("fallback to AI_NARRATIVE for other events", () => {
    const orchestrator = new MarketplaceStreetDistrict_IdentityOrchestrator_9_0();

    const event = {
      type: "creator.upload",
      payload: { id: "c1" }
    };

    const result = orchestrator.dispatch(event);

    expect(result.type).toBe("AI_NARRATIVE");
    expect(result.narrative).toContain("event");
  });
});
