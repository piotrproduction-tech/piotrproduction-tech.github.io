// Listener'y zdarzeń dla Policy Engine RBAC (BE-07)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-07", (event) => {
    console.log("📡 Event in BE-07:", event);
  });
}
