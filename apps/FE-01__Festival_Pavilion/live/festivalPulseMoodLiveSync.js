


// FE_FESTIVAL_PULSE_MOOD_LIVE_SYNC
// Live sync for Festival Pavilion — BPM + Mood updates

import { onPulseEvent, onMoodEvent } from "../core/pulseMoodBus";

export function attachFestivalPulseMoodLiveSync(onPulse, onMood) {
  onPulseEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onPulse(event.payload.bpm);
    }
  });

  onMoodEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onMood(event.payload.mood);
    }
  });
}
