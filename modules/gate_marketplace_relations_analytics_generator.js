/**
 * DUŻY KROK — relacje i analityka dla BE-02__Marketplace_Engine
 *
 * Dokłada:
 * - backend/BE-02__Marketplace_Engine/relations/marketplaceRelations.json
 * - backend/BE-02__Marketplace_Engine/analytics/marketplaceAnalytics.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE02 = path.join(ROOT, "backend", "BE-02__Marketplace_Engine");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`📄 Utworzono: ${path.relative(ROOT, filePath)}`);
  } else {
    console.log(`⏭  Istnieje, pomijam: ${path.relative(ROOT, filePath)}`);
  }
}

console.log("🏙️  DUŻY KROK — BE-02 relacje/analityka START...");

if (!fs.existsSync(BE02)) {
  console.error("❌ Brak backend/BE-02__Marketplace_Engine");
  process.exit(1);
}

writeIfMissing(
  path.join(BE02, "relations", "marketplaceRelations.json"),
  `{
  "entity": "marketplaceItem",
  "relations": {
    "owner": {
      "type": "user",
      "field": "ownerId"
    },
    "transactions": {
      "type": "transaction",
      "via": "itemId"
    }
  }
}
`
);

writeIfMissing(
  path.join(BE02, "analytics", "marketplaceAnalytics.json"),
  `{
  "metrics": {
    "totalItems": {
      "description": "Łączna liczba ofert w Marketplace"
    },
    "activeItems": {
      "description": "Liczba aktywnych ofert"
    },
    "uniqueOwners": {
      "description": "Liczba unikalnych twórców ofert"
    }
  }
}
`
);

console.log("🎉 DUŻY KROK — BE-02 relacje/analityka ZAKOŃCZONE.");
