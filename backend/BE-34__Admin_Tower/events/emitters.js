// Emittery zdarzeń dla Admin Tower (BE-34)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-34",
    type,
    payload,
    ts: Date.now()
  };
}
