


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILES
// Director-style AI profiles that modify AI scenario generation

export const FestivalOverlayScenarioAIProfiles = {

  CalmDirector: {
    name: "CalmDirector",
    speed: 1.2,
    intensity: 0.4,
    presetStrategy: (state) =>
      state.mood === "Calm" ? "Minimal" : "Showcase",
    modeStrategy: (pulse) =>
      pulse < 80 ? "transparent" : "semi",
    notificationStrategy: (trust) =>
      trust === "high" ? false : true
  },

  AggressiveDirector: {
    name: "AggressiveDirector",
    speed: 0.7,
    intensity: 1.0,
    presetStrategy: () => "Debug",
    modeStrategy: (pulse) =>
      pulse > 100 ? "full" : "semi",
    notificationStrategy: () => true
  },

  ExperimentalDirector: {
    name: "ExperimentalDirector",
    speed: 1.0,
    intensity: 0.9,
    presetStrategy: (state) =>
      state.mood === "Creative" ? "Showcase" : "Minimal",
    modeStrategy: (pulse) =>
      pulse % 2 === 0 ? "full" : "transparent",
    notificationStrategy: () =>
      Math.random() > 0.5
  },

  CinematicDirector: {
    name: "CinematicDirector",
    speed: 1.0,
    intensity: 0.7,
    presetStrategy: (state) =>
      state.narrative?.phase === "awards" ? "Showcase" : "Minimal",
    modeStrategy: (pulse) =>
      pulse > 110 ? "full" : "semi",
    notificationStrategy: () => true
  },

  AnalyticalDirector: {
    name: "AnalyticalDirector",
    speed: 1.0,
    intensity: 0.3,
    presetStrategy: () => "Minimal",
    modeStrategy: (pulse) =>
      pulse > 120 ? "full" : pulse > 90 ? "semi" : "transparent",
    notificationStrategy: (trust) =>
      trust !== "low"
  },

  FestivalDirector: {
    name: "FestivalDirector",
    speed: 0.9,
    intensity: 0.8,
    presetStrategy: () => "Showcase",
    modeStrategy: () => "full",
    notificationStrategy: () => true
  }
};
