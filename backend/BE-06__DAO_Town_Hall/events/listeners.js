// Listener'y zdarzeń dla DAO Town Hall (BE-06)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-06", (event) => {
    console.log("📡 Event in BE-06:", event);
  });
}
