// Emittery zdarzeń dla Culture Gallery (BE-41)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-41",
    type,
    payload,
    ts: Date.now()
  };
}
