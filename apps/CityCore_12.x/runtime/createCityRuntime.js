// CityCore_12.x/runtime/createCityRuntime.js

import { createCityState } from "../state/CityState.js";
import { createCityRouter } from "../router/CityRouter.js";
import { createCityEventBridge } from "../engine/CityEventBridge.js";
import { createCityEngine } from "../engine/CityEngine.js";
import { createCityPanelHost } from "../ui/CityPanelHost.js";
import { createCityShell } from "../shell/CityShell.js";

export function createCityRuntime({ districts }) {
  // 1. Global city state
  const cityState = createCityState();

  // 2. Router that uses your full district objects
  const router = createCityRouter({ districts });

  // 3. Event bridge that connects CityEngine <-> district.engine
  const eventBridge = createCityEventBridge({
    cityState,
    // district.eventBus is used internally by district.engine
    // CityRuntime does NOT override it
  });

  // 4. CityEngine (heartbeat + lifecycle)
  const engine = createCityEngine({
    cityState,
    router,
    eventBridge
  });

  // 5. Panel host (HUD + Overlay + Immersive)
  const panelHost = createCityPanelHost();

  // 6. CityShell (UI renderer)
  const shell = createCityShell({
    router,
    panelHost
  });

  // 7. Public API
  function start(user, interval = 1000) {
    engine.start(user, interval);
  }

  function stop() {
    engine.stop();
  }

  function render(user) {
    const resolved = router.resolve(user);
    return shell.render(resolved);
  }

  return {
    start,
    stop,
    render,
    engine,
    router,
    shell,
    cityState
  };
}

