// Emittery zdarzeń dla Volunteer Center (BE-32)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-32",
    type,
    payload,
    ts: Date.now()
  };
}
