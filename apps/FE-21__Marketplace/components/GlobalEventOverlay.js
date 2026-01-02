// FE-21__Marketplace - components/GlobalEventOverlay.js

import { useEffect, useState } from "react";
import { subscribeLive } from "../state/liveEventBus";

export default function GlobalEventOverlay() {
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    subscribeLive(live => {
      if (live.lastEvent) {
        setEvent(live.lastEvent);
        setVisible(true);

        setTimeout(() => setVisible(false), 3000);
      }
    });
  }, []);

  if (!visible || !event) return null;

  return (
    <div className="global-event-overlay">
      <div className="overlay-box">
        <strong>{event.type}</strong>
        <div>{JSON.stringify(event.payload)}</div>
      </div>
    </div>
  );
}
