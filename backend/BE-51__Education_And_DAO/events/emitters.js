// Emittery zdarzeń dla Education And DAO (BE-51)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-51",
    type,
    payload,
    ts: Date.now()
  };
}
