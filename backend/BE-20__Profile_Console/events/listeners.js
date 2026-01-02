// Listener'y zdarzeń dla Profile Console (BE-20)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-20", (event) => {
    console.log("📡 Event in BE-20:", event);
  });
}
