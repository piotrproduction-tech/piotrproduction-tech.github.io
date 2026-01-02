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
// 1. core/overlayPresets.js — definicje presetów
//
function presetDefinitions() {
  const file = path.join(CORE, "overlayPresets.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESETS";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESETS
export const FestivalOverlayPresets = {
  Debug: {
    mode: "full",
    toggles: {
      hud: true,
      notifications: true,
      debug: true
    }
  },

  Showcase: {
    mode: "semi",
    toggles: {
      hud: true,
      notifications: true,
      debug: false
    }
  },

  Minimal: {
    mode: "transparent",
    toggles: {
      hud: true,
      notifications: false,
      debug: false
    }
  }
};
`;

  appendIfMissing(file, marker, block);
}

//
// 2. core/useFestivalOverlayPresetManager.js — hook zarządzający presetami
//
function presetManagerHook() {
  const file = path.join(CORE, "useFestivalOverlayPresetManager.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_HOOK
import { useState } from "react";
import { FestivalOverlayPresets } from "./overlayPresets";

export function useFestivalOverlayPresetManager(controller) {
  const [customPresets, setCustomPresets] = useState({});

  function applyPreset(name) {
    const preset =
      FestivalOverlayPresets[name] || customPresets[name];

    if (!preset) return;

    controller.setMode(preset.mode);
    controller.setToggles(preset.toggles);
  }

  function savePreset(name) {
    const newPreset = {
      mode: controller.mode,
      toggles: controller.toggles
    };

    setCustomPresets((prev) => ({
      ...prev,
      [name]: newPreset
    }));
  }

  return {
    applyPreset,
    savePreset,
    customPresets
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. components/FestivalOverlayPresetManager.js — UI panel presetów
//
function presetManagerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayPresetManager.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayPresetManager.css";
import { FestivalOverlayPresets } from "../core/overlayPresets";

export function FestivalOverlayPresetManager({ presetManager }) {
  const [newPresetName, setNewPresetName] = useState("");

  return (
    <div className="overlay-preset-manager">
      <h3>Overlay Presets</h3>

      <div className="preset-section">
        <h4>Default Presets</h4>
        {Object.keys(FestivalOverlayPresets).map((p) => (
          <button key={p} onClick={() => presetManager.applyPreset(p)}>
            {p}
          </button>
        ))}
      </div>

      <div className="preset-section">
        <h4>Custom Presets</h4>
        {Object.keys(presetManager.customPresets).length === 0 && (
          <div className="empty">No custom presets yet</div>
        )}

        {Object.keys(presetManager.customPresets).map((p) => (
          <button key={p} onClick={() => presetManager.applyPreset(p)}>
            {p}
          </button>
        ))}
      </div>

      <div className="preset-section">
        <h4>Save Current as Preset</h4>
        <input
          type="text"
          placeholder="Preset name"
          value={newPresetName}
          onChange={(e) => setNewPresetName(e.target.value)}
        />
        <button
          onClick={() => {
            if (newPresetName.trim()) {
              presetManager.savePreset(newPresetName.trim());
              setNewPresetName("");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. components/FestivalOverlayPresetManager.css
//
function presetManagerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayPresetManager.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_PRESET_MANAGER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_PRESET_MANAGER_CSS */

.overlay-preset-manager {
  position: fixed;
  bottom: 12px;
  right: 12px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  font-size: 13px;
  width: 220px;
}

.preset-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.overlay-preset-manager button {
  padding: 6px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: none;
  cursor: pointer;
}

.overlay-preset-manager input {
  padding: 6px;
  border-radius: 6px;
  border: none;
  margin-bottom: 6px;
}

.empty {
  opacity: 0.6;
  font-size: 12px;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 5. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_INTEGRATION
import { FestivalOverlayPresetManager } from "./FestivalOverlayPresetManager";
import { useFestivalOverlayPresetManager } from "../core/useFestivalOverlayPresetManager";

const presetManager = useFestivalOverlayPresetManager({ mode, setMode, toggles, setToggles });

// Example usage inside render:
// <FestivalOverlayPresetManager presetManager={presetManager} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayPresetManager Generator ===");
  ensureDir(COMPONENTS);
  presetDefinitions();
  presetManagerHook();
  presetManagerComponent();
  presetManagerCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
