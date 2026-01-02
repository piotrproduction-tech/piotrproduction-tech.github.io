


// FE_FESTIVAL_REPUTATION_LIVE_SYNC
// Live sync for Festival Pavilion — reputation, prestige, levels

import { onReputationEvent } from "../core/reputationBus";

export function attachFestivalReputationLiveSync(callback) {
  // callback({ userId, points, level, prestige }) → FE should update UI
  onReputationEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        points: event.payload.points,
        level: event.payload.level,
        prestige: event.payload.prestige
      });
    }
  });
}
