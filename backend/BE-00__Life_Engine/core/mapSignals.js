export function sendMapSignal(type, payload) {
  fetch("http://localhost:3000/api/city/map/signal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload })
  }).catch(() => {});
}
