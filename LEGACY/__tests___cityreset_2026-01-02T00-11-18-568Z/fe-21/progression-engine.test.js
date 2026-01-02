
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("FE-21 Progression Engine", () => {
  it("calculates progression based on activity, streaks and achievements", () => {
    const street = new MarketplaceStreet();

    const result = street.computeProgression({
      activity: 42,
      streak: 7,
      achievements: ["first_sale", "trusted_seller"]
    });

    console.log("Progression:", result);
    expect(result.level).toBeDefined();
    expect(result.xp).toBeGreaterThan(0);
  });
});
