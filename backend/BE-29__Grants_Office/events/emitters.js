// Emittery zdarzeń dla Grants Office (BE-29)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-29",
    type,
    payload,
    ts: Date.now()
  };
}
