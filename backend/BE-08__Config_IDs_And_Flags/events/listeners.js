// Listener'y zdarzeń dla Config IDs And Flags (BE-08)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-08", (event) => {
    console.log("📡 Event in BE-08:", event);
  });
}
