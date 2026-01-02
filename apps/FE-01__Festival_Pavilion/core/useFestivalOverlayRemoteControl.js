


// FE_FESTIVAL_OVERLAY_REMOTECONTROL_HOOK
// Remote control for overlay via WebSocket / CityAdminEngine

import { useEffect } from "react";

export function useFestivalOverlayRemoteControl(presetManager, controller, wsUrl = "ws://localhost:8080") {
  useEffect(() => {
    let ws;

    try {
      ws = new WebSocket(wsUrl);
    } catch (e) {
      console.warn("OverlayRemoteControl: WebSocket init failed:", e);
      return;
    }

    ws.onopen = () => {
      console.log("[OverlayRemoteControl] Connected to", wsUrl);
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);

        if (data.type === "CITY_ADMIN_OVERLAY_COMMAND") {
          handleCommand(data.command, data.payload);
        }
      } catch (e) {
        console.warn("OverlayRemoteControl: invalid message:", msg.data);
      }
    };

    function handleCommand(cmd, payload) {
      switch (cmd) {
        case "setPreset":
          presetManager.applyPreset(payload);
          break;

        case "setMode":
          controller.setMode(payload);
          break;

        case "toggle":
          controller.setToggles({
            ...controller.toggles,
            [payload]: !controller.toggles[payload]
          });
          break;

        case "setToggles":
          controller.setToggles(payload);
          break;

        case "setHUD":
          controller.setToggles({ ...controller.toggles, hud: payload });
          break;

        case "setNotifications":
          controller.setToggles({ ...controller.toggles, notifications: payload });
          break;

        case "setDebug":
          controller.setToggles({ ...controller.toggles, debug: payload });
          break;

        default:
          console.warn("OverlayRemoteControl: unknown command:", cmd);
      }
    }

    return () => {
      if (ws) ws.close();
    };
  }, [presetManager, controller, wsUrl]);
}
