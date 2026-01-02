// Listener'y zdarzeń dla DAO Town Hall (BE-46)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-46", (event) => {
    console.log("📡 Event in BE-46:", event);
  });
}
