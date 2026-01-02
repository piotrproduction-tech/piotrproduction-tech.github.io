


// FE_FESTIVAL_LIVE_SYNC
// Live sync for Festival Pavilion — listens to CityEventBus and updates FE state

import { onCityEvent } from "../core/eventBus";

const FESTIVAL_EVENTS = [
  "FESTIVAL_SUBMISSION_CREATED",
  "FESTIVAL_JURY_ASSIGNED",
  "FESTIVAL_JURY_VOTED",
  "FESTIVAL_AWARD_CATEGORY_CREATED",
  "FESTIVAL_AWARD_GRANTED",
  "FESTIVAL_EVENT_CREATED",
  "FESTIVAL_EVENT_UPDATED",
  "FESTIVAL_SCHEDULE_ENTRY_ADDED"
];

export function attachFestivalLiveSync(callback) {
  // callback(event) → FE should refresh its data
  FESTIVAL_EVENTS.forEach(type => {
    onCityEvent(type, (event) => {
      callback(event);
    });
  });
}
