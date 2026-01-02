


// FE_FESTIVAL_ECONOMY_HOOK
// React hook for live economy updates

import { useEffect } from "react";
import { attachFestivalEconomyLiveSync } from "../live/festivalEconomyLiveSync";

export function useFestivalEconomyLive(onEconomy) {
  useEffect(() => {
    attachFestivalEconomyLiveSync((eco) => {
      onEconomy(eco);
    });
  }, []);
}
