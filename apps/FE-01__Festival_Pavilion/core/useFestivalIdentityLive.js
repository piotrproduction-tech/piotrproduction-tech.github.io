


// FE_FESTIVAL_IDENTITY_HOOK
// React hook for live identity updates

import { useEffect } from "react";
import { attachFestivalIdentityLiveSync } from "../live/festivalIdentityLiveSync";

export function useFestivalIdentityLive(onIdentity) {
  useEffect(() => {
    attachFestivalIdentityLiveSync((id) => {
      onIdentity(id);
    });
  }, []);
}
