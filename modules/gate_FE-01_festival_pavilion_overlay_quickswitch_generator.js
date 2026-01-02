const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const COMPONENTS = path.join(FE01, "components");

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
// 1. core/useFestivalOverlayQuickSwitch.js
//
function quickSwitchHook() {
  const file = path.join(CORE, "useFestivalOverlayQuickSwitch.js");
  const marker = "// FE_FESTIVAL_OVERLAY_QUICKSWITCH_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_QUICKSWITCH_HOOK
// Keyboard shortcuts for overlay presets: F10, F11, F12

import { useEffect } from "react";

export function useFestivalOverlayQuickSwitch(presetManager) {
  useEffect(() => {
    function handler(e) {
      if (e.key === "F10") {
        presetManager.applyPreset("Debug");
      }
      if (e.key === "F11") {
        presetManager.applyPreset("Showcase");
      }
      if (e.key === "F12") {
        presetManager.applyPreset("Minimal");
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [presetManager]);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_QUICKSWITCH_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_QUICKSWITCH_INTEGRATION
import { useFestivalOverlayQuickSwitch } from "../core/useFestivalOverlayQuickSwitch";

useFestivalOverlayQuickSwitch(presetManager);
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z FestivalOverlay.js (opcjonalnie)
//
function integrateOverlay() {
  const file = path.join(COMPONENTS, "FestivalOverlay.js");
  const marker = "// FE_FESTIVAL_OVERLAY_QUICKSWITCH_OVERLAY";

  const block = `
// FE_FESTIVAL_OVERLAY_QUICKSWITCH_OVERLAY
// (Optional) QuickSwitch can also be initialized here if needed
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayQuickSwitch Generator ===");
  ensureDir(CORE);
  quickSwitchHook();
  integrateController();
  integrateOverlay();
  console.log("=== DONE ===");
}

main();
