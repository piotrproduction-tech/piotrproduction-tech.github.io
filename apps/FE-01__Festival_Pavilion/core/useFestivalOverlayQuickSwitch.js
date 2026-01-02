


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
