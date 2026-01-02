// Emittery zdarzeń dla Innovation And Business (BE-04)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-04",
    type,
    payload,
    ts: Date.now()
  };
}
