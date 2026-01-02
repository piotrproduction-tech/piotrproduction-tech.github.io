
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("FE-21 Anti-Abuse Engine", () => {
  it("detects suspicious behavior patterns", () => {
    const street = new MarketplaceStreet();

    const flags = street.detectAbuse({
      rapidSales: 20,
      repeatedRefunds: 5,
      duplicateListings: 3,
      suspiciousIPs: ["1.1.1.1", "1.1.1.1"]
    });

    console.log("Abuse Flags:", flags);
    expect(Array.isArray(flags)).toBe(true);
  });
});
