const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CORE = path.join(ROOT, "apps", "FE-01__Festival_Pavilion", "core");

function listJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(listJsFiles(full));
    } else if (file.endsWith(".js")) {
      results.push(full);
    }
  });

  return results;
}

function removeDuplicateImports(content, filePath) {
  const lines = content.split("\n");
  const seen = new Set();
  const cleaned = [];

  let removed = 0;

  for (const line of lines) {
    if (line.trim().startsWith("import ")) {
      if (seen.has(line.trim())) {
        removed++;
        continue;
      }
      seen.add(line.trim());
    }
    cleaned.push(line);
  }

  if (removed > 0) {
    console.log(`[FIX] Removed ${removed} duplicate import(s) in ${filePath}`);
  }

  return cleaned.join("\n");
}

function removeDuplicateDeclarations(content, filePath) {
  const declarationRegex = /^(const|let|var|function|class)\s+([A-Za-z0-9_]+)/;
  const lines = content.split("\n");
  const seen = new Set();
  const cleaned = [];

  let removed = 0;

  for (const line of lines) {
    const match = line.trim().match(declarationRegex);

    if (match) {
      const name = match[2];
      if (seen.has(name)) {
        removed++;
        continue;
      }
      seen.add(name);
    }

    cleaned.push(line);
  }

  if (removed > 0) {
    console.log(`[FIX] Removed ${removed} duplicate declaration(s) in ${filePath}`);
  }

  return cleaned.join("\n");
}

function autofixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  const original = content;

  content = removeDuplicateImports(content, filePath);
  content = removeDuplicateDeclarations(content, filePath);

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`[UPDATED] ${filePath}`);
  }
}

function main() {
  console.log("=== Scenario Engine AutoFix Generator ===");

  if (!fs.existsSync(CORE)) {
    console.log("[ERROR] Core folder not found:", CORE);
    return;
  }

  const files = listJsFiles(CORE);

  console.log(`[SCAN] Found ${files.length} JS files in core/`);

  files.forEach(autofixFile);

  console.log("=== DONE — Scenario Engine AutoFix Completed ===");
}

main();
