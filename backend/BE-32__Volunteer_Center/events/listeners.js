// Listener'y zdarzeń dla Volunteer Center (BE-32)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-32", (event) => {
    console.log("📡 Event in BE-32:", event);
  });
}
