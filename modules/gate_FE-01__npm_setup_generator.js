const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const PKG = path.join(ROOT, "package.json");

function ensurePackageJson() {
  if (!fs.existsSync(PKG)) {
    console.log("[CREATE] package.json");
    execSync("npm init -y", { stdio: "inherit" });
  } else {
    console.log("[SKIP] package.json already exists");
  }
}

function updatePackageJson() {
  const pkg = JSON.parse(fs.readFileSync(PKG, "utf8"));

  pkg.type = pkg.type || "module";

  pkg.scripts = pkg.scripts || {};
  pkg.scripts.test = "jest";

  fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2), "utf8");
  console.log("[UPDATED] package.json → added jest test script");
}

function installDependencies() {
  console.log("[INSTALL] jest + babel");
  execSync("npm install --save-dev jest @babel/core @babel/preset-env babel-jest", {
    stdio: "inherit"
  });
}

function createJestConfig() {
  const file = path.join(ROOT, "jest.config.js");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      `export default {
  transform: {
    "^.+\\\\.js$": "babel-jest"
  },
  testEnvironment: "node"
};`,
      "utf8"
    );
    console.log("[CREATE] jest.config.js");
  } else {
    console.log("[SKIP] jest.config.js already exists");
  }
}

function createBabelConfig() {
  const file = path.join(ROOT, "babel.config.js");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      `export default {
  presets: ["@babel/preset-env"]
};`,
      "utf8"
    );
    console.log("[CREATE] babel.config.js");
  } else {
    console.log("[SKIP] babel.config.js already exists");
  }
}

function main() {
  console.log("=== NPM SETUP GENERATOR ===");

  ensurePackageJson();
  updatePackageJson();
  installDependencies();
  createJestConfig();
  createBabelConfig();

  console.log("=== DONE ===");
}

main();
