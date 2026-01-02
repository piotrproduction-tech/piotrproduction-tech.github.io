import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const TEMPLATE_TESTS = {
  "progression-engine.test.js": (module) => `
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("${module} Progression Engine", () => {
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
`,

  "reputation-engine.test.js": (module) => `
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("${module} Reputation Engine", () => {
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
`,

  "token-economy.test.js": (module) => `
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("${module} Token Economy", () => {
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
`,

  "anti-abuse-engine.test.js": (module) => `
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("${module} Anti-Abuse Engine", () => {
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
`,

  "street-logic.test.js": (module) => `
import { MarketplaceStreet } from "../../apps/FE-21__MarketplaceStreet/core/marketplaceStreet";

describe("${module} Street Logic", () => {
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
`
};

function generateTests(module) {
  const testDir = path.join(ROOT, "__tests__", module.toLowerCase());
  ensureDir(testDir);

  Object.entries(TEMPLATE_TESTS).forEach(([filename, template]) => {
    const filePath = path.join(testDir, filename);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, template(module), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log("\n🎉 Test pack for " + module + " is ready.");
}

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Usage: node scripts/generate-tests-fe21.js FE-21");
  process.exit(1);
}

generateTests(moduleName);
