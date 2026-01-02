


// FE_FESTIVAL_NARRATIVE_HOOK
// React hook for live narrative updates in Festival Pavilion

import { useEffect } from "react";
import { attachFestivalNarrativeLiveSync } from "../live/festivalNarrativeLiveSync";

export function useFestivalNarrativeLive(onStory) {
  useEffect(() => {
    attachFestivalNarrativeLiveSync((story) => {
      onStory(story);
    });
  }, []);
}
