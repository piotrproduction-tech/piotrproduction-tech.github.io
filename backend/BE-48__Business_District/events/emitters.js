// Emittery zdarzeń dla Business District (BE-48)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-48",
    type,
    payload,
    ts: Date.now()
  };
}
