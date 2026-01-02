import { DirectorProfile } from "../models/directorProfile.js";

export const SocialMaestroProfile = new DirectorProfile({
  id: "social_maestro",
  name: "Social Maestro",
  style: "community",
  priorityWeights: { social: 5, achievements: 4 },
  triggerSensitivity: { achievements: 1 },
  preferredActions: ["SOCIAL_BEAT", "ACHIEVEMENT_SPOTLIGHT"],
  decisionMatrix: [
    {
      condition: (insights, profile) =>
        insights.achievementMomentum?.newAchievements >= profile.triggerSensitivity.achievements,
      action: (insights) => ({
        type: "ACHIEVEMENT_SPOTLIGHT",
        priority: 4,
        weightKey: "achievements",
        payload: {
          userId: insights.achievementMomentum.userId,
          achievementType: "new_achievement"
        }
      })
    }
  ]
});