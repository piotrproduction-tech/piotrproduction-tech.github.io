// Emittery zdarzeń dla Wellness Garden (BE-26)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-26",
    type,
    payload,
    ts: Date.now()
  };
}
