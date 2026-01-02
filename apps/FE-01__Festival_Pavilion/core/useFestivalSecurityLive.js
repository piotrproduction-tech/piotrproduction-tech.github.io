


// FE_FESTIVAL_SECURITY_HOOK
// React hook for live security updates

import { useEffect } from "react";
import { attachFestivalSecurityLiveSync } from "../live/festivalSecurityLiveSync";

export function useFestivalSecurityLive(onSecurity) {
  useEffect(() => {
    attachFestivalSecurityLiveSync((sec) => {
      onSecurity(sec);
    });
  }, []);
}
