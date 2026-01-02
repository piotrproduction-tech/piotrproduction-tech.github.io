// Listener'y zdarzeń dla Grants Office (BE-47)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-47", (event) => {
    console.log("📡 Event in BE-47:", event);
  });
}
