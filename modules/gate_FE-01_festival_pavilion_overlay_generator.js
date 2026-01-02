const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// 1. components/FestivalOverlay.js
//
function overlayComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlay.js");
  const marker = "// FE_FESTIVAL_OVERLAY_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_COMPONENT
import React from "react";
import "./FestivalOverlay.css";

import { FestivalHUD } from "./FestivalHUD";
import { FestivalDebugConsole } from "./FestivalDebugConsole";
import { FestivalNotifications } from "./FestivalNotifications";

export function FestivalOverlay({ hud, debug, notifications, mode }) {
  return (
    <div className={"festival-overlay mode-" + mode}>
      <FestivalHUD {...hud} />
      <FestivalNotifications notifications={notifications} />
      <FestivalDebugConsole
        logs={debug.logs}
        collapsed={debug.collapsed}
        onToggle={debug.toggle}
      />
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlay.css
//
function overlayCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlay.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_CSS */

.festival-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
}

.mode-transparent { opacity: 0.4; }
.mode-semi { opacity: 0.75; }
.mode-full { opacity: 1; }
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalOverlay.js
//
function overlayHook() {
  const file = path.join(CORE, "useFestivalOverlay.js");
  const marker = "// FE_FESTIVAL_OVERLAY_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_HOOK
import { useFestivalHUD } from "./useFestivalHUD";
import { useFestivalDebugConsole } from "./useFestivalDebugConsole";
import { useFestivalNotifications } from "./useFestivalNotifications";

export function useFestivalOverlay(identity, governance, security) {
  const hud = useFestivalHUD(identity, governance, security);
  const debug = useFestivalDebugConsole();
  const notifications = useFestivalNotifications();

  return {
    hud,
    debug,
    notifications,
    mode: "semi"
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z AdminDashboard.js
//
function integrateDashboard() {
  const file = path.join(FE01, "ADMIN", "AdminDashboard.js");
  const marker = "// FE_FESTIVAL_OVERLAY_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_INTEGRATION
import { FestivalOverlay } from "../components/FestivalOverlay";
import { useFestivalOverlay } from "../core/useFestivalOverlay";

const overlay = useFestivalOverlay(identity, governance, security);

// Example usage inside render:
// <FestivalOverlay {...overlay} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlay Generator ===");
  ensureDir(COMPONENTS);
  overlayComponent();
  overlayCSS();
  overlayHook();
  integrateDashboard();
  console.log("=== DONE ===");
}

main();
