import { DirectorProfile } from "../models/directorProfile.js";

export const AnalyticsDrivenProfile = new DirectorProfile({
  id: "analytics",
  name: "Analytics-Driven Director",
  style: "data",
  priorityWeights: { analytics: 5, trending: 4 },
  triggerSensitivity: { views: 50 },
  preferredActions: ["RECOMMENDATION_TUNE", "PROMOTE_FILM"],
  decisionMatrix: [
    {
      condition: (insights, profile) => {
        const film = insights.trendingFilms?.[0];
        return film && film.views >= profile.triggerSensitivity.views;
      },
      action: (insights) => ({
        type: "RECOMMENDATION_TUNE",
        priority: 3,
        weightKey: "analytics",
        payload: { focus: "high_rating" }
      })
    }
  ]
});