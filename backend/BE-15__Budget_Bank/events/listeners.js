// Listener'y zdarzeń dla Budget Bank (BE-15)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-15", (event) => {
    console.log("📡 Event in BE-15:", event);
  });
}
