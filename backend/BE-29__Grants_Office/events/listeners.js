// Listener'y zdarzeń dla Grants Office (BE-29)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-29", (event) => {
    console.log("📡 Event in BE-29:", event);
  });
}
