// ==== Wydarzenia (eventy) ====
export function Stream_getEvents() {
  return [
    { id: "str_01", title: "Koncert VR na żywo", ts: "2026-01-25T20:00:00Z" },
    { id: "str_02", title: "Premiera filmu w metaversum", ts: "2026-02-01T19:00:00Z" }
  ];
}

export function Stream_createEvent(userId, title, ts) {
  const event = { id: "str_" + Date.now(), userId, title, ts };
  return { ok: true, event };
}

export function Stream_archiveEvent(eventId) {
  return { ok: true, eventId, archived: true };
}

// ==== Komentarze do eventów ====
export function Stream_addComment(userId, eventId, text) {
  const comment = { id: "com_" + Date.now(), userId, eventId, text };
  return { ok: true, comment };
}

export function Stream_getComments(eventId) {
  return [
    { id: "com_01", eventId, userId: "u_01", text: "Świetny koncert!" },
    { id: "com_02", eventId, userId: "u_02", text: "Czekam na kolejną edycję." }
  ];
}

// ==== Bilety ====
export function Stream_addTicket(eventId, userId, price) {
  const ticket = { id: "tic_" + Date.now(), eventId, userId, price };
  return { ok: true, ticket };
}

export function Stream_getTickets(eventId) {
  return [
    { id: "tic_01", eventId, userId: "u_01", price: 50 },
    { id: "tic_02", eventId, userId: "u_02", price: 75 }
  ];
}

// ==== Live Streams ====
export function Stream_createLive(userId, title, description) {
  const live = { id: "stream_live_" + Date.now(), userId, title, description, status: "scheduled" };
  return { ok: true, live };
}

export function Stream_getLives() {
  return [
    { id: "stream_live_01", title: "Debata DAO", description: "Transmisja głosowania", status: "finished" },
    { id: "stream_live_02", title: "Koncert VR", description: "Muzyka immersyjna", status: "scheduled" }
  ];
}

// ==== Harmonogram ====
export function Stream_scheduleLive(liveId, ts) {
  return { ok: true, liveId, ts };
}

export function Stream_getSchedule() {
  return [
    { liveId: "stream_live_01", ts: "2026-12-15T18:00:00Z" },
    { liveId: "stream_live_02", ts: "2026-12-20T20:00:00Z" }
  ];
}

// ==== Uczestnicy ====
export function Stream_addParticipant(userId, liveId) {
  const participant = { id: "stream_part_" + Date.now(), userId, liveId };
  return { ok: true, participant };
}

export function Stream_getParticipants(liveId) {
  return [
    { id: "stream_part_01", liveId, userId: "u_01" },
    { id: "stream_part_02", liveId, userId: "u_02" }
  ];
}

// ==== Czat ====
export function Stream_addChatMessage(userId, liveId, message) {
  const chat = { id: "stream_chat_" + Date.now(), userId, liveId, message };
  return { ok: true, chat };
}

export function Stream_getChat(liveId) {
  return [
    { id: "stream_chat_01", liveId, userId: "u_01", message: "Super wydarzenie!" },
    { id: "stream_chat_02", liveId, userId: "u_02", message: "Kiedy kolejny koncert?" }
  ];
}

// ==== Integracje (Media Tower, Media Center, Twoje integracje) ====
export function Stream_linkChannel(eventId, channelId) {
  return { ok: true, eventId, channelId };
}

export function Stream_linkMedia(liveId, mediaId) {
  return { ok: true, liveId, mediaId };
}

export function Stream_linkContent(contentId, streamId) {
  return { ok: true, contentId, streamId };
}

// ==== Raporty legacy (2025) ====
export function Stream_getReportsLegacy() {
  return [
    { id: "rep_str_01", title: "Raport transmisji grudzień 2025", summary: "5 wydarzeń, 200 widzów" },
    { id: "rep_str_02", title: "Raport transmisji styczeń 2026", summary: "7 wydarzeń, 350 widzów" }
  ];
}
