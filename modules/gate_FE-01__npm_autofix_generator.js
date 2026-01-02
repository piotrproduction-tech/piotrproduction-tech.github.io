const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PKG = path.join(ROOT, "package.json");
const JEST = path.join(ROOT, "jest.config.js");
const BABEL = path.join(ROOT, "babel.config.js");

function ensurePackageJson() {
  if (!fs.existsSync(PKG)) {
    console.log("[ERROR] package.json not found — run npm init -y first");
    return false;
  }
  return true;
}

function fixPackageJson() {
  const pkg = JSON.parse(fs.readFileSync(PKG, "utf8"));

  // Wymuszamy CommonJS
  pkg.type = "commonjs";

  // Ustawiamy test runner
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.test = "jest";

  fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2), "utf8");
  console.log("[FIXED] package.json → type=commonjs, test=jest");
}

function fixJestConfig() {
  const commonJsConfig = `module.exports = {
  transform: {
    "^.+\\\\.js$": "babel-jest"
  },
  testEnvironment: "node"
};`;

  fs.writeFileSync(JEST, commonJsConfig, "utf8");
  console.log("[FIXED] jest.config.js → CommonJS format");
}

function fixBabelConfig() {
  const commonJsBabel = `module.exports = {
  presets: ["@babel/preset-env"]
};`;

  fs.writeFileSync(BABEL, commonJsBabel, "utf8");
  console.log("[FIXED] babel.config.js → CommonJS format");
}

function main() {
  console.log("=== AUTO FIX JEST/BABEL CONFIG ===");

  if (!ensurePackageJson()) return;

  fixPackageJson();
  fixJestConfig();
  fixBabelConfig();

  console.log("=== DONE — CONFIG FULLY REPAIRED ===");
}

main();
