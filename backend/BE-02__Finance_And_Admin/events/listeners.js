// Listener'y zdarzeń dla Finance And Admin (BE-02)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-02", (event) => {
    console.log("📡 Event in BE-02:", event);
  });
}
