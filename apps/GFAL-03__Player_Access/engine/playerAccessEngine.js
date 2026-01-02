import { PlaybackResponse } from "../models/playbackResponse.js";

export class PlayerAccessEngine {
  constructor({ accessEngine, filmRepository, eventRepository }) {
    this.accessEngine = accessEngine;
    this.filmRepository = filmRepository;
    this.eventRepository = eventRepository;
  }

  getFilmStream(request) {
    const access = this.accessEngine.canAccessFilm(
      request.userId,
      request.festivalId,
      request.filmId
    );

    if (!access.allowed) {
      return new PlaybackResponse({
        allowed: false,
        reason: access.reason
      });
    }

    const film = this.filmRepository.getFilmById(request.festivalId, request.filmId);

    if (!film) {
      return new PlaybackResponse({
        allowed: false,
        reason: "NOT_FOUND"
      });
    }

    return new PlaybackResponse({
      allowed: true,
      reason: "OK",
      streamUrl: film.streamUrl,
      subtitles: {
        enabled: true,
        languages: ["en", "pl"],
        aiEnabled: true
      },
      dubbing: {
        enabled: true,
        languages: ["en", "pl"],
        aiEnabled: true
      }
    });
  }

  getEventStream(request) {
    const access = this.accessEngine.canAccessEvent(
      request.userId,
      request.festivalId,
      request.eventId
    );

    if (!access.allowed) {
      return new PlaybackResponse({
        allowed: false,
        reason: access.reason
      });
    }

    const event = this.eventRepository.getEventById(request.festivalId, request.eventId);

    if (!event) {
      return new PlaybackResponse({
        allowed: false,
        reason: "NOT_FOUND"
      });
    }

    return new PlaybackResponse({
      allowed: true,
      reason: "OK",
      streamUrl: event.streamUrl,
      subtitles: {
        enabled: true,
        languages: ["en", "pl"],
        aiEnabled: true
      },
      dubbing: {
        enabled: false,
        languages: [],
        aiEnabled: false
      }
    });
  }
}