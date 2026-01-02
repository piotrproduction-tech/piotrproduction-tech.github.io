// FE-21__Marketplace - components/LiveSignalPulse.js

import { useEffect, useState } from "react";

export default function LiveSignalPulse({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div className="live-signal-pulse">
      <div className="pulse-circle" />
    </div>
  );
}
