// Emittery zdarzeń dla Business District (BE-28)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-28",
    type,
    payload,
    ts: Date.now()
  };
}
