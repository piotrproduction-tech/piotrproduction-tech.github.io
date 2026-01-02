// Emittery zdarzeń dla Festival Hub (BE-52)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-52",
    type,
    payload,
    ts: Date.now()
  };
}
