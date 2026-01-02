// Emittery zdarzeń dla Citizen Console (BE-36)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-36",
    type,
    payload,
    ts: Date.now()
  };
}
