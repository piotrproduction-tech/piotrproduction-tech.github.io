import { DirectorProfile } from "../models/directorProfile.js";

export const HypeProfile = new DirectorProfile({
  id: "hype",
  name: "Hype Director",
  style: "energetic",
  priorityWeights: { social: 5, trending: 4 },
  triggerSensitivity: { socialPulse: 50 },
  preferredActions: ["HYPE_BEAT", "SOCIAL_BEAT", "PROMOTE_EVENT"],
  decisionMatrix: [
    {
      condition: (insights, profile) =>
        insights.socialPulse?.recentEvents >= profile.triggerSensitivity.socialPulse,
      action: () => ({
        type: "HYPE_BEAT",
        priority: 3,
        weightKey: "social",
        payload: { trigger: "social_peak" }
      })
    }
  ]
});