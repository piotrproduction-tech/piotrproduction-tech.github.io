// Listener'y zdarzeń dla Budget Bank (BE-49)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-49", (event) => {
    console.log("📡 Event in BE-49:", event);
  });
}
