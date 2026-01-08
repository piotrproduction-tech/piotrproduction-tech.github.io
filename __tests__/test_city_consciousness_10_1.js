// test_city_consciousness_10_1.js
// Testy kolektywnej świadomości miasta 10.1.

import { CityConsciousnessEngine_10_1 } from "../CityConsciousnessEngine_10_1.js";

describe("City Consciousness 10.1", () => {
  test("aggregates district states into collective snapshot", () => {
    const engine = new CityConsciousnessEngine_10_1();

    engine.dispatchToDistrict("MarketplaceDistrict", {
      type: "marketplace.buy",
      payload: { product: { stock: 10 }, quantity: 1 }
    });

    engine.dispatchToDistrict("CreatorDistrict", {
      type: "creator.upload",
      payload: { id: "c1" }
    });

    const snap = engine.snapshot();

    expect(Object.keys(snap.collective.districts).length).toBeGreaterThan(0);
    expect(snap.collective.global).toBeDefined();
  });

  test("tracks coalitions between districts", () => {
    const engine = new CityConsciousnessEngine_10_1();

    for (let i = 0; i < 5; i++) {
      engine.dispatchToDistrict("MarketplaceStreetDistrict", {
        type: "street.glow",
        payload: { exhibition: { id: "e" + i }, intensity: 2 }
      });
    }

    const snap = engine.snapshot();

    expect(Object.keys(snap.coalitions).length).toBeGreaterThan(0);
  });
});
