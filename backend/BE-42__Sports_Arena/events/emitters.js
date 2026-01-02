// Emittery zdarzeń dla Sports Arena (BE-42)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-42",
    type,
    payload,
    ts: Date.now()
  };
}
