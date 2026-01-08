// modules/fixJestImports.js
import fs from "fs";
import path from "path";

console.log("=== GFAL Jest Import Fixer ===");

const ROOT = process.cwd();

// Katalogi, w których szukamy testów
const SEARCH_DIRS = [
  "apps",
  "__tests__",
  "AI_Director",
  "CITY_VISUALIZER",
  "SYNC_ENGINE"
];

// Rozpoznajemy testy po rozszerzeniu
const TEST_EXTENSIONS = [".test.js", ".spec.js"];

function isTestFile(file) {
  return TEST_EXTENSIONS.some(ext => file.endsWith(ext));
}

function fileContainsJestUsage(content) {
  return content.includes("jest.fn") ||
         content.includes("jest.spyOn") ||
         content.includes("jest.mock");
}

function fileHasJestImport(content) {
  return content.includes(`from "@jest/globals"`) ||
         content.includes(`import { jest }`);
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (!fileContainsJestUsage(content)) {
    return; // nie dotykamy testów bez jest.fn()
  }

  if (fileHasJestImport(content)) {
    return; // już poprawione
  }

  const fixed = `import { jest } from "@jest/globals";\n` + content;
  fs.writeFileSync(filePath, fixed);

  console.log("✔ Dodano import jest →", filePath);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (isTestFile(entry)) {
      processFile(fullPath);
    }
  }
}

for (const dir of SEARCH_DIRS) {
  walk(path.join(ROOT, dir));
}

console.log("=== ZAKOŃCZONE: Wszystkie testy GFAL mają poprawny import jest ===");
