// Emittery zdarzeń dla Config IDs And Flags (BE-08)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-08",
    type,
    payload,
    ts: Date.now()
  };
}
