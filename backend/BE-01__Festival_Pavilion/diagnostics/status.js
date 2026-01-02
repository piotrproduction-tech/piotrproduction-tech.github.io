export function getStatus() {
  return {
    ok: true,
    module: "BE-01__Festival_Pavilion",
    ts: Date.now()
  };
}



export function getStatus() {
  return {
    ok: true,
    module: "BE-01",
    name: "Festival_Pavilion",
    ts: Date.now(),
    eventsHandled: 0
  };
}



import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";

export function getStatus() {
  const sampleEvent = {
    module: "BE-01",
    type: "be-01.diagnostic.ping",
    payload: {}
  };
  const processed = CitySuperEngine.process(sampleEvent);

  return {
    ok: true,
    module: "BE-01",
    name: "Festival_Pavilion",
    ts: Date.now(),
    sample: {
      reputationDelta: processed.reputationDelta,
      tokensDelta: processed.tokensDelta,
      rewards: processed.rewards,
      abuse: processed.abuse
    }
  };
}



// DIAG_STATUS
// High-level status of Festival Pavilion

export function getFestivalStatus(globalState) {
  const f = globalState.festival || {};

  return {
    ok: true,
    timestamp: Date.now(),
    submissions: (f.submissions || []).length,
    jury: (f.jury || []).length,
    assignments: (f.assignments || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    events: (f.events || []).length,
    schedule: (f.schedule || []).length,
    narrative: (f.narrative || []).length
  };
}
