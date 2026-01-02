import { LanguageEngine } from "../engine/languageEngine.js";

describe("GFAL AI Language Layer Engine", () => {
  const mockPrefsRepo = {
    getPreferencesForUser: jest.fn()
  };

  const mockAvailRepo = {
    getAvailability: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns AI subtitles when preferred language not available", () => {
    mockPrefsRepo.getPreferencesForUser.mockReturnValue({
      preferredAudio: "original",
      preferredSubtitles: "pl",
      allowAISubtitles: true,
      allowAIDubbing: true
    });

    mockAvailRepo.getAvailability.mockReturnValue({
      audioLanguages: ["en"],
      subtitleLanguages: ["en"]
    });

    const engine = new LanguageEngine({
      preferencesRepository: mockPrefsRepo,
      availabilityRepository: mockAvailRepo
    });

    const config = engine.resolveLanguageConfig(1, 10, 5, null);

    expect(config.subtitles).toBe("pl");
    expect(config.aiSubtitles).toBe(true);
  });

  it("returns direct audio when available", () => {
    mockPrefsRepo.getPreferencesForUser.mockReturnValue({
      preferredAudio: "pl",
      preferredSubtitles: "none",
      allowAISubtitles: true,
      allowAIDubbing: true
    });

    mockAvailRepo.getAvailability.mockReturnValue({
      audioLanguages: ["pl", "en"],
      subtitleLanguages: ["en"]
    });

    const engine = new LanguageEngine({
      preferencesRepository: mockPrefsRepo,
      availabilityRepository: mockAvailRepo
    });

    const config = engine.resolveLanguageConfig(1, 10, 5, null);

    expect(config.audio).toBe("pl");
    expect(config.aiDubbing).toBe(false);
  });

  it("returns AI dubbing when preferred audio not available", () => {
    mockPrefsRepo.getPreferencesForUser.mockReturnValue({
      preferredAudio: "pl",
      preferredSubtitles: "none",
      allowAISubtitles: true,
      allowAIDubbing: true
    });

    mockAvailRepo.getAvailability.mockReturnValue({
      audioLanguages: ["en"],
      subtitleLanguages: ["en"]
    });

    const engine = new LanguageEngine({
      preferencesRepository: mockPrefsRepo,
      availabilityRepository: mockAvailRepo
    });

    const config = engine.resolveLanguageConfig(1, 10, 5, null);

    expect(config.audio).toBe("pl");
    expect(config.aiDubbing).toBe(true);
  });
});