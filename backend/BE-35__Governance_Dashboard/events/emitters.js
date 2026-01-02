// Emittery zdarzeń dla Governance Dashboard (BE-35)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-35",
    type,
    payload,
    ts: Date.now()
  };
}
