// Listener'y zdarzeń dla Treasure Vault (BE-39)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-39", (event) => {
    console.log("📡 Event in BE-39:", event);
  });
}
