// Emittery zdarzeń dla Policy Engine RBAC (BE-07)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-07",
    type,
    payload,
    ts: Date.now()
  };
}
