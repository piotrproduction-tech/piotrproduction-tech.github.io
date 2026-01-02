// Emittery zdarzeń dla Knowledge Hub (BE-19)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-19",
    type,
    payload,
    ts: Date.now()
  };
}
