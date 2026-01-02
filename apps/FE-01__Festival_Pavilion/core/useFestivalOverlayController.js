


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
