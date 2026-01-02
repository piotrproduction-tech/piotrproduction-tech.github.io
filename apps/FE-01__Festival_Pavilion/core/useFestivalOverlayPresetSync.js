


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
