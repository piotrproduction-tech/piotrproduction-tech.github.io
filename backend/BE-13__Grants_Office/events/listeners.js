// Listener'y zdarzeń dla Grants Office (BE-13)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-13", (event) => {
    console.log("📡 Event in BE-13:", event);
  });
}
