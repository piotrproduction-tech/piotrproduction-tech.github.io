// Emittery zdarzeń dla Community And Social (BE-03)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-03",
    type,
    payload,
    ts: Date.now()
  };
}
