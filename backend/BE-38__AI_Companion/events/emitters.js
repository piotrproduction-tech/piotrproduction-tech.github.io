// Emittery zdarzeń dla AI Companion (BE-38)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-38",
    type,
    payload,
    ts: Date.now()
  };
}
