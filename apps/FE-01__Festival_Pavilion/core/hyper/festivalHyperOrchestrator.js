


// FE_FESTIVAL_HYPER_ORCHESTRATOR

import { computeHyperSync } from "./festivalHyperSyncEngine";

// Główny orchestrator Warstwy 5
export class FestivalHyperOrchestrator {
  constructor() {
    this.state = {
      lastFrame: null,
      frameIndex: 0,
      lastPriority: null,
      lastDecision: null
    };
  }

  computeFrame({ experience, scenario, director, uiState, audience }) {
    const frame = computeHyperSync({
      experience,
      scenario,
      director,
      uiState,
      audience
    });

    this.state.lastFrame = frame;
    this.state.lastPriority = frame.priority;
    this.state.lastDecision = frame.decision;
    this.state.frameIndex++;

    return frame;
  }

  getSnapshot() {
    return {
      frameIndex: this.state.frameIndex,
      lastPriority: this.state.lastPriority,
      lastDecision: this.state.lastDecision,
      lastFrame: this.state.lastFrame
    };
  }
}
