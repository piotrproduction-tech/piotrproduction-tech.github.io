// Emittery zdarzeń dla Admin Tower (BE-16)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-16",
    type,
    payload,
    ts: Date.now()
  };
}
