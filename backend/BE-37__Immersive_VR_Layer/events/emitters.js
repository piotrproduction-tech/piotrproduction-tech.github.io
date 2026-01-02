// Emittery zdarzeń dla Immersive VR Layer (BE-37)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-37",
    type,
    payload,
    ts: Date.now()
  };
}
