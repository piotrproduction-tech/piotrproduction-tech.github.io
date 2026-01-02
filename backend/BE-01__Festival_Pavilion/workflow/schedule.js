export const festivalScheduleWorkflow = {
  addToSchedule(eventId, slot) {
    return {
      eventId,
      slot,
      addedAt: Date.now()
    };
  }
};


// WF_SCHEDULE_CORE
// Core workflow for festival schedule

export function listFestivalScheduleWorkflow(globalState) {
  const schedule = globalState.festival?.schedule || [];
  return { schedule };
}

export function addToFestivalScheduleWorkflow(globalState, { eventId, slot }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.schedule = globalState.festival.schedule || [];

  const entry = {
    id: "schedule_" + Date.now(),
    eventId,
    slot,
    addedAt: Date.now()
  };

  globalState.festival.schedule.push(entry);

  return {
    entry,
    events: [
      {
        type: "FESTIVAL_SCHEDULE_ENTRY_ADDED",
        eventId,
        slot,
        timestamp: Date.now()
      }
    ]
  };
}
