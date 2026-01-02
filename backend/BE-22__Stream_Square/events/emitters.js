// Emittery zdarzeń dla Stream Square (BE-22)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-22",
    type,
    payload,
    ts: Date.now()
  };
}
