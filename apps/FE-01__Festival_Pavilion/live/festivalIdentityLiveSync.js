


// FE_FESTIVAL_IDENTITY_LIVE_SYNC
// Live sync for Festival Pavilion — profile, avatar, badges

import { onIdentityEvent } from "../core/identityBus";

export function attachFestivalIdentityLiveSync(callback) {
  // callback({ userId, profile, avatar, badges }) → FE should update UI
  onIdentityEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        profile: event.payload.profile,
        avatar: event.payload.avatar,
        badges: event.payload.badges
      });
    }
  });
}
