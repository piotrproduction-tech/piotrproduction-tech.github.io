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