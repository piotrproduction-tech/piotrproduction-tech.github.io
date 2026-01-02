// Emittery zdarzeń dla Admin Tower (BE-50)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-50",
    type,
    payload,
    ts: Date.now()
  };
}
