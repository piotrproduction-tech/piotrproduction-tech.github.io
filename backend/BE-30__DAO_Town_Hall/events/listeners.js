// Listener'y zdarzeń dla DAO Town Hall (BE-30)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-30", (event) => {
    console.log("📡 Event in BE-30:", event);
  });
}
