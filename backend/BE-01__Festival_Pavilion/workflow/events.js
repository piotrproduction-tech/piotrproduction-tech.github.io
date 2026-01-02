export const festivalEventsWorkflow = {
  createEvent(name, startsAt, endsAt) {
    return {
      id: "event_" + Date.now(),
      name,
      startsAt,
      endsAt
    };
  },
  updateEvent(event, patch) {
    return { ...event, ...patch, updatedAt: Date.now() };
  }
};


// WF_EVENTS_CORE
// Core workflow for festival events

export function listFestivalEventsWorkflow(globalState) {
  const events = globalState.festival?.events || [];
  return { events };
}

export function createFestivalEventWorkflow(globalState, { name, startsAt, endsAt }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.events = globalState.festival.events || [];

  const event = {
    id: "event_" + Date.now(),
    name,
    startsAt,
    endsAt
  };

  globalState.festival.events.push(event);

  return {
    event,
    events: [
      {
        type: "FESTIVAL_EVENT_CREATED",
        eventId: event.id,
        timestamp: Date.now()
      }
    ]
  };
}

export function updateFestivalEventWorkflow(globalState, { id, patch }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.events = globalState.festival.events || [];

  const idx = globalState.festival.events.findIndex(e => e.id === id);
  if (idx === -1) {
    return { event: null };
  }

  globalState.festival.events[idx] = {
    ...globalState.festival.events[idx],
    ...patch,
    updatedAt: Date.now()
  };

  const event = globalState.festival.events[idx];

  return {
    event,
    events: [
      {
        type: "FESTIVAL_EVENT_UPDATED",
        eventId: event.id,
        timestamp: Date.now()
      }
    ]
  };
}
