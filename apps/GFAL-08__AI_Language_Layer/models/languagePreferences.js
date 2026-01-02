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