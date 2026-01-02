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
// 1. components/FestivalOverlayController.js
//
function controllerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_CONTROLLER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayController.css";

export function FestivalOverlayController({ mode, setMode, toggles, setToggles }) {
  return (
    <div className="overlay-controller">
      <h3>Overlay Controller</h3>

      <div className="controller-section">
        <label>Overlay Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="off">Off</option>
          <option value="transparent">Transparent</option>
          <option value="semi">Semi</option>
          <option value="full">Full</option>
        </select>
      </div>

      <div className="controller-section">
        <label>
          <input
            type="checkbox"
            checked={toggles.hud}
            onChange={() => setToggles({ ...toggles, hud: !toggles.hud })}
          />
          Show HUD
        </label>

        <label>
          <input
            type="checkbox"
            checked={toggles.notifications}
            onChange={() =>
              setToggles({ ...toggles, notifications: !toggles.notifications })
            }
          />
          Show Notifications
        </label>

        <label>
          <input
            type="checkbox"
            checked={toggles.debug}
            onChange={() => setToggles({ ...toggles, debug: !toggles.debug })}
          />
          Show Debug Console
        </label>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayController.css
//
function controllerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_CONTROLLER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_CONTROLLER_CSS */

.overlay-controller {
  position: fixed;
  bottom: 12px;
  left: 12px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  font-size: 13px;
}

.controller-section {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.overlay-controller select {
  padding: 4px;
  border-radius: 4px;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalOverlayController.js
//
function controllerHook() {
  const file = path.join(CORE, "useFestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_CONTROLLER_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_CONTROLLER_HOOK
import { useState } from "react";

export function useFestivalOverlayController() {
  const [mode, setMode] = useState("semi");

  const [toggles, setToggles] = useState({
    hud: true,
    notifications: true,
    debug: true
  });

  return {
    mode,
    setMode,
    toggles,
    setToggles
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z FestivalOverlay.js
//
function integrateOverlay() {
  const file = path.join(COMPONENTS, "FestivalOverlay.js");
  const marker = "// FE_FESTIVAL_OVERLAY_CONTROLLER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_CONTROLLER_INTEGRATION
import { FestivalOverlayController } from "./FestivalOverlayController";
import { useFestivalOverlayController } from "../core/useFestivalOverlayController";

const controller = useFestivalOverlayController();

// Example usage inside render:
// <FestivalOverlayController {...controller} />
//
// And pass controller.mode + controller.toggles to FestivalOverlay
`;

  appendIfMissing(file, marker, block);
}

//
// 5. Integracja z AdminDashboard.js (opcjonalnie)
//
function integrateDashboard() {
  const file = path.join(FE01, "ADMIN", "AdminDashboard.js");
  const marker = "// FE_FESTIVAL_OVERLAY_CONTROLLER_DASHBOARD";

  const block = `
// FE_FESTIVAL_OVERLAY_CONTROLLER_DASHBOARD
import { FestivalOverlayController } from "../components/FestivalOverlayController";
import { useFestivalOverlayController } from "../core/useFestivalOverlayController";

const overlayController = useFestivalOverlayController();

// Example usage inside render:
// <FestivalOverlayController {...overlayController} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayController Generator ===");
  ensureDir(COMPONENTS);
  controllerComponent();
  controllerCSS();
  controllerHook();
  integrateOverlay();
  integrateDashboard();
  console.log("=== DONE ===");
}

main();
