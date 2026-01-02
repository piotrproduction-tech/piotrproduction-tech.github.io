// Emittery zdarzeń dla DAO Town Hall (BE-30)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-30",
    type,
    payload,
    ts: Date.now()
  };
}
