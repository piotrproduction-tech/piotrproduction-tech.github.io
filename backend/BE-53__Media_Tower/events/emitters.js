// Emittery zdarzeń dla Media Tower (BE-53)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-53",
    type,
    payload,
    ts: Date.now()
  };
}
