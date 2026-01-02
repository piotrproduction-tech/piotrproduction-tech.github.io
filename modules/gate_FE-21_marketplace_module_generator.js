const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const FE21 = path.join(APPS, "FE-21__Marketplace");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[FILE] exists, skipped:", filePath);
  }
}

function main() {
  console.log("=== FE-21__Marketplace module generator start ===");

  ensureDir(APPS);
  ensureDir(FE21);

  ensureDir(path.join(FE21, "api"));
  ensureDir(path.join(FE21, "components"));
  ensureDir(path.join(FE21, "views"));
  ensureDir(path.join(FE21, "state"));
  ensureDir(path.join(FE21, "utils"));

  writeFileIfMissing(
    path.join(FE21, "index.js"),
    `// FE-21__Marketplace root module\nexport default function MarketplaceRoot() {\n  return "Marketplace FE Loaded";\n}`
  );

  console.log("=== FE-21__Marketplace module generator done ===");
}

if (require.main === module) {
  main();
}
