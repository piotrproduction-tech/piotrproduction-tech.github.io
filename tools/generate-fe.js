// tools/generate-fe.js
// Pełny generator FE z sanitizacją nazw modułów (ESM)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const BACKEND_DIR = path.join(ROOT, "backend");
const APPS_DIR = path.join(ROOT, "apps");

// ------------------------------------------------------------
// SANITYZACJA NAZW MODUŁÓW
// ------------------------------------------------------------
function sanitizeModuleKey(raw) {
  return raw
    .normalize("NFKD")                     // usuń diakrytyki
    .replace(/[^\x00-\x7F]/g, "")          // usuń Unicode
    .replace(/\s+/g, "_")                  // spacje → _
    .replace(/–|—|‑/g, "-")                // myślniki Unicode → ASCII
    .replace(/_+/g, "_")                   // kompresuj __
    .replace(/-+/g, "-")                   // kompresuj --
    .replace(/[^A-Za-z0-9_\-]/g, "")       // usuń inne znaki
    .trim();
}

// ------------------------------------------------------------
// KONFIGURACJA MODUŁÓW (FE-01 + FE-06)
// ------------------------------------------------------------
const MODULE_CONFIG = {
  // ============================
  // FE‑01 — Festival Pavilion
  // ============================
  "FE-01__Festival_Pavilion": {
    views: [
      "submissions",
      "jury",
      "results",
      "artist_report",
      "archive",
      "export",
    ],
    endpoints: {
      submissions: {
        listAll:     { method: "GET",  path: "/festival/list" },
        listByCat:   { method: "GET",  path: "/festival/list/:category" },
        submit:      { method: "POST", path: "/festival/submit" },
        update:      { method: "POST", path: "/festival/update" },
        remove:      { method: "POST", path: "/festival/remove" },
        status:      { method: "POST", path: "/festival/status" },
      },
      jury: {
        listJury:    { method: "GET",  path: "/festival/jury" },
        addVote:     { method: "POST", path: "/festival/jury/vote" },
      },
      results: {
        results:     { method: "GET",  path: "/festival/results" },
      },
      artist_report: {
        artistReport:{ method: "GET",  path: "/festival/artist/:author" },
      },
      archive: {
        archive:     { method: "GET",  path: "/festival/archive" },
      },
      export: {
        exportCsv:   { method: "GET",  path: "/festival/export/csv" },
      },
    },
  },

  // ============================
  // FE‑06 — DAO Town Hall
  // ============================
  "FE-06__DAO_Town_Hall": {
    views: [
      "v1_proposals",
      "v3_timed_proposals",
      "v4_trends",
      "v4_export",
    ],
    endpoints: {
      v1_proposals: {
        list:   { method: "GET",  path: "/dao/proposals" },
        add:    { method: "POST", path: "/dao/proposal/add" },
        vote:   { method: "POST", path: "/dao/proposal/vote" },
        close:  { method: "POST", path: "/dao/proposal/close" },
      },
      v3_timed_proposals: {
        addTimed: { method: "POST", path: "/dao/v3/proposal/add" },
        vote:     { method: "POST", path: "/dao/v3/proposal/vote" },
        close:    { method: "POST", path: "/dao/v3/proposal/close" },
        report:   { method: "GET",  path: "/dao/v3/proposal/:id/report" },
      },
      v4_trends: {
        trends:   { method: "GET",  path: "/dao/v4/trends/:days" },
        autoClose:{ method: "POST", path: "/dao/v4/auto-close" },
        quorum:   { method: "GET",  path: "/dao/v4/quorum/:id" },
      },
      v4_export: {
        exportPdf: { method: "GET", path: "/dao/v4/export/pdf" },
      },
    },
  },
};

// ------------------------------------------------------------
// HELPERY
// ------------------------------------------------------------
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function toHtmlFileName(moduleKey) { return `${moduleKey}.html`; }
function toCssFileName(moduleKey)  { return `${moduleKey}.css`; }
function toJsFileName(moduleKey)   { return `${moduleKey}.js`; }
function toGsFileName(moduleKey)   { return `${moduleKey}.gs`; }

function humanTitle(moduleKey) {
  const name = moduleKey.split("__")[1] || moduleKey;
  return name.replace(/_/g, " ");
}

// ------------------------------------------------------------
// GENEROWANIE HTML
// ------------------------------------------------------------
function generateHtml(moduleKey, config) {
  const title = humanTitle(moduleKey);
  const views = config?.views || [];

  if (views.length === 0) {
    return `<!-- ${moduleKey} -->
<h1>${title}</h1>
<div id="content"></div>
<script src="${toJsFileName(moduleKey)}"></script>
<link rel="stylesheet" href="${toCssFileName(moduleKey)}">`;
  }

  const nav = views
    .map(v => `<button onclick="showSection('${v}')">${v}</button>`)
    .join("\n");

  const sections = views
    .map(v => `<div id="section-${v}" class="section"></div>`)
    .join("\n");

  return `<!-- ${moduleKey} -->
<h1>${title}</h1>
<nav>${nav}</nav>
<hr>
${sections}
<script src="${toJsFileName(moduleKey)}"></script>
<link rel="stylesheet" href="${toCssFileName(moduleKey)}">`;
}

