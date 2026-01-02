// ==== Dane profilu ====
export function Profile_create(userId, name, email) {
  const profile = { id: "profile_" + Date.now(), userId, name, email, role: "user", reputation: 0 };
  return { ok: true, profile };
}

export function Profile_get(userId) {
  return {
    id: "profile_" + userId,
    userId,
    name: "Jan Kowalski",
    email: "jan@example.com",
    role: "architect",
    reputation: 85
  };
}

export function Profile_updateUser(userId, field, value) {
  return { ok: true, userId, field, value };
}

// ==== Aktywności (SCALONE) ====
export function Profile_addActivity(userId, activity) {
  const act = {
    id: "act_" + Date.now(),
    userId,
    activity: {
      type: activity.type || null,
      title: activity.title || null,
      raw: activity.raw || null
    },
    ts: new Date().toISOString()
  };
  return { ok: true, act };
}

export function Profile_getActivities(userId) {
  return [
    {
      id: "act_01",
      userId,
      activity: { type: "course", title: "VR Storytelling", raw: null },
      ts: "2025-12-01T18:00:00Z"
    },
    {
      id: "act_02",
      userId,
      activity: { type: "vote", title: "DAO Town Hall głosowanie", raw: null },
      ts: "2025-12-05T20:00:00Z"
    }
  ];
}

// ==== Media ====
export function Profile_linkMedia(userId, platform, handle) {
  return { ok: true, userId, platform, handle };
}

export function Profile_getMediaLinks(userId) {
  return [
    { platform: "YouTube", handle: "@userYT" },
    { platform: "Facebook", handle: "@userFB" },
    { platform: "X", handle: "@userX" }
  ];
}

// ==== Zakupy (SCALONE) ====
export function Profile_addPurchase(userId, item, data) {
  const purchase = {
    id: "pur_" + Date.now(),
    userId,
    item,
    price: data.price || data.amount || null,
    amount: data.amount || data.price || null,
    ts: new Date().toISOString()
  };
  return { ok: true, purchase };
}

export function Profile_getPurchases(userId) {
  return [
    { id: "pur_01", userId, item: "Bilet VR Festiwal", price: 100, amount: 100 },
    { id: "pur_02", userId, item: "Książka o DAO", price: 50, amount: 50 }
  ];
}

// ==== Przypomnienia ====
export function Profile_addReminder(userId, text, ts) {
  const reminder = { id: "rem_" + Date.now(), userId, text, ts };
  return { ok: true, reminder };
}

export function Profile_getReminders(userId) {
  return [
    { id: "rem_01", text: "Spotkanie w City Hall", ts: "2025-12-20T17:00:00Z" }
  ];
}

// ==== VR/AI ====
export function Profile_startVRSession(userId, context) {
  return { ok: true, userId, context, mode: "VR" };
}

export function Profile_startAISession(userId, context) {
  return { ok: true, userId, context, mode: "AI" };
}

// ==== Integracje ====
export function Profile_linkModule(userId, moduleId) {
  return { ok: true, userId, moduleId };
}
