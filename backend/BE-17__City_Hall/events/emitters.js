// Emittery zdarzeń dla City Hall (BE-17)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-17",
    type,
    payload,
    ts: Date.now()
  };
}
