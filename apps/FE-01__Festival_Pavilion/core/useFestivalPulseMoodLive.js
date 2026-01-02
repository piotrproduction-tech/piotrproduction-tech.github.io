


// FE_FESTIVAL_PULSE_MOOD_HOOK
// React hook for live BPM + Mood updates

import { useEffect } from "react";
import { attachFestivalPulseMoodLiveSync } from "../live/festivalPulseMoodLiveSync";

export function useFestivalPulseMoodLive(onPulse, onMood) {
  useEffect(() => {
    attachFestivalPulseMoodLiveSync(onPulse, onMood);
  }, []);
}
