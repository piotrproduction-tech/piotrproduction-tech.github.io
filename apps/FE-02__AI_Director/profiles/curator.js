import { DirectorProfile } from "../models/directorProfile.js";

export const CuratorProfile = new DirectorProfile({
  id: "curator",
  name: "Curator Director",
  style: "artistic",
  priorityWeights: { quality: 5, social: 1 },
  triggerSensitivity: { rating: 4.0 },
  preferredActions: ["PROMOTE_FILM", "SPOTLIGHT_DIRECTOR", "CURATOR_BEAT"],
  decisionMatrix: [
    {
      condition: (insights, profile) => {
        const film = insights.trendingFilms?.[0];
        return film && film.avgRating >= profile.triggerSensitivity.rating;
      },
      action: (insights) => ({
        type: "PROMOTE_FILM",
        priority: 2,
        weightKey: "quality",
        payload: {
          filmId: insights.trendingFilms[0].filmId,
          reason: "high_rating"
        }
      })
    }
  ]
});