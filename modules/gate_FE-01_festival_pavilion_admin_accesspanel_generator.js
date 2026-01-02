const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const ADMIN = path.join(FE01, "ADMIN");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");
const ACCESS = path.join(FE01, "access");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(filePath, baseContent = "") {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, baseContent, "utf8");
    console.log("[CREATE]", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  ensureFile(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

//
// 1. components/AdminAccessPanel.js — główny panel
//
function adminAccessPanel() {
  const file = path.join(COMPONENTS, "AdminAccessPanel.js");
  const marker = "// FE_FESTIVAL_ADMIN_ACCESS_PANEL";

  const block = `
// FE_FESTIVAL_ADMIN_ACCESS_PANEL
// Visualizes Access Matrix + allows admin override

import React, { useState } from "react";
import { FestivalAccessMatrix } from "../access/accessMatrix";
import { evaluateFestivalAccess } from "../access/accessEvaluator";

export function AdminAccessPanel({ identity, governance, security, onOverride }) {
  const [override, setOverride] = useState(null);

  const current = evaluateFestivalAccess(identity, governance, security);

  function applyOverride(key, value) {
    const updated = { ...current, [key]: value };
    setOverride(updated);
    if (typeof onOverride === "function") onOverride(updated);
  }

  const finalAccess = override || current;

  return (
    <div className="admin-access-panel">
      <h2>Access Matrix — Festival Pavilion</h2>

      <div className="access-section">
        <h3>Current Access</h3>
        <pre>{JSON.stringify(current, null, 2)}</pre>
      </div>

      <div className="access-section">
        <h3>Override (Admin Only)</h3>
        <div className="override-grid">
          {Object.keys(current).map((key) => (
            <div key={key} className="override-row">
              <span className="override-key">{key}</span>
              <button onClick={() => applyOverride(key, true)}>Allow</button>
              <button onClick={() => applyOverride(key, false)}>Deny</button>
            </div>
          ))}
        </div>
      </div>

      <div className="access-section">
        <h3>Final Access</h3>
        <pre>{JSON.stringify(finalAccess, null, 2)}</pre>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/AdminAccessPanel.css — style
//
function adminAccessCSS() {
  const file = path.join(COMPONENTS, "AdminAccessPanel.css");
  const marker = "/* FE_FESTIVAL_ADMIN_ACCESS_CSS */";

  const block = `
/* FE_FESTIVAL_ADMIN_ACCESS_CSS */

.admin-access-panel {
  padding: 20px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}

.access-section {
  margin-bottom: 20px;
}

.override-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.override-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.override-key {
  width: 200px;
  font-weight: bold;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useAdminAccessPanel.js — hook do integracji
//
function adminAccessHook() {
  const file = path.join(CORE, "useAdminAccessPanel.js");
  const marker = "// FE_FESTIVAL_ADMIN_ACCESS_HOOK";

  const block = `
// FE_FESTIVAL_ADMIN_ACCESS_HOOK
// Hook for AdminAccessPanel integration

import { useUserCardData } from "./useUserCardData";

export function useAdminAccessPanel(identity, governance, security) {
  const usercard = useUserCardData(identity, governance, security);
  return usercard;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z AdminDashboard.js
//
function integrateAdminDashboard() {
  const file = path.join(ADMIN, "AdminDashboard.js");
  const marker = "// FE_FESTIVAL_ADMIN_ACCESS_PANEL_INTEGRATION";

  const block = `
// FE_FESTIVAL_ADMIN_ACCESS_PANEL_INTEGRATION
import { AdminAccessPanel } from "../components/AdminAccessPanel";
import { useAdminAccessPanel } from "../core/useAdminAccessPanel";

const accessPanel = useAdminAccessPanel(identity, governance, security);

// Example usage inside render:
// <AdminAccessPanel {...accessPanel} onOverride={(a) => console.log("Override:", a)} />
`;

  appendIfMissing(file, marker, block);
}

//
// 5. Bootstrap folderu components/
//
function bootstrapFolders() {
  ensureDir(COMPONENTS);
}

function main() {
  console.log("=== Festival Pavilion FE AdminAccessPanel Generator ===");

  bootstrapFolders();
  adminAccessPanel();
  adminAccessCSS();
  adminAccessHook();
  integrateAdminDashboard();

  console.log("=== DONE ===");
}

main();
