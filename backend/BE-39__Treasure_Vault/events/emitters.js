// Emittery zdarzeń dla Treasure Vault (BE-39)
// Przykład: emitEvent("event.type", payload);



export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "BE-39",
    type,
    payload,
    ts: Date.now()
  };
}
