// Emittery zdarzeń dla Community House (BE-45)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-45",
    type,
    payload,
    ts: Date.now()
  };
}
