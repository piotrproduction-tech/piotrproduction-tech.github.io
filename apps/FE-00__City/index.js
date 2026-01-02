import React from "react";
import { ModuleLoader } from "./modules/ModuleLoader.js";

export function CityApp() {
  return (
    <div>
      <h1>CITYOF-GATE</h1>
      <ModuleLoader />
    </div>
  );
}


// --- AUTO-INJECT: City Notifications Stream ---
import { pushCityNotification } from "./LIFE/CityNotifications";
import { emitMapSignal } from "./MAP/CityMapAnimations";

const evt = new EventSource("/api/city/notify/stream");
evt.onmessage = (e) => pushCityNotification(JSON.parse(e.data));

const evt2 = new EventSource("/api/city/map/signal/stream");
evt2.onmessage = (e) => emitMapSignal(JSON.parse(e.data));