// Listener'y zdarzeń dla City Hall (BE-17)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-17", (event) => {
    console.log("📡 Event in BE-17:", event);
  });
}
