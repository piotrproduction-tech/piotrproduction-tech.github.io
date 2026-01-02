// Emittery zdarzeń dla DAO Town Hall (BE-46)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-46",
    type,
    payload,
    ts: Date.now()
  };
}
