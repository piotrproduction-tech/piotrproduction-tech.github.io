// Emittery zdarzeń dla Innovation Hub (BE-40)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-40",
    type,
    payload,
    ts: Date.now()
  };
}
