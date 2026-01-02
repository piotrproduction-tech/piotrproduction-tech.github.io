


// FE_FESTIVAL_OVERLAY_HOOK
import { useFestivalHUD } from "./useFestivalHUD";
import { useFestivalDebugConsole } from "./useFestivalDebugConsole";
import { useFestivalNotifications } from "./useFestivalNotifications";

export function useFestivalOverlay(identity, governance, security) {
  const hud = useFestivalHUD(identity, governance, security);
  const debug = useFestivalDebugConsole();
  const notifications = useFestivalNotifications();

  return {
    hud,
    debug,
    notifications,
    mode: "semi"
  };
}
