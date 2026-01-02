// Listener'y zdarzeń dla Community House (BE-45)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-45", (event) => {
    console.log("📡 Event in BE-45:", event);
  });
}
