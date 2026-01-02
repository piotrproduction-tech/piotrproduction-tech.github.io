// Emittery zdarzeń dla Treasure Vault (BE-25)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-25",
    type,
    payload,
    ts: Date.now()
  };
}
