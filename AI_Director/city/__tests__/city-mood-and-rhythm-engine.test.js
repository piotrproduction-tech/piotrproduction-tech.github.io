import { CityMoodAndRhythmEngine_10_2 } from "../CityMoodAndRhythmEngine_10_2.js";

class MockFestivalMarketplace {
  constructor() {
    this.festivals = [
      { id: "F1", name: "Fest A", mode: "online", visibility: "public", startDate: "", endDate: "" },
      { id: "F2", name: "Fest B", mode: "onsite", visibility: "public", startDate: "", endDate: "" }
    ];

    this.programs = {
      F1: { films: [{ id: "FILM1" }], events: [{ id: "EV1" }] },
      F2: { films: [{ id: "FILM2" }, { id: "FILM3" }], events: [{ id: "EV2" }, { id: "EV3" }] }
    };
  }

  listFestivals() {
    return this.festivals;
  }

  getFestivalProgram(id) {
    return this.programs[id];
  }
}

class MockAccessEngine {
  getUserFilmAccess(userId, festivalId) {
    return festivalId === "F1" ? ["FILM1"] : ["FILM2", "FILM3"];
  }

  getUserEventAccess(userId, festivalId) {
    return festivalId === "F1" ? ["EV1"] : ["EV2", "EV3"];
  }
}

class MockInsightsEngine {}

describe("CityMoodAndRhythmEngine_10_2", () => {
  let engine;

  beforeEach(() => {
    const marketplace = new MockFestivalMarketplace();
    const access = new MockAccessEngine();
    const insights = new MockInsightsEngine();

    engine = new CityMoodAndRhythmEngine_10_2({
      festivalContentEngine: {
        festivalMarketplaceEngine: marketplace,

        getFestivalContentSummary: id => ({
          festivalId: id,
          films: 10,
          events: 10
        }),

        getGlobalContentSummary: () => [
          { festivalId: "F1", films: 10, events: 10 },
          { festivalId: "F2", films: 10, events: 10 }
        ]

      },

      festivalAccessEngine: access,
      aiDirectorInsightsEngine: insights
    });
  });

  test("computes festival mood", () => {
    const mood = engine.computeFestivalMood("F1");
    expect(mood.mood).toBe("vibrant");
  });

  test("computes global festival mood", () => {
    const global = engine.computeGlobalFestivalMood();
    expect(global.mood).toBe("alive");
  });

  test("computes user rhythm", () => {
    const rhythm = engine.computeUserRhythm("U1");
    expect(rhythm.rhythm).toBe("medium");
  });

  test("provides director hints", () => {
    const hints = engine.getDirectorHintsForUser("U1");
    expect(hints.userRhythm).toBeDefined();
    expect(hints.cityState).toBeDefined();
  });
});
