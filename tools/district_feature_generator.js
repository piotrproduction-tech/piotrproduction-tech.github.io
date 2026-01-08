/**
 * CITYOF-GATE — District Feature Generator 1.0
 * Dokłada funkcje specyficzne dla danej dzielnicy
 * Każdy plik ma wyraźny prefiks nazwy dzielnicy
 * Autor: Copilot + Piotr
 */

import fs from "fs";
import path from "path";

const BASE = process.cwd();
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("❌ Użycie: node tools/district_feature_generator.js <DistrictName> <FeatureName>");
  process.exit(1);
}

const districtName = args[0];
const featureName = args[1]; // np. marketplace, street, creator

const root = path.join(BASE, "apps", districtName);

function writeFileSafe(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Created:", filePath);
  } else {
    console.log("⚠ Skipped (already exists):", filePath);
  }
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("📁 Created folder:", dirPath);
  }
}

console.log(`=== CITYOF-GATE — GENERATOR FUNKCJI dla ${districtName} (${featureName}) ===`);

ensureDir(`${root}/models`);
ensureDir(`${root}/engines`);
ensureDir(`${root}/orchestrator`);
ensureDir(`${root}/tests`);

// --- MAPA FUNKCJI SPECYFICZNYCH ---
const FEATURES = {
  marketplace: {
    models: [
      {
        name: `${districtName}_ProductModel.js`,
        content: `export const ${districtName}_Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  stock: 0,
  sellerId: "",
  categoryId: "",
  tags: []
};`
      },
      {
        name: `${districtName}_SellerModel.js`,
        content: `export const ${districtName}_Seller = {
  id: "",
  name: "",
  reputation: 0,
  products: []
};`
      }
    ],
    engines: [
      {
        name: `${districtName}_PricingEngine.js`,
        content: `export class ${districtName}_PricingEngine {
  constructor() {}
  calculatePrice(product) {
    return product.price;
  }
}`
      },
      {
        name: `${districtName}_MarketplaceEngine.js`,
        content: `export class ${districtName}_MarketplaceEngine {
  constructor() {}
  buy(product, quantity) {
    if (product.stock < quantity) return { ok: false, reason: "OUT_OF_STOCK" };
    product.stock -= quantity;
    return { ok: true, product, quantity };
  }
}`
      }
    ]
  },

  street: {
    models: [
      {
        name: `${districtName}_ExhibitionModel.js`,
        content: `export const ${districtName}_Exhibition = {
  id: "",
  title: "",
  creatorId: "",
  glow: 0
};`
      }
    ],
    engines: [
      {
        name: `${districtName}_StreetEngine.js`,
        content: `export class ${districtName}_StreetEngine {
  constructor() {}
  glowUp(exhibition) {
    exhibition.glow++;
    return exhibition;
  }
}`
      }
    ]
  },

  creator: {
    models: [
      {
        name: `${districtName}_PortfolioModel.js`,
        content: `export const ${districtName}_Portfolio = {
  id: "",
  creatorId: "",
  items: []
};`
      }
    ],
    engines: [
      {
        name: `${districtName}_CreatorEngine.js`,
        content: `export class ${districtName}_CreatorEngine {
  constructor() {}
  publish(portfolio, item) {
    portfolio.items.push(item);
    return portfolio;
  }
}`
      }
    ]
  }
};

// --- GENEROWANIE ---
const selected = FEATURES[featureName];

if (!selected) {
  console.error(`❌ Nieznana funkcja: ${featureName}`);
  process.exit(1);
}

selected.models.forEach(model =>
  writeFileSafe(`${root}/models/${model.name}`, model.content)
);

selected.engines.forEach(engine =>
  writeFileSafe(`${root}/engines/${engine.name}`, engine.content)
);

writeFileSafe(
  `${root}/tests/test_${districtName}_${featureName}.js`,
  `console.log("Test funkcji ${featureName} dla ${districtName} OK");`
);

console.log("=== DONE — FEATURE MODULE GENERATED ===");
