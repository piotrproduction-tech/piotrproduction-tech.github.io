// Emittery zdarzeń dla Culture Gallery (BE-23)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-23",
    type,
    payload,
    ts: Date.now()
  };
}
