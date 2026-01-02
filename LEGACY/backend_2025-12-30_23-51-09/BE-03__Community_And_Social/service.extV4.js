// ===== Trendy inicjatyw społecznych =====

export function Community_getInitiativeTrends() {
  return [
    { month: "2026-08", initiatives: 12, participants: 150 },
    { month: "2026-09", initiatives: 15, participants: 200 }
  ];
}

// ===== Automatyczne powiadomienia o nowych inicjatywach =====

export function Community_autoNotifyNewInitiative(initiativeId, title) {
  return {
    ok: true,
    initiativeId,
    title,
    message: "Nowa inicjatywa społeczna została dodana"
  };
}

// ===== Integracja z Volunteer Center =====

export function Community_linkVolunteer(initiativeId, offerId) {
  return { ok: true, initiativeId, offerId };
}

// ===== Raporty uczestnictwa =====

export function Community_getParticipationReports() {
  return [
    {
      id: "comm_rep_01",
      title: "Raport sierpień 2026",
      summary: "12 inicjatyw, 150 uczestników"
    },
    {
      id: "comm_rep_02",
      title: "Raport wrzesień 2026",
      summary: "15 inicjatyw, 200 uczestników"
    }
  ];
}
