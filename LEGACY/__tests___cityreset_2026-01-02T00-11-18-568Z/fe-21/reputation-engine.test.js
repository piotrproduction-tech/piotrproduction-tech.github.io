
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("FE-21 Reputation Engine", () => {
  it("updates reputation based on user actions", () => {
    const street = new MarketplaceStreet();

    const rep = street.computeReputation({
      ratings: [5, 4, 5, 3],
      reports: 0,
      verifiedSales: 12
    });

    console.log("Reputation:", rep);
    expect(rep.score).toBeGreaterThan(0);
  });
});
