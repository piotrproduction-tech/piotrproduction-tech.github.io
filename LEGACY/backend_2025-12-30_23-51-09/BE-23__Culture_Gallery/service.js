// backend/BE-23/service.js

// Dane w pamięci (placeholder)
let EXHIBITIONS = [];
let ARTWORKS = [];
let COMMENTS = [];
let REPORTS = [
  { id: "rep_gallery_01", title: "Raport wystaw grudzień 2025", summary: "3 wystawy, 20 dzieł" },
  { id: "rep_gallery_02", title: "Raport wystaw styczeń 2026", summary: "4 wystawy, 25 dzieł" }
];

// --- Wystawy ---

export function Gallery_getExhibitions() {
  return EXHIBITIONS;
}

export function Gallery_createExhibition(userId, title, ts) {
  const exhibition = { id: "exh_" + Date.now(), userId, title, ts };
  EXHIBITIONS.push(exhibition);
  return { ok: true, exhibition };
}

// --- Dzieła ---

export function Gallery_addArtwork(userId, title, artist, medium) {
  const artwork = { id: "art_" + Date.now(), userId, title, artist, medium };
  ARTWORKS.push(artwork);
  return { ok: true, artwork };
}

export function Gallery_getArtworks() {
  return ARTWORKS;
}

// --- Komentarze ---

export function Gallery_addComment(userId, artworkId, text) {
  const comment = { id: "com_" + Date.now(), userId, artworkId, text };
  COMMENTS.push(comment);
  return { ok: true, comment };
}

export function Gallery_getComments(artworkId) {
  return COMMENTS.filter(c => c.artworkId === artworkId);
}

// --- Raporty ---

export function Gallery_getReports() {
  return REPORTS;
}

// --- Archiwizacja ---

export function Gallery_archiveExhibition(exhibitionId) {
  return { ok: true, exhibitionId, archived: true };
}
