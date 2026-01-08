// tools/legacy-filter.js

export function isLegacy(file) {
  // 1. Ignorujemy CAŁY folder tools/
  if (file.includes("tools/")) {
    // ALE NIE ignorujemy nowych narzędzi 12.x
    if (
      file.includes("tools/validate-") ||
      file.includes("tools/patch-imports.js") ||
      file.includes("tools/legacy-filter.js")
    ) {
      return false;
    }
    return true;
  }

  // 2. Ignorujemy wszystkie legacy FE/BE
  return (
    file.includes("node_modules") ||
    file.includes("scripts/") ||
    file.includes("modules/") ||
    file.includes("GFAL") ||
    file.includes("FE-00__City") ||
    file.includes("FE-01__") ||
    file.includes("FE-02__") ||
    file.includes("FE-21__") ||
    file.includes("TEST_DISTRICT") ||
    file.includes("backend/") ||
    file.includes("sync/") ||
    file.includes("tests/") ||
    file.includes("AI_Director") ||
    file.includes("CITY_VISUALIZER") ||
    file.includes("SYNC_ENGINE")
  );
}
