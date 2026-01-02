// backend/BE-07/service.js

function now() { return new Date().toISOString(); }

// ===== Media =====
export function Profile_getMedia(userId) {
  return {
    userId,
    feeds: [
      { source: "YT", count: 3 },
      { source: "FB", count: 2 }
    ]
  };
}

// ===== Zakupy =====
export function Profile_getPurchases(userId) {
  return {
    userId,
    items: [
      { id: "inv-101", name: "Bilet VR" },
      { id: "inv-102", name: "Kurs" }
    ]
  };
}

// ===== Przypomnienia =====
export function Profile_getReminders(userId) {
  return {
    userId,
    reminders: [
      { msg: "Koncert jutro" },
      { msg: "Ocena zgłoszeń" }
    ]
  };
}

// ===== VR Assets =====
export function Profile_getVRAssets(userId) {
  return {
    userId,
    assets: ["Awatar", "Galeria3D", "ScenaFestiwalowa"]
  };
}
