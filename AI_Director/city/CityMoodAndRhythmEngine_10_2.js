// CityMoodAndRhythmEngine_10_2
// Synchronizacja nastroju miasta z nastrojem festiwali i globalnym rytmem CITYOF-GATE.

export class CityMoodAndRhythmEngine_10_2 {
  constructor({ festivalContentEngine, festivalAccessEngine, aiDirectorInsightsEngine }) {
    this.festivalContentEngine = festivalContentEngine; // FestivalContentEngine_11_2
    this.festivalAccessEngine = festivalAccessEngine;   // FestivalAccessEngine_11_1
    this.aiDirectorInsightsEngine = aiDirectorInsightsEngine; // GFAL-20 insights
  }

  computeFestivalMood(festivalId) {
    const summary = this.festivalContentEngine.getFestivalContentSummary(festivalId);

    const baseIntensity =
      summary.films * 1 +
      summary.events * 2;

    let mood = "calm";

    if (baseIntensity > 20 && baseIntensity <= 50) {
      mood = "vibrant";
    } else if (baseIntensity > 50) {
      mood = "electric";
    }

    return {
      festivalId,
      mood,
      intensity: baseIntensity
    };
  }

  computeGlobalFestivalMood() {
    const summaries = this.festivalContentEngine.getGlobalContentSummary();

    let totalIntensity = 0;

    for (const s of summaries) {
      totalIntensity += s.films * 1 + s.events * 2;
    }

    let mood = "idle";

    if (totalIntensity > 50 && totalIntensity <= 150) {
      mood = "alive";
    } else if (totalIntensity > 150) {
      mood = "surging";
    } else if (totalIntensity > 300) {
      mood = "overloaded";
    }

    return {
      mood,
      intensity: totalIntensity,
      festivals: summaries.length
    };
  }

  computeUserRhythm(userId) {
    const festivals = this.festivalContentEngine.festivalMarketplaceEngine.listFestivals();
    let totalFilms = 0;
    let totalEvents = 0;

    for (const f of festivals) {
      const filmAccess = this.festivalAccessEngine.getUserFilmAccess(userId, f.id) || [];
      const eventAccess = this.festivalAccessEngine.getUserEventAccess(userId, f.id) || [];

      totalFilms += filmAccess.length;
      totalEvents += eventAccess.length;
    }

    let rhythm = "low";

    const activityScore = totalFilms + totalEvents * 2;

    if (activityScore > 5 && activityScore <= 15) {
      rhythm = "medium";
    } else if (activityScore > 15) {
      rhythm = "high";
    }

    return {
      userId,
      rhythm,
      activityScore,
      films: totalFilms,
      events: totalEvents
    };
  }

  getCityStateSnapshot() {
    const globalMood = this.computeGlobalFestivalMood();

    return {
      timestamp: new Date().toISOString(),
      globalMood,
      hint: globalMood.mood === "alive"
        ? "City is in a good flow."
        : globalMood.mood === "surging"
        ? "City is at peak intensity."
        : globalMood.mood === "overloaded"
        ? "City might need cooldown scenes."
        : "City is idle or calm."
    };
  }

  getDirectorHintsForUser(userId) {
    const userRhythm = this.computeUserRhythm(userId);
    const cityState = this.getCityStateSnapshot();

    const hints = [];

    if (userRhythm.rhythm === "low" && cityState.globalMood.mood === "alive") {
      hints.push("Suggest more engaging, social experiences to pull the user into the city flow.");
    }

    if (userRhythm.rhythm === "high" && cityState.globalMood.mood === "overloaded") {
      hints.push("Suggest calmer, reflective content to balance the overload.");
    }

    if (userRhythm.rhythm === "medium" && cityState.globalMood.mood === "surging") {
      hints.push("Lean into high-intensity events and premieres.");
    }

    return {
      userId,
      userRhythm,
      cityState,
      hints
    };
  }
}
