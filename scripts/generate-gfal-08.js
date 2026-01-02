import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/languagePreferences.js": `
export class LanguagePreferences {
  constructor({
    userId,
    preferredAudio,
    preferredSubtitles,
    allowAI,
    allowAIDubbing,
    allowAISubtitles
  }) {
    this.userId = userId;
    this.preferredAudio = preferredAudio || "original"; // "original" | "pl" | "en" | etc.
    this.preferredSubtitles = preferredSubtitles || "pl"; // "none" | "pl" | "en" | etc.
    this.allowAI = allowAI ?? true;
    this.allowAIDubbing = allowAIDubbing ?? true;
    this.allowAISubtitles = allowAISubtitles ?? true;
  }
}
`,

  "models/languageAvailability.js": `
export class LanguageAvailability {
  constructor({
    festivalId,
    filmId,
    eventId,
    audioLanguages,
    subtitleLanguages
  }) {
    this.festivalId = festivalId;
    this.filmId = filmId || null;
    this.eventId = eventId || null;

    this.audioLanguages = audioLanguages || []; // ["en", "pl"]
    this.subtitleLanguages = subtitleLanguages || []; // ["en", "pl"]
  }
}
`,

  // ENGINE
  "engine/languageEngine.js": `
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
`,

  // TESTY
  "__tests__/language-engine.test.js": `
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
`
};

function generateGFAL08() {
  const baseDir = path.join(ROOT, "apps", "GFAL-08__AI_Language_Layer");

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

  console.log("\n🎉 GFAL‑08 AI Language Layer is ready.");
}

generateGFAL08();
