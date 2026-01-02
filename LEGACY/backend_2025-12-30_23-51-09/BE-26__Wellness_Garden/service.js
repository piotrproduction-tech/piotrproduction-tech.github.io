// Lekki stan w pamięci – TYLKO NA CZAS DEV
let USER_WELLNESS = {};
let GROUP_ACTIVITIES = [
  {
    activityId: "act_well_01",
    name: "Poranna joga",
    participants: ["u_01"],
    maxParticipants: 20
  },
  {
    activityId: "act_well_02",
    name: "Spacer mindfulness",
    participants: [],
    maxParticipants: 15
  }
];

// ==== Statystyki wellness użytkownika (proxy BE_26_getUserWellness) ====
export function BE26_getUserWellness(userId) {
  if (!userId) return { error: "Brak userId" };

  const base = USER_WELLNESS[userId] || {
    wellnessPoints: 0,
    wellnessLevel: "Beginner",
    lastActivity: null
  };

  return {
    userId,
    wellnessPoints: base.wellnessPoints,
    wellnessLevel: base.wellnessLevel,
    lastActivity: base.lastActivity
  };
}

// ==== Aktualizacja punktów wellness (proxy BE_26_updateWellnessPoints) ====
export function BE26_updateWellnessPoints(userId, points) {
  if (!userId || points === undefined) return { error: "Brak danych" };

  const current = USER_WELLNESS[userId] || {
    wellnessPoints: 0,
    wellnessLevel: "Beginner",
    lastActivity: null
  };

  const updatedPoints = (current.wellnessPoints || 0) + points;

  USER_WELLNESS[userId] = {
    ...current,
    wellnessPoints: updatedPoints,
    lastActivity: new Date().toISOString()
  };

  return { ok: true, userId, wellnessPoints: updatedPoints };
}

// ==== Lista aktywności grupowych (proxy BE_26_getGroupActivities) ====
export function BE26_getGroupActivities() {
  return GROUP_ACTIVITIES.map(a => ({
    activityId: a.activityId,
    name: a.name,
    participantsCount: a.participants.length,
    maxParticipants: a.maxParticipants
  }));
}

// ==== Dołączanie do aktywności (proxy BE_26_joinActivity) ====
export function BE26_joinActivity(userId, activityId) {
  if (!userId || !activityId) return { error: "Brak danych" };

  const activity = GROUP_ACTIVITIES.find(a => a.activityId === activityId);
  if (!activity) return { error: "Aktywność nie istnieje" };

  const participants = activity.participants || [];
  const max = activity.maxParticipants || 20;

  if (participants.includes(userId)) {
    return { error: "Użytkownik już zapisany" };
  }

  if (participants.length >= max) {
    return { error: "Brak miejsc" };
  }

  participants.push(userId);
  activity.participants = participants;

  return { ok: true, activityId, userId };
}

// ==== Statystyki aktywności (proxy BE_26_getGroupStats) ====
export function BE26_getGroupStats(activityId) {
  if (!activityId) return { error: "Brak activityId" };

  const activity = GROUP_ACTIVITIES.find(a => a.activityId === activityId);
  if (!activity) return { error: "Aktywność nie istnieje" };

  return {
    activityId,
    name: activity.name,
    participantsCount: activity.participants.length,
    maxParticipants: activity.maxParticipants
  };
}

// ==== Placeholder AI (proxy BE_26_getAiRecommendations) ====
export function BE26_getAiRecommendations(userId) {
  return {
    userId,
    message: "AI recommendations dostępne w BE‑43 (v3)",
    ready: false
  };
}

// ==== Placeholder VR (proxy BE_26_getVrPreview) ====
export function BE26_getVrPreview(userId) {
  return {
    userId,
    message: "VR immersions dostępne w BE‑43 (v3)",
    ready: false
  };
}
