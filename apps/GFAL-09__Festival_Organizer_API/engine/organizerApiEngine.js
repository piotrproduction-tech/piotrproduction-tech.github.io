export class OrganizerApiEngine {
  constructor({ festivalRepository, filmRepository, eventRepository }) {
    this.festivalRepository = festivalRepository;
    this.filmRepository = filmRepository;
    this.eventRepository = eventRepository;
  }

  publishFestival(festivalInput) {
    this.festivalRepository.saveFestival(festivalInput);
    return { success: true, festivalId: festivalInput.id };
  }

  publishFilm(filmInput) {
    this.filmRepository.saveFilm(filmInput);
    return { success: true, filmId: filmInput.id };
  }

  publishEvent(eventInput) {
    this.eventRepository.saveEvent(eventInput);
    return { success: true, eventId: eventInput.id };
  }

  publishFullProgram({ festival, films, events }) {
    this.publishFestival(festival);

    for (const film of films) {
      this.publishFilm(film);
    }

    for (const event of events) {
      this.publishEvent(event);
    }

    return {
      success: true,
      festivalId: festival.id,
      films: films.length,
      events: events.length
    };
  }
}