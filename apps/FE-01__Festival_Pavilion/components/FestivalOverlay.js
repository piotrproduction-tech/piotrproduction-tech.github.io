


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



// FE_FESTIVAL_OVERLAY_CONTROLLER_INTEGRATION
import { FestivalOverlayController } from "./FestivalOverlayController";
import { useFestivalOverlayController } from "../core/useFestivalOverlayController";

const controller = useFestivalOverlayController();

// Example usage inside render:
// <FestivalOverlayController {...controller} />
//
// And pass controller.mode + controller.toggles to FestivalOverlay



// FE_FESTIVAL_OVERLAY_QUICKSWITCH_OVERLAY
// (Optional) QuickSwitch can also be initialized here if needed



// FE_FESTIVAL_OVERLAY_REMOTECONTROL_OVERLAY
// (Optional) RemoteControl can also be initialized here if needed
