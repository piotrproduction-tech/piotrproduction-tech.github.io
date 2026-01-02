/**
 * DUŻY KROK — system ról / poziomów / certyfikatów dla BE-02__Marketplace_Engine
 *
 * Dokłada / uzupełnia:
 * - backend/BE-02__Marketplace_Engine/config/functions.json
 * - backend/BE-02__Marketplace_Engine/config/roles.json
 * - backend/BE-02__Marketplace_Engine/config/levels.json
 * - backend/BE-02__Marketplace_Engine/config/certificates.json
 *
 * NIC nie nadpisuje, jeśli pliki istnieją — tylko tworzy brakujące.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE02 = path.join(ROOT, "backend", "BE-02__Marketplace_Engine");
const CONFIG = path.join(BE02, "config");

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

console.log("🏙️  DUŻY KROK — BE-02 security/progression START...");

if (!fs.existsSync(BE02)) {
  console.error("❌ Brak backend/BE-02__Marketplace_Engine");
  process.exit(1);
}

ensureDir(CONFIG);

writeIfMissing(
  path.join(CONFIG, "functions.json"),
  `{
  "marketplace.view": true,
  "marketplace.create": true,
  "marketplace.edit_own": true,
  "marketplace.moderate": true,
  "marketplace.admin": true
}
`
);

writeIfMissing(
  path.join(CONFIG, "roles.json"),
  `{
  "guest": ["marketplace.view"],
  "user": ["marketplace.view", "marketplace.create", "marketplace.edit_own"],
  "moderator": ["marketplace.view", "marketplace.moderate"],
  "admin": ["marketplace.view", "marketplace.create", "marketplace.edit_own", "marketplace.moderate", "marketplace.admin"]
}
`
);

writeIfMissing(
  path.join(CONFIG, "levels.json"),
  `{
  "L1_Newcomer": ["guest"],
  "L2_Participant": ["user"],
  "L3_Trusted": ["user", "moderator"],
  "L4_Admin": ["admin"]
}
`
);

writeIfMissing(
  path.join(CONFIG, "certificates.json"),
  `{
  "Marketplace_Creator": true,
  "Marketplace_Moderator": true,
  "Marketplace_Admin": true
}
`
);

console.log("🎉 DUŻY KROK — BE-02 security/progression ZAKOŃCZONE.");
