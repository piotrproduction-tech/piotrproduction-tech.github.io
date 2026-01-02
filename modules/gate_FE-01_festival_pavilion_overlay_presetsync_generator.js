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
// 1. core/useFestivalOverlayPresetSync.js
//
function presetSyncHook() {
  const file = path.join(CORE, "useFestivalOverlayPresetSync.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESET_SYNC_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESET_SYNC_HOOK
// Syncs overlay presets with LocalStorage and optionally user profile

import { useEffect } from "react";

const LS_KEY = "FE01_FESTIVAL_OVERLAY_PRESETS";
const LS_LAST_KEY = "FE01_FESTIVAL_OVERLAY_LAST_PRESET";

export function useFestivalOverlayPresetSync(presetManager, controller, identity) {
  // Load presets from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        presetManager.customPresetsRef.current = parsed;
      }

      const last = localStorage.getItem(LS_LAST_KEY);
      if (last) {
        presetManager.applyPreset(last);
      }
    } catch (e) {
      console.warn("OverlayPresetSync load error:", e);
    }
  }, []);

  // Save presets to LocalStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify(presetManager.customPresetsRef.current)
      );
    } catch (e) {
      console.warn("OverlayPresetSync save error:", e);
    }
  }, [presetManager.customPresets]);

  // Save last used preset
  useEffect(() => {
    try {
      localStorage.setItem(LS_LAST_KEY, presetManager.lastPreset);
    } catch (e) {
      console.warn("OverlayPresetSync last preset error:", e);
    }
  }, [presetManager.lastPreset]);

  // OPTIONAL: Sync with user profile (CityIdentityEngine)
  // If identity.profile.settings.overlayPresets exists → load/merge
  useEffect(() => {
    if (!identity?.profile?.settings?.overlayPresets) return;

    const remote = identity.profile.settings.overlayPresets;
    presetManager.mergeRemotePresets(remote);
  }, [identity]);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Modyfikacja useFestivalOverlayPresetManager.js — dodanie sync hooks
//
function extendPresetManager() {
  const file = path.join(CORE, "useFestivalOverlayPresetManager.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_EXTENDED";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_EXTENDED

// Add refs for sync
import { useRef } from "react";

customPresetsRef.current = customPresets;

// Track last applied preset
const [lastPreset, setLastPreset] = useState(null);

function applyPreset(name) {
  const preset =
    FestivalOverlayPresets[name] || customPresets[name];

  if (!preset) return;

  controller.setMode(preset.mode);
  controller.setToggles(preset.toggles);
  setLastPreset(name);
}

function mergeRemotePresets(remote) {
  setCustomPresets((prev) => ({
    ...prev,
    ...remote
  }));
}

return {
  applyPreset,
  savePreset,
  customPresets,
  customPresetsRef,
  lastPreset,
  mergeRemotePresets
};
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESET_SYNC_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESET_SYNC_INTEGRATION
import { useFestivalOverlayPresetSync } from "../core/useFestivalOverlayPresetSync";

useFestivalOverlayPresetSync(presetManager, { mode, setMode, toggles, setToggles }, identity);
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayPresetSync Generator ===");
  ensureDir(CORE);
  presetSyncHook();
  extendPresetManager();
  integrateController();
  console.log("=== DONE ===");
}

main();
