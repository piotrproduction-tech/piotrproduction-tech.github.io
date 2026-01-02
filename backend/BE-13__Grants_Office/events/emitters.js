// Emittery zdarzeń dla Grants Office (BE-13)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-13",
    type,
    payload,
    ts: Date.now()
  };
}
