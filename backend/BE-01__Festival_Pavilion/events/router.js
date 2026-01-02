


// FESTIVAL_EVENT_ROUTER
// Central router for all Festival Pavilion events

import {
  emitSubmissionCreated,
  emitJuryAssigned,
  emitJuryVoted,
  emitAwardCategoryCreated,
  emitAwardGranted,
  emitEventCreated,
  emitEventUpdated,
  emitScheduleEntryAdded
} from "./emitters";

export const festivalEventRouter = {
  submissionCreated(submission) {
    return emitSubmissionCreated(submission);
  },
  juryAssigned(assignment) {
    return emitJuryAssigned(assignment);
  },
  juryVoted(vote) {
    return emitJuryVoted(vote);
  },
  awardCategoryCreated(category) {
    return emitAwardCategoryCreated(category);
  },
  awardGranted(award) {
    return emitAwardGranted(award);
  },
  eventCreated(event) {
    return emitEventCreated(event);
  },
  eventUpdated(event) {
    return emitEventUpdated(event);
  },
  scheduleEntryAdded(entry) {
    return emitScheduleEntryAdded(entry);
  }
};



// FESTIVAL_ROUTER_TO_CITY_EVENTBUS
// Forward Festival Pavilion events into the CityEventBus

export function forwardFestivalEventToCity(eventBus, event) {
  eventBus.emit(event.type, event);
}
