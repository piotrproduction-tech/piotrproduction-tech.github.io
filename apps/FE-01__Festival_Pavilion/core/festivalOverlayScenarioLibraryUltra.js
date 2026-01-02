


// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY_ULTRA
// Adaptive, dynamic overlay scenarios reacting to live city state

export const FestivalOverlayScenarioLibraryUltra = {

  // === ADAPTIVE CEREMONIAL ===

  AdaptiveOpening: (state) => {
    const { pulse, mood } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: mood === "Energetic" ? "Showcase" : "Minimal" },
      { delay: 1200, cmd: "setMode", payload: pulse > 110 ? "full" : "semi" },
      { delay: 2400, cmd: "toggle", payload: "notifications" },
      { delay: 3600, cmd: "toggle", payload: "debug" }
    ];
  },

  AdaptiveClosing: (state) => {
    const { pulse, reputation } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: reputation?.level > 5 ? "Showcase" : "Minimal" },
      { delay: 2000, cmd: "setMode", payload: pulse < 80 ? "transparent" : "semi" },
      { delay: 4000, cmd: "toggle", payload: "notifications" }
    ];
  },


  // === ADAPTIVE ACTIVITY MODES ===

  DynamicPeak: (state) => {
    const { wave, pulse } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: "Debug" },
      { delay: 1000, cmd: "setMode", payload: pulse > 120 ? "full" : "semi" },
      { delay: 2000, cmd: "toggle", payload: wave?.intensity > 0.7 ? "notifications" : "debug" }
    ];
  },

  SocialSurge: (state) => {
    const { wave } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: "Showcase" },
      { delay: 1500, cmd: "setMode", payload: wave?.intensity > 0.5 ? "full" : "semi" },
      { delay: 3000, cmd: "toggle", payload: "notifications" }
    ];
  },


  // === ADAPTIVE JURY / CREATOR MODES ===

  JuryAdaptive: (state) => {
    const { identity, security } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: identity?.role === "jury" ? "Minimal" : "Showcase" },
      { delay: 2000, cmd: "setMode", payload: security?.trustLevel === "high" ? "semi" : "transparent" }
    ];
  },

  CreatorAdaptive: (state) => {
    const { reputation } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: reputation?.points > 500 ? "Showcase" : "Minimal" },
      { delay: 1500, cmd: "setMode", payload: reputation?.level > 3 ? "full" : "semi" }
    ];
  },


  // === ADAPTIVE FESTIVAL MOMENTS ===

  AwardAdaptive: (state) => {
    const { mood, wave } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: mood === "Creative" ? "Showcase" : "Minimal" },
      { delay: 1500, cmd: "setMode", payload: wave?.intensity > 0.6 ? "full" : "semi" },
      { delay: 3000, cmd: "toggle", payload: "notifications" }
    ];
  },

  SpotlightAdaptive: (state) => {
    const { identity } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: identity?.badges?.length > 3 ? "Showcase" : "Minimal" },
      { delay: 2000, cmd: "setMode", payload: "full" }
    ];
  },


  // === ADAPTIVE SYSTEM MODES ===

  EmergencyAdaptive: (state) => {
    const { security } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: "Debug" },
      { delay: 800, cmd: "setMode", payload: security?.trustLevel === "low" ? "full" : "semi" },
      { delay: 1600, cmd: "toggle", payload: "notifications" }
    ];
  },

  SilentAdaptive: (state) => {
    const { pulse } = state;

    return [
      { delay: 0, cmd: "setPreset", payload: "Minimal" },
      { delay: 1000, cmd: "setMode", payload: pulse < 70 ? "transparent" : "semi" },
      { delay: 2000, cmd: "toggle", payload: "notifications" }
    ];
  }
};
