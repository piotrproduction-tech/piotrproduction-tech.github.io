import { useEffect, useState } from "react";

export function useHeartbeat() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat((b) => b + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return beat;
}
