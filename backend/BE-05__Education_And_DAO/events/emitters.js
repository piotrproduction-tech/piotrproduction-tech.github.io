// Emittery zdarzeń dla Education And DAO (BE-05)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-05",
    type,
    payload,
    ts: Date.now()
  };
}
