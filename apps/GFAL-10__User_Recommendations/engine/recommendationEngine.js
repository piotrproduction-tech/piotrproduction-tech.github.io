import { RecommendationItem } from "../models/recommendationItem.js";

export class RecommendationEngine {
  constructor({
    historyRepository,
    catalogRepository,
    programRepository,
    languageEngine
  }) {
    this.historyRepository = historyRepository;
    this.catalogRepository = catalogRepository;
    this.programRepository = programRepository;
    this.languageEngine = languageEngine;
  }

  recommendFestivals(userId) {
    const history = this.historyRepository.getFestivalHistory(userId);
    const allFestivals = this.catalogRepository.getAllFestivals();

    const watchedIds = new Set(history.map(h => h.festivalId));

    const recommendations = [];

    for (const fest of allFestivals) {
      if (!watchedIds.has(fest.id)) {
        recommendations.push(
          new RecommendationItem({
            type: "festival",
            id: fest.id,
            title: fest.name,
            reason: "similar_to_previous",
            festivalId: fest.id
          })
        );
      }
    }

    return recommendations;
  }

  recommendFilms(userId, festivalId) {
    const history = this.historyRepository.getFilmHistory(userId);
    const program = this.programRepository.getProgramForFestival(festivalId);

    const watchedFilmIds = new Set(history.map(h => h.filmId));

    const recommendations = [];

    for (const item of program) {
      if (item.type === "film" && !watchedFilmIds.has(item.id)) {
        recommendations.push(
          new RecommendationItem({
            type: "film",
            id: item.id,
            title: item.title,
            reason: "unwatched_in_festival",
            festivalId
          })
        );
      }
    }

    return recommendations;
  }

  recommendUpcomingEvents(userId, festivalId) {
    const program = this.programRepository.getProgramForFestival(festivalId);

    const now = new Date();
    const recommendations = [];

    for (const item of program) {
      if (item.type === "event") {
        const start = new Date(item.startTime);
        if (start > now) {
          recommendations.push(
            new RecommendationItem({
              type: "event",
              id: item.id,
              title: item.title,
              reason: "upcoming_event",
              festivalId,
              startTime: item.startTime
            })
          );
        }
      }
    }

    return recommendations;
  }

  buildUserRecommendations(userId, festivalId) {
    return {
      festivals: this.recommendFestivals(userId),
      films: this.recommendFilms(userId, festivalId),
      events: this.recommendUpcomingEvents(userId, festivalId)
    };
  }
}