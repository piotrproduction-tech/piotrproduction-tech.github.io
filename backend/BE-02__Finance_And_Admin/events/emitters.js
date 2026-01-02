// Emittery zdarzeń dla Finance And Admin (BE-02)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-02",
    type,
    payload,
    ts: Date.now()
  };
}
