


// FE_FESTIVAL_ECONOMY_LIVE_SYNC
// Live sync for Festival Pavilion — tokens, transactions, marketplace synergy

import { onEconomyEvent } from "../core/economyBus";

export function attachFestivalEconomyLiveSync(callback) {
  // callback({ userId, tokens, delta, reason, transaction }) → FE should update UI
  onEconomyEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        tokens: event.payload.tokens,
        delta: event.payload.delta,
        reason: event.payload.reason,
        transaction: event.payload.transaction
      });
    }
  });
}
