// Emittery zdarzeń dla Marketplace Street (BE-33)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-33",
    type,
    payload,
    ts: Date.now()
  };
}
