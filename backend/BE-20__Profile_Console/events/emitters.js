// Emittery zdarzeń dla Profile Console (BE-20)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-20",
    type,
    payload,
    ts: Date.now()
  };
}
