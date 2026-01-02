// Emittery zdarzeń dla Studio Hub (BE-54)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-54",
    type,
    payload,
    ts: Date.now()
  };
}
