import { useEffect, useState } from "react";

let mapSignalListeners = [];

export function emitMapSignal(signal) {
  mapSignalListeners.forEach((l) => l(signal));
}

export function useTileGlow(tileId) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const listener = (signal) => {
      if (signal.tileId === tileId) {
        setActive(true);
        setTimeout(() => setActive(false), 1200);
      }
    };
    mapSignalListeners.push(listener);
    return () => {
      mapSignalListeners = mapSignalListeners.filter((l) => l !== listener);
    };
  }, [tileId]);

  return active;
}
