


// FE_FESTIVAL_OVERLAY_SCENARIOS
// High-level overlay scenarios with timed steps

export const FestivalOverlayScenarios = {
  OpeningCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1000, cmd: "toggle", payload: "notifications" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3000, cmd: "setMode", payload: "full" }
  ],

  PeakActivity: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  JuryMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" }
  ],

  ClosingCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "notifications" }
  ],

  CreatorSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1500, cmd: "setMode", payload: "full" }
  ]
};
