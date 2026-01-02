// ==== Rejestracja i administracja mieszkańców ====
export function CityHall_registerCitizen(userId, name, role) {
  const citizen = { id: "cit_" + Date.now(), userId, name, role };
  return { ok: true, citizen };
}

export function CityHall_getCitizens() {
  return [
    { id: "cit_01", name: "Piotr", role: "architect" },
    { id: "cit_02", name: "Anna", role: "moderator" }
  ];
}

// ==== Uchwały i regulacje ====
export function CityHall_createResolution(userId, title, description) {
  const resolution = { id: "res_" + Date.now(), userId, title, description };
  return { ok: true, resolution };
}

export function CityHall_getResolutions() {
  return [
    { id: "res_01", title: "Regulamin korzystania z Stream Square", status: "active" },
    { id: "res_02", title: "Zasady grantów edukacyjnych", status: "active" }
  ];
}

// ==== Sesje i spotkania ====
export function CityHall_scheduleMeeting(title, ts) {
  const meeting = { id: "mt_" + Date.now(), title, ts };
  return { ok: true, meeting };
}

export function CityHall_getMeetings() {
  return [
    { id: "mt_01", title: "Sesja rady miasta", ts: "2026-01-15T18:00:00Z" },
    { id: "mt_02", title: "Spotkanie z mieszkańcami", ts: "2026-01-20T17:00:00Z" }
  ];
}

// ==== Integracja z DAO Town Hall ====
export function CityHall_linkDAO(resolutionId, proposalId) {
  return { ok: true, resolutionId, proposalId };
}

// ==== Raporty (v2) ====
export function CityHall_getReports() {
  return [
    { id: "rep_ch_01", title: "Raport uchwał grudzień 2025", summary: "Przyjęto 3 uchwały" },
    { id: "rep_ch_02", title: "Raport spotkań styczeń 2026", summary: "Zorganizowano 2 sesje rady miasta" }
  ];
}
