


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



// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_EXTENDED

// Add refs for sync
import { useRef } from "react";

customPresetsRef.current = customPresets;

// Track last applied preset
const [lastPreset, setLastPreset] = useState(null);

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
