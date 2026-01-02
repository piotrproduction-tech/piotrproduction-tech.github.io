// Emittery zdarzeń dla Grants Office (BE-47)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-47",
    type,
    payload,
    ts: Date.now()
  };
}
