// Emittery zdarzeń dla Budget Bank (BE-15)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-15",
    type,
    payload,
    ts: Date.now()
  };
}
