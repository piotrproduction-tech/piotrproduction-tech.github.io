import { DirectorProfile } from "../models/directorProfile.js";

export const ExplorerProfile = new DirectorProfile({
  id: "explorer",
  name: "Explorer Director",
  style: "global",
  priorityWeights: { languages: 5, diversity: 4 },
  triggerSensitivity: { languageDominance: 40 },
  preferredActions: ["LANGUAGE_PUSH", "CURATOR_BEAT"],
  decisionMatrix: [
    {
      condition: (insights, profile) => {
        const prefs = insights.languagePreferences || {};
        return Object.values(prefs).some(count => count >= profile.triggerSensitivity.languageDominance);
      },
      action: (insights) => {
        const dominant = Object.entries(insights.languagePreferences).sort((a, b) => b[1] - a[1])[0];
        return {
          type: "LANGUAGE_PUSH",
          priority: 3,
          weightKey: "languages",
          payload: { languageCode: dominant[0], reason: "majority_preference" }
        };
      }
    }
  ]
});