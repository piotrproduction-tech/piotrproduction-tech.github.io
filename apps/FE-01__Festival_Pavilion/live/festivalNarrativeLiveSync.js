


// FE_FESTIVAL_NARRATIVE_LIVE_SYNC
// Live sync for Festival Pavilion narrative feed

import { onNarrativeEvent } from "../core/narrativeBus";

export function attachFestivalNarrativeLiveSync(callback) {
  // callback(story) → FE should update narrative feed
  onNarrativeEvent((event) => {
    if (event?.payload?.module === "FESTIVAL") {
      callback(event.payload.story);
    }
  });
}
