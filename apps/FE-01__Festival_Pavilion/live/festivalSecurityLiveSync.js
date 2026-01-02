


// FE_FESTIVAL_SECURITY_LIVE_SYNC
// Live sync for Festival Pavilion — anti-abuse, throttling, trust-levels

import { onSecurityEvent } from "../core/securityBus";

export function attachFestivalSecurityLiveSync(callback) {
  // callback({ userId, trustLevel, flags, throttling }) → FE should update UI
  onSecurityEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        trustLevel: event.payload.trustLevel,
        flags: event.payload.flags,
        throttling: event.payload.throttling
      });
    }
  });
}
