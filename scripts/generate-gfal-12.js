import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/userProfile.js": `
export class UserProfile {
  constructor({
    userId,
    displayName,
    avatarUrl,
    bio,
    favoriteGenres
  }) {
    this.userId = userId;
    this.displayName = displayName || null;
    this.avatarUrl = avatarUrl || null;
    this.bio = bio || null;
    this.favoriteGenres = favoriteGenres || []; // ["drama", "documentary"]
  }
}
`,

  "models/userSettings.js": `
export class UserSettings {
  constructor({
    userId,
    interfaceLanguage,
    notificationsEnabled,
    accessibility,
    privacy
  }) {
    this.userId = userId;
    this.interfaceLanguage = interfaceLanguage || "en";
    this.notificationsEnabled = notificationsEnabled ?? true;

    this.accessibility = accessibility || {
      highContrast: false,
      largeText: false,
      reducedMotion: false
    };

    this.privacy = privacy || {
      shareWatchHistory: true,
      shareRatings: true
    };
  }
}
`,

  // ENGINE
  "engine/userProfileEngine.js": `
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
`,

  // TESTY
  "__tests__/user-profile-engine.test.js": `
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
`
};

function generateGFAL12() {
  const baseDir = path.join(ROOT, "apps", "GFAL-12__User_Profile_And_Settings");

  Object.entries(FILES).forEach(([relativePath, content]) => {
    const filePath = path.join(baseDir, relativePath);
    const dir = path.dirname(filePath);

    ensureDir(dir);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim(), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log("\n🎉 GFAL‑12 User Profile & Settings is ready.");
}

generateGFAL12();
