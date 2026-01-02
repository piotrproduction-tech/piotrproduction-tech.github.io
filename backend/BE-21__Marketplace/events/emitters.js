// Emittery zdarzeń dla Marketplace (BE-21)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-21",
    type,
    payload,
    ts: Date.now()
  };
}
