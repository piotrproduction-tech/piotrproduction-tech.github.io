


// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY_PRO
// Extended cinematic library of overlay scenarios

export const FestivalOverlayScenarioLibraryPro = {

  // === CEREMONIAL ===

  OpeningCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1200, cmd: "setMode", payload: "semi" },
    { delay: 2400, cmd: "toggle", payload: "notifications" },
    { delay: 3600, cmd: "toggle", payload: "debug" },
    { delay: 5000, cmd: "setMode", payload: "full" }
  ],

  GrandOpening: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 800, cmd: "setMode", payload: "transparent" },
    { delay: 1600, cmd: "toggle", payload: "notifications" },
    { delay: 2400, cmd: "setMode", payload: "semi" },
    { delay: 4000, cmd: "setMode", payload: "full" }
  ],

  ClosingCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "notifications" },
    { delay: 6000, cmd: "toggle", payload: "debug" }
  ],

  FinalCurtain: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 1500, cmd: "setMode", payload: "transparent" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],


  // === ACTIVITY PEAKS ===

  PeakActivity: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" },
    { delay: 4500, cmd: "toggle", payload: "notifications" }
  ],

  SurgeMode: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 1000, cmd: "setMode", payload: "full" },
    { delay: 2000, cmd: "toggle", payload: "debug" }
  ],

  CalmBeforeStorm: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "debug" }
  ],

  AfterpartyPulse: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1500, cmd: "setMode", payload: "semi" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],


  // === JURY / CREATOR MODES ===

  JuryMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3500, cmd: "setMode", payload: "semi" }
  ],

  JuryDeliberation: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3500, cmd: "setMode", payload: "transparent" }
  ],

  JuryFocus: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 1500, cmd: "setMode", payload: "transparent" }
  ],

  CreatorSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  CreatorStudio: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "setMode", payload: "semi" }
  ],


  // === FESTIVAL MOMENTS ===

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

  PressConference: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 2000, cmd: "setMode", payload: "semi" },
    { delay: 3500, cmd: "toggle", payload: "debug" }
  ],

  BackstageMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "notifications" }
  ],

  RedCarpetMode: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1200, cmd: "setMode", payload: "full" }
  ],


  // === SPECIAL / SYSTEM ===

  EmergencyBroadcast: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 800, cmd: "setMode", payload: "full" },
    { delay: 1600, cmd: "toggle", payload: "notifications" },
    { delay: 2400, cmd: "toggle", payload: "notifications" }
  ],

  SilentMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 1000, cmd: "setMode", payload: "transparent" },
    { delay: 2000, cmd: "toggle", payload: "notifications" },
    { delay: 3000, cmd: "toggle", payload: "debug" }
  ]
};
