// FE-21__Marketplace - components/LiveEventBubble.js

import { useEffect, useState } from "react";

export default function LiveEventBubble({ event }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [event]);

  if (!visible) return null;

  return (
    <div className="live-event-bubble">
      <strong>{event.type}</strong>
      <div>{JSON.stringify(event.payload)}</div>
    </div>
  );
}
