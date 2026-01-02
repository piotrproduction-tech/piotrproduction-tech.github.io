// FE-21__Marketplace - api/useSuperEngine.js

import { useEffect, useState } from "react";
import { subscribeLive, getLiveState } from "../state/liveEventBus";

export function useSuperEngine() {
  const [live, setLive] = useState(getLiveState());

  useEffect(() => {
    subscribeLive(newState => {
      setLive({ ...newState });
    });
  }, []);

  return live;
}
