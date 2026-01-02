// Emittery zdarzeń dla Media Tower (BE-18)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-18",
    type,
    payload,
    ts: Date.now()
  };
}
