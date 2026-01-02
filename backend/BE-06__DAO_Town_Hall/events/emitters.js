// Emittery zdarzeń dla DAO Town Hall (BE-06)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-06",
    type,
    payload,
    ts: Date.now()
  };
}
