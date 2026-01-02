


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
