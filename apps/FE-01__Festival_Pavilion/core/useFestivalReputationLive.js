


// FE_FESTIVAL_REPUTATION_HOOK
// React hook for live reputation updates

import { useEffect } from "react";
import { attachFestivalReputationLiveSync } from "../live/festivalReputationLiveSync";

export function useFestivalReputationLive(onReputation) {
  useEffect(() => {
    attachFestivalReputationLiveSync((rep) => {
      onReputation(rep);
    });
  }, []);
}
