// Emittery zdarzeń dla Core Audit (BE-09)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-09",
    type,
    payload,
    ts: Date.now()
  };
}