// ------------------------------------------------------------
// GENEROWANIE CSS
// ------------------------------------------------------------
function generateCss(moduleKey) {
  return `/* ${moduleKey} */
body { font-family: Arial, sans-serif; padding: 20px; }
nav { margin-bottom: 10px; }
nav button { margin-right: 8px; }
.section { display: none; margin-top: 20px; }
h1, h2 { margin-top: 20px; }
table { border-collapse: collapse; width: 100%; }
td, th { border: 1px solid #ccc; padding: 6px 10px; }
pre { background: #f5f5f5; padding: 10px; border-radius: 4px; }
input, select, textarea { margin: 4px 0; padding: 4px; }`;
}

// ------------------------------------------------------------
// GENEROWANIE JS (placeholder lub pełny DAO/FE-01)
// ------------------------------------------------------------
function generateJs(moduleKey, config) {
  const title = humanTitle(moduleKey);
  const views = config?.views || [];

  if (views.length === 0) {
    return `// ${moduleKey} - placeholder
window.onload = function() {
  document.getElementById("content").innerHTML =
    "<h2>${title}</h2><p>Moduł wygenerowany automatycznie.</p>";
};`;
  }

  const showSectionFn = `
function showSection(name) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  const el = document.getElementById("section-" + name);
  if (el) el.style.display = "block";

  switch (name) {
${views.map(v => `    case "${v}": load_${v}(); break;`).join("\n")}
  }
}
`;

  const loaders = views
    .map(v => `
function load_${v}() {
  const el = document.getElementById("section-${v}");
  el.innerHTML = "<h2>${title} — ${v}</h2><p>Widok wygenerowany automatycznie.</p>";
}
`)
    .join("\n");

  return `// ${moduleKey} — frontend
${showSectionFn}
${loaders}
window.onload = function() { showSection("${views[0]}"); };`;
}

// ------------------------------------------------------------
// GENEROWANIE GS (Apps Script wrappery)
// ------------------------------------------------------------
function generateGs(moduleKey, config) {
  const htmlFile = toHtmlFileName(moduleKey).replace(".html", "");
  const title = humanTitle(moduleKey);
  const endpoints = config?.endpoints || {};

  let wrappers = "";

  for (const viewName in endpoints) {
    const group = endpoints[viewName];
    for (const fnName in group) {
      const ep = group[fnName];

      wrappers += `
function ${moduleKey.replace(/-/g, "_")}_${viewName}_${fnName}(payload) {
  var url = BACKEND_URL + "${ep.path.replace(/:([A-Za-z]+)/g, '" + payload.$1 + "')}";
  var options = {
    method: "${ep.method.toLowerCase()}",
    muteHttpExceptions: true
  };
  if (options.method === "post") {
    options.contentType = "application/json";
    options.payload = JSON.stringify(payload || {});
  }
  var resp = UrlFetchApp.fetch(url, options);
  return JSON.parse(resp.getContentText());
}
`;
    }
  }

  return `// ${moduleKey}
function doGet() {
  return HtmlService.createHtmlOutputFromFile("${htmlFile}")
    .setTitle("${title}");
}

/* === AUTO-GENERATED WRAPPERS === */
${wrappers}`;
}

// ------------------------------------------------------------
// GŁÓWNY GENERATOR
// ------------------------------------------------------------
console.log("=== GENERATING FE MODULES (SANITIZED) ===");

ensureDir(APPS_DIR);

const backendModules = fs.readdirSync(BACKEND_DIR).filter(name =>
  /^BE-\d+__/.test(name)
);

backendModules.forEach(backendFolder => {
  const rawKey = backendFolder.replace("BE-", "FE-");
  const moduleKey = sanitizeModuleKey(rawKey);
  const moduleDir = path.join(APPS_DIR, moduleKey);

  ensureDir(moduleDir);

  const config = MODULE_CONFIG[moduleKey] || {};

  fs.writeFileSync(path.join(moduleDir, toHtmlFileName(moduleKey)), generateHtml(moduleKey, config));
  fs.writeFileSync(path.join(moduleDir, toCssFileName(moduleKey)), generateCss(moduleKey));
  fs.writeFileSync(path.join(moduleDir, toJsFileName(moduleKey)), generateJs(moduleKey, config));
  fs.writeFileSync(path.join(moduleDir, toGsFileName(moduleKey)), generateGs(moduleKey, config));

  console.log("Generated:", moduleKey);
});

console.log("=== FE GENERATION COMPLETE ===");
