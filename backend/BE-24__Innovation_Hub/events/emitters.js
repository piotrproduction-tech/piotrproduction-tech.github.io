// Emittery zdarzeń dla Innovation Hub (BE-24)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-24",
    type,
    payload,
    ts: Date.now()
  };
}
