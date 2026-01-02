
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("FE-21 Street Logic", () => {
  it("computes street state from all subsystems", () => {
    const street = new MarketplaceStreet();

    const state = street.computeStreetState({
      activity: 30,
      ratings: [5, 4, 5],
      sales: 3,
      purchases: 1,
      reports: 0,
      bonuses: ["daily_login"]
    });

    console.log("Street State:", state);
    expect(state.finalScore).toBeDefined();
  });
});
