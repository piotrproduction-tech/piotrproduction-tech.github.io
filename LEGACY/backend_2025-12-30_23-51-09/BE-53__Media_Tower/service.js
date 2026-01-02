// backend/BE-53/service.js

// ===== Publikacje medialne =====
export function Media_addPost(title, content, authorId) {
  const post = { id: "media_post_" + Date.now(), title, content, authorId, ts: new Date().toISOString() };
  return { ok: true, post };
}

export function Media_getPosts() {
  return [
    { id: "media_post_01", title: "Nowości VR", content: "Aktualizacje z warstwy VR", authorId: "u_01", ts: "2026-09-01T10:00:00Z" },
    { id: "media_post_02", title: "DAO Weekly", content: "Podsumowanie głosowań DAO", authorId: "u_02", ts: "2026-09-05T12:00:00Z" }
  ];
}

// ===== Media Assets =====
export function Media_addAsset(type, url, uploaderId) {
  const asset = { id: "media_asset_" + Date.now(), type, url, uploaderId };
  return { ok: true, asset };
}

export function Media_getAssets() {
  return [
    { id: "media_asset_01", type: "image", url: "asset_01.png", uploaderId: "u_01" },
    { id: "media_asset_02", type: "video", url: "asset_02.mp4", uploaderId: "u_02" }
  ];
}

// ===== Raporty =====
export function Media_getReports() {
  return [
    { id: "rep_media_01", title: "Raport Media Tower sierpień 2026", summary: "20 postów, 50 assetów" },
    { id: "rep_media_02", title: "Raport Media Tower wrzesień 2026", summary: "25 postów, 70 assetów" }
  ];
}
