// Emittery zdarzeń dla Sports Arena (BE-27)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-27",
    type,
    payload,
    ts: Date.now()
  };
}
