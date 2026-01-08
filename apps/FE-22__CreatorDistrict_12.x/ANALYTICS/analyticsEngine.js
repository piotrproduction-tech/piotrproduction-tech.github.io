export function createAnalyticsEngine({ eventBus, store }) {
    const events = [];

    function track(eventName, payload = {}) {
      const entry = {
        event: eventName,
        payload,
        at: Date.now()
      };
      events.push(entry);
      eventBus.emit("analytics:tracked", entry);
    }

    function getEvents(filter = {}) {
      return events.filter((e) => {
        if (filter.event && e.event !== filter.event) return false;
        if (filter.since && e.at < filter.since) return false;
        return true;
      });
    }

    store.registerSlice("analytics", {
      getState: () => ({
        count: events.length
      })
    });

    return {
      track,
      getEvents
    };
  }

