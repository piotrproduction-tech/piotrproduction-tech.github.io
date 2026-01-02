// backend/BE-54/service.extV3.js

// ===== Współpraca =====
export function Studio_addCollaborator(projectId, userId, role) {
  const collab = { id: "studio_collab_" + Date.now(), projectId, userId, role };
  return { ok: true, collab };
}

export function Studio_getCollaborators(projectId) {
  return [
    { id: "studio_collab_01", projectId, userId: "u_01", role: "editor" },
    { id: "studio_collab_02", projectId, userId: "u_02", role: "sound" }
  ];
}

// ===== Assety =====
export function Studio_addAsset(projectId, type, url) {
  const asset = { id: "studio_asset_" + Date.now(), projectId, type, url };
  return { ok: true, asset };
}

export function Studio_getAssets(projectId) {
  return [
    { id: "studio_asset_01", projectId, type: "video", url: "raw_01.mp4" },
    { id: "studio_asset_02", projectId, type: "audio", url: "soundtrack_01.mp3" }
  ];
}

// ===== Oceny projektu =====
export function Studio_addRating(projectId, userId, rating) {
  const rate = { id: "studio_rate_" + Date.now(), projectId, userId, rating };
  return { ok: true, rate };
}

export function Studio_getRatings(projectId) {
  return [
    { id: "studio_rate_01", projectId, userId: "u_01", rating: 5 },
    { id: "studio_rate_02", projectId, userId: "u_02", rating: 4 }
  ];
}

// ===== Raporty v3 =====
export function Studio_getReports_v3() {
  return [
    { id: "rep_studio_01", title: "Raport Studio Hub sierpień 2026", summary: "5 projektów, 40 assetów" },
    { id: "rep_studio_02", title: "Raport Studio Hub wrzesień 2026", summary: "7 projektów, 55 assetów" }
  ];
}
