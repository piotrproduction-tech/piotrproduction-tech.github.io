// apps/FE-12__CityOfGate_12.x/src/ui/CityEngineBridge.js

import { useEffect, useState } from "react";
import engineMock from "../engineMock.js";

export function useCityEngine() {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    setEngine(engineMock);
  }, []);

  return engine;
}
