


// FE_FESTIVAL_LIVE_HOOK
// React hook for live updates in Festival Pavilion

import { useEffect } from "react";
import { attachFestivalLiveSync } from "../live/festivalLiveSync";

export function useFestivalLive(onEvent) {
  useEffect(() => {
    attachFestivalLiveSync((ev) => {
      onEvent(ev);
    });
  }, []);
}
