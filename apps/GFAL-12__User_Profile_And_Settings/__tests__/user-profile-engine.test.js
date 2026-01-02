import { UserProfileEngine } from "../engine/userProfileEngine.js";

describe("GFAL User Profile & Settings Engine", () => {
  const mockProfileRepo = {
    getProfile: jest.fn(),
    saveProfile: jest.fn()
  };

  const mockSettingsRepo = {
    getSettings: jest.fn(),
    saveSettings: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates user profile", () => {
    mockProfileRepo.getProfile.mockReturnValue({ userId: 1, displayName: "Old" });

    const engine = new UserProfileEngine({
      profileRepository: mockProfileRepo,
      settingsRepository: mockSettingsRepo
    });

    const updated = engine.updateProfile(1, { displayName: "New" });

    expect(updated.displayName).toBe("New");
    expect(mockProfileRepo.saveProfile).toHaveBeenCalled();
  });

  it("updates user settings", () => {
    mockSettingsRepo.getSettings.mockReturnValue({ userId: 1, interfaceLanguage: "en" });

    const engine = new UserProfileEngine({
      profileRepository: mockProfileRepo,
      settingsRepository: mockSettingsRepo
    });

    const updated = engine.updateSettings(1, { interfaceLanguage: "pl" });

    expect(updated.interfaceLanguage).toBe("pl");
    expect(mockSettingsRepo.saveSettings).toHaveBeenCalled();
  });

  it("returns preferences for recommendations", () => {
    mockProfileRepo.getProfile.mockReturnValue({
      favoriteGenres: ["drama"]
    });

    mockSettingsRepo.getSettings.mockReturnValue({
      interfaceLanguage: "pl"
    });

    const engine = new UserProfileEngine({
      profileRepository: mockProfileRepo,
      settingsRepository: mockSettingsRepo
    });

    const prefs = engine.getUserPreferencesForRecommendations(1);

    expect(prefs.favoriteGenres).toContain("drama");
    expect(prefs.interfaceLanguage).toBe("pl");
  });
});