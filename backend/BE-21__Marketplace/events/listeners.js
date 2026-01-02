// Listener'y zdarzeń dla Marketplace (BE-21)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-21", (event) => {
    console.log("📡 Event in BE-21:", event);
  });
}
