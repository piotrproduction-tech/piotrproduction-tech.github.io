// Listener'y zdarzeń dla Treasure Vault (BE-25)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-25", (event) => {
    console.log("📡 Event in BE-25:", event);
  });
}
