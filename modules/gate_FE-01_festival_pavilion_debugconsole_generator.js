const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");

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
// 1. components/FestivalDebugConsole.js — główny komponent
//
function debugConsoleComponent() {
  const file = path.join(COMPONENTS, "FestivalDebugConsole.js");
  const marker = "// FE_FESTIVAL_DEBUG_CONSOLE_COMPONENT";

  const block = `
// FE_FESTIVAL_DEBUG_CONSOLE_COMPONENT
// Live debug console for all Festival Pavilion engines

import React from "react";
import "./FestivalDebugConsole.css";

export function FestivalDebugConsole({ logs, collapsed, onToggle }) {
  return (
    <div className={"festival-debug-console" + (collapsed ? " collapsed" : "")}>
      <div className="debug-header" onClick={onToggle}>
        <span>Festival Debug Console</span>
        <span>{collapsed ? "▲" : "▼"}</span>
      </div>

      {!collapsed && (
        <div className="debug-body">
          {logs.map((log, idx) => (
            <div key={idx} className={"debug-line debug-" + log.source}>
              <span className="debug-time">{log.time}</span>
              <span className="debug-source">[{log.source}]</span>
              <span className="debug-message">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalDebugConsole.css — style
//
function debugConsoleCSS() {
  const file = path.join(COMPONENTS, "FestivalDebugConsole.css");
  const marker = "/* FE_FESTIVAL_DEBUG_CONSOLE_CSS */";

  const block = `
/* FE_FESTIVAL_DEBUG_CONSOLE_CSS */

.festival-debug-console {
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 420px;
  max-height: 40vh;
  background: rgba(0,0,0,0.85);
  color: #fff;
  font-size: 11px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 9999;
}

.festival-debug-console.collapsed {
  max-height: 24px;
}

.debug-header {
  padding: 4px 8px;
  background: rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.debug-body {
  padding: 4px 8px;
  max-height: 36vh;
  overflow-y: auto;
}

.debug-line {
  display: flex;
  gap: 4px;
  margin-bottom: 2px;
}

.debug-time {
  opacity: 0.6;
}

.debug-source {
  font-weight: bold;
}

.debug-message {
  flex: 1;
}

.debug-narrative { color: #ffd27f; }
.debug-pulse { color: #ff7f7f; }
.debug-mood { color: #7fd4ff; }
.debug-simulation { color: #b27fff; }
.debug-reputation { color: #7fff9f; }
.debug-governance { color: #ffb27f; }
.debug-security { color: #ff7fb2; }
.debug-identity { color: #7fffff; }
.debug-economy { color: #fff27f; }
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalDebugConsole.js — hook zbierający logi
//
function debugConsoleHook() {
  const file = path.join(CORE, "useFestivalDebugConsole.js");
  const marker = "// FE_FESTIVAL_DEBUG_CONSOLE_HOOK";

  const block = `
// FE_FESTIVAL_DEBUG_CONSOLE_HOOK
// Collects live logs from all engines for FestivalDebugConsole

import { useState } from "react";
import { useFestivalPulseMoodLive } from "./useFestivalPulseMoodLive";
import { useFestivalSimulationLive } from "./useFestivalSimulationLive";
import { useFestivalReputationLive } from "./useFestivalReputationLive";
import { useFestivalGovernanceLive } from "./useFestivalGovernanceLive";
import { useFestivalSecurityLive } from "./useFestivalSecurityLive";
import { useFestivalIdentityLive } from "./useFestivalIdentityLive";
import { useFestivalEconomyLive } from "./useFestivalEconomyLive";

function now() {
  return new Date().toISOString().split("T")[1].slice(0, 8);
}

export function useFestivalDebugConsole() {
  const [logs, setLogs] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  function push(source, message, payload) {
    setLogs((prev) => [
      {
        time: now(),
        source,
        message,
        payload
      },
      ...prev
    ].slice(0, 200));
  }

  // Pulse + Mood
  useFestivalPulseMoodLive(
    (bpm) => push("pulse", "Pulse update: " + bpm, { bpm }),
    (mood) => push("mood", "Mood update: " + mood, { mood })
  );

  // Simulation + Emergence
  useFestivalSimulationLive(
    (wave) => push("simulation", "Wave: " + (wave?.label || "?"), wave),
    (pattern) => push("simulation", "Pattern: " + (pattern?.type || "?"), pattern)
  );

  // Reputation
  useFestivalReputationLive((rep) =>
    push("reputation", "Reputation update for " + rep.userId, rep)
  );

  // Governance
  useFestivalGovernanceLive((gov) =>
    push("governance", "Governance update for " + gov.userId, gov)
  );

  // Security
  useFestivalSecurityLive((sec) =>
    push("security", "Security update for " + sec.userId, sec)
  );

  // Identity
  useFestivalIdentityLive((id) =>
    push("identity", "Identity update for " + id.userId, id)
  );

  // Economy
  useFestivalEconomyLive((eco) =>
    push("economy", "Economy update for " + eco.userId, eco)
  );

  function toggle() {
    setCollapsed((c) => !c);
  }

  return {
    logs,
    collapsed,
    toggle
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z panelami FE
//
function integratePanels() {
  const panels = [
    path.join(FE01, "ADMIN", "AdminDashboard.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js"),
    path.join(FE01, "JURY", "JuryPanel.js")
  ];

  const marker = "// FE_FESTIVAL_DEBUG_CONSOLE_INTEGRATION";

  const block = `
// FE_FESTIVAL_DEBUG_CONSOLE_INTEGRATION
import { FestivalDebugConsole } from "../components/FestivalDebugConsole";
import { useFestivalDebugConsole } from "../core/useFestivalDebugConsole";

const debugConsole = useFestivalDebugConsole();

// Example usage inside render:
// <FestivalDebugConsole
//   logs={debugConsole.logs}
//   collapsed={debugConsole.collapsed}
//   onToggle={debugConsole.toggle}
// />
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Bootstrap folderu components/
//
function bootstrapFolders() {
  ensureDir(COMPONENTS);
}

function main() {
  console.log("=== Festival Pavilion FE FestivalDebugConsole Generator ===");

  bootstrapFolders();
  debugConsoleComponent();
  debugConsoleCSS();
  debugConsoleHook();
  integratePanels();

  console.log("=== DONE ===");
}

main();
