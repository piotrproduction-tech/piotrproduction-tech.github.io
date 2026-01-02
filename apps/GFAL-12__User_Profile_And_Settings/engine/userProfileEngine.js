export class UserProfileEngine {
  constructor({ profileRepository, settingsRepository }) {
    this.profileRepository = profileRepository;
    this.settingsRepository = settingsRepository;
  }

  getUserProfile(userId) {
    return {
      profile: this.profileRepository.getProfile(userId),
      settings: this.settingsRepository.getSettings(userId)
    };
  }

  updateProfile(userId, updates) {
    const existing = this.profileRepository.getProfile(userId) || {};
    const updated = { ...existing, ...updates };
    this.profileRepository.saveProfile(updated);
    return updated;
  }

  updateSettings(userId, updates) {
    const existing = this.settingsRepository.getSettings(userId) || {};
    const updated = { ...existing, ...updates };
    this.settingsRepository.saveSettings(updated);
    return updated;
  }

  getUserPreferencesForRecommendations(userId) {
    const profile = this.profileRepository.getProfile(userId);
    const settings = this.settingsRepository.getSettings(userId);

    return {
      favoriteGenres: profile?.favoriteGenres || [],
      interfaceLanguage: settings?.interfaceLanguage || "en",
      accessibility: settings?.accessibility || {}
    };
  }
}