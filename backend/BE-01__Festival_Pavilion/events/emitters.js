// Emittery zdarzeń dla Festival Pavilion (BE-01)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-01",
    type,
    payload,
    ts: Date.now()
  };
}


// Festival Pavilion events
export function emitFestivalSubmissionCreated(submission) {
  return {
    type: "festival.submission.created",
    payload: submission
  };
}

export function emitFestivalJuryVote(vote) {
  return {
    type: "festival.jury.vote",
    payload: vote
  };
}

export function emitFestivalAwardGranted(award) {
  return {
    type: "festival.award.granted",
    payload: award
  };
}

export function emitFestivalEventStarted(event) {
  return {
    type: "festival.event.started",
    payload: event
  };
}

export function emitFestivalEventEnded(event) {
  return {
    type: "festival.event.ended",
    payload: event
  };
}


// FESTIVAL_EMITTERS
// Emitters for Festival Pavilion events

export function emitSubmissionCreated(submission) {
  return {
    type: "FESTIVAL_SUBMISSION_CREATED",
    submissionId: submission.id,
    payload: submission,
    timestamp: Date.now()
  };
}

export function emitJuryAssigned(assignment) {
  return {
    type: "FESTIVAL_JURY_ASSIGNED",
    submissionId: assignment.submissionId,
    juryId: assignment.juryId,
    payload: assignment,
    timestamp: Date.now()
  };
}

export function emitJuryVoted(vote) {
  return {
    type: "FESTIVAL_JURY_VOTED",
    submissionId: vote.submissionId,
    juryId: vote.juryId,
    score: vote.score,
    payload: vote,
    timestamp: Date.now()
  };
}

export function emitAwardCategoryCreated(category) {
  return {
    type: "FESTIVAL_AWARD_CATEGORY_CREATED",
    categoryId: category.id,
    payload: category,
    timestamp: Date.now()
  };
}

export function emitAwardGranted(award) {
  return {
    type: "FESTIVAL_AWARD_GRANTED",
    categoryId: award.categoryId,
    submissionId: award.submissionId,
    payload: award,
    timestamp: Date.now()
  };
}

export function emitEventCreated(event) {
  return {
    type: "FESTIVAL_EVENT_CREATED",
    eventId: event.id,
    payload: event,
    timestamp: Date.now()
  };
}

export function emitEventUpdated(event) {
  return {
    type: "FESTIVAL_EVENT_UPDATED",
    eventId: event.id,
    payload: event,
    timestamp: Date.now()
  };
}

export function emitScheduleEntryAdded(entry) {
  return {
    type: "FESTIVAL_SCHEDULE_ENTRY_ADDED",
    eventId: entry.eventId,
    slot: entry.slot,
    payload: entry,
    timestamp: Date.now()
  };
}
