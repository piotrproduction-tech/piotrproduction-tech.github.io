


// DIAG_TIMELINE
// Timeline of festival activity

export function recordFestivalTimeline(globalState) {
  globalState.festival = globalState.festival || {};
  globalState.festival.timeline = globalState.festival.timeline || [];

  const f = globalState.festival;

  const point = {
    timestamp: Date.now(),
    submissions: (f.submissions || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    events: (f.events || []).length,
    schedule: (f.schedule || []).length
  };

  globalState.festival.timeline.push(point);
  return point;
}

export function getFestivalTimeline(globalState) {
  return globalState.festival?.timeline || [];
}
