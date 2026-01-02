// ===== Trendy wolontariatu =====

export function Volunteer_getTrends(days) {
  return {
    days,
    trend: [
      { day: "2026-09-01", change: 3 },
      { day: "2026-09-02", change: 5 },
      { day: "2026-09-03", change: -1 }
    ]
  };
}

// ===== Automatyczne powiadomienia =====

export function Volunteer_autoNotify(taskId, title) {
  return {
    ok: true,
    taskId,
    title,
    message: "Nowe zadanie wolontariatu zostało dodane"
  };
}

// ===== Integracje =====

export function Volunteer_linkEvent(taskId, eventId) {
  return { ok: true, taskId, eventId };
}

export function Volunteer_linkCommunity(taskId, groupId) {
  return { ok: true, taskId, groupId };
}

// ===== Raporty zaawansowane =====

export function Volunteer_getAdvancedReports() {
  return [
    {
      id: "vol_rep_01",
      title: "Raport sierpień 2026",
      summary: "40 zadań, 120 godzin, 18 wolontariuszy"
    },
    {
      id: "vol_rep_02",
      title: "Raport wrzesień 2026",
      summary: "55 zadań, 160 godzin, 22 wolontariuszy"
    }
  ];
}
