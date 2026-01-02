


// FE_FESTIVAL_GOVERNANCE_HOOK
// React hook for live governance updates

import { useEffect } from "react";
import { attachFestivalGovernanceLiveSync } from "../live/festivalGovernanceLiveSync";

export function useFestivalGovernanceLive(onGov) {
  useEffect(() => {
    attachFestivalGovernanceLiveSync((gov) => {
      onGov(gov);
    });
  }, []);
}
