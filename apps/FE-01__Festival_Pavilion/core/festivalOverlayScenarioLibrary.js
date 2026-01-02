


// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY
// Professional library of festival overlay scenarios

export const FestivalOverlayScenarioLibrary = {
  // --- CEREMONIAL ---

  OpeningCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1200, cmd: "setMode", payload: "semi" },
    { delay: 2400, cmd: "toggle", payload: "notifications" },
    { delay: 3600, cmd: "toggle", payload: "debug" },
    { delay: 5000, cmd: "setMode", payload: "full" }
  ],

  ClosingCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "notifications" },
    { delay: 6000, cmd: "toggle", payload: "debug" }
  ],

  // --- ACTIVITY PEAKS ---

  PeakActivity: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" },
    { delay: 4500, cmd: "toggle", payload: "notifications" }
  ],

  CalmBeforeStorm: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "debug" }
  ],

  // --- JURY / CREATOR MODES ---

  JuryMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3500, cmd: "setMode", payload: "semi" }
  ],

  CreatorSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  // --- FESTIVAL MOMENTS ---

  AwardReveal: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1000, cmd: "setMode", payload: "full" },
    { delay: 2500, cmd: "toggle", payload: "notifications" },
    { delay: 4000, cmd: "toggle", payload: "notifications" }
  ],

  NomineeSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 1500, cmd: "setMode", payload: "semi" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  JuryDeliberation: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3500, cmd: "setMode", payload: "transparent" }
  ]
};
