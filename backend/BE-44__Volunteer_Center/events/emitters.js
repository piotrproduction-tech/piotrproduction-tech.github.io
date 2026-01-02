// Emittery zdarzeń dla Volunteer Center (BE-44)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-44",
    type,
    payload,
    ts: Date.now()
  };
}
