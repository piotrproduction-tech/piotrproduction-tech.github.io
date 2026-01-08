/**
 * CITYOF-GATE — CreatorDistrict Identity 9.0 Fixer
 *
 * Usuwa błędne importy 6.0 z CreatorDistrict_IdentityEngine_9_0.js
 * i poprawia konstruktor, aby działał tylko na 7.0 / 8.0 / 9.x.
 *
 * Uruchom:
 *    node tools/fix_creator_identity_9_0.js
 */

import fs from "fs";
import path from "path";

const FILE = path.join(
  "apps",
  "CreatorDistrict",
  "orchestrator",
  "CreatorDistrict_IdentityEngine_9_0.js"
);

console.log("🔧 Fixing CreatorDistrict Identity 9.0…");

if (!fs.existsSync(FILE)) {
  console.error("❌ File not found:", FILE);
  process.exit(1);
}

let content = fs.readFileSync(FILE, "utf8");

// 1. Usuń wszystkie importy 6.0
content = content.replace(
  /import\s+\{[^}]+6_0[^}]+\}\s+from\s+["'][^"']+["'];?/g,
  ""
);

// 2. Usuń użycia silników 6.0 w konstruktorze
content = content.replace(
  /this\.[A-Za-z0-9_]+_6_0\s*=\s*new\s+[A-Za-z0-9_]+_6_0\([^)]*\);\s*/g,
  ""
);

// 3. Usuń puste linie powstałe po czyszczeniu
content = content.replace(/\n{3,}/g, "\n\n");

// 4. Dodaj komentarz architektoniczny (jeśli nie istnieje)
if (!content.includes("CreatorDistrict does not use layer 6.0")) {
  content = content.replace(
    /constructor\s*\(\)\s*\{/,
    `constructor() {
    // CreatorDistrict does not use layer 6.0 — starts at 7.0`
  );
}

fs.writeFileSync(FILE, content, "utf8");

console.log("✨ CreatorDistrict Identity 9.0 fixed successfully.");
