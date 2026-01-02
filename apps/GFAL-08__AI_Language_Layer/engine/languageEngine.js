export class LanguageEngine {
  constructor({ preferencesRepository, availabilityRepository }) {
    this.preferencesRepository = preferencesRepository;
    this.availabilityRepository = availabilityRepository;
  }

  resolveLanguageConfig(userId, festivalId, filmId, eventId) {
    const prefs = this.preferencesRepository.getPreferencesForUser(userId);
    const avail = this.availabilityRepository.getAvailability(
      festivalId,
      filmId,
      eventId
    );

    if (!prefs || !avail) {
      return {
        audio: "original",
        subtitles: null,
        aiSubtitles: false,
        aiDubbing: false
      };
    }

    // AUDIO
    let audio = "original";
    let aiDubbing = false;

    if (prefs.preferredAudio !== "original") {
      if (avail.audioLanguages.includes(prefs.preferredAudio)) {
        audio = prefs.preferredAudio;
      } else if (prefs.allowAIDubbing) {
        audio = prefs.preferredAudio;
        aiDubbing = true;
      }
    }

    // SUBTITLES
    let subtitles = null;
    let aiSubtitles = false;

    if (prefs.preferredSubtitles !== "none") {
      if (avail.subtitleLanguages.includes(prefs.preferredSubtitles)) {
        subtitles = prefs.preferredSubtitles;
      } else if (prefs.allowAISubtitles) {
        subtitles = prefs.preferredSubtitles;
        aiSubtitles = true;
      }
    }

    return {
      audio,
      subtitles,
      aiSubtitles,
      aiDubbing
    };
  }
}