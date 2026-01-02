// Listener'y zdarzeń dla Volunteer Center (BE-44)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-44", (event) => {
    console.log("📡 Event in BE-44:", event);
  });
}
