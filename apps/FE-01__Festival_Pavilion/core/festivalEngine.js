


// FE_FESTIVAL_ENGINE

import { FestivalHyperOrchestrator } from "./hyper/festivalHyperOrchestrator";

// Globalny silnik FESTIVAL ENGINE 2.0
export class FestivalEngine {
  constructor() {
    this.hyper = new FestivalHyperOrchestrator();
  }

  // Główna funkcja — jedna klatka festiwalu
  computeFestivalFrame({ experience, scenario, director, uiState, audience }) {
    return this.hyper.computeFrame({
      experience,
      scenario,
      director,
      uiState,
      audience
    });
  }

  // Debug snapshot
  getFestivalSnapshot() {
    return this.hyper.getSnapshot();
  }
}
