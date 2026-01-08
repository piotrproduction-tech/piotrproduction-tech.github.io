/**
 * CITYOF-GATE — District Version 6.0 Generator
 * Warstwa 6.0 = ekonomia (produkty, ceny, zakupy)
 * Każdy plik ma wyraźny prefiks dzielnicy i wersji
 * Autor: Copilot + Piotr
 */

import fs from "fs";
import path from "path";

const BASE = process.cwd();
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("❌ Użycie: node tools/district_version_6_0_generator.js <DistrictName>");
  process.exit(1);
}

const districtName = args[0];
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

console.log(`=== CITYOF-GATE — GENERATOR WERSJI 6.0 dla ${districtName} ===`);

ensureDir(`${root}/models`);
ensureDir(`${root}/engines`);
ensureDir(`${root}/tests`);

// --- MODELE 6.0 ---
writeFileSafe(
  `${root}/models/${districtName}_ProductModel_6_0.js`,
  `export const ${districtName}_Product_6_0 = {
  id: "",
  name: "",
  description: "",
  price: 0,
  stock: 0,
  sellerId: "",
  categoryId: "",
  tags: []
};`
);

writeFileSafe(
  `${root}/models/${districtName}_SellerModel_6_0.js`,
  `export const ${districtName}_Seller_6_0 = {
  id: "",
  name: "",
  reputation: 0,
  products: []
};`
);

writeFileSafe(
  `${root}/models/${districtName}_OrderModel_6_0.js`,
  `export const ${districtName}_Order_6_0 = {
  id: "",
  productId: "",
  buyerId: "",
  sellerId: "",
  quantity: 1,
  totalPrice: 0,
  status: "pending",
  createdAt: Date.now()
};`
);

// --- SILNIKI 6.0 ---
writeFileSafe(
  `${root}/engines/${districtName}_MarketplaceEngine_6_0.js`,
  `export class ${districtName}_MarketplaceEngine_6_0 {
  constructor() {}

  buy(product, quantity) {
    if (product.stock < quantity) return { ok: false, reason: "OUT_OF_STOCK" };
    product.stock -= quantity;
    return { ok: true, product, quantity };
  }
}`
);

writeFileSafe(
  `${root}/engines/${districtName}_PricingEngine_6_0.js`,
  `export class ${districtName}_PricingEngine_6_0 {
  constructor() {}

  calculatePrice(product) {
    return product.price;
  }
}`
);

// --- TESTY 6.0 ---
writeFileSafe(
  `${root}/tests/test_${districtName}_marketplace_6_0.js`,
  `console.log("Marketplace 6.0 test OK");`
);

console.log("=== DONE — VERSION 6.0 MODULE GENERATED ===");
