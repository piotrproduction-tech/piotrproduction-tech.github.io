// Listener'y zdarzeń dla Marketplace Street (BE-33)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-33", (event) => {
    console.log("📡 Event in BE-33:", event);
  });
}
