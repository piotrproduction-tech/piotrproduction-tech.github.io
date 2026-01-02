// Emittery zdarzeń dla Budget Bank (BE-49)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-49",
    type,
    payload,
    ts: Date.now()
  };
}
