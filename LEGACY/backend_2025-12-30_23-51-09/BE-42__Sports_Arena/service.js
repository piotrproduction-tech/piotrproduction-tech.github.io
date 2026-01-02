// ===== Wydarzenia sportowe =====
export function Sports_addEvent(userId, title, description, ts) {
  const event = { id: "sports_evt_" + Date.now(), userId, title, description, ts };
  return { ok: true, event };
}

export function Sports_getEvents() {
  return [
    { id: "sports_evt_01", title: "Turniej VR Football", description: "Rozgrywki w VR", ts: "2026-01-15T18:00:00Z" },
    { id: "sports_evt_02", title: "DAO Chess Cup", description: "Szachy w DAO", ts: "2026-02-01T19:00:00Z" }
  ];
}

// ===== Harmonogram =====
export function Sports_scheduleEvent(eventId, ts) {
  return { ok: true, eventId, ts };
}

export function Sports_getSchedule() {
  return [
    { eventId: "sports_evt_01", ts: "2026-01-15T18:00:00Z" },
    { eventId: "sports_evt_02", ts: "2026-02-01T19:00:00Z" }
  ];
}

// ===== Uczestnicy i drużyny =====
export function Sports_registerParticipant(userId, eventId) {
  const registration = { id: "sports_reg_" + Date.now(), userId, eventId };
  return { ok: true, registration };
}

export function Sports_getParticipants(eventId) {
  return [
    { id: "sports_reg_01", eventId, userId: "u_01" },
    { id: "sports_reg_02", eventId, userId: "u_02" }
  ];
}

export function Sports_addTeam(eventId, teamName) {
  const team = { id: "sports_team_" + Date.now(), eventId, teamName };
  return { ok: true, team };
}

export function Sports_getTeams(eventId) {
  return [
    { id: "sports_team_01", eventId, teamName: "VR Warriors" },
    { id: "sports_team_02", eventId, teamName: "DAO Masters" }
  ];
}

// ===== Wyniki =====
export function Sports_addResult(eventId, teamId, score) {
  const result = { id: "sports_result_" + Date.now(), eventId, teamId, score };
  return { ok: true, result };
}

export function Sports_getResults(eventId) {
  return [
    { id: "sports_result_01", eventId, teamId: "sports_team_01", score: 3 },
    { id: "sports_result_02", eventId, teamId: "sports_team_02", score: 2 }
  ];
}

// ===== Raporty =====
export function Sports_getReports() {
  return [
    { id: "rep_sports_01", title: "Raport Sports Arena grudzień 2025", summary: "2 wydarzenia, 4 drużyny, 20 uczestników" },
    { id: "rep_sports_02", title: "Raport Sports Arena styczeń 2026", summary: "3 wydarzenia, 6 drużyn, 30 uczestników" }
  ];
}
