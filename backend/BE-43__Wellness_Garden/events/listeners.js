// Listener'y zdarzeń dla Wellness Garden (BE-43)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-43", (event) => {
    console.log("📡 Event in BE-43:", event);
  });
}
