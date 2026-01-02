import { ProgramItem } from "../models/programItem.js";

export class ProgramViewerEngine {
  constructor({ filmRepository, eventRepository, accessEngine }) {
    this.filmRepository = filmRepository;
    this.eventRepository = eventRepository;
    this.accessEngine = accessEngine;
  }

  buildProgramForFestival(userId, festivalId) {
    const films = this.filmRepository.getFilmsForFestival(festivalId) || [];
    const events = this.eventRepository.getEventsForFestival(festivalId) || [];

    const items = [];

    for (const film of films) {
      const access = this.accessEngine.canAccessFilm(userId, festivalId, film.id);

      items.push(
        new ProgramItem({
          id: film.id,
          festivalId,
          type: "film",
          title: film.title,
          startTime: film.startTime || null,
          endTime: film.endTime || null,
          room: film.room || null,
          isOnline: true,
          canAccess: access.allowed
        })
      );
    }

    for (const event of events) {
      const access = this.accessEngine.canAccessEvent(userId, festivalId, event.id);

      items.push(
        new ProgramItem({
          id: event.id,
          festivalId,
          type: "event",
          title: event.title,
          startTime: event.startTime,
          endTime: event.endTime,
          room: event.location || null,
          isOnline: !!event.streamUrl,
          canAccess: access.allowed
        })
      );
    }

    return items.sort((a, b) => {
      const ta = a.startTime ? new Date(a.startTime).getTime() : 0;
      const tb = b.startTime ? new Date(b.startTime).getTime() : 0;
      return ta - tb;
    });
  }
}