
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("FE-21 Token Economy", () => {
  it("calculates token rewards and costs", () => {
    const street = new MarketplaceStreet();

    const tokens = street.computeTokens({
      sales: 5,
      purchases: 2,
      bonuses: ["daily_login", "trusted_seller"]
    });

    console.log("Tokens:", tokens);
    expect(tokens.total).toBeGreaterThanOrEqual(0);
  });
});
